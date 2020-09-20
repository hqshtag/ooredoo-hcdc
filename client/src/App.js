import React, { useEffect, useState } from "react";
import Navbar from "./components/layout/Navbar";
import JavascriptTimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

import Footer from "./components/layout/Footer";
import Login from "./components/forms/Login";
import Dashboard from "./components/Dashboard";
import "./assets/styles/stylesheet.css";
import { useSelector, useDispatch } from "react-redux";
import { isLoggedInSelector, checkToken } from "./redux/slices/authSlice";
import Usermenu from "./components/layout/Usermenu";
import AlertPanel from "./components/layout/Alert/AlertPanel";
import { getSettings } from "./redux/slices/settingsSlice";
import { bootstrap } from "./redux/slices/authSlice";

function App() {
  const [activeMenu, setActiveMenu] = useState({
    nodes: true,
    interfaces: false,
    errors: false,
    loadbalancer: false,
    alarms: false,
    settings: false,
  });

  const resetMenu = () => {
    setActiveMenu({
      nodes: true,
      interfaces: false,
      errors: false,
      loadbalancer: false,
      alarms: false,
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
      alarms: false,
      settings: false,
      [key]: true,
    });
  };

  const loggedIn = useSelector(isLoggedInSelector);
  const token = localStorage.getItem("jwt");
  const dispatch = useDispatch();
  useEffect(() => {
    JavascriptTimeAgo.addLocale(en);
    dispatch(bootstrap());
    dispatch(checkToken(token));
    dispatch(getSettings(token));
  }, [token, dispatch]);

  useEffect(() => {
    let {
      nodes,
      interfaces,
      errors,
      settings,
      loadbalancer,
      alarms,
    } = activeMenu;
    if (
      !nodes &&
      !interfaces &&
      !errors &&
      !settings &&
      !loadbalancer &&
      !alarms
    ) {
      setActiveMenu({
        nodes: true,
        interfaces: false,
        errors: false,
        loadbalancer: false,
        alarms: false,
        settings: false,
      });
    }
  }, [activeMenu]);
  return (
    <>
      {" "}
      <Navbar loggedIn={loggedIn} resetMenu={resetMenu} />
      <div className="app">
        {loggedIn && (
          <Usermenu
            menu={activeMenu}
            handleMenuNavigation={handleMenuNavigation}
          />
        )}
        <div className="main-container">
          {!loggedIn ? (
            <Login />
          ) : (
            <Dashboard token={token} activeMenu={activeMenu} />
          )}
        </div>
      </div>
      <AlertPanel />
      <Footer />{" "}
    </>
  );
}

export default App;
