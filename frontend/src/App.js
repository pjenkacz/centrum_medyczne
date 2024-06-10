import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"
import Pacjenci from "./pages/Pacjenci";
import AddPacjent from "./pages/AddPacjent";
import AddLekarz from "./pages/AddLekarz";
import Update from "./pages/Update";
import Home from "./pages/Home"
import "./style.css"
import Lekarze from "./pages/Lekarze";
import Wizyty from "./pages/Wizyty";
import SetAppointment from "./pages/SetAppointment";
import UpdateWizyta from "./pages/UpdateWizyta";
import PutPrescription from "./pages/PutPrescription";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/pacjenci" element={<Pacjenci/>}/>
        <Route path="/lekarze" element={<Lekarze/>}/>
        <Route path="/wizyty" element={<Wizyty/>}/>
        <Route path="/pacjent/add" element={<AddPacjent/>}/>
        <Route path="/lekarz/add" element={<AddLekarz/>}/>
        <Route path="/lekarz/update/:id" element={<AddLekarz/>}/>
        <Route path="/update/:id" element={<Update/>}/>
        <Route path="/wizyta/add" element={<SetAppointment/>}/>
        <Route path="/wizyty/:id" element={<UpdateWizyta/>}/>
        <Route path="/recepty/:id" element={<PutPrescription/>}/>
      </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
