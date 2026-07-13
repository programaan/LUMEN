import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Featured from "../components/Featured";
import Brand from "../components/Brand";
import Latest from "../components/Latest";
import Cart from "../components/Cart";
import Footer from "../components/Footer";

import { Helmet } from "react-helmet-async";


function Home() {

  return (
    <>
      <Helmet>
        <title>LUMEN | Clothing Store</title>

        <meta
          name="description"
          content="Shop premium clothing and accessories from LUMEN."
        />
      </Helmet>
      <Navbar />
      <Hero />
      <Featured />
      <Brand />
      <Latest />
      <Cart />
      <Footer />
      
    </>
  );
}

export default Home;