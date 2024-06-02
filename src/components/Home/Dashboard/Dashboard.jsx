import { useState } from 'react';
import Quotes from './Quotes';
import ChatBot from './ChatBot';
const Dashboard = () => {
  const [funFact, setFunFact] = useState("");
  const generateFunFact = () => {
    const facts = [
      "Octopuses have three hearts.",
      "Honey never spoils.",
      "The unicorn is the national animal of Scotland.",
      "A group of flamingos is called a flamboyance."
    ];
    setFunFact(facts[Math.floor(Math.random() * facts.length)]);
  };

  return (
    <div className="min-h-screen w-full bg-teal-300 flex flex-col items-center justify-center overflow-auto">
      <div className="w-4/5 p-4  bg-white rounded shadow-md flex flex-col items-center gap-5">
        <h1 className="text-xl font-bold text-gray-800 mb-4"> Dashboard</h1>
        <ChatBot />
        <div className='w-full flex flex-col md:flex-row justify-around gap-8'>
        <Quotes />
        <div className="w-full p-4 pt-6 bg-white rounded  shadow-2xl flex  flex-col justify-between items-center  gap-3">
          <p className="text-gray-600 text-center">{funFact || "Generate a fun fact!"}</p>
          <button
            className="w-full px-3 py-1 text-center bg-teal-500 text-white rounded hover:border-teal-500 hover:bg-white hover:text-black transition duration-200"
            onClick={generateFunFact}
            >
            Generate Fun Fact
          </button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
