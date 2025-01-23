import { Link } from "react-router-dom";


interface HomeProps {
  setSelectedProps: (props: { statsProps: number }) => void;
}

const Home: React.FC<HomeProps> = ({ setSelectedProps }) => {

  



  return (
    <>
      <Link to="/alerts">
        <button>Alerts</button>
      </Link>
      <Link to="/stats">
        <button onClick={() => setSelectedProps({ statsProps: 0 })}>Stats</button>
      </Link>

    </>
  );
};

export default Home;
