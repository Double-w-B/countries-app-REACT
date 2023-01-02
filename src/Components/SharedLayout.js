import React, { Fragment } from "react";
import Navbar from "./shared/Navbar";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as homePageSlice from "../redux/features/homePage/homePageSlice";

const SharedLayout = () => {
  const dispatch = useDispatch();

  const { isHover, isActive } = useSelector((store) => store.homePage);

  const handleClick = (e) => {
    if (
      !e.target.closest(".countries__container") &&
      !e.target.closest(".selected__country") &&
      isHover &&
      isActive
    ) {
      dispatch(homePageSlice.removeHover());
      dispatch(homePageSlice.removeActive());
    }
  };

  const handleMouseOver = (e) => {
    if (
      !e.target.closest(".countries__container") &&
      !e.target.closest(".selected__country") &&
      isHover &&
      !isActive
    ) {
      dispatch(homePageSlice.removeHover());
    }
  };

  return (
    <Fragment>
      <Navbar />
      <main onClick={handleClick} onMouseOver={handleMouseOver}>
        <Outlet />
      </main>
    </Fragment>
  );
};

export default SharedLayout;
