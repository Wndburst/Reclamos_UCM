import { getFaq } from '../../../models/administrador/R/faqmodel.js'

export const showFaq = (req, res) => {
    getFaq((err, result) => {
    if (err) {
      console.error('Error al ejecutar la consulta SQL:', err);
      res.status(500).send('Error interno del servidor');
    } else {
      res.json(result);
    }
  });
};
