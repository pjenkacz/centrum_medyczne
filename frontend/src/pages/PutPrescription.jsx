import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const PutPrescription = () => {
  const [recepta, setRecepta] = useState({
    wizyta_id: null,
    lekarz_id: null,
    dataRecepta: null,
    opisRecepta: "",
  });

  const [skierowanie, setSkierowanie] = useState({
    wizyta_id: null,
    specjalizacja_id: null,
    dataSkierowanie: null,
    opisSkierowanie: "",
  });

  const [daneDoWizyty, setDaneDoWizyty] = useState([])
  const [isReceptaActive, setIsReceptaActive] = useState(true);
  const [isSkierowanieActive, setIsSkierowanieActive] = useState(true);
  
  const location = useLocation();
  const navigate = useNavigate();
  const wizytaId = +location.pathname.split("/")[2];

  // const [wizyty, setWizyty] = useState([]);
  // const [selectedWizyta, setSelectedWizyta] = useState(null);

  // useEffect(() => {
  //   const fetchAllWizyty= async () => {
  //     try {
  //       const res = await axios.get("http://localhost:8800/wizyty");
  //       setWizyty(res.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   fetchAllWizyty();
  // }, []);

  useEffect(() => {
    const fetchAllDane= async () => {
      try {
        const res = await axios.get("http://localhost:8800/daneDoWizyty");
        setDaneDoWizyty(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllDane();
  }, []);

  useEffect(() => {
    if (daneDoWizyty.length > 0) {
      const foundWizyta = daneDoWizyty.find(dane => dane.wizyta_id === wizytaId);
      console.log(foundWizyta) 
      if (foundWizyta) {
        setRecepta(prevState => ({
          ...prevState,
          wizyta_id: foundWizyta.wizyta_id,
          lekarz_id: foundWizyta.lekarz_id,
        }));

        setSkierowanie(prevState => ({
          ...prevState,
          wizyta_id: foundWizyta.wizyta_id,
          specjalizacja_id: foundWizyta.specjalizacja_id,
        }));
      } else {
        console.log("Nie znaleziono wizyty o ID:", wizytaId);
      }
    }
  }, [daneDoWizyty, wizytaId]);
  

  useEffect(() => {
    console.log("Recepta updated:", recepta);
  }, [recepta]);
  
  useEffect(() => {
    console.log("Skierowanie updated:", skierowanie);
  }, [skierowanie]);
  // useEffect(() => {
  //   if (selectedWizyta) {
  //     setRecepta(prevState => ({
  //       ...prevState,
  //       wizyta_id: selectedWizyta.wizyta_id,
  //       lekarz_id: selectedWizyta.lekarz_id,
  //     }));
  //     setSkierowanie(prevState => ({
  //       ...prevState,
  //       wizyta_id: selectedWizyta.wizyta_id,
  //       specjalizacja_id: selectedWizyta.specjalizacja_id,
  //     }));
  //     
  //   }
  // }, [selectedWizyta]);

  const handleChangeRecepta = (e) => {
    const { name, value } = e.target;
    console.log(recepta)
    setRecepta(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeSkierowanie = (e) => {
    const { name, value } = e.target;
    console.log(skierowanie)
    setSkierowanie(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      if (isReceptaActive && isSkierowanieActive) {
        console.log("Recepta data:", recepta);
        console.log("Skierowanie data:", skierowanie);
        await Promise.all([
          axios.post("http://localhost:8800/recepty", recepta),
          axios.post("http://localhost:8800/skierowania", skierowanie)
        ]);
      } else if (isReceptaActive) {
        console.log("Recepta data:", recepta);
        await axios.post("http://localhost:8800/recepty", recepta);
      } else if (isSkierowanieActive) {
        console.log("Skierowanie data:", skierowanie);
        await axios.post("http://localhost:8800/skierowania", skierowanie);
      }

      // Aktualizacja wizyty po zapisaniu danych
      await axios.put(`http://localhost:8800/wizyty2/${wizytaId}`);
      navigate("/wizyty");
    } catch (err) {
      console.log(err);
    }
  };


  console.log(daneDoWizyty)
  return (
    <div className="App">
      <div className="form-toggle">
        <button onClick={() => setIsReceptaActive(!isReceptaActive)}>
          {isReceptaActive ? 'Wyłącz Formularz Recepty' : 'Włącz Formularz Recepty'}
        </button>
        <button onClick={() => setIsSkierowanieActive(!isSkierowanieActive)}>
          {isSkierowanieActive ? 'Wyłącz Formularz Skierowania' : 'Włącz Formularz Skierowania'}
        </button>
      </div>

      <div className="forms-container">
        {isReceptaActive && (
          <div className="form">
            <h1>Wystaw receptę</h1>
            <input type="date" placeholder="Wybierz datę" onChange={handleChangeRecepta} name="dataRecepta" />
            <input type="text" placeholder="Opis" onChange={handleChangeRecepta} name="opisRecepta" />
          </div>
        )}

        {isSkierowanieActive && (
          <div className="form">
            <h1>Wystaw skierowanie</h1>
            <input type="date" placeholder="Wybierz datę" onChange={handleChangeSkierowanie} name="dataSkierowanie" />
            <input type="text" placeholder="Opis" onChange={handleChangeSkierowanie} name="opisSkierowanie" />
          </div>
        )}
      </div>
      
      <button className="formButton" onClick={handleClick}>Zapisz wizytę</button>
    </div>
    
  );
};

export default PutPrescription;
