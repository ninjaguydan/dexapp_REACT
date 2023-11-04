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
    <div className="w-full">
      <div className="bg-gray2 w-full max-w-lg mt-8 mx-auto p-6 rounded-lg flex flex-col gap-y-3">
        <h1 className="text-3xl font-medium">Login</h1>
        <hr />
        {error && <p className="text-red-500">Email or password does not match our records</p>}
        <form
          onSubmit={(e) => onSubmit(e)}
          className="flex flex-col gap-y-3">
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
          <div className="flex flex-col gap-y-3 sm:flex-row gap-x-3">
            <button className="py-1 px-8 w-full rounded bg-primary text-white disabled:opacity-50 hover:bg-primaryDark">
              Log In
            </button>
            <Link
              to="/register"
              className="py-1 px-4 w-full rounded border border-solid hover:bg-gray3 text-center">
              Create New Account
            </Link>
          </div>
        </form>
      </div>
      <div className="mt-8 w-full text-center max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold">Welcome Back!</h2>
        <img
          src={pkmn_img as unknown as string}
          alt="pokemon trainer with 6 pokemon"
        />
      </div>
    </div>
  );
};

export default Login;
