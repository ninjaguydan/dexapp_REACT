import { Link } from "react-router-dom";
import getImageByKey from "utils/getImageByKey";

interface Props {
  user: { img: string; name: string; color: string; classList?: string };
}

function Avatar({ user: { img, name, color, classList } }: Props) {
  return (
    <Link
      to={`/profile/${name}`}
      className={classList}>
      <img
        src={getImageByKey(img)}
        alt={"user profile"}
        className={`${color} rounded-full`}
      />
    </Link>
  );
}

export default Avatar;
