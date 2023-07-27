import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import './components/styles.css';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const App = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetchChartData();
  }, []);

  const fetchChartData = async () => {
    try {
      const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=42.88&longitude=-8.55&hourly=temperature_2m&timezone=Europe%2FBerlin');
      const data = await response.json();
  
      // Extrae la data necesaria para la grafica
      const labels = data.hourly.time;
      const temperatures = data.hourly.temperature_2m;
  
      // Crea una grafica del objeto data
      const chartData = {
        labels: labels,
        datasets: [
          {
            label: 'Temperatura en Santiago de Compostela',
            data: temperatures,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          }
        ]
      };
  
      setChartData(chartData);
    } catch (error) {
      console.log('Error fetching chart data:', error);
    }
  };
  

  return (
    <div className='app'>
      <p className='textGrados'>Temperatura en grados celcius</p>
      <p className='textHoras'> Temperatura en horas</p>
      {chartData && <Line data={chartData} />}
    </div>
  );
};
  

export default App;
