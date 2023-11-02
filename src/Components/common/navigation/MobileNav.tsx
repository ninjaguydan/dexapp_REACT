//dependencies
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

//comps
import UserIcon from "components/common/buttons/Avatar";
import dex_icon from "media/dex-icon-w.svg";
// import SearchBtn from "components/common/buttons/SearchBtn";

//utility
import { RootState } from "redux/store";

const MobileNav = () => {
  const currentUser = useSelector((state: RootState) => state.loggedUser);

  return (
    <nav>
      <ul className="mobile-nav">
        {/* <li>
          <SearchBtn />
        </li> */}
        <li>
          <Link to="/dexapp_REACT">
            <i
              className="material-icons"
              aria-hidden="true">
              home
            </i>
            <span className="sr-only">home</span>
          </Link>
        </li>
        <li>
          <Link to="/dexapp_REACT">
            <img
              className="dex-icon nav-icon"
              src={dex_icon as unknown as string}
              alt=""
              aria-hidden="true"
            />
            <span className="sr-only">pokemon index</span>
          </Link>
        </li>
        <li>
          {!!currentUser.id ? (
            <UserIcon
              userImg={currentUser.user_img}
              userName={currentUser.username}
              userColor={currentUser.bg_color}
              mobileNav={"nav-user-icon"}
            />
          ) : (
            <Link to="/login">
              <i
                className="material-icons"
                aria-hidden="true">
                account_circle
              </i>
              <span className="sr-only">login or signup</span>
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default MobileNav;
