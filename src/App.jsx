import { useState } from "react"
import { Routes, Route, BrowserRouter as MyRouter } from "react-router-dom"
import { useSelector } from "react-redux"
// Comps
import Header from "./Components/Navigation/Header"
import MobileNav from "./Components/Navigation/MobileNav"
import SearchBtn from "./Components/Buttons/SearchBtn"
import SearchBar from "./Components/Forms/SearchBar"
import MenuBtn from "./Components/Buttons/MenuBtn"
import UserMenuMobile from "./Components/Navigation/UserMenuMobile"
import Login from "./Components/Pages/Login/Login"
import Home from "./Components/Pages/Home/Home"
import Register from "./Components/Pages/Login/Register"
import Pokemon from "./Components/Pages/Pokemon/Pokemon"
import Pokedex from "./Components/Pages/Search/Pokedex"
import User from "./Components/Pages/Profile/User"
import UserMenu from "./Components/Navigation/UserMenu"
import PageNotFound from "./Components/Pages/Error404/PageNotFound"

function App() {
	const loggedUser = useSelector((state) => state.loggedUser)
	const [showSearchBar, setShowSearchBar] = useState(false)
	const [menuIsOpen, setMenuIsOpen] = useState(false)
	const [dropdownIsOpen, setDropdownIsOpen] = useState(false)
	const searchBtn = <SearchBtn toggleSearch={() => setShowSearchBar(!showSearchBar)} />

	return (
		<MyRouter>
			{dropdownIsOpen && loggedUser ? <UserMenu username={loggedUser.username} openDrop={() => setDropdownIsOpen(!dropdownIsOpen)} /> : null}
			<Header openDrop={() => setDropdownIsOpen(!dropdownIsOpen)} />
			{/* <SearchBar show={showSearchBar} /> */}
			{loggedUser && <MenuBtn openMenu={() => setMenuIsOpen(!menuIsOpen)} menuIsOpen={menuIsOpen} />}
			{menuIsOpen && loggedUser ? <UserMenuMobile user={loggedUser} openMenu={() => setMenuIsOpen(!menuIsOpen)} /> : null}
			<MobileNav searchBtn={searchBtn} />
			<div className="app-container">
				<Routes>
					<Route path="/dexapp_REACT" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/dex" element={<Pokedex />} />
					<Route path="/pokemon/:id" element={<Pokemon />} />
					<Route path="/profile/:username" element={<User />} />
					<Route path="*" element={<PageNotFound />} />
				</Routes>
			</div>
		</MyRouter>
	)
}

export default App
