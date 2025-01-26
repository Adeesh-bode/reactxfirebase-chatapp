import { useState, useEffect } from "react";

const Quotes = () => {
  const [quote, setQuote] = useState(""); // Holds the quote text
  const [author, setAuthor] = useState(""); // Holds the author name

  // Fetch a new quote when the component mounts
  useEffect(() => {
    fetchQuote();
  }, []);

  const fetchQuote = async () => {
    try {
      const key = import.meta.env.VITE_QUOTES_API_NINJA_API_KEY; // Fetch API key from environment variables

      const response = await fetch("https://api.api-ninjas.com/v1/quotes", {
        method: "GET",
        headers: {
          "X-Api-Key": key, // Use the API key
        },
      });

      // Check if the response is successful
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
      }

      const quotes = await response.json();

      // Select a random quote from the response
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];


      console.log(randomQuote)
      // Clean the author string if needed
      const cleanedAuthor = randomQuote.author
        ? randomQuote.author.replace(", typefit", "")
        : "Unknown";

      setQuote(randomQuote.quote); // Set the quote text
      setAuthor(cleanedAuthor); // Set the author name
    } catch (error) {
      console.error("Error fetching quote:", error);

      // Handle errors by displaying a fallback message
      setQuote("Failed to fetch quote. Please try again later.");
      setAuthor("");
    }
  };

  return (
    <div className="w-full p-4 bg-white rounded shadow-2xl flex flex-col gap-3">
      {/* Quote text */}
      <p className="text-sm text-gray-800">{quote}</p>

      {/* Quote author */}
      <p className="text-right text-xs text-gray-600">— {author}</p>

      {/* Button to fetch a new quote */}
      <button
        onClick={fetchQuote}
        className="w-full px-3 py-1 bg-teal-500 text-white rounded hover:border-teal-500 hover:bg-white hover:text-black transition duration-200"
      >
        New Quote
      </button>
    </div>
  );
};

export default Quotes;
