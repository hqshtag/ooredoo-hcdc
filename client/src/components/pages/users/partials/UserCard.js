import React from "react";
import { ReactComponent as User } from "../../../../assets/icons/user.svg";
import { ReactComponent as Remove } from "../../../../assets/icons/close.svg";
//import { ReactComponent as Edit } from "../../assets/icons/edit.svg";

const UserCard = ({ user, handleRemove }) => {
  const { username, _id } = user;
  return (
    <div className="user-card">
      <div className="buttons">
        {/*   <button className="icon-btn blue">
          <Edit />
        </button> */}
        <button
          className="icon-btn red"
          onClick={() => {
            handleRemove(_id);
          }}
        >
          <Remove />
        </button>
      </div>

      <span className="id-output">ID:{_id}</span>
      <span className="username-output">
        {" "}
        <User /> {username}
      </span>
    </div>
  );
};

export default UserCard;
