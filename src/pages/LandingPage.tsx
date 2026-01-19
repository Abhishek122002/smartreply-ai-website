import {Navbar} from "../Landing/components/Navbar";
import {Hero} from "../Landing/components/Hero";
import {HowItWorks} from "../Landing/components/HowItWorks";
import {Comparison} from "../Landing/components/Comparison";
import {Audience} from "../Landing/components/Audience";
import {FAQ} from "../Landing/components/FAQ";
import {Footer} from "../Landing/components/Footer";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      
      <HowItWorks />
      <Comparison />
      <Audience />
      <FAQ />
      <Footer />
    </>
  );
}
