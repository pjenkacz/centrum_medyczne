import React, { useState } from 'react'
import axios from 'axios'
import { useLocation, useNavigate} from 'react-router-dom'
const Update = () => {
    const [pacjent, setPacjent] = useState({
        imie:"",
        nazwisko:"",
        pesel:"",
        adres:"",
        telefon:"",
        email:"",
    });
    const navigate = useNavigate()
    const location = useLocation()
    const pacjentId = location.pathname.split("/")[2]
    const handleChange = (e) =>{
        setPacjent(prev=>({...prev, [e.target.name]: e.target.value }))
    }

    const handleclick = async e =>{
        e.preventDefault()

        try{
            await axios.put("http://localhost:8800/pacjenci/" + pacjentId, pacjent)
            navigate("/pacjenci")
        }catch(err){
            console.log(err)
        }

    }
    console.log(pacjent)
    return (
        <div className="form">
            <h1>Aktualizuj dane pacjenta</h1>
            <input type="text" placeholder="imie" onChange={handleChange} name="imie"  />
            <input type="text" placeholder="nazwisko" onChange={handleChange} name="nazwisko" />
            <input type="text" placeholder="pesel" onChange={handleChange} name="pesel"  />
            <input type="text" placeholder="adres" onChange={handleChange} name="adres"  />
            <input type="text" placeholder="telefon" onChange={handleChange} name="telefon"  />
            <input type="text" placeholder="email" onChange={handleChange} name="email"  />
            <button class="formButton" onClick={handleclick}>Aktualizuj</button>
        
        </div>
    )
}

export default Update