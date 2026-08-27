import Footer from "./components/footer/Footer";
import Header from "./components/navigation/Header";
import Contact from "./sections/Contact/Contact";
import Hero from "./sections/Hero/Hero";
import Impact from "./sections/Impact/Impact";
import Product from "./sections/Product/Product";
import Team from "./sections/Team/Team";
import Technology from "./sections/Technology/Technology";
import Traction from "./sections/Traction/Traction";
import Validation from "./sections/Validation/Validation";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Product />
        <Impact />
        <Technology />
        <Validation />
        <Traction />
        <Team />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
