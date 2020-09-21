import React, { useState, useEffect } from "react";
import XLSX from "xlsx";

import { make_cols } from "./MakeColumns";
import { SheetJSFT } from "./types";
import { useSelector, useDispatch } from "react-redux";
import { tokenSelector } from "../../../../redux/slices/authSlice";
import Parser from "../../../../api/parser";
import {
  createInfo,
  createSuccess,
  createWarning,
} from "../../../../redux/slices/alertSlice";
import { getAll as getAllAlarms } from "../../../../redux/slices/alarmSlice";
import { unwrapResult } from "@reduxjs/toolkit";

const ExcelReader = ({ label, id, type, createMany, deleteAll, getAll }) => {
  const token = useSelector(tokenSelector);
  const dispatch = useDispatch();
  const parser = new Parser();
  const [data, setData] = useState({
    file: null,
    fileName: "",
    data: null,
    cols: {},
  });
  const [deleteState, setDeleteState] = useState(false);

  const deleteStateOff = () => setDeleteState(false);
  const deleteStateOn = () => {
    setDeleteState(true);
    setTimeout(() => {
      deleteStateOff();
    }, 2000);
  };

  const handleChange = (e) => {
    const files = e.target.files;
    //console.log(files);
    if (files && files[0])
      setData((p) => {
        return { ...p, file: files[0], fileName: files[0].name };
      });
  };

  /**This proccess the file and updates the state */
  useEffect(() => {
    if (data.file) {
      const reader = new FileReader();
      const rABS = !!reader.readAsBinaryString;

      reader.onload = (e) => {
        /* Parse data */
        const bstr = e.target.result;
        const wb = XLSX.read(bstr, {
          type: rABS ? "binary" : "array",
          bookVBA: true,
        });
        /* Get first worksheet */

        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        /* Convert array of arrays */
        const data = XLSX.utils.sheet_to_json(ws);
        /* Update state */
        setData((p) => {
          return { ...p, data: data, cols: make_cols(ws["!ref"]) };
        });
      };
      if (rABS) {
        reader.readAsBinaryString(data.file);
      } else {
        reader.readAsArrayBuffer(data.file);
      }
    }
  }, [data.file]);

  const reset = () => {
    console.log("reset");
    setData({
      file: null,
      fileName: "",
      data: null,
      cols: {},
    });
  };
  const submit = () => {
    dispatch(createInfo("Uploading " + data.fileName));
    dispatch(createMany({ token, data: parser.parseMany(data.data, type) }))
      .then(unwrapResult)
      .then(() => {
        //dispatch()
        //update added data & check for any detected alarms
        dispatch(getAll(token));
        dispatch(getAllAlarms(token));

        reset();
      });
  };

  const deleteMany = () => {
    dispatch(createWarning("Deleting all " + type + "s"));
    dispatch(deleteAll(token)).then(() => {
      dispatch(getAll(token));
      deleteStateOff();
    });
  };
  return (
    <div className="excel-reader">
      <h4>{label}</h4>
      {data.data == null && (
        <label className="custom-upload" htmlFor={id}>
          Import
        </label>
      )}
      {data.fileName !== "" && (
        <span className="file-name">Selected: {data.fileName}</span>
      )}
      <input
        type="file"
        className="form-control"
        id={id}
        accept={SheetJSFT}
        onChange={handleChange}
      />
      {data.data ? (
        <div className="buttons">
          <button className="btn reset-btn" onClick={reset}>
            cancel
          </button>{" "}
          <button className="btn save-btn" onClick={submit}>
            Upload
          </button>
        </div>
      ) : (
        <button
          className="btn clear-btn"
          onClick={deleteState ? deleteMany : deleteStateOn}
        >
          {deleteState ? "Are you sure?" : "clear database"}
        </button>
      )}
    </div>
  );
};

export default ExcelReader;
