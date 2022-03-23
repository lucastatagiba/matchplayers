import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  AiOutlineLike,
  AiOutlineDislike,
  AiFillLike,
  AiFillDislike,
} from "react-icons/ai";
import { IoMdSend } from "react-icons/io";
import { CgCloseR } from "react-icons/cg";
import { useForm } from "react-hook-form";
import moment from "moment";
import "moment/locale/pt";
import CardGames from "../CardGames";
import { PostListContext } from "../../providers/posts";
import GeralButton from "../GeneralButton";
import { Container, Box, Comments } from "./style";
import { UserDataContext } from "../../providers/userData";
import { GamesContext } from "../../providers/games";

const CardFeed = ({
  username,
  desc,
  createdAt,
  idPost,
  profileIMG,
  postUpdate,
  postIMG,
  userId,
  comments,
  gameList,
}) => {
  const { games } = useContext(GamesContext);
  const { handleProfileUser, userData } = useContext(UserDataContext);
  const { handleDeletePost, handleNewPostComment, handleGetComments } =
    useContext(PostListContext);
  const { register, handleSubmit } = useForm();
  const [buttonsLike, setButtonsLike] = useState({
    like: false,
    unlike: false,
  });
  const [commentsList, setCommentsList] = useState(false);
  const history = useHistory();

  const handleSubmitComment = (data) => {
    const newComment = {
      idPost: idPost,
      comment: data.comment,
      nickname: userData.nickname,
      userId: userData.userId,
    };
    handleNewPostComment(newComment);
    handleGetComments();
    setCommentsList(true);
  };

  return (
    <>
      <Container>
        {postUpdate && (
          <CgCloseR
            className="deletePost"
            onClick={() => handleDeletePost(idPost, comments)}
          />
        )}
        {gameList && (
          <div className="gameContent">
            {games
              .filter((game) => gameList.includes(game.name))
              .map((game) => {
                return (
                  <CardGames
                    key={game.name}
                    image={game.image}
                    name={game.name}
                  />
                );
              })}
          </div>
        )}
        <Box className="userInformation">
          <img
            className="userPhoto"
            src={profileIMG}
            alt="userPhoto"
            onClick={() => handleProfileUser(userId, history)}
          />
          <div className="userName">
            <h3 onClick={() => handleProfileUser(userId, history)}>
              {username}
            </h3>
            <span>{moment(createdAt).locale("pt").fromNow()}</span>
          </div>
        </Box>
        <div className="postContent">
          <p className="postText">{desc}</p>
          <div className="imageBox">
            {postIMG && (
              <img
                className="postImage"
                src={postIMG}
                alt="Imagem da Publicação"
              />
            )}
          </div>
        </div>

        <Box className="likes">
          <div>
            <GeralButton
              onClick={() =>
                setButtonsLike({
                  like: !buttonsLike.like,
                  unlike: false,
                })
              }
            >
              {buttonsLike.like ? <AiFillLike /> : <AiOutlineLike />}
              <span>Gostei</span>
            </GeralButton>
            <GeralButton
              onClick={() =>
                setButtonsLike({
                  like: false,
                  unlike: !buttonsLike.unlike,
                })
              }
            >
              {buttonsLike.unlike ? <AiFillDislike /> : <AiOutlineDislike />}
              <span>Não gostei</span>
            </GeralButton>
          </div>
          <div>
            <h5
              onClick={() => setCommentsList(!commentsList)}
              className="button--comments"
            >
              {comments.length > 0 && comments.length} Comentários
            </h5>
          </div>
        </Box>
        <form
          onSubmit={handleSubmit(handleSubmitComment)}
          className="form--comments"
        >
          <input placeholder="Adicionar Comentário" {...register("comment")} />
          <GeralButton type="Submit">
            <IoMdSend />
          </GeralButton>
        </form>
        <Comments modalOn={commentsList}>
          {comments &&
            comments.map((comment, index) => (
              <li key={index}>
                <h3 onClick={() => handleProfileUser(comment.userId, history)}>
                  {comment.nickname}
                </h3>
                <p>{comment.comment}</p>
              </li>
            ))}
        </Comments>
      </Container>
    </>
  );
};
export default CardFeed;
