import { useState, useContext, useEffect } from "react";
import { BsCardImage } from "react-icons/bs";

import Header from "../../components/Header";
import GeralButton from "../../components/GeneralButton";
import { Container } from "./style";
import ListCard from "../../components/ListCard";
import ModalPub from "../../components/ModalPub";
import { PostListContext } from "../../providers/posts";
import { UserDataContext } from "../../providers/userData";
import { Redirect } from "react-router-dom";

const FeedPage = () => {
  const [photoProfile] = useState(
    localStorage.getItem("@matchplayers-userData")
      ? JSON.parse(localStorage.getItem("@matchplayers-userData")).profileIMG
      : ""
  );
  const [modalPub, setModalPub] = useState(false);
  const { postList, setUserData } = useContext(PostListContext);
  const { isAuth, userData } = useContext(UserDataContext);

  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("@matchplayers-userData")));
  }, [modalPub]);

  if (!isAuth) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <Header />

      <Container>
        <div className="divModal">
          {modalPub ? (
            <ModalPub closeModal={() => setModalPub(false)} />
          ) : (
            <></>
          )}
        </div>
        <aside className="leftAside">
          <div className="divProfile">
            <img
              alt="userPhoto"
              src={
                userData.profileIMG === "" ? photoProfile : userData.profileIMG
              }
            />
            <h2>{userData.nickname}</h2>
            {/* <ul>
              {gamelist.map((game) => (
                <li> {game}</li>
              ))}
            </ul> */}
          </div>
          <div className="divSchedules">
            <h3>Disponibilidade de Horários</h3>
            <span>{userData.timeAvailability}</span>
          </div>
        </aside>
        <section>
          <div className="divButtonsFeed">
            <div>
              <GeralButton>Todos</GeralButton>
              <GeralButton>Jogos</GeralButton>
              <GeralButton>Notícias</GeralButton>
            </div>
            <select>
              <option value="all"> Todos </option>
              <option value="justFriends"> Somente amigos </option>
            </select>
          </div>
          <div className="divStartPub">
            <img
              alt="UserPhoto"
              src={
                userData.profileIMG === "" ? photoProfile : userData.profileIMG
              }
            />
            <div className="containPubDiv">
              <GeralButton
                bgcolor={"#F3F2EF"}
                width={"95%"}
                color={"#6C8394"}
                onClick={() => setModalPub(true)}
              >
                Começar Publicação
              </GeralButton>
              <div className="buttonPubDiv">
                <GeralButton onClick={() => setModalPub(true)}>
                  <BsCardImage />
                  Foto
                </GeralButton>
                <GeralButton
                  onClick={() => setModalPub(true)}
                  bgcolor={"#6C8394"}
                >
                  Publicar
                </GeralButton>
              </div>
            </div>
          </div>
          <ListCard postList={postList}></ListCard>
        </section>
        <aside className="rightAside">
          <ul>
            {userData.friendList.map((friend) => (
              <li>
                <img alt="userPhoto" src={friend.photo} />
                <h2>{friend.name}</h2>
              </li>
            ))}
          </ul>
          <h2>Ver Todos</h2>
        </aside>
      </Container>
    </>
  );
};
export default FeedPage;
