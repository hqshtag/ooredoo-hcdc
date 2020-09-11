import React, { useEffect, useState } from "react";
import Navbar from "./components/layout/Navbar";

import Footer from "./components/layout/Footer";
import Login from "./components/forms/Login";
import Dashboard from "./components/Dashboard";
import "./assets/styles/stylesheet.css";
import { useSelector, useDispatch } from "react-redux";
import { isLoggedInSelector, checkToken } from "./redux/slices/authSlice";
import Usermenu from "./components/layout/Usermenu";

function App() {
  const [activeMenu, setActiveMenu] = useState({
    nodes: true,
    interfaces: false,
    errors: false,
    loadbalancer: false,

    settings: false,
  });

  const resetMenu = () => {
    setActiveMenu({
      nodes: true,
      interfaces: false,
      errors: false,
      loadbalancer: false,
      settings: false,
    });
  };

  const handleMenuNavigation = (e) => {
    //console.log(tasks);
    let key = e.target.getAttribute("data-key");
    setActiveMenu({
      nodes: false,
      interfaces: false,
      errors: false,
      loadbalancer: false,

      settings: false,
      [key]: true,
    });
  };

  const loggedIn = useSelector(isLoggedInSelector);
  const token = localStorage.getItem("jwt");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkToken(token));
  }, [token, dispatch]);

  useEffect(() => {
    let { nodes, interfaces, errors, settings, loadbalancer } = activeMenu;
    if (!nodes && !interfaces && !errors && !settings && !loadbalancer) {
      setActiveMenu({
        nodes: true,
        interfaces: false,
        errors: false,
        loadbalancer: false,

        settings: false,
      });
    }
  }, [activeMenu]);
  return (
    <>
      {" "}
      <Navbar loggedIn={loggedIn} resetMenu={resetMenu} />
      <div className="app">
        {loggedIn && <Usermenu handleMenuNavigation={handleMenuNavigation} />}
        <div className="main-container">
          {!loggedIn ? (
            <Login />
          ) : (
            <Dashboard token={token} activeMenu={activeMenu} />
          )}
        </div>
      </div>
      <Footer />{" "}
    </>
  );
}

export default App;
