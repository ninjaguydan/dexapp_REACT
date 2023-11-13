//dependencies
import { createPortal } from "react-dom";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "hooks/hooks";

import Avatar from "../buttons/Avatar";

//utility
import dex_icon_w from "media/dex-icon-w.svg";
import { IUser } from "utils/Interfaces";

interface Props {
  data: {
    isOpen: boolean;
    user: IUser;
    closeMenu: () => void;
  };
}

const MobileMenu = ({ data: { isOpen, user, closeMenu } }: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  if (!isOpen) return <></>;

  const onLogout = () => {
    closeMenu();
    dispatch({ type: "users/ON_LOGOUT" });
    navigate("/login");
  };

  return createPortal(
    <div className="slider fixed z-[2] right-0 top-0 bg-gray1 border-l border-gray-500 border-solid rounded-l-lg w-4/5 h-full p-8 flex flex-col gap-y-4">
      <Avatar
        user={user}
        classList="w-20 h-20"
        clickAction={closeMenu}
      />
      <div>
        <p className="font-bold">{user.name}</p>
        <p className="text-gray3">{user.username}</p>
        <div className="flex gap-x-4">
          <p className="text-gray3">
            <span className="text-gray5 font-bold">0</span> Following
          </p>
          <p className="text-gray3">
            <span className="text-gray5 font-bold">0</span> Followers
          </p>
        </div>
      </div>

      <nav>
        <Link
          to={`/profile/${user.username}`}
          onClick={closeMenu}
          className="flex items-center gap-x-3 h-14 hover:text-secondary">
          <i className="material-icons">account_circle</i>Profile
        </Link>
        <Link
          to="/dexapp_REACT"
          onClick={closeMenu}
          className="flex items-center gap-x-3 h-14 hover:text-secondary">
          <img
            src={dex_icon_w as unknown as string}
            alt="dexapp icon"
            className="h-5 w-5"
          />{" "}
          Pokedex
        </Link>
        <Link
          to="/dexapp_REACT"
          onClick={closeMenu}
          className="flex items-center gap-x-3 h-14 hover:text-secondary">
          <i className="material-icons">home</i>Home
        </Link>
        <hr />
        <button
          onClick={() => onLogout()}
          className="flex items-center gap-x-3 h-14 hover:text-secondary w-full">
          Logout
        </button>
      </nav>
    </div>,
    document.body
  );
};

export default MobileMenu;
