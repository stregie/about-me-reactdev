import React from 'react';
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className = "container">
      <h1>React apps</h1>
      <p>List of React apps</p>
      <ul>
        <li><Link to = "/react/gallery/">Gallery</Link></li>
      </ul>
    </div>
  )
};

export default Home;
