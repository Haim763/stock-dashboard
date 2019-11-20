import React from 'react';
import { Bar } from 'react-chartjs-2';
import { DATA_TYPES } from '../utils';

const styles = {
  fontFamily: 'sans-serif',
  textAlign: 'center',
};

const commonDataset = {
  label: 'My First dataset',
  backgroundColor: 'rgba(255,99,132,0.2)',
  borderColor: 'rgba(255,99,132,1)',
  borderWidth: 1,
  hoverBackgroundColor: 'rgba(255,99,132,0.4)',
  hoverBorderColor: 'rgba(255,99,132,1)',
  data: [65, 59, 80, 81, 56, 55, 40]
}


const lineColors = ['rgba(255,99,132,0.4)', '#7dcc74', '#887a7a', '#aed269'];

export default ({ labels, data }) => {
  const lineData = {
    labels,
    datasets: []
  };
  data.forEach((typeData, i) => {
    lineData.datasets[i] = {
      ...commonDataset,
      label: DATA_TYPES[i],
      borderColor: lineColors[i],
      backgroundColor: lineColors[i],
      data: typeData,
    }
  })

  return (
    <div style={styles}>
      <Bar data={lineData} />
    </div>
  );
}