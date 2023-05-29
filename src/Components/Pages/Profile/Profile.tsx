import { useSelector } from "react-redux";

import getImageByKey from "../../../Helpers/getImageByKey";

import { RootState } from "../../../Redux/store";
import { IUser } from "../../../Helpers/Interfaces";

interface IProfileProps {
  user: IUser;
  openEdit: () => void;
}

function Profile({ user, openEdit }: IProfileProps) {
  const postCnt = useSelector((state: RootState) => state.posts.filter((post) => post.added_by === user.id).length);
  const reviewCnt = useSelector((state: RootState) => state.reviews.filter((review) => review.added_by === user.id).length);
  const currentUser = useSelector((state: RootState) => state.loggedUser);

  return (
    <ul className="card">
      <li className="list-group-item">
        <h2 className="header1">{user.name}</h2>
        <p>{user.username}</p>
        <img
          src={getImageByKey(user.user_img)}
          alt={"user profile"}
          className={`${user.bg_color} main-img user-img`}
        />
        {user?.bio && <p className="bio">{user.bio}</p>}
        <div className="followcnt-group">
          <p>
            <span>0 </span>
            Following
          </p>
          <p>
            <span>0 </span>
            Followers
          </p>
        </div>
      </li>
      {currentUser?.id === user.id && (
        <li className="list-group-item striped edit-btn">
          <button
            onClick={openEdit}
            className="btn secondary">
            Edit Profile
          </button>
        </li>
      )}
      {user?.location && (
        <li className="list-group-item striped">
          <p className="bold">Location</p>
          <span>{user.location}</span>
        </li>
      )}
      {user?.pronouns && (
        <li className="list-group-item striped">
          <p className="bold">Pronouns</p>
          <span>He/Him</span>
        </li>
      )}
      <li className="list-group-item striped">
        <p className="bold">Joined</p>
        <span>June 2022</span>
      </li>
      <li className="list-group-item striped">
        <p className="bold">Posts</p>
        <span>{postCnt}</span>
      </li>
      <li className="list-group-item striped">
        <p className="bold">Reviews</p>
        <span>{reviewCnt}</span>
      </li>
      <li className="list-group-item striped">
        <p className="bold">Favorites</p>
        <span>0</span>
      </li>
      <li className="list-group-item striped">
        <p className="bold">Teams</p>
        <span>0</span>
      </li>
    </ul>
  );
}

export default Profile;
