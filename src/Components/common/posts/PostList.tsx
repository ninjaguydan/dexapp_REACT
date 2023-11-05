import Post from "components/common/posts/Post";

import { IPost } from "utils/Interfaces";

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
