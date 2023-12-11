import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Chart } from 'chart.js/auto';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';

const Datos = () => {
  const [stats, setStats] = useState([]);

  const [fechaInicio, setFechaInicio] = useState(new Date('01-01-2023'));
  const [fechaFin, setFechaFin] = useState(new Date('01-01-2024'));

  const [total, setTotal] = useState('');
  const [totalResueltos, setTotalResueltos] = useState('');
  const [totalPendientes, setTotalPendientes] = useState('');
  const [totalProceso, setTotalProceso] = useState('');
  const [reclamosPorMes, setReclamosPorMes] = useState([]);



  const [categoriasData, setCategoriasData] = useState('');
  const [areasData, setAreasData] = useState('');


  const [resJefe, setResJefe] = useState('');
  const [resSec, setResSec] = useState('');

  
  useEffect(() => {
    getData();
  }, [fechaInicio,fechaFin,totalResueltos, totalPendientes,totalProceso, categoriasData, areasData,resJefe,resSec,reclamosPorMes]);
  
 
  const handleCargarClick = async () => {
    Chart.getChart('statsChart')?.destroy();
    Chart.getChart('ChartArea')?.destroy();
    Chart.getChart('ChartCompare')?.destroy();
    Chart.getChart('NRes')?.destroy();
    Chart.getChart('ChartReclamosMes')?.destroy();
    
    await getData();
    drawChart(categoriasData, areasData, totalResueltos, totalPendientes,totalProceso, resJefe, resSec,reclamosPorMes);
    
  };

  const getData = async () => {
    try {

      const dateInicio = fechaInicio.toISOString().split('T')[0];
      const dateFin = fechaFin.toISOString().split('T')[0];

      const responseCategories = await axios.get(`http://localhost:8000/RXCATEGORIA/${dateInicio}/${dateFin}`);
      const responseAreas = await axios.get(`http://localhost:8000/RXAREAS/${dateInicio}/${dateFin}`);
      const responseTotal = await axios.get(`http://localhost:8000/RXTOTAL/${dateInicio}/${dateFin}`);
      const responseTotalResueltos = await axios.get(`http://localhost:8000/RXTOTALRESUELTOS/${dateInicio}/${dateFin}`);
      const responseTotalPendientes = await axios.get(`http://localhost:8000/RXTOTALPENDIENTES/${dateInicio}/${dateFin}`);
      const responseTotalProceso = await axios.get(`http://localhost:8000/RXTOTALPROCESO/${dateInicio}/${dateFin}`);
      const responseJefe = await axios.get(`http://localhost:8000/RXRESJEFE/${dateInicio}/${dateFin}`);
      const responseSec = await axios.get(`http://localhost:8000/RXRESSEC/${dateInicio}/${dateFin}`);
      const responseReclamosMes = await axios.get(`http://localhost:8000/RXRECLAMOSMES`);


      setCategoriasData(responseCategories.data)
      setAreasData(responseAreas.data)      
      setReclamosPorMes(responseReclamosMes.data);
      setResJefe(responseJefe.data[0]['COUNT(R.ID_RECLAMO)'])
      setResSec(responseSec.data[0]['COUNT(R.ID_RECLAMO)'])

      setTotal(responseTotal.data[0]['COUNT(R.ID_RECLAMO)'])
      setTotalResueltos(responseTotalResueltos.data[0]['COUNT(R.ID_RECLAMO)'])
      setTotalPendientes(responseTotalPendientes.data[0]['COUNT(R.ID_RECLAMO)'])
      setTotalProceso(responseTotalProceso.data[0]['COUNT(R.ID_RECLAMO)'])
      
      
    } catch (error) {
      console.error('Error al obtener las estadísticas:', error);
    }
  };




  const drawChart = (categoriasData, areasData, totalResueltos, totalProceso,totalPendientes,resJefe,resSec,reclamosPorMes) => {


    const categories = categoriasData.map((stat) => stat.NOMBRE_CATEGORIA);
    const counts = categoriasData.map((stat) => stat['COUNT(CATE.NOMBRE_CATEGORIA)']);

    const areas = areasData.map((stat) => stat.NOMBRE_AREA);
    const countsAreas = areasData.map((stat) => stat['COUNT(A.NOMBRE_AREA)']);
    
    const meses = reclamosPorMes.map((stat) => stat.mes);
    const cantidadReclamosMes = reclamosPorMes.map((stat) => stat.cantidad);

    console.log(cantidadReclamosMes)
    //const meses = reclamosPorMes ? reclamosPorMes.map((stat) => stat.mes) : [];
    //const reclamos = reclamosPorMes ? reclamosPorMes.map((stat) => stat.cantidad) : [];
  

    const customColors = [
      '#f8cbad',
      '#c3e1b5',
      '#ddeaf7',
      '#ffcac9',
      '#fff2ce',
      '#a9d18b',
    ];

    const ctx = document.getElementById('statsChart').getContext('2d');
    const ctx1 = document.getElementById('ChartArea').getContext('2d');
    const ctx2 = document.getElementById('ChartCompare').getContext('2d');
    const ctx3 = document.getElementById('NRes').getContext('2d');
    const ctx4 = document.getElementById('ChartReclamosMes').getContext('2d');


    
    new Chart(ctx, {
      type: 'bar', // Cambiado a gráfico de barras
      data: {
        labels: categories,
        datasets: [
          {
            label: 'Cantidad de reclamos',
            data: counts,
            backgroundColor: customColors,
            borderWidth: 1,
          },
        ],
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        plugins: {
          legend: {
            display: window.innerWidth >= 720,
          },
        },
      },
    });

    new Chart(ctx1, {
      type: 'bar', // Cambiado a gráfico de barras
      data: {
        labels: areas,
        datasets: [
          {
            label: 'Cantidad de reclamos',
            data: countsAreas,
            backgroundColor: customColors,
            borderWidth: 1,
          },
        ],
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        plugins: {
          legend: {
            display: window.innerWidth >= 720,
          },
        },
      },
    });


    new Chart(ctx2, {
      type: 'doughnut',
      data: {
        labels: ['Pendientes','Resueltos'],
        datasets: [
          {
            label: 'Cantidad de reclamos',
            data: [totalPendientes,totalResueltos,],
            backgroundColor: ['#ddeaf7','#c3e1b5'], // Usa colores para Resueltos y Pendientes
            borderWidth: 1,
          },
        ],
      },
    });

    
    new Chart(ctx3, {
      type: 'doughnut',
      data: {
        labels: ['Jefe de Carrera','Secretaria'],
        datasets: [
          {
            label: 'Cantidad de reclamos',
            data: [resJefe,resSec,],
            backgroundColor: ['#ddeaf7','#c3e1b5'], 
            borderWidth: 1,
          },
        ],
      },
    });


    new Chart(ctx4, {
      type: 'line', // Cambiado a gráfico de barras
      data: {
        labels: ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'],
        datasets: [
          {
            label: 'Cantidad de reclamos',
            data: cantidadReclamosMes,
            backgroundColor: customColors,
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Meses',
            },
            ticks: {
              autoSkip: false, // Para mostrar todos los meses
            },
          },
          y: {
            title: {
              display: true,
              text: 'Cantidad de reclamos',
            },
          },
        },
      },
    });


  };



  return (
    <div className='flex'>
      <div className='principalStats'>
        <h6>Selecciona un rango de fechas</h6>
        <div className='divFecha'>
          <div >
            <label>Inicio:</label>
            <DatePicker className="fecha" selected={fechaInicio} onChange={(date) => setFechaInicio(date)} />
          </div>
          <div>
            <label>Fin:</label>
            <DatePicker  className="fecha" selected={fechaFin} onChange={(date) => setFechaFin(date)} />
          </div>
          <button className='botonFecha' onClick={handleCargarClick}>Cargar</button>
        </div>
       

          <ul className='targetasStats'>
            <li className='cartaStats1'>
                <div>
                  <label>Reclamos</label> <br/>
                  <br/>
                  <div className='variableStats'>
                    
                    {total}
                  </div>
                </div>
              </li>

            <li className='cartaStats2'>
              <div>
                <label>Resueltos</label> <br/>
                <br/>
                <div className='variableStats'>
                    {totalResueltos}
                  </div>
              </div>
            </li>

            <li className='cartaStats3'>
              <div>
                <label>Pendientes</label> <br/>
                <br/>
                <div className='variableStats'>
                    {totalPendientes}
                  </div>
              </div>
            </li>

            <li className='cartaStats4'>
              <div>
                <label>En proceso</label> <br/>
                <br/>
                <div className='variableStats'>
                    {totalProceso}
                  </div>
              </div>
            </li>
          </ul>


      </div>

      <div className='estadisticas-generales'>

        <div className='pieGraph'>
          <h3>Estado</h3>
          <canvas id='ChartCompare' width='400' height='200'></canvas>
        </div>
        <div className='pieGraph'>
          <h3>Nivel de respuesta</h3>
          <canvas id='NRes' width='400' height='200'></canvas>
        </div>


      </div>

      <div className='footerStats'>
        <div className='statCate'>
          <h3>Categoría</h3>
          <canvas id='statsChart' width='400' height='200'></canvas>
        </div>
        
        <div className='statArea'>
          <h3>Área</h3>
          <canvas id='ChartArea' width='400' height='200'></canvas>
        </div>
        <div className='statArea'>
          <h3>Reclamos por mes</h3>
          <canvas id='ChartReclamosMes' width='400' height='200'></canvas>
        </div>

      </div>
    </div>

  );
};

export default Datos;