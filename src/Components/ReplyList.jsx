import Reply from "./Reply"
import PostForm from "./Forms/PostForm"
import { useSelector } from "react-redux"

function ReplyList({ replies, user, kind }) {
	const loggedUser = useSelector((state) => state.loggedUser)
	return (
		<>
			{replies.map((reply) => {
				return <Reply reply={reply} key={reply.id} />
			})}
			{loggedUser && (
				<PostForm btnText={"Reply"} placeholder={`Replying to ${user}...`} type={{ name: "REPLY", for: { name: kind.name, id: kind.id } }} />
			)}
		</>
	)
}

export default ReplyList
