// import Variants from "components/Variants/Header";
import Footer from "components/navigation/Footer";
// import Header from "components/navigation/Header";
import Navbar from "components/navigation/Navbar";
import Layout from "hocs/layouts/Layout";
import Variants from "components/Variants/Header";
import { useEffect } from "react";

function Variant() {
  useEffect(()=>{
    window.scrollTo(0,0)
  } )
  return (
    <Layout>
        <Navbar className='pt-28'/>
        <div className='pt-32'>
            <Variants/>
        </div>

        <Footer />
    </Layout>
  );
}
export default Variant;
