import { useSelector } from "react-redux";
import { useAppSelector } from "hooks/hooks";
import { selectCurrentUser } from "redux/slices/authSlice";
import { useParams } from "react-router-dom";

import PostForm from "components/common/posts/PostForm";
import UserSummary from "components/pages/profile/UserSummary";

import PostList from "components/common/posts/PostList";

import { IUser } from "utils/Interfaces";
import { RootState } from "redux/store";

const UserProfile = () => {
  const { username } = useParams();
  const currentUser = useAppSelector(selectCurrentUser);
  const user = useSelector((state: RootState) => state.users.filter((u) => u.username === username)[0]);
  const posts = useSelector((state: RootState) => state.posts.filter((post) => post.added_by === user.id).reverse());

  return (
    <div className="flex flex-col w-full gap-x-4 gap-y-4 sm:flex-row">
      <UserSummary user={user as IUser} />
      <div className="w-full">
        {currentUser.userInfo.id === user.id ? (
          <PostForm
            btnText={"Post"}
            placeholder={`What's on your mind?	`}
            type={{ name: "POST" }}
          />
        ) : null}
        {posts.length !== 0 ? (
          <PostList posts={posts} />
        ) : (
          <div className="group relative bg-gray2 rounded border border-white border-opacity-10 border-solid p-4">
            No posts yet!!
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
