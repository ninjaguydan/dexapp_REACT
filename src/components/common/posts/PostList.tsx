import Post from 'components/common/posts/Post'
import Card from 'components/modules/Card'

import { IPost } from 'utils/Interfaces'

import PostForm from './PostForm'

type Props = {
	posts: IPost[]
	currentUser: boolean
}
const PostList = ({ posts, currentUser = false }: Props) => {
	return (
		<>
			{currentUser ? (
				<PostForm
					btnText={'Post'}
					placeholder={`What's on your mind?`}
					type={{ name: 'POST' }}
				/>
			) : null}

			{posts.length !== 0 ? (
				<>
					{posts.map(post => {
						return <Post post={post} key={post.id} />
					})}
				</>
			) : (
				<Card>No posts yet!!</Card>
			)}
		</>
	)
}

export default PostList
