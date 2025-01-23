import React, { useEffect, useState } from "react";
import Chart from "./Chart";
import D3LineChart from "./d3Chart";
interface DataItem1 {
  alert_type: string; 
  alert_component: string; 
  alert_info: string;
  alert_urgency_level: string;
}

interface DataItem2 {
  farm_id: number; 
  farm_name: string; 
}

interface StatsProps {
  statsProps: number; 
}

function Stats({ statsProps }: StatsProps) {
  const [data1, setdata1] = useState<DataItem1[]>([]);
  const [data2, setdata2] = useState<DataItem2[]>([]);
  const [selectedOption, setSelectedOption] = useState<number>(statsProps);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [response1, response2] = await Promise.all([
          fetch('http://localhost:3000/data'),
          fetch('http://localhost:4000/data'),

          
        ]);
        const fetch1 = await response1.json();
        const fetch2 = await response2.json();

        setdata1(fetch1)
        setdata2(fetch2)
        setLoading(false);

      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    }
    fetchData()
  }, [])



  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(Number(event.target.value));
  };


  let data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      
      {
        label: 'Humidity',
        data: [selectedOption * 10, 20, 30, 40, 50, 60],
        borderColor: 'rgba(4, 175, 237,1)',
        fill: false,
      },
      {
        label: 'Temp',
        data: [65, 59, 80, 81, 56, 55],
        borderColor: 'rgba(255,2,2,1)',
        fill: false,
      },
    ],
  };

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

  let options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
    },
  };
    return (
      <>
      {loading ? (
        <p>Loading...</p> 
      ) : (
        <>
<label htmlFor="dropdown">Choose an option:</label>
      <select id="dropdown" value={selectedOption} onChange={handleChange}>
        <option value="">
          Select an option
        </option>
        {data2.map((option) => (
          <option key={option.farm_id} value={option.farm_id}>
            {option.farm_name}
          </option>
        ))}
      </select>
      {selectedOption <= 0 ? (<p>Choose an option</p>) : (
        <div>
        <Chart data={data} options={options} type = "line"/>
        <D3LineChart 
        data={sampleDataSets[selectedOption]} 
        xKey="Category" 
        yKeys={["Value1", "Value2"]} 
        colors={["#ff5733", "#33ff57"]} 
        width={900} 
        height={600} 
      />
      </div>
      )}
      

      </>
    )}
      </>
    )
  }

  export default Stats