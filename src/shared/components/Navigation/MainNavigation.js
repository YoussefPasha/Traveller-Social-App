import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import MainHeader from "./MainHeader";
import SideDrawer from "./SideDrawer";
import NavLinks from "./NavLinks";
import Backdrop from "../UIElements/Backdrop";
import "./MainNavigation.css";

const MainNavigation = (props) => {
  const [drawIsOpen, setDrawIsOpen] = useState(false);

  return (
    <Fragment>
      {drawIsOpen && <Backdrop onClick={() => setDrawIsOpen(!drawIsOpen)} />}
      {drawIsOpen && (
        <SideDrawer>
          <nav className="main-navigation__drawer-nav">
            <NavLinks />
          </nav>
        </SideDrawer>
      )}
      <MainHeader>
        <button
          className="main-navigation__menu-btn"
          onClick={() => setDrawIsOpen(!drawIsOpen)}
        >
          <span />
          <span />
          <span />
        </button>
        <h1 className="main-navigation__title">
          <Link to="/">Your Places</Link>
        </h1>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </Fragment>
  );
};

export default MainNavigation;
