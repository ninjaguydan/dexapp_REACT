import { Link } from "react-router-dom";
import useDeviceWidth from "hooks/useDeviceWidth";

import dex_logo_icon from "media/dex-icon-4c.svg";
import dex_logo_full from "media/dex-logo-w.svg";

export default function Logo() {
  const [breakpoint] = useDeviceWidth();
  const LOGO: { [key: string]: any } = {
    MOBILE: dex_logo_icon,
    TABLET: dex_logo_icon,
    DESKTOP: dex_logo_full,
  };
  return (
    <Link
      to="/dexapp_REACT"
      className="flex w-10 lg:w-40 h-10 lg:h-12">
      <img
        src={LOGO[breakpoint]}
        alt="dexapp logo"
        className={"w-full"}
      />
    </Link>
  );
}
