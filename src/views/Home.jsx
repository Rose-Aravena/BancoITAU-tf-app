import React from 'react'
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';
import Footer from '../components/Footer';
//import Center from '../components/Center';


const Home = () => {
  return (
    <div>
       <NavBar />
      <div className='main-grid'>
        <SideBar />
        <div>
          <h1>HOME</h1>  
          {/* <Center /> */}
        </div>
      </div>
      <Footer />
    </div>
  )
}
export default Home