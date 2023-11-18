import PostForm from 'components/common/posts/PostForm'
import ReplyCard from 'components/common/posts/ReplyCard'

import { useAppSelector } from 'hooks/hooks'
import { selectCurrentUser } from 'redux/slices/authSlice'
import { IReply } from 'utils/Interfaces'

interface IReplyListProps {
	replies: IReply[]
	user: string
	kind: { name: string; id: string | number }
}

function ReplyList({ replies, user, kind }: IReplyListProps) {
	const currentUser = useAppSelector(selectCurrentUser)
	return (
		<>
			{replies.map(reply => {
				return <ReplyCard reply={reply} key={reply.id} />
			})}
			{!!currentUser.userToken && (
				<PostForm
					btnText={'Reply'}
					placeholder={`Replying to ${user}...`}
					type={{ name: 'REPLY', for: { name: kind.name, id: kind.id } }}
					classList={'first:mt-2 first:sm:mt-4 !bg-gray1'}
				/>
			)}
		</>
	)
}

export default ReplyList
