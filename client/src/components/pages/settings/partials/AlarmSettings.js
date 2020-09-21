import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { tokenSelector } from "../../../../redux/slices/authSlice";
import {
  getSettings,
  setSettings,
} from "../../../../redux/slices/settingsSlice";

const AlarmSettings = () => {
  const dispatch = useDispatch();
  const token = useSelector(tokenSelector);
  const settings = useSelector((state) => state.settings);

  const [params, setParams] = useState({
    ol: settings.ol,
    oc: settings.oc,
  });

  useEffect(() => {
    dispatch(
      setSettings({
        token,
        data: { ol: parseInt(params.ol), oc: parseInt(params.oc) },
      })
    )
      .then(unwrapResult)
      .then(() => {
        dispatch(getSettings(token));
      });
  }, [params]);

  const handleChange = (e) => {
    let { value, min, max, name } = e.target;
    value = Math.max(Number(min), Math.min(Number(max), Number(value)));
    setParams((p) => {
      return { ...p, [name]: value };
    });
  };

  return (
    <div className="alarm-settings">
      <h4>Alarm Settings</h4>
      <div>
        <label htmlFor="ol">
          Bandwidth overload at:
          <input
            type="number"
            min="20"
            max="90"
            name="ol"
            value={params.ol}
            onChange={handleChange}
          />
          <span className="percent">%</span>
        </label>
        <label htmlFor="oc">
          Node CPU usage overclock at:
          <input
            type="number"
            min="20"
            name="oc"
            max="90"
            value={params.oc}
            onChange={handleChange}
          />
          <span className="percent">%</span>
        </label>
      </div>
    </div>
  );
};

export default AlarmSettings;
