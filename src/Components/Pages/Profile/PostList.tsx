import Post from "./Post";

import { IPost } from "../../../Helpers/Interfaces";

interface IPostListProps {
  posts: IPost[];
}
const PostList = ({ posts }: IPostListProps) => {
  return (
    <>
      {posts.map((post) => {
        return (
          <Post
            post={post}
            key={post.id}
          />
        );
      })}
    </>
  );
};

export default PostList;
