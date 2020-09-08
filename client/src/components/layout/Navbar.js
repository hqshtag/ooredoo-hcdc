import React from "react";
import { ReactComponent as Logo } from "../../assets/icons/ooredoo_logo.svg";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";

const Navbar = ({ loggedIn, resetMenu }) => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    console.log("logging out");
    resetMenu();
    dispatch(logout());
  };
  return (
    <nav className="navbar">
      <div className="logo container">
        <Logo />
      </div>
      {loggedIn && (
        <button className="btn medium" onClick={handleLogout}>
          Logout
        </button>
      )}
    </nav>
  );
};

export default Navbar;
