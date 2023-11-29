// Comps
import { BrowserRouter as MyRouter, Route, Routes } from 'react-router-dom'

import MobileNav from 'components/common/navigation/MobileNav'
import SiteHeader from 'components/common/navigation/SiteHeader'
import PageNotFound from 'components/pages/error404/PageNotFound'
import Home from 'components/pages/home/Home'
//Pages
import Login from 'components/pages/login/Login'
import Register from 'components/pages/login/Register'
import PokemonProfile from 'components/pages/pokemon/PokemonProfile'
import UserProfile from 'components/pages/profile/UserProfile'
import Pokedex from 'components/pages/search/Pokedex'
import TeamProfile from 'components/pages/teams/TeamProfile'

import { ROOT_URL as ROOT } from 'api/urls'
import ScrolltoTop from 'hooks/ScrollToTop'

function App() {
	return (
		<MyRouter>
			<ScrolltoTop />
			<SiteHeader />
			<MobileNav />
			<main className="profile main mx-auto flex max-w-5xl flex-col items-center gap-x-4 py-24 lg:flex-row-reverse lg:items-start">
				<Routes>
					<Route index path={ROOT} element={<Home />} />
					<Route path={`${ROOT}/login`} element={<Login />} />
					<Route path={`${ROOT}/register`} element={<Register />} />
					<Route path={`${ROOT}/dex`} element={<Pokedex />} />
					<Route path={`${ROOT}/pokemon/:id`} element={<PokemonProfile />} />
					<Route path={`${ROOT}/profile/:username`} element={<UserProfile />} />
					<Route path={`${ROOT}/team/:teamName`} element={<TeamProfile />} />
					<Route path="*" element={<PageNotFound />} />
				</Routes>
			</main>
		</MyRouter>
	)
}

export default App
