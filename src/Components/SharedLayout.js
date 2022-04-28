import React from "react";
import Navbar from "../Components/Navbar";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeHover } from "../features/homePageFunc/homePageFuncSlice";
import { removeActive } from "../features/homePageFunc/homePageFuncSlice";

const SharedLayout = () => {
  const dispatch = useDispatch();
  const { isHover, isActive } = useSelector((store) => store.homePageFunc);

  const handleClick = (e) => {
    if (
      !e.target.closest(".countries__container") &&
      !e.target.closest(".selected__country") &&
      isHover &&
      isActive
    ) {
      dispatch(removeHover());
      dispatch(removeActive());
    }
  };

  const handleMouseOver = (e) => {
    if (
      !e.target.closest(".countries__container") &&
      !e.target.closest(".selected__country") &&
      isHover &&
      !isActive
    ) {
      dispatch(removeHover());
    }
  };

  return (
    <>
      <Navbar />
      <main onClick={handleClick} onMouseOver={handleMouseOver}>
        <Outlet />
      </main>
    </>
  );
};

export default SharedLayout;
