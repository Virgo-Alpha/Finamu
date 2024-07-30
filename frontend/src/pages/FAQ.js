import React, { useState } from 'react';
import '../assets/css/FAQPage.css';
import NavBar from '../components/SignedInNav';
import Footer from '../components/Footer';

const FAQPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What is Finamu?",
      answer: "Finamu is a platform that allows users to invest in film projects using traditional and cryptocurrency methods. It leverages blockchain technology to ensure transparency and security in investments."
    },
    {
      question: "How does blockchain benefit film investments?",
      answer: "Blockchain provides a transparent and secure ledger of all transactions, ensuring that investments and returns are recorded accurately. It also helps in managing rights and royalties in a transparent manner."
    },
    {
      question: "How can I invest in a film project on Finamu?",
      answer: "To invest, sign up on Finamu, browse available projects, and choose one to invest in. You can use credit cards, bank transfers, mobile money, or cryptocurrencies to fund your investment."
    },
    {
      question: "What are the risks of investing in films?",
      answer: "Investing in films can be risky as returns depend on the success of the project. It's important to review project details, the track record of filmmakers, and market conditions before investing."
    },
    {
      question: "What is the expected Return on Investment (ROI)?",
      answer: "ROI varies by project and is influenced by factors such as the project's success, revenue generated, and the terms of the investment contract. Finamu provides estimated ROI figures based on project data."
    },
    {
      question: "How will I receive my returns?",
      answer: "Returns are distributed according to the terms outlined in the investment contract. This can be through regular payouts or a lump sum at the end of the project, depending on the agreement."
    },
    {
      question: "Can I withdraw my investment before the project ends?",
      answer: "Typically, investments are locked in until the project concludes, but certain projects may allow early withdrawal under specific conditions. Check the project's terms and conditions."
    },
    {
      question: "How does Finamu ensure the security of investments?",
      answer: "Finamu uses blockchain technology and secure payment methods to protect investments. It also conducts due diligence on projects and filmmakers to reduce risk."
    },
    {
      question: "What happens if a film project fails?",
      answer: "If a project fails, the loss is shared among investors as specified in the investment agreement. It's important to understand the risk before investing."
    },
    {
      question: "Can international investors participate?",
      answer: "Yes, Finamu welcomes international investors. However, they should be aware of their own country's regulations regarding investments and potential taxes on returns."
    },
    {
      question: "What types of films can I invest in?",
      answer: "Finamu features a variety of film projects, including feature films, documentaries, and short films. The platform provides detailed information about each project to help investors make informed decisions."
    }
  ];

  return (
    <div className="faq-page">
        <NavBar />
      <h1>Frequently Asked Questions</h1>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <div
              className="faq-question"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
            </div>
            <div className={`faq-answer ${activeIndex === index ? 'active' : ''}`}>
              {faq.answer}
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default FAQPage;
