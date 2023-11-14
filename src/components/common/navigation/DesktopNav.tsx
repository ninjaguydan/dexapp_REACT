import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "hooks/hooks";
import { selectCurrentUser } from "redux/slices/authSlice";

import Avatar from "components/common/buttons/Avatar";
import SearchBtn from "components/common//buttons/SearchBtn";
import DesktopMenu from "components/common/navigation/DesktopMenu";
import { FaAngleDown } from "components/common/icons/index";

import { truncateStr } from "utils/Helpers";
import useDeviceWidth from "hooks/useDeviceWidth";

const DesktopNav = () => {
  const currentUser = useAppSelector(selectCurrentUser);
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const [breakpoint] = useDeviceWidth();

  if (breakpoint === "MOBILE") return <></>;

  console.count("Desktop Nav counter");

  let menuNode = !!currentUser.userToken ? (
    <div className="nav-user-desk flex items-center gap-x-1">
      <Avatar
        user={currentUser.userInfo}
        classList="w-9 relative"
      />
      <button
        className="flex items-center gap-x-2 px-3 py-1 hover:text-secondary"
        onClick={() => setDropdownIsOpen(!dropdownIsOpen)}>
        {truncateStr(currentUser.userInfo.username)}
        <FaAngleDown />
      </button>
      {dropdownIsOpen && (
        <DesktopMenu
          username={currentUser.userInfo.username}
          openDrop={() => setDropdownIsOpen(!dropdownIsOpen)}
        />
      )}
    </div>
  ) : (
    <>
      <NavLink
        to="/register"
        className={"hover:text-secondary font-bold"}>
        Sign Up
      </NavLink>

      <NavLink
        to="/login"
        className={"hover:text-secondary font-bold"}>
        Login
      </NavLink>
    </>
  );

  return (
    <nav className="flex justify-between items-center w-[400px]">
      <SearchBtn />

      <NavLink
        to="/dexapp_REACT"
        className={"hover:text-secondary"}>
        Home
      </NavLink>

      <NavLink
        to="/dexapp_REACT"
        className={"hover:text-secondary"}>
        Pokedex
      </NavLink>

      {menuNode}
    </nav>
  );
};

export default DesktopNav;
