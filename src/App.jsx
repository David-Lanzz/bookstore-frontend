import { Route } from 'react-router-dom';
import { Routes } from 'react-router';
import { useNavigate } from 'react-router-dom';
import Home from './routes/Home';
import Header from './routes/Header';
import Category from './routes/Category';
import SignupRoute from './routes/Login/Signup';
import { useSelector } from "react-redux";
import LoginRoute from './routes/Login/Login';
import NotFound from './routes/NotFound';
import { useEffect } from 'react';
import SchoolsRoute from './routes/SchoolsRoute';
import DepartmentsRoute from './routes/DepartmentsRoute';
import LevelsRoute from './routes/LevelsRoute';

function App() {
  const authStore = useSelector(store => store.auth);
  const signed_in = authStore.data.signed_in
  const navigate = useNavigate()
  useEffect(()=> {
    if (signed_in) {
      navigate("/")
    }
  },[signed_in])

  return (
    <div className="App">
      <Routes>
        {signed_in ? (
          <>
          <Route path='/' element={<SchoolsRoute />} />
          <Route path='/departments' element={<DepartmentsRoute />} />
          <Route path='/levels' element={<LevelsRoute />} />
            <Route path="/header" element={<Header />}>
              <Route path='books' element={<Home />} />
              <Route path="category" element={<Category />} />
            </Route>
          </>
        ) : (
          <>
            <Route path="/" element={<LoginRoute />} />
            <Route path='/sign_up' element={<SignupRoute />} />
          </>
        )
        }
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
