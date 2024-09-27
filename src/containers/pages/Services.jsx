import Header from "components/Services/Header";
import ServicesList from "components/Services/ServicesList";
import Footer from "components/navigation/Footer";
// import Header from "components/navigation/Header";
import Navbar from "components/navigation/Navbar";
import Layout from "hocs/layouts/Layout";
import gene from "assets/img/services/gene.png"
import bioengineering from 'assets/img/services/bioengineering.png'
import protein from 'assets/img/services/protein.png'
import product_management from 'assets/img/services/product-management.png'
import mobile from 'assets/img/services/mobile.png'
import appdevelopment from 'assets/img/services/app-development.png'
import coding from 'assets/img/services/coding.png'
import { useEffect } from "react";


const services_posts = [
  {
    id: "1234-asdf",
    img: gene,
    title: "Genómica",
    href: "#",
    category: { name: "Article", href: "#" },
    description:
      "Estructura y mapeo de genes.",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    imageUrl:
      "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80",
    readingTime: "6 min",
    author: {
      name: "Roel Aufderehar",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    id: "1234-asdg",
    img: bioengineering,
    title: "Bioinformática",
    href: "#",
    category: { name: "Video", href: "#" },
    description:
      "Reconocimiento de patrones con IA",
    date: "Mar 10, 2020",
    datetime: "2020-03-10",
    imageUrl:
      "https://images.unsplash.com/photo-1547586696-ea22b4d4235d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80",
    readingTime: "4 min",
    author: {
      name: "Brenna Goyette",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    id: "1234-asdh",
    img: protein,
    title: "Análisis estructural y funcional de proteínas",
    href: "#",
    category: { name: "Case Study", href: "#" },
    description:
      "Localización de sitios candidatos",
    date: "Feb 12, 2020",
    datetime: "2020-02-12",
    imageUrl:
      "https://images.unsplash.com/photo-1492724441997-5dc865305da7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80",
    readingTime: "11 min",
    author: {
      name: "Daniela Metz",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    id: "1235-asdf",
    img: product_management,
    title: "Dashboard",
    href: "#",
    category: { name: "Article", href: "#" },
    description:
      "Dashboard locales, regionales",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    imageUrl:
      "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80",
    readingTime: "6 min",
    author: {
      name: "Roel Aufderehar",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    id: "1236-asdg",
    img: mobile,
    title: "Múltiples dispositivos",
    href: "#",
    category: { name: "Video", href: "#" },
    description:
      "Una sola fuente de datos, múltiples dispositivos",
    date: "Mar 10, 2020",
    datetime: "2020-03-10",
    imageUrl:
      "https://images.unsplash.com/photo-1547586696-ea22b4d4235d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80",
    readingTime: "4 min",
    author: {
      name: "Brenna Goyette",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    id: "1237-asdh",
    img: coding,
    title: "Desarrollo a medida del propósito",
    href: "#",
    category: { name: "Case Study", href: "#" },
    description:
      "Su proyecto, nuestra solución",
    date: "Feb 12, 2020",
    datetime: "2020-02-12",
    imageUrl:
      "https://images.unsplash.com/photo-1492724441997-5dc865305da7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80",
    readingTime: "11 min",
    author: {
      name: "Daniela Metz",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
];

// const develops_posts = [
//   {
//     id: "1235-asdf",
//     img: dashboard,
//     title: "Dashboard",
//     href: "#",
//     category: { name: "Article", href: "#" },
//     description:
//       "Dashboard locales, regionales",
//     date: "Mar 16, 2020",
//     datetime: "2020-03-16",
//     imageUrl:
//       "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80",
//     readingTime: "6 min",
//     author: {
//       name: "Roel Aufderehar",
//       href: "#",
//       imageUrl:
//         "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//     },
//   },
//   {
//     id: "1236-asdg",
//     img: mobile,
//     title: "Múltiples dispositivos",
//     href: "#",
//     category: { name: "Video", href: "#" },
//     description:
//       "Una sola fuente, múltiples dispositivos",
//     date: "Mar 10, 2020",
//     datetime: "2020-03-10",
//     imageUrl:
//       "https://images.unsplash.com/photo-1547586696-ea22b4d4235d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80",
//     readingTime: "4 min",
//     author: {
//       name: "Brenna Goyette",
//       href: "#",
//       imageUrl:
//         "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//     },
//   },
//   {
//     id: "1237-asdh",
//     img: appdevelopment,
//     title: "Desarrollo a medida del propósito",
//     href: "#",
//     category: { name: "Case Study", href: "#" },
//     description:
//       "Localización de sitios candidatos",
//     date: "Feb 12, 2020",
//     datetime: "2020-02-12",
//     imageUrl:
//       "https://images.unsplash.com/photo-1492724441997-5dc865305da7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80",
//     readingTime: "11 min",
//     author: {
//       name: "Daniela Metz",
//       href: "#",
//       imageUrl:
//         "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//     },
//   },
// ];

function Services() {
  useEffect(()=>{
    window.scrollTo(0,0)
  } )
  
  return (
    <Layout>
        <Navbar className='pt-28'/>
        <div className='pt-32'>
            <Header/>
            <div className="pw-12 bg-gray-50">

            </div>
            <ServicesList posts={services_posts} section_title={'Servicio de publicación de variantes'}/>
            {/* <ServicesList posts={develops_posts} section_title={'Desarrollo de soluciones'}/> */}
        </div>

        <Footer />
    </Layout>
  );
}
export default Services;
