import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import Avatar from "components/common/buttons/Avatar";
import SearchBtn from "components/common//buttons/SearchBtn";
import DesktopMenu from "components/common/navigation/DesktopMenu";
import { FaAngleDown } from "components/common/icons/index";

import { truncateStr } from "utils/Helpers";

const DesktopNav = () => {
  const user = useSelector((state: any) => state.loggedUser);
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);

  let menuNode = !!user.id ? (
    <div className="nav-user-desk flex items-center gap-x-1">
      <Avatar
        user={user}
        classList="w-9 relative"
      />
      <button
        className="flex items-center gap-x-2 px-3 py-1 hover:text-secondary"
        onClick={() => setDropdownIsOpen(!dropdownIsOpen)}>
        {truncateStr(user.username)}
        <FaAngleDown />
      </button>
      {dropdownIsOpen && (
        <DesktopMenu
          username={user.username}
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
