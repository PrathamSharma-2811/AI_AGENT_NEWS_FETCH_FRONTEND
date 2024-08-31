import React, { useState } from 'react';
import axios from 'axios';
import Markdown from 'react-markdown';


function App() {
  const [query, setQuery] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false); // Loader state

  const handleSearch = async () => {
    setLoading(true); // Show loader
    try {
      const response = await axios.post('http://127.0.0.1:8000/query', { query });
      console.log(response.data);
      
      // Ensure content is a string
      const contentString = typeof response.data === 'string' ? response.data : JSON.stringify(response.data);
      setContent(contentString);
    } catch (error) {
      console.error("Error fetching the news:", error);
      setContent('An error occurred. Please try again.');
    }
    setLoading(false); // Hide loader
  };

  const renderContent = (data) => {
    if (typeof data !== 'string') {
      return <p className="text-red-500">Invalid data format received.</p>;
    }
    
    // Split the content by double newlines to separate news items
    const contentArray = data.split(/\n\s*\n/); // Handles potential extra spaces/newlines

    return contentArray.map((item, index) => {
      // Extract title, link, image URL, and description using regex
      const titleMatch = item.match(/title:\s*(.+)/);
      const linkMatch = item.match(/link:\s*(https?:\/\/[^\s]+)/);
      const imageUrlMatch = item.match(/image:\s*(https?:\/\/[^\s]+)/);
      const descriptionMatch = item.match(/description:\s*(.+)/);

      return (
        <div key={index} className="my-4 p-4 bg-white rounded-md shadow-md">
          {titleMatch && <h2 className="text-2xl font-bold text-purple-700">{titleMatch[1]}</h2>}
          {descriptionMatch && <p className="my-2 text-gray-700">{descriptionMatch[1]}</p>}
          {imageUrlMatch && <img src={imageUrlMatch[1]} alt="news" className="w-full rounded-md shadow-md my-4" />}
          {linkMatch && (
            <a href={linkMatch[1]} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">
              Read more
            </a>
          )}
        </div>
      );
    });
  };

  return (
    <div className="min-h-screen p-4 bg-gradient-to-r from-purple-500 to-white">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-md shadow-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-purple-700">Agent News Feed</h1>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-3 border rounded mb-6"
          placeholder="Enter your query"
        />
        <button
          onClick={handleSearch}
          className="bg-purple-600 text-white py-3 px-6 rounded hover:bg-purple-700 w-full mb-6"
          disabled={loading} // Disable button while loading
        >
          {loading ? 'Searching...' : 'Search'}
        </button>

        {loading ? (
          <div className="flex justify-center items-center my-6">
            <div className="w-12 h-12 border-4 border-purple-600 border-dashed rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="space-y-6">
          <Markdown>{content}</Markdown>
            {/* {renderContent(content)} */}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;


