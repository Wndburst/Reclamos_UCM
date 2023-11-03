import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "./NavBar";
import axios from "axios";

const DetalleReclamo = () => {
  const { id } = useParams();
  const [reclamo, setReclamo] = useState(null);

  useEffect(() => {
    getReclamoDetalle();
  }, [id]);

  const getReclamoDetalle = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/reclamos/${id}`);
      console.log("Datos del reclamo:", response.data);
      setReclamo(response.data);
    } catch (error) {
      console.error("Error al obtener el detalle del reclamo:", error);
    }
  };

  if (!reclamo) {
    return <p>No se pudo cargar el detalle del reclamo.</p>;
  }

  return (
    <div>
      <NavBar />
      <h2>{reclamo.TITULO_RECLAMO}</h2>
      <p>Categoría: {reclamo.NOMBRE_CATEGORIA}</p>
      <p>Descripción: {reclamo.DESCRIPCION_RECLAMO}</p>
      <p>Estado: {reclamo.NOMBRE_ESTADO}</p>
    </div>
  );
};

export default DetalleReclamo;
