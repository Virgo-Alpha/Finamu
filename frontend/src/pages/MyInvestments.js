import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';
import NavBar from '../components/SignedInNav';
import '../assets/css/MyInvestments.css';

const MyInvestments = () => {
  const [investmentData, setInvestmentData] = useState(null);

  useEffect(() => {
    // Mock fetch investment data (replace with real API call)
    const fetchData = async () => {
      const data = {
        monthlyInvestments: [
          { month: 'Jan', amount: 300 },
          { month: 'Feb', amount: 450 },
          { month: 'Mar', amount: 350 },
          { month: 'Apr', amount: 400 },
          { month: 'May', amount: 500 },
          { month: 'Jun', amount: 600 },
          { month: 'Jul', amount: 700 },
          { month: 'Aug', amount: 800 },
          { month: 'Sep', amount: 750 },
          { month: 'Oct', amount: 900 },
          { month: 'Nov', amount: 850 },
          { month: 'Dec', amount: 1000 },
        ],
        tagsDistribution: [
          { tag: 'Drama', value: 5 },
          { tag: 'Comedy', value: 3 },
          { tag: 'Action', value: 4 },
          { tag: 'Documentary', value: 2 },
          { tag: 'Thriller', value: 6 },
        ],
        totalInvestment: 7500,
        investmentsByCountry: [
          { name: 'Nigeria', size: 4000 },
          { name: 'South Africa', size: 3000 },
          { name: 'Kenya', size: 2000 },
          { name: 'Egypt', size: 1500 },
          { name: 'Ghana', size: 1000 },
          { name: 'Morocco', size: 900 },
          { name: 'Ethiopia', size: 800 },
          { name: 'Tanzania', size: 700 },
          { name: 'Uganda', size: 600 },
          { name: 'Senegal', size: 500 },
        ],
      };
      setInvestmentData(data);
    };
    fetchData();
  }, []);

  if (!investmentData) return <p>Loading...</p>;

  return (
    <div className="container">
      <NavBar />
      <div className="my-investments-dashboard">
        <h2>My Investments</h2>
        <div className="total-investment">
          <h3>Total Investment: USD {investmentData.totalInvestment}</h3>
        </div>

        <div className="chart-container">
          <div className="chart-item">
            <Plot
              data={[
                {
                  x: investmentData.monthlyInvestments.map(item => item.month),
                  y: investmentData.monthlyInvestments.map(item => item.amount),
                  type: 'bar',
                  marker: { color: '#8884d8' },
                },
              ]}
              layout={{ width: 600, height: 300, title: 'Monthly Investments' }}
            />
          </div>

          <div className="chart-item">
            <Plot
              data={[
                {
                  type: 'pie',
                  labels: investmentData.tagsDistribution.map(item => item.tag),
                  values: investmentData.tagsDistribution.map(item => item.value),
                  hole: 0.4,
                },
              ]}
              layout={{ width: 500, height: 400, title: 'Investment Distribution by Tags' }}
            />
          </div>

          <div className="chart-item">
            <Plot
              data={[
                {
                  type: 'treemap',
                  labels: investmentData.investmentsByCountry.map(item => item.name),
                  parents: Array(investmentData.investmentsByCountry.length).fill(''),
                  values: investmentData.investmentsByCountry.map(item => item.size),
                  textinfo: 'label+value',
                  hoverinfo: 'label+value+percent entry',
                  marker: { colors: '#8884d8' },
                },
              ]}
              layout={{ width: 600, height: 500, title: 'Investments by Country' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyInvestments;
