// News.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const News = () => {
  const [news, setNews] = useState([]);

  const apiKey = 'ee4746dd0ca7440c859a7ad4be130a1b';
  const apiUrl = `https://newsapi.org/v2/everything?q=cryptocurrency&apiKey=${apiKey}`;

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await axios.get(apiUrl);
      setNews(response.data.articles);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  return (
    <div>
      <h2>Crypto News</h2>
      <ul>
        {news.map((article) => (
          <li key={article.url}>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              {article.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default News;
