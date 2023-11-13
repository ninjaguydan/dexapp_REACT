import { useRef, useState } from "react";
import { RootState } from "redux/store";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAppDispatch } from "hooks/hooks";

import FormInput from "components/common/forms/FormInput";

import Button from "components/modules/Button";
import FormRow from "components/modules/FormRow";

import pkmn_img from "media/pkmn.png";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const users = useSelector((state: RootState) => state.users);
  const [error, setError] = useState(false);
  const username: React.MutableRefObject<HTMLInputElement | undefined> = useRef();
  const password = useRef();
  const [creds, setCreds] = useState({
    username: "",
    password: "",
  });

  function handleChange(event: any) {
    setCreds({ ...creds, [event.target.id]: event.target.value });
  }

  function onSubmit(event: any) {
    event.preventDefault();
    // let logUser = users.filter((user) => user.username === username && user.password === password);
    // if (logUser[0]) {
    // console.log(username);
    // dispatch({
    //   type: "users/ON_LOGIN",
    //   logUser,
    // });
    // navigate("/dexapp_REACT");
    // } else {
    // setError(true);
    // }
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
          <FormRow>
            <FormRow.Text ref={username}>Username</FormRow.Text>
          </FormRow>
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
          <div className="flex flex-col items-center gap-y-3 sm:flex-row gap-x-3">
            <Button.Primary>Log In</Button.Primary>
            <Link
              to="/register"
              className="block w-full">
              <Button.Secondary>Create New Account</Button.Secondary>
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
