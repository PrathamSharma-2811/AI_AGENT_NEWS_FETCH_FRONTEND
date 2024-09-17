import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // useNavigate for redirection

const Home = () => {
  const [query, setQuery] = useState('');
  const [content, setContent] = useState([]); // Ensure content is an array by default
  const [loading, setLoading] = useState(false); // Loader state
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Check for the JWT token on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      // Redirect to login if no token is found
      navigate('/login');
    }
  }, [navigate]);

  const handleSearch = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');
  
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/query',
        { query },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      console.log(response.data); // Check what the response contains
  
      // Check if response contains articles (array) or a string (raw output)
      if (Array.isArray(response.data.articles)) {
        setContent({ articles: response.data.articles });
      } else if (typeof response.data.output === 'string') {
        setContent({ output: response.data.output });
      } else {
        setContent([]); // Fallback for empty or unexpected data
      }
  
    } catch (error) {
      console.error("Error fetching the news:", error);
      setContent([]); // Reset content on error
    }
    setLoading(false);
  };
  

  const renderContent = (data) => {
    // If articles are present, render them
    if (data.articles && Array.isArray(data.articles) && data.articles.length > 0) {
      return data.articles.map((item, index) => (
        <div key={index} className="my-4 p-4 bg-gray-300 rounded-md shadow-md">
          <h2 className="text-2xl font-bold text-purple-700">{item.title}</h2>
          <p className="my-2 text-gray-700">{item.description}</p>
          {item.image_url && (
            <img src={item.image_url} alt={item.title} className="w-full rounded-md shadow-md my-4" />
          )}
          {item.url && (
            <button
              onClick={() => window.open(item.url, '_blank', 'noopener,noreferrer')}
              className="text-purple-600 hover:underline"
            >
              Read more
            </button>
          )}
        </div>
      ));
    }
  
    // If raw output (string) is present, render it as a summary
    if (data.output) {
      return (
        <div className="my-4 p-4 bg-gray-300 rounded-md shadow-md">
          <h2 className="text-2xl font-bold text-purple-700">Summary</h2>
          <pre className="my-2 text-gray-700 whitespace-pre-wrap">{data.output}</pre>
        </div>
      );
    }
  
    // Fallback if no articles or output
    return <p>No news available for your query.</p>;
  };
  
  

  return (
    <div className="relative flex justify-center">
      <img alt="ima2" src="https://www.zmo.ai/wp-content/uploads/2023/09/360_F_410726461_FDpDfV4DBgKZDMHUkAXRbTQ5PmkkrGlx.jpg" className="object-cover absolute h-screen w-screen" />

      <div className="absolute w-screen h-screen p-4">
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
              {renderContent(content)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
