import React, { useState } from "react";

const ChangePasswordForm = ({ submit }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "oldPassword") {
      setOldPassword(e.target.value);
    } else if (e.target.name === "newPassword") {
      setNewPassword(e.target.value);
    }
  };
  const reset = () => {
    setOldPassword("");
    setNewPassword("");
  };

  const canSubmit = oldPassword.length >= 4 && newPassword.length >= 4;
  const handleSubmit = () => {
    if (canSubmit) {
      submit(oldPassword, newPassword);
      reset();
    } else {
      console.log("cant");
    }
  };
  return (
    <div className="update-form">
      <h4>Change Password</h4>
      <span className="username"></span>
      <input
        className="form-input medium"
        placeholder="Your old password"
        type="password"
        name="oldPassword"
        value={oldPassword}
        onChange={handleChange}
      />
      <input
        className="form-input medium"
        placeholder="New password"
        type="password"
        name="newPassword"
        value={newPassword}
        onChange={handleChange}
      />
      <button className="btn medium lime" onClick={handleSubmit}>
        update
      </button>
    </div>
  );
};

export default ChangePasswordForm;
