import { getReclamosGeneralesEstadoAndArea } from '../../../models/estudiante/R/reclamoGeneralmodel.js'

export const getReclamosGenerales = (req, res) => {
  const { estado, area } = req.params;

  console.log(`Recibido estado: ${estado}, area: ${area}`);

  getReclamosGeneralesEstadoAndArea(estado, area, (err, result) => {
    if (err) {
      console.log('Error al ejecutar la consulta SQL:', err);
      res.status(500).send('Error interno del servidor');
    } else {
      console.log(`Resultados de la consulta: ${JSON.stringify(result)}`);
      res.json(result);
    }
  });
};