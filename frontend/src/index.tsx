import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import HomePage from './Components/HomePage/HomePage';
import ZillowScraper from './Components/Scraper/ZillowScraper';
import './index.css'
import Button from '@mui/material/Button';
import axios from 'axios'

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('scraper');
  const [data, setData] = useState([{}]);

  useEffect(() => {
    fetch("http://localhost:8080/users")
      .then(res => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then(data => {
        setData(data);
        console.log(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'scraper':
        return <ZillowScraper />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className='app-div'>
        <div className='button'>
          <Button 
            variant="contained"
            size='large'
            onClick={() => setCurrentPage('home')}
            >
              Home
            </Button>
        </div>
        <div className='button'>
          <Button 
          variant="contained"
          size='large'
          onClick={() => setCurrentPage('scraper')}
          >
            Zillow Scraper
          </Button>
        </div>
      </div>
        {renderPage()}
      
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);