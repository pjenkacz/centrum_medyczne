import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
const Pacjenci = () => {
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
    const handleDelete = async (id) =>{
    try{
        await axios.delete("http://localhost:8800/pacjenci/"+id)
        //window.location.reload()
        setPacjenci(pacjenci.filter(pacjent => pacjent.id !== id))
    }catch(err){
        console.log(err)
    }
    }
    console.log(pacjenci)
    return (
        
        <div className="container">
            <h1>Poradnia Medyczna 420</h1>
            <div className="pacjenci">
                {pacjenci.map(pacjent=>(
                    <div className="pacjent" key={pacjent.id}>
                        <h2>{pacjent.imie}</h2>
                        <h2>{pacjent.nazwisko}</h2>
                        <span>PESEL: {pacjent.pesel}</span>
                        <span>Adres: {pacjent.adres}</span>
                        <span>Telefon: {pacjent.telefon}</span>
                        <span>Email: {pacjent.email}</span>
                        <button className="delete" onClick={()=>handleDelete(pacjent.id)}>Usuń dziada</button>
                        <Link to={`/update/${pacjent.id}`}><button className="update">Updatuj dziada</button></Link>
                        <br />  
                    </div>
                ))}
            </div>
            <Link to="../pacjent/add"> <button className="dodajButton" >Dodaj Pacjenta</button></Link>
        </div>
    )
}

export default Pacjenci