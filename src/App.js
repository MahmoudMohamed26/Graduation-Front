import './App.css';
import AddEmployee from './Dashboard/Add/AddEmployee';
import Dashboard from './Dashboard/Dashboard';
import AddAdmin from './Dashboard/Add/AddAdmin';
import Map from './Dashboard/Map/Map';
import CityAdmins from './Dashboard/Users/CityAdmins';
import Login from './Website/Login';
import { Routes , Route } from 'react-router-dom';
import GovAdmins from './Dashboard/Users/GovAdmins';
import Employees from './Dashboard/Users/Employees';
import Reports from './Dashboard/Reports/Reports';
import SingleReport from './Dashboard/Reports/SingleReport';
function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />}>
        <Route path="add-admin" element={<AddAdmin />} />
        <Route path="add-employee" element={<AddEmployee />} />
        <Route path="map" element={<Map />} />
        <Route path="city-admins" element={<CityAdmins />} />
        <Route path="governorate-admins" element={<GovAdmins />} />
        <Route path="employees" element={<Employees />} />
        <Route path="reports" element={<Reports />}/>
        <Route path="reports/:id" element={<SingleReport />}/>
        <Route path="generate-stats" element={<h1>Generate Stats</h1>} />
        <Route path="city-data" element={<h1>City Data</h1>} />
        <Route path="governorate-data" element={<h1>Governorate Data</h1>} />
      </Route>
    </Routes>
  );
}

export default App;
