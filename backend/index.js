import express from "express"
import mysql from "mysql"
import cors from "cors"
const app = express()

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"centrum_medyczne"
})

app.use(express.json())
app.use(cors())


app.get("/", (req,res)=>{
    res.json("hello there")
})
 
app.get("/pacjenci", (req,res)=>{
    const q = "SELECT * FROM pacjenci"
    db.query(q,(err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.get("/lekarze", (req,res)=>{
    const q = "SELECT * FROM lekarze"
    db.query(q,(err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.get("/specjalizacje", (req,res)=>{
    const q = "SELECT * FROM specjalizacje"
    db.query(q,(err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.get("/wizyty", (req,res)=>{
    const q = "SELECT * FROM wizyty"
    db.query(q,(err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.get("/daneDoWizyty", (req,res)=>{
    const q = `
    SELECT w.id AS wizyta_id, l.id AS lekarz_id, s.id AS specjalizacja_id, w.opis AS opis_wizyty
    FROM wizyty w
    INNER JOIN lekarze l ON w.lekarz_id = l.id
    INNER JOIN specjalizacje s ON l.specjalizacja_id = s.id
    ORDER BY wizyta_id ASC;
  `;
    db.query(q,(err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.post("/pacjenci", (req,res)=>{
    const q = "INSERT INTO pacjenci (`imie`, `nazwisko`, `pesel`, `adres`, `telefon`, `email`) VALUES (?)"
    const values = [
        req.body.imie,
        req.body.nazwisko,
        req.body.pesel,
        req.body.adres,
        req.body.telefon,
        req.body.email
    ]
    db.query(q, [values], (err, data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
    })

app.post("/lekarze", (req,res)=>{
    const q = "INSERT INTO lekarze (`imie`, `nazwisko`, `specjalizacja_id`, `numer_licencji`, `telefon`) VALUES (?)"
    const values = [
        req.body.imie,
        req.body.nazwisko,
        req.body.specjalizacja_id,
        req.body.numer_licencji,
        req.body.telefon,
    ]
    db.query(q, [values], (err, data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
    })

app.post("/wizyty", (req,res)=>{
        const q = "INSERT INTO wizyty (`pacjent_id`, `lekarz_id`, `data`, `opis`, `status`) VALUES (?)"
        const values = [
            req.body.pacjent_id,
            req.body.lekarz_id,
            req.body.data,
            req.body.opis,
            req.body.status,
        ]
        db.query(q, [values], (err, data)=>{
            if(err) return res.json(err);
            return res.json(data);
        })
        })
        
    app.post("/recepty", (req, res) => {
            const q = "INSERT INTO recepty (`wizyta_id`, `lekarz_id`, `data`, `opis`) VALUES (?, ?, ?, ?)";
            const values = [
                req.body.wizyta_id,
                req.body.lekarz_id,
                req.body.dataRecepta,
                req.body.opisRecepta
            ];
        
            db.query(q, values, (err, data) => {
                if (err) {
                    console.error(err); // Loguj błąd na serwerze
                    return res.status(500).json({ error: "Błąd przy wstawianiu danych do bazy" });
                }
                return res.status(201).json({ message: "Recepta dodana pomyślnie", data: data });
            });
        });
        
app.post("/skierowania", (req, res) => {
        const q = "INSERT INTO skierowania (`wizyta_id`, `specjalizacja_id`, `data`, `opis`) VALUES (?, ?, ?, ?)";
            const values = [
                req.body.wizyta_id,
                req.body.specjalizacja_id,
                req.body.dataSkierowanie,
                req.body.opisSkierowanie
            ];
        
            db.query(q, values, (err, data) => {
                if (err) {
                    console.error(err); // Loguj błąd na serwerze
                    return res.status(500).json({ error: "Błąd przy wstawianiu danych do bazy" });
                }
                return res.status(201).json({ message: "Recepta dodana pomyślnie", data: data });
            });
        });
app.delete("/pacjenci/:id", (req,res)=>{
    const pacjentId = req.params.id;
    const q = "DELETE FROM pacjenci WHERE id = ?"
    db.query(q, [pacjentId], (err,data)=>{
        if(err) return res.json(err);
        return res.json("Pacjent zostal usunięty.")
    })
})

app.delete("/lekarze/:id", (req,res)=>{
    const lekarzId = req.params.id;
    const q = "DELETE FROM lekarze WHERE id = ?"
    db.query(q, [lekarzId], (err,data)=>{
        if(err) return res.json(err);
        return res.json("Lekarz zostal usunięty.")
    })
})

app.put("/pacjenci/:id", (req,res)=>{
    const pacjentId = req.params.id;
    const q = "UPDATE pacjenci SET `imie` = ?, `nazwisko` = ?, `pesel` = ?, `adres` = ?, `telefon` = ?, `email` = ? WHERE id = ?"
    const values = [
        req.body.imie,
        req.body.nazwisko,
        req.body.pesel,
        req.body.adres,
        req.body.telefon,
        req.body.email
    ]
    db.query(q, [...values, pacjentId], (err,data)=>{
        if(err) return res.json(err);
        return res.json("Dane pacjenta zostaly zakutalizowane.")
    })
})

app.put("/lekarze/:id", (req,res)=>{
    const lekarzId = req.params.id;
    const q = "UPDATE lekarze SET `imie` = ?,`nazwisko` = ?, `specjalizacja_id` = ?, `numer_licejncji` = ?, `telefon` = ? WHERE id = ?"
    const values = [
        req.body.imie,
        req.body.nazwisko,
        req.body.specjalizacja_id,
        req.body.numer_licencji,
        req.body.telefon,
    ]
    db.query(q, [...values, lekarzId], (err,data)=>{
        if(err) return res.json(err);
        return res.json("Dane lekarza zostaly zakutalizowane.")
    })
})

app.put("/wizyty/:id", (req,res)=>{
    const wizytaId = req.params.id;
    const values = [
        req.body.lekarz_id,
        req.body.data,
        req.body.opis,
    ]
    const q = "UPDATE wizyty SET `lekarz_id` = ?, `data` = ? , `opis` = ?   WHERE id = ?"
    db.query(q, [...values, wizytaId], (err,data)=>{
        if(err) return res.json(err);
        return res.json("Wizyta odwołana.")
    })
})

app.put("/wizyty1/:id", (req,res)=>{
    const wizytaId = req.params.id;
    const q = "UPDATE wizyty SET `status` = 'odwołana' WHERE id = ?"
    db.query(q, [wizytaId], (err,data)=>{
        if(err) return res.json(err);
        return res.json("Wizyta odwołana.")
    })
})

app.put("/wizyty2/:id", (req,res)=>{
    const wizytaId = req.params.id;
    const q = "UPDATE wizyty SET `status` = 'zrealizowana' WHERE id = ?"
    db.query(q, [wizytaId], (err,data)=>{
        if(err) return res.json(err);
        return res.json("Wizyta odwołana.")
    })
})
app.listen(8800 , ()=>{
    console.log("Connected to backend")
})