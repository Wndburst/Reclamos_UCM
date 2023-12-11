import React, { useState, useEffect } from "react";

function ListaFrecuentes() {
  const [faqData, setFaqData] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  useEffect(() => {
    // Realizar la solicitud al backend cuando el componente se carga
    fetch("http://localhost:8000/Showfaq")
      .then((response) => response.json())
      .then((data) => {
        console.log("Datos recibidos del backend:", data);
        setFaqData(data);
      })
      .catch((error) =>
        console.error("Error al obtener preguntas frecuentes:", error)
      );
  }, []);

  console.log("Datos en el estado:", faqData);

  const toggleAnswer = (faq) => {
    if (selectedQuestion && selectedQuestion.ID_FAQ === faq.ID_FAQ) {
      setSelectedQuestion(null);
    } else {
      setSelectedQuestion(faq);
    }
  };

  return (
    <div className="flex-faq">
      <h2 className="title-faq">Preguntas Frecuentes</h2> 
      <ul>
        {faqData.map((faq) => (
          <li key={faq.ID_FAQ} onClick={() => toggleAnswer(faq)}>
            <h5>{faq.PREGUNTAS_FAQ}</h5>
            {selectedQuestion && selectedQuestion.ID_FAQ === faq.ID_FAQ && (
              <div className="respuesta-faq-display">{faq.RESPUESTA_FAQ}</div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaFrecuentes;
