import { useSelector } from "react-redux";

import ReplyCard from "components/common/posts/ReplyCard";
import PostForm from "components/common/posts/PostForm";

import { IReply } from "utils/Interfaces";
import { RootState } from "redux/store";

interface IReplyListProps {
  replies: IReply[];
  user: string;
  kind: { name: string; id: string | number };
}

function ReplyList({ replies, user, kind }: IReplyListProps) {
  const currentUser = useSelector((state: RootState) => state.loggedUser);
  return (
    <>
      {replies.map((reply) => {
        return (
          <ReplyCard
            reply={reply}
            key={reply.id}
          />
        );
      })}
      {!!currentUser.id && (
        <PostForm
          btnText={"Reply"}
          placeholder={`Replying to ${user}...`}
          type={{ name: "REPLY", for: { name: kind.name, id: kind.id } }}
          classList={"first:mt-2 first:sm:mt-4 !bg-gray1"}
        />
      )}
    </>
  );
}

export default ReplyList;