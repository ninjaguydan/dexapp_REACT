import Post from "./Post"

const PostList = ({ posts }) => {
	return (
		<>
			{posts.map((post) => {
				return <Post post={post} key={post.id} />
			})}
		</>
	)
}

export default PostList
