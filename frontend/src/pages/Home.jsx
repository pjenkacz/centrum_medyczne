// Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../Home.css'; // Dodaj style według uznania

const Home = () => {
  return (
    <div className="home">
      <h1>Strona Główna</h1>
      <nav>
        <ul>
          <li><Link to="/pacjenci">Pacjenci</Link></li>
          <li><Link to="/lekarze">Lekarze</Link></li>
          <li><Link to="/wizyty">Wizyty</Link></li>
          <li><Link to="/pacjent/add">Dodaj Pacjenta</Link></li>
          <li><Link to="/lekarz/add">Dodaj Lekarza</Link></li>
          <li><Link to="/wizyta/add">Umów wizyte</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;
