import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'

import PostList from 'components/common/posts/PostList'
import ReviewList from 'components/common/posts/ReviewList'
import TeamList from 'components/common/posts/TeamList'
import Card from 'components/modules/Card'
import UserSummary from 'components/pages/profile/UserSummary'

import { useAppSelector } from 'hooks/hooks'
import { selectCurrentUser } from 'redux/slices/authSlice'
import { makeSelectPostById } from 'redux/slices/postSlice'
import { selectReviewsByUser } from 'redux/slices/reviewSlice'
import { selectTeamsByCreator } from 'redux/slices/teamSlice'
import { IUser } from 'utils/Interfaces'

import ProfileTab from '../../common/buttons/ProfileTab'
import PageNotFound from '../error404/PageNotFound'

const UserProfile = () => {
	const { username } = useParams()
	const currentUser = useAppSelector(selectCurrentUser)
	const user = useAppSelector(state => state.users.filter(u => u.username === username)[0])
	const selectPosts = useMemo(makeSelectPostById, [])
	const posts = useAppSelector(state => selectPosts(state, user?.id))
	const reviews = useAppSelector(state => selectReviewsByUser(state, user.id))
	const teams = useAppSelector(state => selectTeamsByCreator(state, user.id))

	const [activeTab, setActiveTab] = useState<'Posts' | 'Reviews' | 'Teams'>('Posts')

	if (!user) return <PageNotFound />

	return (
		<div className="flex w-full flex-col gap-x-4 gap-y-4 sm:flex-row">
			<UserSummary user={user as IUser} />
			<div className="w-full">
				<div className="flex gap-1 sm:max-w-sm">
					<ProfileTab
						action={() => setActiveTab('Posts')}
						label="Posts"
						isActive={activeTab === 'Posts'}
					/>
					<ProfileTab
						action={() => setActiveTab('Reviews')}
						label="Reviews"
						isActive={activeTab === 'Reviews'}
					/>
					<ProfileTab
						action={() => setActiveTab('Teams')}
						label="Teams"
						isActive={activeTab === 'Teams'}
					/>
				</div>
				{activeTab === 'Posts' && (
					<PostList posts={posts} currentUser={currentUser.userInfo?.id === user.id} />
				)}
				{activeTab === 'Reviews' && (
					<>
						{reviews.length !== 0 ? (
							<ReviewList reviews={reviews} pkmnView={true} />
						) : (
							<Card>No reviews yet!!</Card>
						)}
					</>
				)}
				{activeTab === 'Teams' && <TeamList teams={teams} />}
			</div>
		</div>
	)
}

export default UserProfile
