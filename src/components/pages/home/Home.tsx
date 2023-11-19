//comps
import PostForm from 'components/common/posts/PostForm'
import Timeline from 'components/pages/home/Timeline'
import TopTenList from 'components/pages/home/TopTenList'

import { useAppSelector } from 'hooks/hooks'
import { selectCurrentUser } from 'redux/slices/authSlice'

const Home = () => {
	const currentUser = useAppSelector(selectCurrentUser)
	return (
		<>
			<TopTenList />
			<div className="post-column main w-full max-w-2xl lg:max-w-none">
				{currentUser.userInfo && (
					<PostForm
						btnText={'Post'}
						placeholder={"What's on your mind?"}
						type={{ name: 'POST' }}
					/>
				)}
				<Timeline />
			</div>
		</>
	)
}

export default Home
