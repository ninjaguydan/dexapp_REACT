import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { IReply, IReview } from "utils/Interfaces";
import { RootState } from "redux/store";
import getImageByKey from "utils/getImageByKey";

interface IPostFormProps {
  btnText: string;
  placeholder: string;
  type: { name: string; [key: string]: any };
}
const empty = {
  content: "",
  rating: 1,
};

function PostForm({ btnText, placeholder, type }: IPostFormProps) {
  const [counter, setCounter] = useState(0);
  const [formData, setFormData] = useState(empty);
  const currentUser = useSelector((state: RootState) => state.loggedUser);
  const dispatch = useDispatch();

  function setValue(event: any) {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  }
  function enableButton() {
    if (counter > 1 && counter < 141) {
      return true;
    } else {
      return false;
    }
  }

  useEffect(() => {
    setCounter(formData.content.length);
  }, [formData.content]);

  function onSubmit(event: any) {
    event.preventDefault();
    let newPost = {
      id: uuidv4(),
      content: formData.content,
      created: new Date().getTime(),
      added_by: currentUser.id,
      likes: [],
    };
    switch (type.name) {
      case "REVIEW":
        let newReview: IReview = {
          ...newPost,
          rating: formData.rating,
          pkmn: type.id,
        };
        dispatch({ type: "review/CREATE", newReview });
        break;
      case "REPLY":
        let newReply: IReply = {
          ...newPost,
          forId: type.for.id,
          for: "",
        };
        switch (type.for.name) {
          case "review":
            newReply["for"] = "review";
            break;
          case "team":
            newReply["for"] = "team";
            break;
          default:
            newReply["for"] = "post";
        }
        dispatch({ type: "reply/CREATE", newReply });
        break;
      default:
        dispatch({ type: "post/CREATE", newPost });
    }
    setFormData(empty);
  }

  return (
    <div className="card">
      <img
        src={getImageByKey(currentUser.user_img)}
        alt={"user"}
        className={`${currentUser.bg_color} form-img`}
      />
      <form onSubmit={(e) => onSubmit(e)}>
        <textarea
          onChange={(e) => setValue(e)}
          value={formData.content}
          id="content"
          className="form-control form-control-custom"
          rows={2}
          placeholder={placeholder}></textarea>
        {type.name === "REVIEW" && (
          <select
            className="form-control-custom"
            id="rating"
            value={formData.rating}
            onChange={(e) => setValue(e)}>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
            <option>9</option>
            <option>10</option>
          </select>
        )}
        <button
          className="btn primary"
          disabled={enableButton() ? false : true}>
          {btnText}
        </button>
        <span className={`counter ${counter > 140 && "error"} ${counter > 100 && "caution"}`}>{counter}/140</span>
      </form>
    </div>
  );
}

export default PostForm;
