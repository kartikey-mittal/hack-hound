import React, { useState } from 'react';
import axios from 'axios';

const OPENAI_API_KEY = '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';

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  const generateResponse = async (inputText) => {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions', // Corrected URL
        {
          model: 'gpt-3.5-turbo', // Specify the model to use
          messages: [
            {
              role: 'system',
              content: 'You are a helpful assistant.'
            },
            {
              role: 'user',
              content: inputText
            }
          ]
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`
          }
        }
      );

      const generatedText = response.data.choices[0].message.content;
      setMessages([...messages, { input: inputText, output: generatedText }]);
      setInputText('');
    } catch (error) {
      console.error('Error calling the OpenAI API:', error);
    }
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    generateResponse(inputText);
  };

  return (
    <div className="chat-interface">
      <form onSubmit={handleSubmit}>
        <textarea
          rows="5"
          value={inputText}
          onChange={handleInputChange}
          placeholder="Ask me anything..."
        />
        <button type="submit">Generate Response</button>
      </form>
      <div className="answer-section">
        {messages.map((message, index) => (
          <div key={index} className="message">
            <p className="input">{message.input}</p>
            <p className="output">{message.output}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatInterface;
