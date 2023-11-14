//dependencies
import { Link } from "react-router-dom";
import { useAppSelector } from "hooks/hooks";
import { selectCurrentUser } from "redux/slices/authSlice";
import useDeviceWidth from "hooks/useDeviceWidth";

//comps
import Avatar from "components/common/buttons/Avatar";
import dex_icon from "media/dex-icon-w.svg";
// import SearchBtn from "components/common/buttons/SearchBtn";

export default function MobileNav() {
  const currentUser = useAppSelector(selectCurrentUser).userInfo;
  const [breakpoint] = useDeviceWidth();

  if (breakpoint !== "MOBILE") return <></>;

  return (
    <nav className="fixed flex items-center justify-around border-t border-solid border-gray3 bg-gray2 bottom-0 px-5 pb-6 pt-2 z-[1] w-full">
      {/* <SearchBtn /> */}
      <Link
        to="/dexapp_REACT"
        aria-label="home">
        <i
          className="material-icons text-3xl"
          aria-hidden="true">
          home
        </i>
      </Link>
      <Link
        to="/dexapp_REACT"
        aria-label="Pokemon Index">
        <img
          className="w-6"
          src={dex_icon as unknown as string}
          alt=""
          aria-hidden="true"
        />
      </Link>
      {!!currentUser.id ? (
        <Avatar
          user={currentUser}
          classList="w-7"
        />
      ) : (
        <Link
          to="/login"
          aria-label="Login or Signup">
          <i
            className="material-icons text-3xl"
            aria-hidden="true">
            account_circle
          </i>
        </Link>
      )}
    </nav>
  );
}
