import AddEmployee from './Dashboard/AddEdit/AddEmployee';
import Dashboard from './Dashboard/Dashboard';
import AddAdmin from './Dashboard/AddEdit/AddAdmin';
import Map from './Dashboard/Map/Map';
import { Navigate } from 'react-router-dom';
import CityAdmins from './Dashboard/Users/CityAdmins';
import Login from './Website/Login';
import { Routes , Route } from 'react-router-dom';
import GovAdmins from './Dashboard/Users/GovAdmins';
import Employees from './Dashboard/Users/Employees';
import Reports from './Dashboard/Reports/Reports';
import SingleReport from './Dashboard/Reports/SingleReport';
import EditAdmin from './Dashboard/AddEdit/EditAdmin';
import EditEmployee from './Dashboard/AddEdit/EditEmployee';
import CityAnalysis from './Dashboard/Analysis/CityAnalysis';
import GovAnalysis from './Dashboard/Analysis/GovAnalysis';
import PublicRoute from './Auth/PublicRoute';
import PrivateRoute from './Auth/PrivateRoute';
import RequireAuth from './Auth/RequireAuth';
import './App.css';
import { useContext } from 'react';
import { AuthContext } from './Context/AuthContext';
import SingleEmployee from './Dashboard/Users/SingleEmployee';
function App() {

  const { user } = useContext(AuthContext)

  return (
    <Routes>
      <Route path="*" element={<PublicRoute><Navigate to="/login" /></PublicRoute>} />
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Navigate to={`${user?.cityId ? "/dashboard/city-data" : "/dashboard/governorate-data"}`} />} />
          <Route element={<RequireAuth allowedRoles={[2000]} />}>
            <Route path="governorate-admins/:id" element={<EditAdmin />} />
            <Route path="city-admins/:id" element={<EditAdmin />} />
            <Route path="add-admin" element={<AddAdmin />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[2000, 1999]} />}>
            <Route path="governorate-admins" element={<GovAdmins />} />
            <Route path="governorate-data" element={<GovAnalysis />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[2000, 1998]} />}>
            <Route path="add-employee" element={<AddEmployee />} />
            <Route path="employees/:id" element={<EditEmployee />} />
          </Route>
          <Route path="map" element={<Map />} />
          <Route path="settings" element={<h1>Profile</h1>} />
          <Route path="city-admins" element={<CityAdmins />} />
          <Route path="employees" element={<Employees />} />
          <Route path="employees/stats/:id" element={<SingleEmployee />} />
          <Route path="reports" element={<Reports />}/>
          <Route path="reports/:id" element={<SingleReport />}/>
          <Route path="city-data" element={<CityAnalysis />} />
        </Route>
      </Route>
    </Routes>
  );
} 

export default App;
