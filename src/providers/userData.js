import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Api } from "../services";

export const UserDataContext = createContext([]);

export const UserDataProvider = ({ children }) => {
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("@matchplayers-userData")) || []
  );
  const [userToken] = useState(
    JSON.parse(localStorage.getItem("@matchplayers-token")) || []
  );
  const [isAuth, setIsAuth] = useState(false);
  const [imgBase64Post, setImgBase64Post] = useState("");
  const [imgBase64User, setImgBase64User] = useState("");
  const [loadingPhoto, setLoadingPhoto] = useState("");
  const [isloading, setIsloading] = useState(false);

  const [appearModal, setAppearModal] = useState({
    config: false,
    message: false,
    menu: false,
    photo: false,
  });

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("@matchplayers-token"));

    if (token) {
      return setIsAuth(true);
    }
  }, [isAuth]);

  const handleLogout = () => {
    localStorage.clear();
    toast.success("Volte Sempre =)");
    setIsAuth(false);
  };
  const handleLogin = (data, history) => {
    Api.post("/login", data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        localStorage.setItem(
          "@matchplayers-token",
          JSON.stringify(res.data.accessToken)
        );
        localStorage.setItem(
          "@matchplayers-userData",
          JSON.stringify(res.data.user)
        );
        setUserData(res.data.user);
        toast.success("Bem vindo ao Match Players");
        history.push("/feed");
        setIsAuth(true);
      })
      .catch(() => toast.error("Usuário ou Senha Inválidos"));
  };

  const handleRegister = (data, history) => {
    Api.post("/users", data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        toast.success("Conta cadastrada com sucesso");

        history.push("/");
      })
      .catch((err) => toast.error("Usuário já cadastrado, tente outro email"));
  };
  const handlechangeUserIMG = () => {
    setIsloading(true);
    setLoadingPhoto("https://i.stack.imgur.com/ATB3o.gif");

    Api.patch(
      `/644/users/${userData.id}`,
      {
        userId: userData.id,
        profileIMG: `${imgBase64User}`,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      }
    )
      .then((res) => {
        setLoadingPhoto("");
        setIsloading(false);
        setAppearModal({
          config: false,
          message: false,
          menu: false,
          photo: false,
        });
        localStorage.setItem(
          "@matchplayers-userData",
          JSON.stringify(res.data)
        );
        setUserData(res.data);
      })
      .catch((res) => toast.error("Tente Novamente"));
  };
  // a data do handleGames Register deve entrar somente
  /*

  {
    userId: id do usuário,
    gameList: [...userData.gameList, novo jogo adicionado]
  }

  */

  // const handleGamesRegister = (data) => {
  //   Api.patch(`/644/users/${userData.id}`, data, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${userToken}`,
  //     },
  //   })
  //     .then((res) => {
  //       localStorage.setItem(
  //         "@matchplayers-userData",
  //         JSON.stringify(res.data)
  //       );
  //       setUserData(res.data);
  //       toast.success("Jogos Adicionados");
  //     })
  //     .catch((res) => toast.error("Tente Novamente"));
  // };

  // a data do handleGames Edit deve entrar somente
  /*

  {
    userId: id do usuário,
    gameList: [jogos selecionados]
  }

  */

  // const handleGamesEdit = (data) => {
  //   Api.patch(`/644/users/${userData.id}`, data, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${userToken}`,
  //     },
  //   })
  //     .then((res) => {
  //       localStorage.setItem(
  //         "@matchplayers-userData",
  //         JSON.stringify(res.data)
  //       );
  //       setUserData(res.data);
  //       toast.success("Jogos Adicionados");
  //     })
  //     .catch((res) => toast.error("Tente Novamente"));
  // };

  return (
    <UserDataContext.Provider
      value={{
        userData,
        handleLogin,
        handleRegister,
        isAuth,
        handleLogout,
        setImgBase64Post,
        imgBase64Post,
        imgBase64User,
        setImgBase64User,
        handlechangeUserIMG,
        loadingPhoto,
        setLoadingPhoto,
        appearModal,
        setAppearModal,
        isloading,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};
