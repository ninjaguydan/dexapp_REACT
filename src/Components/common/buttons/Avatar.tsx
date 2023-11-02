import { Link } from "react-router-dom";
import getImageByKey from "utils/getImageByKey";

interface IAvatarProps {
  userImg: string;
  userName: string;
  userColor: string;
  mobileNav: string;
}

function Avatar({ userImg, userName, userColor, mobileNav }: IAvatarProps) {
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

export default Avatar;
