//dependencies
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//comps
import FormInput from "components/common/inputs/FormInput";

//utility
import pkmn_img from "media/pkmn.png";
import { RootState } from "redux/store";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state: RootState) => state.users);
  const [creds, setCreds] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const handleChange = (event: any) => {
    setCreds({ ...creds, [event.target.id]: event.target.value });
  };
  function onSubmit(event: any) {
    event.preventDefault();
    let logUser = users.filter((user) => user.username === creds.username && user.password === creds.password);
    if (logUser[0]) {
      dispatch({
        type: "users/ON_LOGIN",
        logUser,
      });
      navigate("/dexapp_REACT");
    } else {
      setError(true);
    }
  }
  return (
    <div className="log-res-wrapper">
      <div className="login-registration">
        <h2 className="header1">Login</h2>
        <hr />
        {error && <strong className="error">Email or password does not match our records</strong>}
        <form onSubmit={(e) => onSubmit(e)}>
          <FormInput
            label="Username"
            name="username"
            value={creds.username}
            handleChange={handleChange}
            type="text"
            error={""}
          />
          <FormInput
            label="Password"
            name="password"
            value={creds.password}
            handleChange={handleChange}
            type="password"
            error={""}
          />
          <div className="btn-container">
            <button className="btn primary">Log In</button>
            <Link
              to="/register"
              className="btn secondary">
              Create New Account
            </Link>
          </div>
        </form>
      </div>
      <div className="tag-line">
        <h2 className="header1">Welcome Back!</h2>
        <img
          src={pkmn_img as unknown as string}
          alt="pokemon trainer with 6 pokemon"
        />
      </div>
    </div>
  );
};

export default Login;
