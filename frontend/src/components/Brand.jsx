const b1 = "https://ik.imagekit.io/kjwgmmtvi/b1.png";
const b2 = "https://ik.imagekit.io/kjwgmmtvi/b2.png";
const b3 = "https://ik.imagekit.io/kjwgmmtvi/b6.png";
const b4 = "https://ik.imagekit.io/kjwgmmtvi/b3.png";
const b5 = "https://ik.imagekit.io/kjwgmmtvi/b5.png";
const b6 = "https://ik.imagekit.io/kjwgmmtvi/b4.png";

const brands = [b1, b2, b3, b4, b5, b6];

function Brand() {
  return (
    <section className="brand">
      <div className="brand-content">
        {brands.map((brand, index) => (
          <div className="main" key={index}>
            <img src={brand} alt={`Brand ${index + 1}`} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Brand;