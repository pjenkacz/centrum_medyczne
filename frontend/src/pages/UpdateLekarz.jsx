import React, { useState } from 'react'
import axios from 'axios'
import { useLocation, useNavigate} from 'react-router-dom'
const UpdateLekarz = () => {
    const [lekarz, setLekarz] = useState({
        imie:"",
        nazwisko:"",
        specjalizacja_id:null,
        numer_licencji:"",
        telefon:""
    });

    const navigate = useNavigate()
    const location = useLocation()
    const lekarzId = location.pathname.split("/")[2]
    const handleChange = (e) => {
        const { name, value } = e.target;
        
        if (name === 'specjalizacja_id') {
            const selectedSpecjalizacja = specjalizacje.find(spec => spec.nazwa === value);
            setLekarz(prev => ({
                ...prev,
                [name]: selectedSpecjalizacja ? selectedSpecjalizacja.id : ''
            }));
        } else {
            setLekarz(prev => ({
                ...prev,
                [name]: value
            }));
        }
        
        console.log(e);
    };

    const handleclick = async e =>{
        e.preventDefault()

        try{
            await axios.put("http://localhost:8800/lekarze/" + lekarzId, lekarz)
            navigate("/lekarze")
        }catch(err){
            console.log(err)
        }

    }
    console.log(pacjent)
    return (
        <div className="form">
            <h1>Dodaj Lekarza</h1>
            <input type="text" placeholder="imie" onChange={handleChange} name="imie"  />
            <input type="text" placeholder="nazwisko" onChange={handleChange} name="nazwisko" />
            <input list="specjalizacje" placeholder="Wybierz specjalizację" onChange={handleChange} name="specjalizacja_id" />
                <datalist id="specjalizacje">
                    {specjalizacje.map(specjalizacja =>(
                        <option key={specjalizacja.id} value={specjalizacja.nazwa} id={specjalizacja.id}/>
                    ))}
                </datalist>
            <input type="number" placeholder="Numer licencji" onChange={handleChange} name="numer_licencji"  />            
            <input type="text" placeholder="telefon" onChange={handleChange} name="telefon"  />           
            <button onClick={handleclick}>Aktualizuj</button>
        
        </div>
    )
}

export default UpdateLekarz