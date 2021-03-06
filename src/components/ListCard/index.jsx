import { useContext } from "react";
import { PostListContext } from "../../providers/posts/posts";
import { UserDataContext } from "../../providers/user/userData";
import CardFeed from "../CardFeed";
import { Container } from "./style";

const ListCard = ({ postList }) => {
  const { userData } = useContext(UserDataContext);
  const { commentsList } = useContext(PostListContext);

  return (
    <Container>
      {postList.map((post) => {
        if (post.userId !== userData.id) {
          return (
            <CardFeed
              username={post.username}
              profileIMG={post.profileIMG}
              desc={post.desc}
              createdAt={post.createdAt}
              key={post.id}
              idPost={post.id}
              userId={post.userId}
              postUpdate={false}
              postIMG={post.postIMG || ""}
              comments={commentsList.filter((item) => item.idPost === post.id)}
              gameList={post.gameList}
            />
          );
        } else {
          return (
            <CardFeed
              username={post.username}
              profileIMG={post.profileIMG}
              desc={post.desc}
              createdAt={post.createdAt}
              key={post.id}
              idPost={post.id}
              userId={post.userId}
              postUpdate={true}
              postIMG={post.postIMG || ""}
              comments={commentsList.filter((item) => item.idPost === post.id)}
              gameList={post.gameList}
            />
          );
        }
      })}
    </Container>
  );
};
export default ListCard;
