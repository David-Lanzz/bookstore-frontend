import { Route } from 'react-router-dom';
import { Routes } from 'react-router';
import { useNavigate } from 'react-router-dom';
import Home from './routes/Home';
import Header from './routes/Header';
import SignupRoute from './routes/Login/Signup';
import { useSelector } from "react-redux";
import LoginRoute from './routes/Login/Login';
import NotFound from './routes/NotFound';
import { useEffect } from 'react';
import SchoolsRoute from './routes/SchoolsRoute';
import DepartmentsRoute from './routes/DepartmentsRoute';
import LevelsRoute from './routes/LevelsRoute';
import CategoriesRoute from './routes/CategoriesRoute';

function App() {
  const authStore = useSelector(store => store.auth);
  const signed_in = authStore.data.signed_in
  const navigate = useNavigate()
  // useEffect(() => {
  //   if (signed_in) {
  //     navigate("/")
  //   }
  // }, [signed_in])

  return (
    <div className="App">
      <Routes>
        <>
          <Route path='/' element={<SchoolsRoute />} />
          <Route path='/departments/:school_id' element={<DepartmentsRoute />} />
          <Route path='/levels/:department_id' element={<LevelsRoute />} />
          <Route path='/categories/:level_id' element={<CategoriesRoute />} />
          <Route path="/header" element={<Header />}>
            <Route path='books' element={<Home />} />
          </Route>
        </>
        <Route path="/" element={<LoginRoute />} />
        <Route path='/sign_up' element={<SignupRoute />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
