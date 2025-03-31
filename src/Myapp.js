import React, { useState } from 'react';
import { Button } from './components/ui/button'; // Adjust the path based on your folder structure
import { Card, CardContent } from './components/ui/card'; // Adjust the path based on your folder structure

function Home() {
  const grades = [
    {
      name: "RB 1",
      specs: [
        "Calorific Value Basis: 6,000 kcal/kg NCV",
        "Calorific Value Min: 5,850 kcal/kg NCV",
        "Total Moisture (ARB): 12.0% Max",
        "Volatile Matter (ARB): 22.0% Min",
        "Ash (ARB): 15.0% Max",
        "Sulphur (ARB): 1.0% Max",
        "Hardgrove Grindability Index (HGI): 45–70",
        "Nominal Topsize: 50 mm",
        "IDT (Reducing Atmosphere): Min 1,250 °C",
        "Calcium Oxide in Ash (DB): 12% max"
      ]
    },
    {
      name: "RB 2",
      specs: [
        "Calorific Value Basis: 5,800 kcal/kg NCV",
        "Calorific Value Min: 5,550 kcal/kg NCV",
        "Total Moisture (ARB): 14.0% Max",
        "Volatile Matter (ARB): 20.0% Min",
        "Ash (ARB): 17.0% Max",
        "Sulphur (ARB): 1.2% Max",
        "Hardgrove Grindability Index (HGI): 45–70",
        "Nominal Topsize: 50 mm",
        "IDT (Reducing Atmosphere): Min 1,200 °C",
        "Calcium Oxide in Ash (DB): 14% max"
      ]
    },
    {
      name: "RB 3",
      specs: [
        "Calorific Value Basis: 5,500 kcal/kg NCV",
        "Calorific Value Min: 5,300 kcal/kg NCV",
        "Total Moisture (ARB): 16.0% Max",
        "Volatile Matter (ARB): 18.0% Min",
        "Ash (ARB): 19.0% Max",
        "Sulphur (ARB): 1.5% Max",
        "Hardgrove Grindability Index (HGI): 45–70",
        "Nominal Topsize: 50 mm",
        "IDT (Reducing Atmosphere): Min 1,150 °C",
        "Calcium Oxide in Ash (DB): 16% max"
      ]
    }
  ];

  // Chatbot state variables
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // Handle sending user input
  const handleSend = () => {
    if (input.trim()) {
      const newMessages = [...messages, { text: input, sender: "user" }];
      setMessages(newMessages);
      setInput("");

      // Simulate bot response (Replace with API or actual bot logic)
      setTimeout(() => {
        const botResponse = "Hello! How can I assist you today?";
        setMessages([...newMessages, { text: botResponse, sender: "bot" }]);
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-700 text-white p-4">
      {/* Title and Grades section */}
      <h1 className="text-3xl font-bold mb-6">Blue Germany Holdings (Pty) Ltd</h1>
      <h2 className="text-xl mb-4">Suppliers of Coal - RB1, RB2, and RB3 Grades</h2>
      {grades.map((grade, index) => (
        <Card key={index} className="w-full max-w-2xl bg-white text-black shadow-lg rounded-xl p-4 mb-4">
          <CardContent>
            <h3 className="text-2xl font-semibold mb-2">{grade.name}</h3>
            <ul className="list-disc pl-5 mb-4">
              {grade.specs.map((spec, i) => (
                <li key={i}>{spec}</li>
              ))}
            </ul>
            <Button className="bg-blue-500 text-white px-4 py-2 rounded-md">Learn More</Button>
          </CardContent>
        </Card>
      ))}

      {/* Chatbot Section */}
      <div className="mt-8 w-full max-w-2xl">
        <h2 className="text-2xl font-semibold mb-4 text-center">Chat with our Bot</h2>
        <div id="chat" className="bg-white text-black p-4 rounded-lg shadow-md" style={{ height: "300px", overflowY: "auto" }}>
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              {msg.sender === "user" ? (
                <div style={{ textAlign: "right", color: "white", backgroundColor: "#007bff" }}>
                  {msg.text}
                </div>
              ) : (
                <div style={{ textAlign: "left", backgroundColor: "#f1f1f1" }}>
                  {msg.text}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Chat input and send button */}
        <div className="flex items-center mt-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask something..."
            className="w-full p-2 rounded-md border border-gray-300"
          />
          <Button onClick={handleSend} className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md">
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Home;  // Change from `module.exports` to `export default` for React component
