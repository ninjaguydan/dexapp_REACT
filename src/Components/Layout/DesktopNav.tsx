import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import UserIcon from "./UserIcon";
import UserMenu from "./UserMenu";
import SearchBtn from "../Buttons/SearchBtn";

import { FaAngleDown } from "react-icons/fa";
import { truncateStr } from "../../Helpers/Helpers";

const DesktopNav = () => {
  const user = useSelector((state: any) => state.loggedUser);
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);

  return (
    <nav>
      <ul className="main-nav">
        {/* <li>
          <SearchBtn />
        </li> */}
        <li>
          <NavLink to="/dexapp_REACT">Home</NavLink>
        </li>
        <li>
          <NavLink to="/dex">Pokedex</NavLink>
        </li>
        {user.id ? (
          <li className="nav-user-desk">
            <UserIcon
              userImg={user.user_img}
              userName={user.username}
              userColor={user.bg_color}
              mobileNav={"nav-user-icon"}
            />
            <button
              className="btn"
              onClick={() => setDropdownIsOpen(!dropdownIsOpen)}>
              {truncateStr(user.username)}
              <FaAngleDown />
            </button>
            {dropdownIsOpen && (
              <UserMenu
                username={user.username}
                openDrop={() => setDropdownIsOpen(!dropdownIsOpen)}
              />
            )}
          </li>
        ) : (
          <>
            <li className="bold">
              <NavLink to="/register">Sign Up</NavLink>
            </li>
            <li className="bold">
              <NavLink to="/login">Login</NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default DesktopNav;
