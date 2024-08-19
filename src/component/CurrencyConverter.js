import React, { useState, useEffect } from 'react';
import './CurrencyConverter.css';

const CurrencyConverter = () => {
  const [amount, setAmount] = useState('');
  const [convertedAmounts, setConvertedAmounts] = useState({
    USD: 0,
    EUR: 0,
    GBP: 0,
    RUB: 0,
  });
  const [usdToInrRate, setUsdToInrRate] = useState(null);

  const fetchCurrencyRates = async () => {
    try {
      const response = await fetch(
        `https://openexchangerates.org/api/latest.json?app_id=API_KEY`
      );
      const data = await response.json();
      console.log('API Response:', data); // Log API response to check data

      const usdToInr = data.rates.INR;
      console.log('USD to INR Rate:', usdToInr); // Log the INR to USD rate
      setUsdToInrRate(usdToInr);

      return {
        USD: 1, // USD to USD is always 1
        EUR: data.rates.EUR,
        GBP: data.rates.GBP,
        RUB: data.rates.RUB,
      };
    } catch (error) {
      console.error('Error fetching currency rates:', error);
      return {
        USD: 0,
        EUR: 0,
        GBP: 0,
        RUB: 0,
      };
    }
  };

  const convertCurrency = async () => {
    const rates = await fetchCurrencyRates();
    if (usdToInrRate && amount) {
      const amountInUsd = amount / usdToInrRate; // Convert INR to USD
      console.log('Amount in USD:', amountInUsd); // Log the converted amount in USD

      const converted = {
        USD: (amountInUsd * rates.USD).toFixed(2),
        EUR: (amountInUsd * rates.EUR).toFixed(2),
        GBP: (amountInUsd * rates.GBP).toFixed(2),
        RUB: (amountInUsd * rates.RUB).toFixed(2),
      };
      console.log('Converted Amounts:', converted); // Log the final converted amounts
      setConvertedAmounts(converted);
    }
  };

  useEffect(() => {
    if (amount) {
      convertCurrency();
    }
  }, [amount]);

  return (
    <div className="converter-container">
      <h2 className="converter-title">Currency Converter</h2>
      <input
        type="number"
        placeholder="Enter amount in INR"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="converter-input"
      />
      <div className="converter-results">
        <p>USD: {convertedAmounts.USD}</p>
        <p>EUR: {convertedAmounts.EUR}</p>
        <p>GBP: {convertedAmounts.GBP}</p>
        <p>RUB: {convertedAmounts.RUB}</p>
      </div>
    </div>
  );
};

export default CurrencyConverter;
