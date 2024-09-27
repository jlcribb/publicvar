import Error404 from 'containers/errors/Error404';
import About from 'containers/pages/About';
import Home from 'containers/pages/Home';
import Patient from 'containers/pages/Patient';
// import Search from 'containers/pages/Search';
import Variant from 'containers/pages/Variant';
// import Cases from 'containers/pages/Cases';
import Services from 'containers/pages/Services';
// import Course from 'containers/pages/Course';
// import Globe from 'containers/pages/Geo'
import { AnimatePresence } from 'framer-motion';

import { Routes, Route, useLocation } from "react-router-dom"
export default function AnimatedRoutes(){
    const location = useLocation()
    return(
      <AnimatePresence>
        <Routes location={location} key={location.pathname} >
          <Route path='*' element={<Error404 />} />
          <Route path='/' element={<Home />} />
          <Route path='/patients' element={<Patient />} />
          <Route path='/variants' element={<Variant />} />
          {/* <Route path='/cases' element={<Cases />} /> */}
          {/* <Route path='/search' element={<Search />} /> */}
          {/* <Route path='/course' element={<Course />} /> */}
          <Route path='/services' element={<Services />} />
          <Route path='/about' element={<About />} />
          {/* <Route path='/globe' element={<Globe />} /> */}
        </Routes>

      </AnimatePresence>
    )
}