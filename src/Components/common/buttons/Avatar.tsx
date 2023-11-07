import { Link } from "react-router-dom";
import getImageByKey from "utils/getImageByKey";

interface Props {
  user: { user_img: string; username: string; bg_color: string; [key: string]: any };
  classList?: string;
}

function Avatar({ user: { user_img, username, bg_color }, classList }: Props) {
  return (
    <Link
      to={`/profile/${username}`}
      className={classList}>
      <img
        src={getImageByKey(user_img)}
        alt={"user profile"}
        className={`${bg_color} rounded-full`}
      />
    </Link>
  );
}

export default Avatar;
