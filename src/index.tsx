import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import HomePage from './Components/HomePage/HomePage';
import ZillowScraper from './Components/Scraper/ZillowScraper';
import './index.css'
import Button from '@mui/material/Button';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('scraper');

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