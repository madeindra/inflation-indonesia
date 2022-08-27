import React, { useState } from 'react';
import styles from './App.module.css';
import data from './data/inflation.json';

function App() {
  const yearData = Object.keys(data);
  const rateData = Object.values(data);

  const [currentValue, setCurrentValue] = useState(0);
  const [predictedValue, setPredictedValue] = useState(0);
  const [equalValue, setEqualValue] = useState(0);
  
  const [formattedCurrentValue, setFormattedCurrent] = useState('0');

  const [from, setFrom] = useState(2011);
  const [to, setTo] = useState(2022);

  function calculate() {
    const fromIndex = yearData.findIndex((item) => Number(item) === Number(from));
    const toIndex = yearData.findIndex((item) => Number(item) === Number(to));

    if (fromIndex === -1 || toIndex === -1){
      return;
    }

    let totalInflation = 0;

    if (from < to) {
      for (let idx = fromIndex; idx <= toIndex; idx++) {
        totalInflation += rateData[idx];
      }

      setPredictedValue(Math.floor(currentValue - (currentValue * (totalInflation / 100))));
      setEqualValue(Math.floor(currentValue + (currentValue * (totalInflation / 100))));
    }

    if (from > to) {
      for (let idx = fromIndex; idx >= toIndex; idx--) {
        totalInflation += rateData[idx];
      }

      setPredictedValue(Math.floor(currentValue + (currentValue * (totalInflation / 100))));
      setEqualValue(Math.floor(currentValue - (currentValue * (totalInflation / 100))));
    }
  }

  function formatSeparator(text) {
    return String(text).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  function stringToNumber(text) {
    return Number(String(text).replace('.', ''));
  }

  return (
    <div>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          onChange={(event) => {
            setCurrentValue(stringToNumber(event.target.value));
            setFormattedCurrent(formatSeparator(stringToNumber(event.target.value)))
          }}
          value={formattedCurrentValue}
        />
      </div>
      <div className={styles.row}>
      </div>
      <div className={styles.row}>
        <p><strong>{formatSeparator(currentValue)}</strong> pada tahun <strong>{from}</strong> setara dengan <strong>{formatSeparator(predictedValue)}</strong> pada tahun <strong>{to}</strong></p>
      </div>
      <div className={styles.row}>
      <p>Butuh <strong>{formatSeparator(equalValue)}</strong> pada tahun <strong>{to}</strong> agar nilainya sama dengan <strong>{formatSeparator(currentValue)}</strong> pada tahun <strong>{from}</strong></p>
      </div>
    </div>
  );
}

export default App;