import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { auth } from './config/firebase';
import Login from './pages/Login';
import Home from './pages/Home';
import ClothingDonation from './components/ClothList';
import Navbar from './components/Navbar';
import About from './components/About';
import PhotoUpload from './components/PhotoUpload';
import EWasteMarketplace from './components/Marketplace';
import WastebinLocator from './components/Wb';
import MapWithImages from './components/Imagemap';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    
    <Router>
      <Navbar/>
      <Routes>
        
        <Route 
          path="/" 
          element={<Login />}  
        />
        <Route 
          path="/home" 
          element={user ? <Home /> : <Navigate to="/" />} 
        />
        <Route path='/collection' element={<ClothingDonation/>} />
        <Route path='/about' element={<About/>}/>
        <Route path='/upload' element={<PhotoUpload/>}/>
        <Route path='/mp' element={<EWasteMarketplace/>}/>
        <Route path='/map' element={<WastebinLocator/>}/>
        <Route path='/admin' element={<MapWithImages/>}/> 
      </Routes>
    </Router>
  );
}

export default App; 