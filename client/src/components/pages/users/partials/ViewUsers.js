import React from "react";
import UserCard from "./UserCard";
import { useSelector } from "react-redux";
import { usersSelector } from "../../../../redux/slices/usersSlice";

const ViewUsers = ({ handleRemove }) => {
  const users = useSelector(usersSelector);

  const cards = users.map((u, k) => {
    return <UserCard user={u} key={k} handleRemove={handleRemove} />;
  });

  return (
    <div className="users-list">
      <h3>Registred Users:</h3>
      {cards}
      {users.length == 0 && (
        <span className="users-note">No users found in the Database</span>
      )}
    </div>
  );
};

export default ViewUsers;
