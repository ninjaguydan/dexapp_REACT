import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import MenuBtn from "components/common/buttons/MenuBtn";
import DesktopNav from "components/common/navigation/DesktopNav";
import MobileMenu from "components/common/navigation/MobileMenu";

import useDeviceWidth from "hooks/useDeviceWidth";
import dex_logo_icon from "media/dex-icon-4c.svg";
import dex_logo_full from "media/dex-logo-w.svg";

const SiteHeader = () => {
  const currentUser = useSelector((state: any) => state.loggedUser);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [breakpoint] = useDeviceWidth();
  const LOGO: { [key: string]: any } = {
    MOBILE: dex_logo_icon,
    TABLET: dex_logo_icon,
    DESKTOP: dex_logo_full,
  };
  const menuBtnData = {
    isOpen: menuIsOpen,
    isVisible: !!currentUser.id,
    action: () => {
      setMenuIsOpen(!menuIsOpen);
    },
  };
  const menuData = {
    isOpen: menuIsOpen,
    user: currentUser,
    closeMenu: () => {
      setMenuIsOpen(false);
    },
  };

  return (
    <header className="flex justify-between items-center bg-gray2 p-4 sm:px-8 fixed w-full z-[1] border-b border-gray3 border-solid">
      <Link
        to="/dexapp_REACT"
        className="flex w-10 lg:w-40 h-10 lg:h-12">
        <img
          src={LOGO[breakpoint]}
          alt="dexapp logo"
          className={"w-full"}
        />
      </Link>
      {breakpoint === "MOBILE" ? (
        <>
          <MenuBtn data={menuBtnData} />
          <MobileMenu data={menuData} />
        </>
      ) : (
        <DesktopNav />
      )}
    </header>
  );
};

export default SiteHeader;
