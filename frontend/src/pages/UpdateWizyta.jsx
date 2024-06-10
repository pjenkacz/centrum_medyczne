import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useLocation, useNavigate} from 'react-router-dom'

const UpdateWizyta = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const wizytaId = location.pathname.split("/")[2]
    
    const [wizyta, setWizyta] = useState({
        lekarz_id : null,
        data : null,
        opis : null
    });

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

    
    const handleChange = (e) =>{
        const { name, value } = e.target;

        if (name === 'lekarz_id') {
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
    }

    const handleclick = async e =>{
        e.preventDefault()

        try{
            await axios.put("http://localhost:8800/wizyty/" + wizytaId, wizyta)
            navigate("/wizyty")
        }catch(err){
            console.log(err)
        }

    }
    return (
        <div className="form">
            <h1>Aktualizuj dane wizyty</h1>
            <input list="lekarze" placeholder="Wybierz lekarza" onChange={handleChange} name="lekarz_id" />
                <datalist id="lekarze">
                    {lekarze.map(lekarz =>(
                        <option key={lekarz.id} value={lekarz.imie + " " + lekarz.nazwisko + " " + lekarz.numer_licencji} id={lekarz.id}/>
                    ))}
                </datalist>            
            <input type="date" placeholder="Wybierz date" onChange={handleChange} name="data"  />            
            <input type="text" placeholder="Opis" onChange={handleChange} name="opis"  />           
            <button className="dodajButton" onClick={handleclick}>Aktualizuj wizyte</button>
        
        </div>
    )
}

export default UpdateWizyta