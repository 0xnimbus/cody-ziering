import React, { useState } from 'react';
import './HomePage.css';

function HomePage() {
  //State 
  const [count, setCount] = useState(0)

  //Functions
  const increment = () => {
    setCount(count + 1)
  }

  //Body
  return (
    <div className="HP-Div">
      <h1 className="Title-header">
        BY GOD IT WORKS 
      </h1>
      <p> 
        Count: {count}
      </p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}

export default HomePage;
