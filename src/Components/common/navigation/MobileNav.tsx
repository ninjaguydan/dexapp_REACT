//dependencies
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

//comps
import Avatar from "components/common/buttons/Avatar";
import dex_icon from "media/dex-icon-w.svg";
// import SearchBtn from "components/common/buttons/SearchBtn";

//utility
import { RootState } from "redux/store";

const MobileNav = () => {
  const currentUser = useSelector((state: RootState) => state.loggedUser);
  const avatar = {
    img: currentUser.user_img,
    name: currentUser.username,
    color: currentUser.bg_color,
    classList: "w-9",
  };

  return (
    <nav className="fixed flex items-center justify-around border-t border-solid border-gray1 bg-gray2 bottom-0 px-5 pb-8 pt-4 z-[1] w-full">
      {/* <SearchBtn /> */}
      <Link
        to="/dexapp_REACT"
        aria-label="home">
        <i
          className="material-icons text-4xl"
          aria-hidden="true">
          home
        </i>
      </Link>
      <Link
        to="/dexapp_REACT"
        aria-label="Pokemon Index">
        <img
          className="w-8"
          src={dex_icon as unknown as string}
          alt=""
          aria-hidden="true"
        />
      </Link>
      {!!currentUser.id ? (
        <Avatar user={avatar} />
      ) : (
        <Link
          to="/login"
          aria-label="Login or Signup">
          <i
            className="material-icons text-4xl"
            aria-hidden="true">
            account_circle
          </i>
        </Link>
      )}
    </nav>
  );
};

export default MobileNav;
