import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import Avatar from "components/common/buttons/Avatar";
import SearchBtn from "components/common//buttons/SearchBtn";
import UserMenu from "components/common/navigation/UserMenu";
import { FaAngleDown } from "components/common/icons/index";

import { truncateStr } from "utils/Helpers";

const DesktopNav = () => {
  const user = useSelector((state: any) => state.loggedUser);
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const avatar = {
    img: user.user_img,
    name: user.username,
    color: user.bg_color,
    classList: "w-9 relative top-1",
  };

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
          <NavLink to="/dexapp_REACT">Pokedex</NavLink>
        </li>
        {user.id ? (
          <li className="nav-user-desk">
            <Avatar user={avatar} />
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
