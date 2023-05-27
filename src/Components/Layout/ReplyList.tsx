import { useSelector } from "react-redux";

import Reply from "./Reply";
import PostForm from "../Forms/PostForm";

import { IReply } from "../../Helpers/Interfaces";
import { RootState } from "../../Redux/store";

interface IReplyListProps {
  replies: IReply[];
  user: string;
  kind: { name: string; id: string | number };
}

function ReplyList({ replies, user, kind }: IReplyListProps) {
  const loggedUser = useSelector((state: RootState) => state.loggedUser);
  return (
    <>
      {replies.map((reply) => {
        return (
          <Reply
            reply={reply}
            key={reply.id}
          />
        );
      })}
      {loggedUser && (
        <PostForm
          btnText={"Reply"}
          placeholder={`Replying to ${user}...`}
          type={{ name: "REPLY", for: { name: kind.name, id: kind.id } }}
        />
      )}
    </>
  );
}

export default ReplyList;
