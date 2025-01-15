import React, { useEffect, useState } from "react";
import Chart from "./Chart";
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
        <Chart data={data} options={options} type = "line"/>
      )}
      

      </>
    )}
      </>
    )
  }

  export default Stats