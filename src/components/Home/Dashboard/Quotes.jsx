import { useState, useEffect } from 'react';

const Quotes = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    fetchQuote();
  }, []);

  const fetchQuote = async () => {
    try {
      const response = await fetch("https://type.fit/api/quotes");
      const quotes = await response.json();
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      const cleanedAuthor = randomQuote.author ? randomQuote.author.replace(", typefit", "") : "Unknown";
      setQuote(randomQuote.text);
      setAuthor(cleanedAuthor);
    } catch (error) {
      console.error("Error fetching data:", error);
      setQuote("Failed to fetch quote.");
      setAuthor("");
    }
  };

  return (
    <div className="w-full p-4 bg-white rounded shadow-2xl flex flex-col gap-3">
      <p className="text-sm text-gray-800">{quote}</p>
      <p className="text-right text-xs text-gray-600">— {author}</p>
      <button 
        onClick={fetchQuote}
        className="w-full px-3 py-1 bg-teal-500 text-white rounded hover:border-teal-500 hover:bg-white hover:text-black transition duration-200">
        New Quote
      </button>
    </div>
  );
};

export default Quotes;
