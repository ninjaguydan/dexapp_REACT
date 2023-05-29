import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { IUser } from "../../Helpers/Interfaces";
import getImageByKey from "../../Helpers/getImageByKey";
import dex_icon_w from "../../media/dex-icon-w.svg";

interface IUserMobileMenuProps {
  user: IUser;
  openMenu: () => void;
}

const UserMenuMobile = ({ user, openMenu }: IUserMobileMenuProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    openMenu();
    dispatch({ type: "users/ON_LOGOUT" });
    navigate("/login");
  };

  return createPortal(
    <div className="mobile-nav-slider">
      <img
        src={getImageByKey(user.user_img)}
        alt="user"
        className={`user-img ${user.bg_color}`}
      />
      <p className="bold">{user.name}</p>
      <p className="username">{user.username}</p>

      <div className="follow-cnt">
        <p>
          <span className="bold">0</span> Following
        </p>
        <p>
          <span className="bold">0</span> Followers
        </p>
      </div>
      <nav>
        <ul>
          <li>
            <Link
              to={`/profile/${user.username}`}
              onClick={openMenu}>
              <i className="material-icons">account_circle</i>Profile
            </Link>
          </li>
          <li>
            <Link
              to="/dex"
              onClick={openMenu}>
              <img
                src={dex_icon_w as unknown as string}
                alt="dexapp icon"
              />{" "}
              Pokedex
            </Link>
          </li>
          <li>
            <Link
              to="/dexapp_REACT"
              onClick={openMenu}>
              <i className="material-icons">home</i>Home
            </Link>
          </li>
          <hr />
          <li>
            <button onClick={() => onLogout()}>Logout</button>
          </li>
        </ul>
      </nav>
    </div>,
    document.body
  );
};

export default UserMenuMobile;
