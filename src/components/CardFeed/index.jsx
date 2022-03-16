import { Container, Box } from "./style";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";

const CardFeed = () => {
  return (
    <>
      <Container>
        <Box className="userInformation">
          <img
            className="userPhoto"
            src="https://media-exp1.licdn.com/dms/image/C4D03AQEibJeZALawbw/profile-displayphoto-shrink_100_100/0/1610116021938?e=1652918400&v=beta&t=jMpRwH_Y0PpuAb-4eBRPPvQDtAnRWgB39ekW4uauaZM"
            alt=""
          />
          <div className="userName">
            <h3>Giba</h3>
            <span>20 h</span>
          </div>
          <img
            className="gameLogo"
            src="https://i.pinimg.com/originals/b8/3e/6f/b83e6fea403a390bd06ae17c187408e3.png"
            alt=""
          />
          <img
            className="gameLogo"
            src="https://i.pinimg.com/originals/b8/3e/6f/b83e6fea403a390bd06ae17c187408e3.png"
            alt=""
          />
          <img
            className="gameLogo"
            src="https://i.pinimg.com/originals/b8/3e/6f/b83e6fea403a390bd06ae17c187408e3.png"
            alt=""
          />
          <img
            className="gameLogo"
            src="https://i.pinimg.com/originals/b8/3e/6f/b83e6fea403a390bd06ae17c187408e3.png"
            alt=""
          />
          <img
            className="gameLogo"
            src="https://i.pinimg.com/originals/b8/3e/6f/b83e6fea403a390bd06ae17c187408e3.png"
            alt=""
          />
        </Box>
        <div className="postContent">
          <p className="postText">
            Aqui vai entrar o post sem uma imagem, chamando alguém para jogar
            algum jogo em tal horário. Lorem Ipsum is simply dummy text of the
            printing and typesetting industryvai entrar o post sem uma imagem,
            chamando alguém para jogar algum jogo em tal horário. Lorem Ipsum is
            simply dummy text of the printing and types
          </p>
          <div className="imageBox">
            <img
              className="postImage"
              src="https://images.livemint.com/rf/Image-621x414/LiveMint/Period2/2018/07/28/Photos/Processed/fifagame-krQ--621x414@LiveMint.jpg"
              alt=""
            />
          </div>
        </div>

        <Box className="likes">
          <div>
            <AiOutlineLike />
            <span>Gostei</span>
            <AiOutlineDislike />
            <span>Não gostei</span>
          </div>
          <div>
            <span>Comentários</span>
          </div>
        </Box>
        <input placeholder="Adicionar Comentário" type="text" />
      </Container>
    </>
  );
};
export default CardFeed;
