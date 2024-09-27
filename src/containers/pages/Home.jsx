import Footer from "components/navigation/Footer";
import Header from "components/Home/Header";
import Incentives from 'components/Home/Incentives'
import ContextNews from 'components/Home/ContextNews'
import Features from "components/Home/Features";

// import Header from "components/navigation/Header";
import Navbar from "components/navigation/Navbar";
import Layout from "hocs/layouts/Layout";
import CTA from "components/Home/CTA";
import LogoCloud from "components/Home/LogoCloud";
import BlogList from "components/Home/BlogList";
import { useEffect } from "react";

function Home() {
  useEffect(()=>{
    window.scrollTo(0,0)
  } )
  return (
    <Layout>
        <Navbar/>
        <div className='pt-28'>
          <Header/>
          {/* <Incentives/> */}
          <ContextNews/>
          <Features/>
          <CTA/>
          <LogoCloud/>
          <BlogList/>
        </div>

        <Footer />
    </Layout>
  );
}
export default Home;
