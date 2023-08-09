import axios from "axios";

const fetchCryptoData = async () => {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=365"
    );

    const data = response.data.prices.map((priceData) => ({
      date: new Date(priceData[0]).toISOString().slice(0, 10),
      price: priceData[1],
    }));

    return data;
  } catch (error) {
    console.error("Error fetching crypto data:", error);
    return [];
  }
};

export default fetchCryptoData;
