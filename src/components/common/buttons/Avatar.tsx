import { Link } from 'react-router-dom'

import { ROOT_URL } from 'api/urls'
import getImageByKey from 'utils/getImageByKey'

interface Props {
	user: { user_img: string; username: string; bg_color: string; [key: string]: any }
	classList?: string
	clickAction?: () => void
}

function Avatar({ user: { user_img, username, bg_color }, classList, clickAction }: Props) {
	return (
		<Link to={`/${ROOT_URL}/profile/${username}`} className={classList} onClick={clickAction}>
			<img
				src={getImageByKey(user_img)}
				alt={'user profile'}
				className={`${bg_color} rounded-full`}
			/>
		</Link>
	)
}

export default Avatar
