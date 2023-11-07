import { useSelector } from "react-redux";
import { RootState } from "redux/store";

import Avatar from "components/common/buttons/Avatar";
import Btn from "components/common/buttons/Btn";

import { IUser } from "utils/Interfaces";

interface Props {
  user: IUser;
  openEdit: () => void;
}

function UserSummary({ user, openEdit }: Props) {
  const postCnt = useSelector((state: RootState) => state.posts.filter((post) => post.added_by === user.id).length);
  const reviewCnt = useSelector((state: RootState) => state.reviews.filter((review) => review.added_by === user.id).length);
  const currentUser = useSelector((state: RootState) => state.loggedUser);

  return (
    <ul className="lg:min-w-[30%] group relative bg-gray2 rounded border border-white border-opacity-10 border-solid [&_li:nth-child(even)]:bg-gray6">
      <li className="border-b border-white border-opacity-10 border-solid p-3 sm:p-6 text-center flex flex-col gap-y-3 sm:gap-y-4 items-center">
        <div>
          <h1 className="capitalize text-3xl">{user.name}</h1>
          <p className="text-gray4">{user.username}</p>
        </div>
        <Avatar
          user={user}
          classList={"w-20 sm:w-full block max-w-[200px] sm:max-w-[120px]"}
        />
        {user?.bio && <p className="bio max-w-[30ch] text-xs sm:text-sm">{user.bio}</p>}
        <div className="flex gap-x-4 text-sm sm:text-base">
          <p className="text-gray4">
            <span className="font-bold text-gray5">0 </span>
            Following
          </p>
          <p className="text-gray4">
            <span className="font-bold text-gray5">0 </span>
            Followers
          </p>
        </div>
      </li>
      {currentUser?.id === user.id && (
        <li className="border-b border-white border-opacity-10 border-solid p-6">
          <Btn
            text="Edit Profile"
            action={openEdit}
            classList="w-full"
            isSecondary={true}
          />
        </li>
      )}
      {user?.location && (
        <li className="border-b text-xs sm:text-sm border-white border-opacity-10 border-solid px-8 sm:px-6 py-2 flex justify-between">
          <p className="font-bold">Location</p>
          <span>{user.location}</span>
        </li>
      )}
      {user?.pronouns && (
        <li className="border-b text-xs sm:text-sm border-white border-opacity-10 border-solid px-8 sm:px-6 py-2 flex justify-between">
          <p className="font-bold">Pronouns</p>
          <span>He/Him</span>
        </li>
      )}
      <li className="border-b text-xs sm:text-sm border-white border-opacity-10 border-solid px-8 sm:px-6 py-2 flex justify-between">
        <p className="font-bold">Joined</p>
        <span>June 2022</span>
      </li>
      <li className="border-b text-xs sm:text-sm border-white border-opacity-10 border-solid px-8 sm:px-6 py-2 flex justify-between">
        <p className="font-bold">Posts</p>
        <span>{postCnt}</span>
      </li>
      <li className="border-b text-xs sm:text-sm border-white border-opacity-10 border-solid px-8 sm:px-6 py-2 flex justify-between">
        <p className="font-bold">Reviews</p>
        <span>{reviewCnt}</span>
      </li>
      <li className="border-b text-xs sm:text-sm border-white border-opacity-10 border-solid px-8 sm:px-6 py-2 flex justify-between">
        <p className="font-bold">Favorites</p>
        <span>0</span>
      </li>
      <li className="border-b text-xs sm:text-sm border-white border-opacity-10 border-solid px-8 sm:px-6 py-2 flex justify-between">
        <p className="font-bold">Teams</p>
        <span>0</span>
      </li>
    </ul>
  );
}

export default UserSummary;
