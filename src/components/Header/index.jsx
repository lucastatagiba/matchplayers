import { TextField } from "@mui/material";
import { BsHouseFill } from "react-icons/bs";
import { AiFillMessage, AiFillSetting, AiOutlineSearch } from "react-icons/ai";
import { GrMoreVertical } from "react-icons/gr";
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { RiCloseCircleFill } from "react-icons/ri";
import logoIMG from "../../Assets/img/logo.png";
import Input from "../Input";
import FileField from "../FileField";
import SelectGames from "../SelectGames";
import Button from "../GeneralButton";
import { Container } from "./style";
import { useForm } from "react-hook-form";
import { UserDataContext } from "../../providers/userData";

const Header = () => {
  const { register, handleSubmit } = useForm();

  const history = useHistory();

  const [photoProfile] = useState(
    JSON.parse(localStorage.getItem("@matchplayers-userData")).profileIMG || ""
  );
  const user = JSON.parse(localStorage.getItem("@matchplayers-userData")).name;
  const {
    handleLogout,
    setImgBase64User,
    handlechangeUserIMG,
    loadingPhoto,
    appearModal,
    setAppearModal,
    handleGamesRegister,
    isloading,
    userData,
    setUserProfile,
  } = useContext(UserDataContext);
  const [inputvalue, setInputvalue] = useState("");
  const handleModal = (icon) => {
    switch (icon) {
      case "config":
        setAppearModal({
          message: false,
          menu: false,
          photo: false,
          config: !appearModal.config,
          input: false,
        });
        return appearModal.config;
      case "message":
        setAppearModal({
          message: !appearModal.message,
          menu: false,
          photo: false,
          config: false,
          input: false,
        });
        return appearModal.message;

      case "menu":
        setAppearModal({
          message: false,
          menu: !appearModal.menu,
          photo: false,
          config: false,
          input: false,
        });
        return appearModal.menu;

      case "photo":
        setAppearModal({
          message: false,
          menu: false,
          photo: !appearModal.photo,
          config: false,
          input: false,
        });
        return appearModal.photo;

      case "input":
        setAppearModal({
          message: false,
          menu: false,
          input: !appearModal.input,
          config: false,
          photo: false,
        });
        return appearModal.input;

      default:
        break;
    }
  };
  const getImgUser = (event) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setImgBase64User(reader.result);
    });
    reader.readAsDataURL(event.target.files[0]);
  };

  return (
    <Container>
      <figure onClick={() => history.push("/feed")}>
        <img alt="logo" src={logoIMG} className="logoimg" />
        <div className="logoName">
          <h3>MatchPlayers</h3>
          <span>Social Media For Games</span>
        </div>
      </figure>

      <div className="modalMenu" display={appearModal.menu ? "flex" : "none"}>
        <div onClick={() => handleModal("menu")} className="close">
          <RiCloseCircleFill />
        </div>
        <div>Amigos</div>
        <div>Mensagens</div>
        <div onClick={() => handleModal("config")}>Configurações</div>
        <div onClick={handleLogout}>Sair</div>
      </div>

      <div>
        <Input
          Icon={AiOutlineSearch}
          width="250"
          placeholder="Pesquisar"
          onChange={(event) => setInputvalue(event.target.value)}
          display={appearModal.input ? "flex" : "none"}
          onClick={() => handleModal("input")}
        />
        <GrMoreVertical className="menu" onClick={() => handleModal("menu")} />
        <BsHouseFill
          className="houseIcon"
          onClick={() => history.push("/feed")}
        />
        <AiFillMessage
          className="messageIcon"
          onClick={() => handleModal("message")}
        />
        <div className="configDiv">
          <AiFillSetting
            className="configIcon"
            onClick={() => handleModal("config")}
          />
          <div
            className="modalConfig"
            display={appearModal.config ? "flex" : "none"}
          >
            <div onClick={() => handleModal("menu")} className="close">
              <RiCloseCircleFill />
            </div>

            <form>
              <h5>Adicionar jogos:</h5>

              <SelectGames />
              <Button
                bgcolor={"#002543"}
                children={"Salvar alteração"}
                width={150}
                onClick={(event) => {
                  event.preventDefault();
                  handleGamesRegister();
                }}
              />
            </form>

            <form onSubmit={handleSubmit(handlechangeUserIMG)}>
              <h5>Alterar perfil:</h5>

              <FileField
                name={"perfil"}
                register={register}
                id="perfil"
                placeholder="Imagem de Perfil"
                type="file"
                onchangeFunc={getImgUser}
              />
              {isloading && (
                <img className="loading" alt="" src={loadingPhoto} />
              )}

              {/* <FileField
            name={"fundo"}
            register={register}
            id="fundo"
            placeholder="Imagem de Fundo"
            type="file"
          /> */}

              <Button
                bgcolor={"#002543"}
                children={"Salvar alteração"}
                width={150}
              />
            </form>

            <form>
              <h5>Editar senha:</h5>

              <TextField
                fullWidth
                label="Senha"
                variant="outlined"
                size="small"
              />

              <TextField
                fullWidth
                label="Confirmar Senha"
                variant="outlined"
                size="small"
              />

              <Button
                bgcolor={"#002543"}
                children={"Salvar alteração"}
                width={150}
              />
            </form>
          </div>
        </div>
        <div className="profilePhoto">
          <img
            src={
              userData.profileIMG === "" ? photoProfile : userData.profileIMG
            }
            alt="userPhoto"
            className="userimg"
            onClick={() => handleModal("photo")}
          />
          <div
            className="modalPhoto"
            display={appearModal.photo ? "inline" : "none"}
          >
            <div onClick={() => handleModal("photo")} className="close">
              <RiCloseCircleFill />
            </div>
            <div
              onClick={() => {
                setUserProfile(userData);
                history.push(`/profile/${user}`);
                handleModal("photo");
              }}
              className="modalPhotoText"
            >
              Ir para o meu perfil
            </div>
            <div
              className="modalPhotoText2"
              onClick={() => {
                handleLogout();
                handleModal("photo");
              }}
            >
              Sair
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
export default Header;
