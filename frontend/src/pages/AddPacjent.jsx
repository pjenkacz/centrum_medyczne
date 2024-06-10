import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate} from 'react-router-dom'
import {Link} from 'react-router-dom'
const AddPacjent = () => {
    const [pacjent, setPacjent] = useState({
        imie:"",
        nazwisko:"",
        pesel:"",
        adres:"",
        telefon:"",
        email:"",
    });
    const navigate = useNavigate()
    const handleChange = (e) =>{
        setPacjent(prev=>({...prev, [e.target.name]: e.target.value }))
    }

    const handleclick = async e =>{
        e.preventDefault()

        try{
            await axios.post("http://localhost:8800/pacjenci", pacjent)
            navigate("/pacjenci")
        }catch(err){
            console.log(err)
        }

    }
    console.log(pacjent)
    return (
        <div className="form">
            <h1>Dodaj Pacjenta</h1>
            <input type="text" placeholder="imie" onChange={handleChange} name="imie"  required/>
            <input type="text" placeholder="nazwisko" onChange={handleChange} name="nazwisko" required/>
            <input type="text" placeholder="pesel" onChange={handleChange} name="pesel"  required/>
            <input type="text" placeholder="adres" onChange={handleChange} name="adres"  required/>
            <input type="text" placeholder="telefon" onChange={handleChange} name="telefon"  required/>
            <input type="text" placeholder="email" onChange={handleChange} name="email"  required/>
            <button class="dodajButton" onClick={handleclick}>Dodaj</button>
        
        </div>
    )
}

export default AddPacjent