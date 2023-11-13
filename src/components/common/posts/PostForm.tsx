import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "hooks/hooks";
import { selectCurrentUser } from "redux/slices/authSlice";

import Avatar from "components/common/buttons/Avatar";

import Card from "components/modules/Card";
import Button from "components/modules/Button";

import { IReply, IReview } from "utils/Interfaces";

interface Props {
  btnText: string;
  placeholder: string;
  type: { name: string; [key: string]: any };
  classList?: string;
}

const empty = {
  content: "",
  rating: 1,
};

function enableButton(count: number) {
  if (count > 1 && count < 141) {
    return true;
  } else {
    return false;
  }
}

function PostForm({ btnText, placeholder, type, classList }: Props) {
  const dispatch = useAppDispatch();
  const [counter, setCounter] = useState(0);
  const [formData, setFormData] = useState(empty);
  const currentUser = useAppSelector(selectCurrentUser);

  function setValue(event: any) {
    setFormData({ ...formData, [event.target.id]: event.target.value });
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
      added_by: currentUser.userInfo.id,
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
    <Card classList={classList}>
      <Avatar
        user={currentUser.userInfo}
        classList="hidden sm:block h-16 w-16"
      />
      <form
        onSubmit={(e) => onSubmit(e)}
        className="w-full flex flex-col flex-1 gap-y-4">
        <textarea
          onChange={(e) => setValue(e)}
          value={formData.content}
          id="content"
          className="text-gray5 bg-[unset] border-b boerder-solid border-gray4 rounded outline-none focus:shadow-focus"
          rows={2}
          placeholder={placeholder}></textarea>
        <div className="flex  justify-between">
          {type.name === "REVIEW" && (
            <select
              className="text-gray5 bg-[unset] border-b boerder-solid border-gray4 rounded w-12 outline-none focus:shadow-focus"
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
          <div className="flex items-center gap-x-3 ml-auto">
            <span
              className={`text-xs text-gray-500 ${counter > 100 && counter < 141 ? "text-yellowLight" : ""} ${
                counter > 140 && "text-primary"
              } `}>
              {counter}/140
            </span>
            <Button.Primary
              isDisabled={enableButton(counter) ? false : true}
              classList="!px-8">
              {btnText}
            </Button.Primary>
          </div>
        </div>
      </form>
    </Card>
  );
}

export default PostForm;
