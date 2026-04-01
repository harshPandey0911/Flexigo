import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMessageSquare, FiArrowLeft, FiHeadphones, FiSend } from 'react-icons/fi';

export const SupportScreen: React.FC = () => {
  const navigate = useNavigate();
  const [chatMessages, setChatMessages] = useState<{ sender: 'bot' | 'user'; text: string }[]>([
    { sender: 'bot', text: "Hi there! 👋 I'm FlexiBot. How can I assist you with your rental today?" }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const botResponses: { [key: string]: string } = {
    'where': "Your vehicle is currently at the pickup location. You can track it in real-time on the map!",
    'refund': "Refunds are processed within 3-5 business days. Your refund amount depends on the cancellation policy.",
    'report': "Thank you for reporting! Our team will investigate immediately. Please check your email for updates.",
    'price': "Our prices are competitive and include insurance. Premium packages offer additional benefits.",
    'availability': "Check our live inventory on the home screen. Vehicles are available 24/7 in your area.",
    'accident': "In case of an accident, contact our 24/7 emergency line at +91 1800-123-4567.",
    'damage': "Please report damage with photos immediately. File a claim through the app for reimbursement.",
    'default': "Great question! Let me help you with that. Could you provide more details?",
  };

  const quickActions = [
    { label: 'Where is my vehicle?', key: 'where' },
    { label: 'How refund works?', key: 'refund' },
    { label: 'Report issue', key: 'report' },
    { label: 'Pricing details', key: 'price' },
    { label: 'Vehicle availability', key: 'availability' },
    { label: 'Emergency support', key: 'accident' },
  ];

  const getBotResponse = (input: string): string => {
    const lower = input.toLowerCase();
    for (const [key, response] of Object.entries(botResponses)) {
      if (lower.includes(key)) {
        return response;
      }
    }
    return botResponses['default'];
  };

  const handleSendMessage = (message: string) => {
    if (!message.trim()) return;

    // Add user message
    const newMessages = [...chatMessages, { sender: 'user' as const, text: message }];
    setChatMessages(newMessages);
    setChatInput('');

    // Simulate bot typing
    setIsTyping(true);
    setTimeout(() => {
      const botResponse = getBotResponse(message);
      setChatMessages((prev) => [...prev, { sender: 'bot', text: botResponse }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pb-4">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-gradient-to-r from-lime-500 via-emerald-500 to-teal-500 text-white shadow-lg p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/rentals')}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <FiArrowLeft size={24} />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <FiHeadphones size={20} className="text-white" />
            </div>
            <div>
              <h1 className="font-extrabold text-lg">Flexigo Support</h1>
              <p className="text-xs text-emerald-100 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-300 animate-pulse"></span> Online 24/7
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="max-w-4xl mx-auto px-4 py-6 flex flex-col gap-4">
        {/* Chat Messages */}
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 flex flex-col gap-4 min-h-[400px] max-h-[600px] overflow-y-auto">
          {chatMessages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs sm:max-w-md lg:max-w-lg px-4 py-3 rounded-xl shadow-sm ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-br-none'
                    : 'bg-gray-100 text-gray-800 border border-gray-200 rounded-bl-none'
                }`}
              >
                <p className="text-sm sm:text-base break-words">{msg.text}</p>
              </div>
            </motion.div>
          ))}

          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-gray-100 text-gray-800 px-4 py-3 rounded-xl border border-gray-200 rounded-bl-none flex gap-2">
                <span className="w-3 h-3 bg-gray-400 rounded-full animate-bounce"></span>
                <span className="w-3 h-3 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                <span className="w-3 h-3 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
              </div>
            </motion.div>
          )}
        </div>

        {/* Quick Actions */}
        {chatMessages.length === 1 && !isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2"
          >
            <p className="text-sm font-semibold text-gray-600 px-2">Quick Actions</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {quickActions.map((action, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(action.label)}
                  className="bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 hover:from-blue-200 hover:to-blue-100 font-semibold py-3 px-4 rounded-xl transition-colors border border-blue-200 shadow-sm text-left text-sm"
                >
                  {action.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Input Area */}
        <div className="bg-white rounded-2xl shadow-lg p-4 flex gap-2">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(chatInput);
            }}
            className="flex-1 flex gap-2"
          >
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-gray-100 rounded-full px-4 py-3 outline-none text-sm focus:bg-gray-50 transition-colors placeholder-gray-400"
            />
            <button
              type="submit"
              disabled={!chatInput.trim()}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white rounded-full p-3 transition-colors flex items-center justify-center"
              title="Send message"
            >
              <FiSend size={20} />
            </button>
          </form>
        </div>

        {/* Footer Info */}
        <div className="text-center">
          <p className="text-xs sm:text-sm text-gray-600">
            💬 Average response time: <span className="font-semibold">Less than 1 minute</span>
          </p>
          <p className="text-xs text-gray-400 mt-2">For emergencies, call +91 1800-123-4567</p>
        </div>
      </div>
    </div>
  );
};
