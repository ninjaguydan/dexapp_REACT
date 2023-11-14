import { useMemo } from "react";
import { useParams } from "react-router-dom";

import { useAppSelector } from "hooks/hooks";

import PostForm from "components/common/posts/PostForm";
import UserSummary from "components/pages/profile/UserSummary";
import PostList from "components/common/posts/PostList";

import { IUser } from "utils/Interfaces";

import { selectCurrentUser } from "redux/slices/authSlice";
import { selectPostById } from "redux/slices/postSlice";

const UserProfile = () => {
  // parameter: "profile/username"
  const { username } = useParams();
  // logged in user
  const currentUser = useAppSelector(selectCurrentUser);
  const user = useAppSelector((state) => state.users.filter((u) => u.username === username)[0]);
  // get memoized posts
  const selectPosts = useMemo(selectPostById, []);
  const posts = useAppSelector((state) => selectPosts(state, user.id));

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
