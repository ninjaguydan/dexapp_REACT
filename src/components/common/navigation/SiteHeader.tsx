import { useState } from "react";
import { useAppSelector } from "hooks/hooks";
import { selectCurrentUser } from "redux/slices/authSlice";

import MenuBtn from "components/common/buttons/MenuBtn";
import Logo from "components/common/buttons/Logo";
import DesktopNav from "components/common/navigation/DesktopNav";
import MobileMenu from "components/common/navigation/MobileMenu";

const SiteHeader = () => {
  const currentUser = useAppSelector(selectCurrentUser);
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const menuBtnData = {
    isOpen: menuIsOpen,
    isVisible: !!currentUser.userToken,
    action: () => {
      setMenuIsOpen(!menuIsOpen);
    },
  };
  const menuData = {
    isOpen: menuIsOpen,
    user: currentUser.userInfo,
    closeMenu: () => {
      setMenuIsOpen(false);
    },
  };
  console.count("Site Header counter");

  return (
    <header className="flex justify-between items-center bg-gray2 p-4 sm:px-8 fixed w-full z-[1] border-b border-gray3 border-solid">
      <Logo />
      <MenuBtn data={menuBtnData} />
      <MobileMenu data={menuData} />
      <DesktopNav />
    </header>
  );
};

export default SiteHeader;
