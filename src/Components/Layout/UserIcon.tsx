import { Link } from "react-router-dom";
import getImageByKey from "../../Helpers/getImageByKey";

interface IUserIconProps {
  userImg: string;
  userName: string;
  userColor: string;
  mobileNav: string;
}

function UserIcon({ userImg, userName, userColor, mobileNav }: IUserIconProps) {
  return (
    <Link to={`/profile/${userName}`}>
      <img
        src={getImageByKey(userImg)}
        alt={"user profile"}
        className={`${userColor} ${mobileNav}`}
      />
    </Link>
  );
}

export default UserIcon;
