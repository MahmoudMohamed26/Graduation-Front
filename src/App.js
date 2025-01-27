import './App.css';
import Dashboard from './Dashboard/Dashboard';
import Login from './Website/Login';
import { Routes , Route } from 'react-router-dom';
function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />}>
        <Route path="add-admin" element={<h1>Add Admin</h1>} />
        <Route path="add-employee" element={<h1>Add Employee</h1>} />
        <Route path="city-admins" element={<h1>City Admins</h1>} />
        <Route path="governorate-admins" element={<h1>Governorate Admins</h1>} />
        <Route path="employees" element={<h1>Employees</h1>} />
        <Route path="generate-stats" element={<h1>Generate Stats</h1>} />
        <Route path="city-data" element={<h1>City Data</h1>} />
        <Route path="governorate-data" element={<h1>Governorate Data</h1>} />
      </Route>
    </Routes>
  );
}

export default App;
