import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import UserIcon from "components/common/buttons/Avatar";
import SearchBtn from "components/common//buttons/SearchBtn";
import UserMenu from "components/common/navigation/UserMenu";
import { FaAngleDown } from "components/common/icons/index";

import { truncateStr } from "utils/Helpers";

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
          <NavLink to="/dexapp_REACT">Pokedex</NavLink>
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
