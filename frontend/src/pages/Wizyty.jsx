import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import "../wizyty.css"
const Wizyty = () => {
    const [wizyty, setWizyty] = useState([])
    const [pacjenci, setPacjenci] = useState([])
    useEffect(()=> {
        const fetchAllWizyty = async () =>{
            try{
                const res = await axios.get("http://localhost:8800/wizyty")
                setWizyty(res.data) 
            }catch(err){
                console.log(err)
            }
        }
        fetchAllWizyty()
    },[]);

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

    
    const [data, setData] = useState({
        wizytaId:null,
        pacjentImie:'',
        pacjentNazwisko:'',
        pacjentPesel:'',
        lekarzImie:'',
        lekarzNazwisko:'',
        data:null,
        opis:"",
        status:""
    });
    const handleSelectWizyta = (wizytaId) => {
        const selectedWizyta = wizyty.find(wizyta => wizyta.id === wizytaId);
        
        if (selectedWizyta) {
            const selectedPacjent = pacjenci.find(pacjent => pacjent.id === selectedWizyta.pacjent_id);
            const selectedLekarz = lekarze.find(lekarz => lekarz.id === selectedWizyta.lekarz_id);

            setData({
                wizytaId : wizytaId,
                pacjentImie: selectedPacjent ? selectedPacjent.imie : '',
                pacjentNazwisko: selectedPacjent ? selectedPacjent.nazwisko : '',
                pacjentPesel: selectedPacjent ? selectedPacjent.pesel : '',
                lekarzImie: selectedLekarz ? selectedLekarz.imie : '',
                lekarzNazwisko: selectedLekarz ? selectedLekarz.nazwisko : '',
                data: selectedWizyta.data,
                opis: selectedWizyta.opis,
                status: selectedWizyta.status
            });
        }
    };

    const handleOdwolanie = async (id) =>{
        
        try{
            console.log("elo")
            await axios.put("http://localhost:8800/wizyty1/"+id)
            window.location.reload()
        }catch(err){
            console.log(err)
        }
        }
    return (
        <div className="AppW">
            <h1>Dane wizyty</h1>
            <select onChange={(e) => handleSelectWizyta(parseInt(e.target.value))}>
                <option value="">Wybierz wizytę</option>
                {wizyty.map(wizyta => (
                    <option key={wizyta.id} value={wizyta.id}>
                        {`Wizyta ${wizyta.id}`}
                    </option>
                ))}
            </select>
            <div className="dataW">
                <h2>Pacjent</h2>
                <p>Imię: {data.pacjentImie}</p>
                <p>Nazwisko: {data.pacjentNazwisko}</p>
                <p>PESEL: {data.pacjentPesel}</p>
                <h2>Lekarz</h2>
                <p>Imię: {data.lekarzImie}</p>
                <p>Nazwisko: {data.lekarzNazwisko}</p>
                <h2>Szczegóły wizyty</h2>
                <p>Data: {data.data}</p>
                <p>Opis: {data.opis}</p>
                <p>Status: {data.status}</p>
                {data.status ==='zarejestrowana' && <button className="deleteW" onClick={() =>handleOdwolanie(data.wizytaId)} >Odwołaj wizyte</button>}
                <Link to={`/wizyty/${data.wizytaId}`}>{data.status === 'zarejestrowana' && <button className="updateW">Aktualizuj wizyte</button>}</Link>
                <br/><Link to={`/recepty/${data.wizytaId}`}>{data.status === 'zarejestrowana' && <button className="receptaW">Przejdź do wizyty</button>}</Link>
            </div>
            
        </div>
    );
};

export default Wizyty