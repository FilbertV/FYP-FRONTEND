import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

const predefinedQA = [
  {
    question: "What product fits my window?",
    answer: "It depends on the window type! For large windows, we recommend curtains. For narrow or high windows, try roller blinds or rainbow blinds.",
  },
  {
    question: "How do I measure my window?",
    answer: "Use a tape measure to get the width and height of the inside or outside of the frame. Round up slightly to ensure full coverage.",
  },
  {
    question: "Can I customize the size?",
    answer: "Yes! All Vistura products can be ordered with custom width and height. Just input the sizes during ordering.",
  },
  {
    question: "How long is delivery?",
    answer: "Most products are delivered in 3–5 working days. Custom sizes may take up to 7–10 days.",
  },
];

const ChatbotPopup = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: "Hi! I’m Vee 👋 — how can I help you today?" }
  ]);

  const handleQuestion = (qa) => {
    setMessages((prev) => [
      ...prev,
      { from: 'user', text: qa.question },
      { from: 'bot', text: qa.answer },
    ]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition"
        >
          <MessageCircle />
        </button>
      )}

      {open && (
        <div className="w-80 bg-white shadow-2xl rounded-xl border border-gray-200">
          <div className="flex justify-between items-center p-4 border-b">
            <span className="font-semibold text-lg">Vee</span>
            <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-red-500">
              <X />
            </button>
          </div>
          <div className="p-4 space-y-2 h-64 overflow-y-auto">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`text-sm px-3 py-2 rounded-xl max-w-[80%] ${
                  msg.from === 'bot'
                    ? 'bg-gray-200 text-gray-800 self-start'
                    : 'bg-blue-600 text-white self-end ml-auto'
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className="p-3 border-t space-y-2">
            {predefinedQA.map((qa, i) => (
              <button
                key={i}
                onClick={() => handleQuestion(qa)}
                className="w-full text-left text-sm bg-gray-100 hover:bg-gray-200 rounded-md px-3 py-2"
              >
                {qa.question}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotPopup;