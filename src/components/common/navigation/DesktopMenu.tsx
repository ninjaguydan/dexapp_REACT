import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "hooks/hooks";

interface IDesktopMenu {
  username: string;
  openDrop: () => void;
}

const DesktopMenu = ({ username, openDrop }: IDesktopMenu) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    openDrop();
    dispatch({ type: "users/ON_LOGOUT" });
    navigate("/login");
  };
  return (
    <ul className=" fixed top-16 right-4 shadow-sm bg-gray1 py-2 min-w-[10rem] text-left rounded-md">
      <li>
        <Link
          className="w-full flex items-center gap-x-2 px-4 py-2 hover:bg-gray2"
          to={`/profile/${username}`}
          onClick={openDrop}>
          <i className="material-icons">account_circle</i>Profile
        </Link>
      </li>
      {/* <li>
				<Link className="dropdown-item" to="" onClick={openDrop}>
					<img classNameName="dex-icon nav-icon" src={dex_icon} alt="" /> Teams
				</Link>
			</li> */}
      <li>
        <button
          className="flex items-center px-4 py-2 hover:text-secondary hover:bg-gray2 w-full"
          onClick={() => onLogout()}>
          Logout
        </button>
      </li>
    </ul>
  );
};

export default DesktopMenu;
