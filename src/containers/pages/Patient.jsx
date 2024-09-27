import Header from "components/Patients/Header";
import Footer from "components/navigation/Footer";
// import Header from "components/navigation/Header";
import Navbar from "components/navigation/Navbar";
import Layout from "hocs/layouts/Layout";
import { useEffect } from "react";

function Patient() {
  useEffect(()=>{
    window.scrollTo(0,0)
  } )
  return (
    <Layout>
        <Navbar className='pt-28'/>
        <div className='pt-32'>
            <Header/>
        </div>

        <Footer />
    </Layout>
  );
}
export default Patient;
