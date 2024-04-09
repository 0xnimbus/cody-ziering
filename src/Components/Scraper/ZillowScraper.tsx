import React, { useState } from 'react';
import './ZillowScraper.css'
import axios from 'axios';
import cheerio from 'cheerio';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField'; 
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import Slider from '@mui/material/Slider'
import Box from '@mui/material/Box';

function sliderValueText(value: number) {
  return `${value}`;
}

const ZillowScraper: React.FC = () => {
  const [price, setPrice] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false); // Initialize loading state to false
  const [address, setAddress] = useState("Input Data"); // State to handle changes in the TextField
  const [sliderValue, setSliderValue] = useState<number[]>([0, 100]);

  const ScrapeZillow = async () => {
    setIsLoading(true); // Set loading state to true when starting the data fetching process
    try {
      const response = await axios.get(`https://www.zillow.com/${address}`);
      const $ = cheerio.load(response.data);
      const priceElement = $('.list-card-price');
      const firstPrice = priceElement.first().text().trim(); // Trim to remove leading/trailing whitespace
      setPrice(firstPrice);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false); // Set loading state to false after data is fetched or on error
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value); // Update Address state when input changes
  };

  const sliderHandleChange = (event: Event, newValue: number | number[]) => {
    setSliderValue(newValue as number[]);
  };

  return (
    <div className='main-div'>
      <h2 className='title'>Zillow Property Price Scraper</h2>

      {price && <p>Price: {price}</p>}

      <div id="location-input">
        <h1>
          {/* BLANK H1 TO FIX SPACING */}
        </h1>
      <TextField
        label="Enter location"
        placeholder={address}
        onChange={handleInputChange}
      />
      </div>

      <div>
        <FormControl>
          <FormLabel id="select-home-type">Select Type Of Home</FormLabel>
            <RadioGroup
              aria-labelledby="select-home-type"
              defaultValue="House"
              name="radio-buttons-group"
              row
            >
              <FormControlLabel value="Houses" control={<Radio />} label="Houses" />
              <FormControlLabel value="Townhomes" control={<Radio />} label="Townhomes" />
              <FormControlLabel value="Condos" control={<Radio />} label="Condos" />
            </RadioGroup>
        </FormControl>
      </div>

      <div className='slider-div'>
        <h3>
          Minimum and Maximum Value
        </h3>
          <Slider
            getAriaLabel={() => 'Minimum And Maximum Distance'}
            value={sliderValue}
            onChange={sliderHandleChange}
            valueLabelDisplay="auto"
            getAriaValueText={sliderValueText}
          />
      </div>

      <div id="location-button">
        <h1>
          {/* BLANK H1 TO FIX SPACING */}
        </h1>
      <Button 
        variant="outlined"
        disabled={isLoading}
        onClick={ScrapeZillow}
      >
        {isLoading ? 'Fetching Data...' : 'Fetch Data'}
      </Button>
      </div>

    </div>
  );
};

export default ZillowScraper;
