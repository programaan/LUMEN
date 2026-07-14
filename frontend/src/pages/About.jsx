import Navbar from "../components/Navbar";
import Cart from "../components/Cart";
import Footer from "../components/Footer";

import { Helmet } from "react-helmet-async";

const banner = "https://ik.imagekit.io/kjwgmmtvi/About.jpeg";
const p1 = "https://ik.imagekit.io/kjwgmmtvi/a1.png";
const p2 = "https://ik.imagekit.io/kjwgmmtvi/a2.png";
const p3 = "https://ik.imagekit.io/kjwgmmtvi/a3.png";
const p4 = "https://ik.imagekit.io/kjwgmmtvi/a4.png";

function About() {
  return (
    <>
      <Helmet>
        <title>About | LUMEN</title>
        <meta name="description" content="Browse the latest clothing collection from LUMEN."/>
      </Helmet>

      <Navbar />

      <section>
        <div className="about-title">
          <h1>About</h1>
        </div>

        <div className="banner-image">
          <img src={banner} alt="Crafted in Silence"/>

          <div className="banner-text">
            <h2>Crafted in Silence</h2>
          </div>
        </div>
      </section>

      <section className="our-story">
        <div className="about-container">
          <h2 className="story-title">
            Our Story
          </h2>

          <div className="story-content">
            <div className="story-column">
              <p>Our minimalist outerwear brand draws inspiration from Scandinavian design and Japanese precision. Each piece reflects timeless elegance and understated sophistication, thoughtfully crafted to elevate everyday wear. We focus on clean lines, functional details, and subtle textures, creating garments that are both modern and enduring.</p>
            </div>

            <div className="story-column">
              <p>The brand began with a simple desire: to create something meaningful that quietly stands out in a crowded world. Every garment tells a story, blending form, function, and thoughtful design.</p>
              <p>Personal notes from our founder provide insight into each collection, highlighting the craftsmanship and meticulous attention to detail that define our journey.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="our-process">
        <div className="about-container">
          <h2 className="process-title">
            Our Process
          </h2>

          <div className="timeline">
            <span>01</span>
            <span>02</span>
            <span>03</span>
            <span>04</span>
          </div>

          <div className="process-grid">
            <div className="process-card">
              <img src={p1} alt="Design"/>
              <h3>Design</h3>
              <p>Our designs blend Scandinavian simplicity with timeless elegance, focusing on refined silhouettes and modern aesthetics.</p>
            </div>

            <div className="process-card">
              <img src={p2} alt="Material Selection"/>
              <h3>Material Selection</h3>
              <p>We carefully source premium fabrics to ensure quality, comfort, and durability in every piece we create.</p>
            </div>

            <div className="process-card">
              <img src={p3} alt="Craftsmanship"/>
              <h3>Craftsmanship</h3>
              <p>Every garment is crafted with precision and attention to detail, reflecting our commitment to excellence.</p>
            </div>

            <div className="process-card">
              <img src={p4} alt="Quality Control"/>
              <h3>Quality Control</h3>
              <p>Each product undergoes strict quality checks to ensure it meets our high standards before reaching you.</p>
            </div>
          </div>
        </div>
      </section>

      <Cart />

      <Footer />
    </>
  );
}

export default About;