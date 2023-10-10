import React, { useState, useEffect } from 'react';
import faqsData from '../json/FAQ.json';

function ListaFrecuentes({ filter }) {
  const [faqs, setFaqs] = useState([]);
  const [expandedItems, setExpandedItems] = useState({});

  useEffect(() => {
    setFaqs(faqsData.FAQ);
  }, []);

  const toggleItem = (index) => {
    setExpandedItems((prevExpandedItems) => ({
      ...prevExpandedItems,
      [index]: !prevExpandedItems[index],
    }));
  };

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toUpperCase().includes(filter)
  );

  return (
      <div>
        <ul>
          {filteredFaqs.map((faq, index) => (
            <li key={index}>
              <h3 onClick={() => toggleItem(index)}>{faq.question}</h3>
              {expandedItems[index] && <p>{faq.answer}</p>}
            </li>
          ))}
        </ul>
      </div>
  );
}

export default ListaFrecuentes;
