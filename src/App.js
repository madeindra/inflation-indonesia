import React, { useState } from 'react';
import styles from './App.module.css';
import data from './data/inflation.json';

function App() {
  const yearData = Object.keys(data);
  const rateData = Object.values(data);

  const [currentValue, setCurrentValue] = useState(0);
  const [from, setFrom] = useState(2021);
  const [to, setTo] = useState(2022);

  const [referenceValue, setReferenceValue] = useState(0);
  const [predictedValue, setPredictedValue] = useState(0);
  const [equalValue, setEqualValue] = useState(0);
  const [fromValue, setFromValue] = useState(2021);
  const [toValue, setToValue] = useState(2022);
  const [inflation, setInflation] = useState(0);

  function calculate() {
    const fromIndex = yearData.findIndex((item) => Number(item) === Number(from));
    const toIndex = yearData.findIndex((item) => Number(item) === Number(to));

    if (fromIndex === -1 || toIndex === -1) {
      return;
    }

    let totalInflation = 0;

    if (from === to) {
      setPredictedValue(currentValue);
      setEqualValue(currentValue);
    }

    if (from < to) {
      for (let idx = fromIndex; idx <= toIndex; idx++) {
        totalInflation += rateData[idx];
      }

      totalInflation = Number(totalInflation).toFixed(2);

      setPredictedValue(Math.floor(currentValue - (currentValue * (totalInflation / 100))));
      setEqualValue(Math.floor(currentValue + (currentValue * (totalInflation / 100))));
    }

    if (from > to) {
      for (let idx = fromIndex; idx >= toIndex; idx--) {
        totalInflation += rateData[idx];
      }

      totalInflation = Number(totalInflation).toFixed(2);

      setPredictedValue(Math.floor(currentValue + (currentValue * (totalInflation / 100))));
      setEqualValue(Math.floor(currentValue - (currentValue * (totalInflation / 100))));
    }

    setReferenceValue(currentValue);
    setFromValue(from);
    setToValue(to);
    setInflation(totalInflation);
  }

  function formatMonetary(text) {
    return String(text).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  return (
    <div>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          onChange={(event) => {
            setCurrentValue(Number(event.target.value))
          }
          }
        />
      </div>
      <div className={styles.row}>
        <button
          className={styles.button}
          onClick={() => {
            calculate();
          }}
        >
          Hitung
        </button>
      </div>
      <div className={styles.row}>
        <select onChange={(event) => setFrom(event.target.value)}>
          {
            yearData.map((year) => {
              return <option key={year} value={year}>{year}</option>
            })
          }
        </select>
        to
        <select onChange={(event) => setTo(event.target.value)}>
          {
            yearData.map((year) => {
              return <option key={year} value={year}>{year}</option>
            })
          }
        </select>
      </div>
      <div className={styles.row}>
        <p><strong>Rp.{formatMonetary(referenceValue)}</strong> pada tahun <strong>{fromValue}</strong> nilainya setara dengan <strong>Rp.{formatMonetary(predictedValue)}</strong> pada tahun <strong>{toValue}</strong> akibat inflasi <strong>{inflation}%</strong></p>
      </div>
      <div className={styles.row}>
        <p><strong>Rp.{formatMonetary(equalValue)}</strong> pada tahun <strong>{toValue}</strong> nilainya setara dengan <strong>Rp.{formatMonetary(referenceValue)}</strong> pada tahun <strong>{fromValue}</strong> akibat inflasi <strong>{inflation}%</strong></p>
      </div>
    </div>
  );
}

export default App;