import React, { useRef } from 'react'; // ✅ Import useRef
import Navbar from '../components/Navbar';
import Banner from '../components/Banner';
import Map from '../components/Map';
import Upload from '../components/Upload';
import Electronics from '../components/Electronics';
import Cloth from '../components/Cloth';
import './Home.css';

const Home = () => {
  const nextSectionRef = useRef(null); // ✅ Define useRef

  return (
    <div className="home-container">
      
      <Banner nextSectionRef={nextSectionRef} /> {/* ✅ Pass ref to Banner */}
      <div ref={nextSectionRef}> {/* ✅ Assign ref to the Upload section */}
        <Upload />
      </div>
      <main className="main-content">
        {/* Add your main content here */}
      </main>
      <Map />
      <Electronics />
      <Cloth />
    </div>
  );
};

export default Home;
