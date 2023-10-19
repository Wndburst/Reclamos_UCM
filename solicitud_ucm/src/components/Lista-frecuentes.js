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
        <button
          style={{ 
            border: 'none', 
            background: 'none', 
            cursor: 'pointer', 
            padding: 0,
            margin: 0,
          }}
          onClick={() => toggleItem(index)}
        >
          <h3>{faq.question}</h3>
        </button>
        {expandedItems[index] && <p>{faq.answer}</p>}
      </li>
    ))}
  </ul>
</div>
  );
}

export default ListaFrecuentes;
