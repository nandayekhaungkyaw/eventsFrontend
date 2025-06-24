import React, { useState } from 'react';

const FaqSection = ({ faqs }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto my-10">
      <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
      <div id="accordion-flush" className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-gray-200 rounded-xl shadow-sm">
            <h2>
              <button
                type="button"
                className="flex items-center justify-between w-full px-6 py-5 font-medium text-gray-500 border-b border-gray-200 gap-3"
                onClick={() => toggle(index)}
                aria-expanded={activeIndex === index}
              >
                <span>{faq.question}</span>
                <svg
                  className={`w-3 h-3 transform transition-transform duration-300 ${activeIndex === index ? 'rotate-180' : ''}`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5 5 1 1 5"
                  />
                </svg>
              </button>
            </h2>
            <div className={`${activeIndex === index ? 'block' : 'hidden'} px-6 py-5 bg-gray-50 text-gray-700`}>
              {faq.answer}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqSection;

