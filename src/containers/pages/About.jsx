import CTA from "components/About/CTA";
import Clients from "components/About/Clients";
import Features from "components/About/Features";
import Header from "components/About/Header";
import Images from "components/About/Images";
import Team from "components/About/Team";
import TestStats from "components/About/TestStats";
import Footer from "components/navigation/Footer";
// import Header from "components/navigation/Header";
import Navbar from "components/navigation/Navbar";
import Layout from "hocs/layouts/Layout";
import { useEffect } from "react";

function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <Layout>
      <Navbar className="pt-28" />
      <div className="pt-32">
        <Header />
        <TestStats />
        <Images />
        <Clients />
        <div className="bg-white">
          <div className="mx-auto max-w-7xl py-12 px-4 smpx6 lg:px-8">
          </div>
        </div>
        <Features />
        <Team />
        <CTA />
      </div>

      <Footer />
    </Layout>
  );
}
export default About;
