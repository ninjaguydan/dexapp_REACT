import { Link } from "react-router-dom"
import DesktopNav from "./DesktopNav"

const Header = ({ searchBtn, openDrop }) => {
	return (
		<header className="site-header">
			<Link to="/" className="header-logo" />
			<DesktopNav searchBtn={searchBtn} openDrop={openDrop} />
		</header>
	)
}

export default Header
