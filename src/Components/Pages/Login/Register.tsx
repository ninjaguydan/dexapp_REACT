//dependencies
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

//comps
import FormInput from "components/common/inputs/FormInput";

//utility
import { validator, checkIfValues, checkIfEmpty, confirmPasswordMatch } from "utils/Validator";
import { IRegistrationObject } from "utils/Interfaces";
import pk_ball from "media/pokeball.png";
import { RootState } from "redux/store";

const emptyForm = {
  name: "",
  username: "",
  password: "",
  confirm: "",
};

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state: RootState) => state.loggedUser);
  const [values, setValues] = useState<IRegistrationObject>(emptyForm);
  const [errors, setErrors] = useState(values);
  const handleChange = (event: any) => {
    setValues({ ...values, [event.target.id]: event.target.value });
  };

  useEffect(() => {
    if (!!currentUser.id) {
      navigate("/dexapp_REACT");
    }
  }, []);

  useEffect(() => {
    setErrors({ ...errors, ...validator(values), confirm: confirmPasswordMatch(values.confirm as string, values.password) });
  }, [values]);

  function onSubmit(event: any) {
    event.preventDefault();
    let newUser = {
      ...values,
      id: uuidv4(),
      user_img: "dfault",
      bg_color: "bg-black",
    };
    dispatch({
      type: "users/REGISTER",
      newUser,
    });
    navigate("/dexapp_REACT");
  }

  return (
    <div className="w-full lg:flex lg:gap-x-16">
      <div className="bg-gray2 w-full max-w-lg mt-8 mx-auto p-6 rounded-lg flex flex-col gap-y-3 lg:h-[fit-content]">
        <h1 className="text-3xl font-medium">Register</h1>
        <hr />
        <form
          onSubmit={(e) => onSubmit(e)}
          className="flex flex-col gap-y-3">
          <FormInput
            label="Name"
            name="name"
            type="text"
            value={values.name}
            handleChange={handleChange}
            error={errors.name}
          />
          <FormInput
            label="Username"
            name="username"
            type="text"
            value={values.username}
            handleChange={handleChange}
            error={errors.username}
          />
          <FormInput
            label="Password"
            name="password"
            type="password"
            value={values.password}
            handleChange={handleChange}
            error={errors.password}
          />
          <FormInput
            label="Confirm Password"
            name="confirm"
            type="password"
            value={values.confirm as string}
            handleChange={handleChange}
            error={errors.confirm as string}
          />
          <div className="flex flex-col gap-y-3 sm:flex-row gap-x-3">
            <button
              className="py-1 px-8 w-full rounded bg-primary text-white disabled:opacity-50 hover:bg-primaryDark"
              disabled={checkIfEmpty(errors) && checkIfValues(values) ? false : true}>
              Sign Up
            </button>
            <Link
              to="/login"
              className="py-1 px-4 w-full rounded border border-solid hover:bg-gray3 text-center">
              Log In
            </Link>
          </div>
        </form>
      </div>
      <div className="mt-8 mx-auto w-full text-center max-w-xl">
        <h2 className="text-3xl font-medium mb-8">
          Join a vast community of <span className="font-bold text-secondary">Pokemon Trainers</span> from all over the
          world!
        </h2>
        <img
          src={pk_ball}
          alt="7 Pokeballs bunched together"
        />
      </div>
    </div>
  );
};

export default Register;
