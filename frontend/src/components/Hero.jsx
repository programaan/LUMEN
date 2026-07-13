import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="hero">
		<div className="hero-text">
		    <h1>Timeless<br />Layers</h1>
			<p>Minimalist outerwear<br />crafted for every season</p>
			<Link to="/collection">
				<button>Shop the Collection →</button>
			</Link>
		</div>
	</section>
  );
}

export default Hero;