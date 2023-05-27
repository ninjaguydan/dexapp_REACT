import { Routes, Route, BrowserRouter as MyRouter } from "react-router-dom";

// Comps
import Header from "./Components/Layout/Header";
import MobileNav from "./Components/Layout/MobileNav";
import useDeviceWidth from "./CustomHooks/useDeviceWidth";

//Pages
import Login from "./Components/Pages/Login/Login";
import Register from "./Components/Pages/Login/Register";
import Home from "./Components/Pages/Home/Home";
import Pokemon from "./Components/Pages/Pokemon/Pokemon";
import User from "./Components/Pages/Profile/User";
import Pokedex from "./Components/Pages/Search/Pokedex";
import PageNotFound from "./Components/Pages/Error404/PageNotFound";

function App() {
  const [breakpoint] = useDeviceWidth();

  return (
    <MyRouter>
      <Header />
      {breakpoint === "MOBILE" && <MobileNav />}
      <div className="app-container">
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
            path="*"
            element={<PageNotFound />}
          />
        </Routes>
      </div>
    </MyRouter>
  );
}

export default App;
