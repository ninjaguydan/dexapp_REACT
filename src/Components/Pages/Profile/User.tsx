import { useSelector } from "react-redux";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { RootState } from "../../../Redux/store";

import Profile from "./Profile";
import EditProfile from "./EditProfile";
import PostForm from "../../Forms/PostForm";
import PostList from "./PostList";
import { IUser } from "../../../Helpers/Interfaces";

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
