import { getReclamosByUserIdAndEstado } from '../../../models/estudiante/R/reclamoPerfilmodel.js'

export const getReclamos = (req, res) => {
  const { userid, estado } = req.params;
  console.log(`Recibido userid: ${userid}, estado: ${estado}`);

  getReclamosByUserIdAndEstado(userid, estado, (err, result) => {
    if (err) {
      console.error('Error al ejecutar la consulta SQL:', err);
      res.status(500).send('Error interno del servidor');
    } else {
      console.log(`Resultados de la consulta: ${JSON.stringify(result)}`);
      res.json(result);
    }
  });
};
