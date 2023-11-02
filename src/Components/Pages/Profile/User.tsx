import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import PostForm from "components/common/forms/PostForm";
import Profile from "components/pages/profile/Profile";
import EditProfile from "components/pages/profile/EditProfile";
import PostList from "components/pages/profile/PostList";

import { IUser } from "utils/Interfaces";
import { RootState } from "redux/store";

const User = () => {
  const { username } = useParams();
  const user = useSelector((state: RootState) => state.users.filter((u) => u.username === username)[0]);
  const posts = useSelector((state: RootState) => state.posts.filter((post) => post.added_by === user.id).reverse());
  const currentUser = useSelector((state: RootState) => state.loggedUser);
  const [editForm, setEditForm] = useState<boolean>(false);

  return (
    <div className="profile">
      {editForm && <EditProfile closeEdit={() => setEditForm(false)} />}
      <Profile
        user={user as IUser}
        openEdit={() => setEditForm(true)}
      />
      <div className="post-column main">
        {currentUser.id === user.id ? (
          <PostForm
            btnText={"Post"}
            placeholder={`What's on your mind?	`}
            type={{ name: "POST" }}
          />
        ) : null}
        {posts.length !== 0 ? <PostList posts={posts} /> : <div className="card">No posts yet!!</div>}
      </div>
    </div>
  );
};

export default User;
