import { Routes, Route, BrowserRouter as MyRouter } from "react-router-dom";

// Comps
import Header from "components/common/navigation/Header";
import MobileNav from "components/common/navigation/MobileNav";
import useDeviceWidth from "hooks/useDeviceWidth";

//Pages
import Login from "components/pages/login/Login";
import Register from "components/pages/login/Register";
import Home from "components/pages/home/Home";
import Pokemon from "components/pages/pokemon/Pokemon";
import User from "components/pages/profile/User";
import TeamSummary from "components/pages/teams/TeamSummary";
import Pokedex from "components/pages/search/Pokedex";
import PageNotFound from "components/pages/error404/PageNotFound";

function App() {
  const [breakpoint] = useDeviceWidth();

  return (
    <MyRouter>
      <Header />
      {breakpoint === "MOBILE" && <MobileNav />}
      <div className="py-24">
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
            element={<Pokemon />}
          />
          <Route
            path="/profile/:username"
            element={<User />}
          />
          <Route
            path="/team/:teamName"
            element={<TeamSummary />}
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
      </div>
    </MyRouter>
  );
}

export default App;
