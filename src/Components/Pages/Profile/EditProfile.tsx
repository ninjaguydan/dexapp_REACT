import React from "react";
import { RootState } from "redux/store";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import SelectAvatar from "components/common/buttons/SelectAvatar";
import SelectColor from "components/common/buttons/SelectColor";
import FormInput from "components/common/inputs/FormInput";

interface IEditProfileProps {
  closeEdit: () => void;
}
interface initForm {
  name: string;
  location: string;
  bio: string;
  user_img: string;
  bg_color: string;
}
const avatarOptions = ["m1", "m4", "m2", "m3", "f1", "f4", "f2", "f3"];
const colorOptions = ["gray", "red", "blue", "green", "yellow", "purple"];
function clickIcon(event: any, state: initForm, action: React.Dispatch<React.SetStateAction<initForm>>) {
  switch (event.target.tagName) {
    case "BUTTON": //when clicked with keyboard "ENTER"
      action({
        ...state,
        [event.target.children[0].name]: event.target.children[0].id,
      });
      break;
    default: // when clicked with mouse
      action({
        ...state,
        [event.target.name]: event.target.id,
      });
  }
}
function clickColor(event: any, state: initForm, action: React.Dispatch<React.SetStateAction<initForm>>) {
  action({
    ...state,
    [event.target.name]: event.target.id,
  });
}
function handleChange(event: any, state: initForm, action: React.Dispatch<React.SetStateAction<initForm>>) {
  action({
    ...state,
    [event.target.id]: event.target.value,
  });
}

function EditProfile({ closeEdit }: IEditProfileProps) {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.loggedUser);
  const [formData, setFormData] = useState<initForm>({
    name: user.name,
    location: user?.location,
    bio: user?.bio,
    user_img: user.user_img,
    bg_color: user.bg_color,
  });

  function updateProfile(event: any) {
    event.preventDefault();
    closeEdit();
    dispatch({ type: "users/UPDATE", formData, userId: user.id });
  }

  return (
    <div className="modal-bg">
      <div className="edit-profile-modal">
        <div className="modal-head">
          <h2 className="header1">Edit Profile</h2>
          <button
            onClick={closeEdit}
            className="close">
            &#10005;
          </button>
        </div>
        <hr />
        <form onSubmit={(e) => updateProfile(e)}>
          <FormInput
            name="name"
            label="Name"
            value={formData.name}
            error={""}
            type="text"
            handleChange={(e) => handleChange(e, formData, setFormData)}
          />
          <FormInput
            name="location"
            label="Location"
            value={formData.location || ""}
            error={""}
            type="text"
            handleChange={(e) => handleChange(e, formData, setFormData)}
          />
          <FormInput
            name="bio"
            label="Bio"
            type="textArea"
            value={formData.bio || ""}
            error={""}
            handleChange={(e) => handleChange(e, formData, setFormData)}
          />
          <hr />
          <h3>Choose profile photo</h3>
          <div className="img-container">
            {avatarOptions.map((option) => (
              <SelectAvatar
                key={option}
                click={(e) => clickIcon(e, formData, setFormData)}
                id={option}
                selected={formData.user_img === option}
              />
            ))}
          </div>
          <hr />
          <h3>Choose background color</h3>
          <div className="img-container colors">
            {colorOptions.map((option) => (
              <SelectColor
                color={option}
                click={(e) => clickColor(e, formData, setFormData)}
                selected={formData.bg_color === option}
              />
            ))}
          </div>
          <hr />
          <br />
          <button className="btn primary">Update</button>
        </form>
        <button className="btn secondary btn-del">Delete Profile</button>
      </div>
    </div>
  );
}

export default EditProfile;
