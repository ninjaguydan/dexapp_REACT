import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import MenuBtn from "components/common/buttons/MenuBtn";
import DesktopNav from "components/common/navigation/DesktopNav";
import UserMenuMobile from "components/common/navigation/UserMenuMobile";

import useDeviceWidth from "hooks/useDeviceWidth";

const Header = () => {
  const currentUser = useSelector((state: any) => state.loggedUser);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [breakpoint] = useDeviceWidth();

  return (
    <header className="site-header">
      <Link
        to="/dexapp_REACT"
        className="header-logo"
      />

      {breakpoint !== "MOBILE" && <DesktopNav />}

      {breakpoint === "MOBILE" && !!currentUser.id && (
        <>
          <MenuBtn
            openMenu={() => {
              setMenuIsOpen(!menuIsOpen);
            }}
            menuIsOpen={menuIsOpen}
          />
          {menuIsOpen && (
            <UserMenuMobile
              user={currentUser}
              openMenu={() => {
                setMenuIsOpen(!menuIsOpen);
              }}
            />
          )}
        </>
      )}
    </header>
  );
};

export default Header;
