import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate} from 'react-router-dom'
import {Link} from 'react-router-dom'
const SetAppointment = () => {
    const [wizyta, setWizyta] = useState({
        pacjent_id:null,
        lekarz_id:null,
        data:null,
        opis:"",
        status:"zarejestrowana"
    });

    const [pacjenci, setPacjenci] = useState([])
    
    useEffect(()=> {
        const fetchAllPacjenci = async () =>{
            try{
                const res = await axios.get("http://localhost:8800/pacjenci")
                setPacjenci(res.data) 
            }catch(err){
                console.log(err)
            }
        }
        fetchAllPacjenci()
    },[]);

    const [lekarze, setLekarze] = useState([])
    
    useEffect(()=> {
        const fetchAllLekarze = async () =>{
            try{
                const res = await axios.get("http://localhost:8800/lekarze")
                setLekarze(res.data) 
            }catch(err){
                console.log(err)
            }
        }
        fetchAllLekarze()
    },[]);

    const navigate = useNavigate()
    const handleChange = (e) => {
        
         const { name, value } = e.target;
        
         if (name === 'pacjent_id') {
            const selectedPacjent = pacjenci.find(pacjent => pacjent.pesel === value.split(" ")[2]);
            setWizyta(prev => ({
                ...prev,
                [name]: selectedPacjent ? selectedPacjent.id : ''
            }));
        } else if (name === 'lekarz_id') {
            const selectedLekarz = lekarze.find(lekarz => lekarz.numer_licencji === value.split(" ")[2]); // Zakładam, że `value` jest w odpowiednim formacie
            setWizyta(prev => ({
                ...prev,
                [name]: selectedLekarz ? selectedLekarz.id : ''
            }));
        } else {
            setWizyta(prev => ({
                ...prev,
                [name]: value
            }));
        }
        console.log(wizyta)
        

    };

    const handleclick = async e =>{
        e.preventDefault()

        try{
            await axios.post("http://localhost:8800/wizyty", wizyta)
            navigate("/wizyty")
        }catch(err){
            console.log(err)
        }

    }
  

    return (
        <div className="form">
            <h1>Umów wizyte</h1>
            <input list="pacjenci" placeholder="Wybierz pacjenta" onChange={handleChange} name="pacjent_id" />
                <datalist id="pacjenci">
                    {pacjenci.map(pacjent =>(
                        <option key={pacjent.id} value={pacjent.imie + " " + pacjent.nazwisko + " " + pacjent.pesel} id={pacjent.id}/>
                    ))}
                </datalist>
            <input list="lekarze" placeholder="Wybierz lekarza" onChange={handleChange} name="lekarz_id" />
                <datalist id="lekarze">
                    {lekarze.map(lekarz =>(
                        <option key={lekarz.id} value={lekarz.imie + " " + lekarz.nazwisko + " " + lekarz.numer_licencji} id={lekarz.id}/>
                    ))}
                </datalist>            
            <input type="date" placeholder="Wybierz date" onChange={handleChange} name="data"  />            
            <input type="text" placeholder="Opis" onChange={handleChange} name="opis"  />           
            <button className="dodajButton" onClick={handleclick}>Umów wizyte</button>
        
        </div>
    )
}

export default SetAppointment