import { Link } from "react-router-dom";
import D3LineChart from "./d3Chart";
import { useState } from "react";

interface HomeProps {
  setSelectedProps: (props: { statsProps: number }) => void;
}

const Home: React.FC<HomeProps> = ({ setSelectedProps }) => {
  const [DataUsed, setDataUsed] = useState<number>(1);

  const sampleDataSets = {
    1: [
      { Category: "A", Value1: 30, Value2: 40 },
      { Category: "B", Value1: 70, Value2: 90 },
      { Category: "C", Value1: 50, Value2: 60 },
      { Category: "D", Value1: 20, Value2: 30 },
    ],
    2: [
      { Category: "A", Value1: 15, Value2: 25 },
      { Category: "B", Value1: 80, Value2: 100 },
      { Category: "C", Value1: 60, Value2: 75 },
      { Category: "D", Value1: 35, Value2: 45 },
    ],
    3: [
      { Category: "A", Value1: 50, Value2: 65 },
      { Category: "B", Value1: 60, Value2: 85 },
      { Category: "C", Value1: 40, Value2: 55 },
      { Category: "D", Value1: 10, Value2: 20 },
    ],
    4: [
      { Category: "A", Value1: 25, Value2: 35 },
      { Category: "B", Value1: 90, Value2: 110 },
      { Category: "C", Value1: 55, Value2: 70 },
      { Category: "D", Value1: 30, Value2: 40 },
    ],
    5: [
      { Category: "A", Value1: 20, Value2: 30 },
      { Category: "B", Value1: 100, Value2: 120 },
      { Category: "C", Value1: 45, Value2: 65 },
      { Category: "D", Value1: 25, Value2: 35 },
    ],
  };

  const changeData = () => {
    setDataUsed(prev => (prev < 5 ? prev + 1 : 1));
  };

  return (
    <>
      <Link to="/alerts">
        <button>Alerts</button>
      </Link>
      <Link to="/stats">
        <button onClick={() => setSelectedProps({ statsProps: 0 })}>Stats</button>
      </Link>

      <D3LineChart 
        data={sampleDataSets[DataUsed]} 
        xKey="Category" 
        yKeys={["Value1", "Value2"]} 
        colors={["#ff5733", "#33ff57"]} 
        width={900} 
        height={600} 
      />

      <button onClick={changeData}>Change Data</button>
    </>
  );
};

export default Home;
