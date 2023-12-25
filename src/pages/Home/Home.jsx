import Container from "../../components/Container";
import Banner from "./Banner";

const Home = () => {
  return (
    <Container>
      <div className="w-full min-h-[70vh] flex justify-center items-center">
        <Banner></Banner>
      </div>
    </Container>
  );
};

export default Home;
