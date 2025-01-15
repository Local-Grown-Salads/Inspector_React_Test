import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";


interface LinkItem {
    alert_urgency_level: string; 
  }
  interface AlertListProps {
    setSelectedProps: (props: { statsProps: number }) => void;
  }
  
  const AlertList: React.FC<AlertListProps> = ({ setSelectedProps }) => {
    const [data, setData] = useState<LinkItem[]>([]);
  
    useEffect(() => {
      fetch('http://localhost:3000/data')
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((fetchedData: LinkItem[]) => setData(fetchedData))
        .catch((error) => console.error('Error fetching data:', error));
    }, []);
  
    return (
      <div>
        {data.map((item, index) => (
          <Link to="/stats" key={index}>
          <button
            onClick={() => setSelectedProps({ statsProps: index +1 })}
            style={{
              margin: '5px',
              padding: '10px',
              backgroundColor: '#007BFF',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            {item.alert_urgency_level}
          </button>
          </Link>
        ))}
      </div>
    );
  };

  export default AlertList