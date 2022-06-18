import getImageByKey from "../../Helpers/getImageByKey"

const ProfileIcon = ({ click, id, selected }) => {
	return (
		<button onClick={(event) => click(event)} type="button" className={`${selected && "selected"}`}>
			<img src={getImageByKey(`${id}`)} id={id} name="user_img" />
		</button>
	)
}

export default ProfileIcon
