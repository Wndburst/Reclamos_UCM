import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Chart } from 'chart.js/auto';

const Datos = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    getStats();
  }, []);

  const getStats = async () => {
    try {
      const response = await axios.get('http://localhost:8000/AcademicoStatsINFO');
      setStats(response.data);
      drawChart(response.data); // Llama a la función para dibujar el gráfico
    } catch (error) {
      console.error('Error al obtener las estadísticas:', error);
    }
  };

  const drawChart = (data) => {
    const categories = data.map((stat) => stat.NOMBRE_CATEGORIA);
    const counts = data.map((stat) => stat['COUNT(CATE.NOMBRE_CATEGORIA)']);

    // Define un arreglo de colores personalizados
    const customColors = [
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
      'rgb(54, 162, 235)',
      'rgb(153, 102, 255)',
      'rgb(201, 203, 207)',
    ];

    const ctx = document.getElementById('statsChart').getContext('2d');

    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: categories,
        datasets: [
          {
            label: 'Cantidad de reclamos',
            data: counts,
            backgroundColor: customColors, // Usa colores personalizados
            borderWidth: 1, // Ancho del borde
          },
        ],
      },
    });
  };

  return (
    <div className='reclamo-general'>
      <div className='stats2'>
        <h2>Estadísticas por Categoría:</h2>
        <canvas id='statsChart' width='400' height='200'></canvas>
      </div>
    </div>
  );
};

export default Datos;