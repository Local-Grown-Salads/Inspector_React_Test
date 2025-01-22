import { Link } from "react-router-dom";
import D3LineChart from "./d3Chart";

interface HomeProps {
  setSelectedProps: (props: { statsProps: number }) => void;
}

const Home: React.FC<HomeProps> = ({ setSelectedProps }) => {
  const sampleData = [
    { Category: "A", Value1: 30, Value2: 40 },
    { Category: "B", Value1: 70, Value2: 90 },
    { Category: "C", Value1: 50, Value2: 60 },
    { Category: "D", Value1: 20, Value2: 30 },
  ];
  return (
    <>
      <Link to="/alerts">
        <button>Alerts</button>
      </Link>
      <Link to="/stats">
        <button onClick={() => setSelectedProps({ statsProps: 0 })}>Stats</button>
      </Link>
      <D3LineChart 
  data={sampleData} 
  xKey="Category" 
  yKeys={["Value1", "Value2"]} 
  colors={["#ff5733", "#33ff57"]} 
  width={900} 
  height={600} 
/>

    </>
  );
};

export default Home;