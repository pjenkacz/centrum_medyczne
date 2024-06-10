import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
const Lekarze = () => {
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
    const [specjalizacje, setSpecjalizacje] = useState([])
    
    useEffect(()=> {
        const fetchAllSpecjalizacje = async () =>{
            try{
                const res = await axios.get("http://localhost:8800/specjalizacje")
                setSpecjalizacje(res.data) 
            }catch(err){
                console.log(err)
            }
        }
        fetchAllSpecjalizacje()
    },[]);
    const getSpecjalizacjaNazwa = (specjalizacja_id) => {
        const specjalizacja = specjalizacje.find(spec => spec.id === specjalizacja_id);
        return specjalizacja ? specjalizacja.nazwa : "Nieznana";
    };

    const handleDelete = async (id) =>{
    try{
        await axios.delete("http://localhost:8800/lekarze/"+id)
        //window.location.reload()
        setLekarze(lekarze.filter(lekarze => lekarze.id !== id))
    }catch(err){
        console.log(err)
    }
    }
    return (
        
        <div className="container">
            <h1>Poradnia Medyczna 420</h1>
            <div className="">
                {lekarze.map(lekarz=>(
                    <div className="lekarze" key={lekarz.id}>
                        <h2>{lekarz.imie}</h2>
                        <h2>{lekarz.nazwisko}</h2>
                        <span>Specjalizacja: {getSpecjalizacjaNazwa(lekarz.specjalizacja_id)}</span>
                        <span>Numer licencji: {lekarz.numer_licencji}</span>
                        <span>Telefon : {lekarz.telefon}</span>
                        <button className="delete" onClick={()=>handleDelete(lekarz.id)}>Usuń dziada</button>
                        <button className="update"><Link to={`/lekarz/update/${lekarz.id}`}>Updatuj dziada</Link></button>
                        <br />  
                    </div>
                ))}
            </div>
            <Link to="/lekarz/add"><button className="dodajButton">Dodaj Lekarza</button></Link>
        </div>
    )
}

export default Lekarze