import { Routes, Route, BrowserRouter as MyRouter } from "react-router-dom";

// Comps
import SiteHeader from "components/common/navigation/SiteHeader";
import MobileNav from "components/common/navigation/MobileNav";
import useDeviceWidth from "hooks/useDeviceWidth";

//Pages
import Login from "components/pages/login/Login";
import Register from "components/pages/login/Register";
import Home from "components/pages/home/Home";
import PokemonProfile from "components/pages/pokemon/PokemonProfile";
import UserProfile from "components/pages/profile/UserProfile";
import TeamProfile from "components/pages/teams/TeamProfile";
import Pokedex from "components/pages/search/Pokedex";
import PageNotFound from "components/pages/error404/PageNotFound";

import ScrolltoTop from "hooks/ScrollToTop";

function App() {
  const [breakpoint] = useDeviceWidth();

  return (
    <MyRouter>
      <ScrolltoTop />
      <SiteHeader />
      {breakpoint === "MOBILE" && <MobileNav />}
      <main className="py-24 profile main flex items-center flex-col gap-x-4 max-w-5xl mx-auto lg:flex-row-reverse lg:items-start">
        <Routes>
          <Route
            path="/dexapp_REACT"
            element={<Home />}
          />
          <Route
            path="/login"
            element={<Login />}
          />
          <Route
            path="/register"
            element={<Register />}
          />
          <Route
            path="/dex"
            element={<Pokedex />}
          />
          <Route
            path="/pokemon/:id"
            element={<PokemonProfile />}
          />
          <Route
            path="/profile/:username"
            element={<UserProfile />}
          />
          <Route
            path="/team/:teamName"
            element={<TeamProfile />}
          />
          <Route
            path="/not-found"
            element={<PageNotFound />}
          />
          <Route
            path="*"
            element={<PageNotFound />}
          />
        </Routes>
      </main>
    </MyRouter>
  );
}

export default App;
