import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Chart } from 'chart.js';
import styled from 'styled-components';
import io from 'socket.io-client';


const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const ChartCanvas = styled.canvas`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`;

const MobileChartCanvas = styled.canvas`
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
`;

const CryptoInfo = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
`;

const CryptoInfoItem = styled.div`
  flex: 1;
  text-align: center;
`;

const NewsList = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const NewsItem = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
`;

const CACHE_DURATION = 300000; // Cache duration in milliseconds (5 minutes)

const CryptoData = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [selectedCrypto, setSelectedCrypto] = useState('bitcoin');
  const [selectedTimeframe, setSelectedTimeframe] = useState('1');
  const [selectedCurrency, setSelectedCurrency] = useState('usd');
  const [exchangeRate, setExchangeRate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cryptoInfo, setCryptoInfo] = useState(null);
  const [news, setNews] = useState([]);

  const socket = io('https://ws.coincap.io', {
    // Options for the socket.io-client connection (if needed)
  });


  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch exchange rate data for the selected currency
        const exchangeRate = await fetchExchangeRate(selectedCurrency);
        setExchangeRate(exchangeRate);
      } catch (error) {
        console.error('Error fetching exchange rate:', error);
      }

      // Fetch crypto data and news articles
      try {
        const [cryptoResponse, newsResponse] = await Promise.all([
          fetchCryptoData(selectedCrypto, selectedTimeframe),
          fetchNews(selectedCrypto),
        ]);

        setCryptoData(cryptoResponse.data);
        setCryptoInfo(cryptoResponse.data);
        setNews(newsResponse.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();

    // Set up WebSocket subscription for real-time updates
    const channel = `trades:${selectedCrypto}`;
    socket.emit('subscribe', channel);

    socket.on('trade', (tradeData) => {
      const { coin } = tradeData;
      if (coin === selectedCrypto) {
        setCryptoData((prevData) => ({
          ...prevData,
          price: tradeData.priceUsd,
          volume: tradeData.volumeUsd24Hr,
        }));
      }
    });

    // Clear WebSocket subscription on component unmount
    return () => {
      socket.emit('unsubscribe', channel);
    };
  }, [selectedCrypto, selectedTimeframe, selectedCurrency]);

  useEffect(() => {
    // Create and update the chart when cryptoData changes
    if (cryptoData.length === 0 || loading) return;

    const ctx = document.getElementById('chart').getContext('2d');
    const mobileCtx = document.getElementById('mobile-chart').getContext('2d');

    const data = {
      labels: cryptoData?.time || [],
      datasets: [
        {
          label: 'Price (USD)',
          data: cryptoData?.priceUsd || [],
          borderColor: '#007bff',
          borderWidth: 1,
          fill: false,
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          type: 'time',
          time: {
            unit: 'day',
          },
        },
      },
    };

    const chart = new Chart(ctx, {
      type: 'line',
      data: data,
      options: options,
    });

    const mobileChart = new Chart(mobileCtx, {
      type: 'line',
      data: data,
      options: options,
    });

    // Clear the old chart instances on component unmount
    return () => {
      chart.destroy();
      mobileChart.destroy();
    };
  }, [cryptoData, loading]);

  // Helper functions for fetching data
  async function fetchExchangeRate(currency) {
    try {
      // Fetch exchange rate data from an API or source
      // For demonstration purposes, we'll use a placeholder API that returns a static exchange rate.
      const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${currency}`);
      const exchangeRate = response?.data?.rates?.USD || 1.0;
      return exchangeRate;
    } catch (error) {
      console.error('Error fetching exchange rate:', error);
      return 1.0; // Return 1.0 as a fallback value if fetching exchange rate fails
    }
  }

  async function fetchCryptoData(crypto, timeframe) {
    try {
      // Fetch crypto data from an API or source
      // For demonstration purposes, we'll use a placeholder API that returns random data.
      const response = await axios.get(
        `https://api.coincap.io/v2/assets/${crypto}/history?interval=${timeframe}d`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching crypto data:', error);
      throw error;
    }
  }

  async function fetchNews(crypto) {
    try {
      // Fetch news data from an API or source
      // For demonstration purposes, we'll return static news data.
      return {
        data: [
          {
            title: 'News Article 1',
            published: '2023-08-05',
          },
          {
            title: 'News Article 2',
            published: '2023-08-04',
          },
          // Add more news articles as needed
        ],
      };
    } catch (error) {
      console.error('Error fetching news data:', error);
      throw error;
    }
  }

  // Function to handle crypto selection change
  const handleCryptoChange = (event) => {
    setSelectedCrypto(event.target.value);
  };

  // Function to handle timeframe selection change
  const handleTimeframeChange = (event) => {
    setSelectedTimeframe(event.target.value);
  };

  // Function to handle currency selection change
  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container>
      <ChartCanvas id="chart"></ChartCanvas>
      <MobileChartCanvas id="mobile-chart"></MobileChartCanvas>
      <CryptoInfo>
        <CryptoInfoItem>
          <h2>{cryptoInfo?.name}</h2>
          <p>{cryptoInfo?.symbol}</p>
        </CryptoInfoItem>
        <CryptoInfoItem>
          <h2>{cryptoData?.price}</h2>
          <p>
            {selectedCurrency.toUpperCase()} | 1 {selectedCrypto.toUpperCase()} ={' '}
            {exchangeRate} {selectedCurrency.toUpperCase()}
          </p>
        </CryptoInfoItem>
        <CryptoInfoItem>
          <h2>{cryptoData?.volume}</h2>
          <p>24h Volume</p>
        </CryptoInfoItem>
      </CryptoInfo>
      <NewsList>
        {news.map((article, index) => (
          <NewsItem key={index}>
            <h3>{article.title}</h3>
            <p>{article.published}</p>
          </NewsItem>
        ))}
      </NewsList>
    </Container>
  );
};

export default CryptoData;
