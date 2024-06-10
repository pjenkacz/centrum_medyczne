import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate} from 'react-router-dom'
import {Link} from 'react-router-dom'
const AddLekarz = () => {
    const [lekarz, setLekarz] = useState({
        imie:"",
        nazwisko:"",
        specjalizacja_id:null,
        numer_licencji:"",
        telefon:""
    });

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

    const navigate = useNavigate()
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
            await axios.post("http://localhost:8800/lekarze", lekarz)
            navigate("/lekarze")
        }catch(err){
            console.log(err)
        }

    }
    // const setSpecjalizacja (e) =><{\
    //     setLekarz
    // }
    console.log(specjalizacje)
    console.log(lekarz)
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
            <button className="dodajButton" onClick={handleclick}>Dodaj</button>
        
        </div>
    )
}

export default AddLekarz