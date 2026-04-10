import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { Services } from "@/components/sections/Services";
import { Portfolio } from "@/components/sections/Portfolio";
import { Process } from "@/components/sections/Process";
import { WhyUs } from "@/components/sections/WhyUs";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/Footer";

const TITLE = "NT Digital Group | Turnkey Web Design Montreal | 72h Delivery";
const DESC  = "Premium web design and AI-driven solutions delivered in exactly 72 hours. Specializing in high-performance websites and SaaS for startups in Canada & USA. 100% code ownership.";
const URL   = "https://ntwebux.com/";
const IMG   = "https://ntwebux.com/logo.png";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>{TITLE}</title>
        <meta name="description" content={DESC} />
        <link rel="canonical" href={URL} />

        {/* OpenGraph */}
        <meta property="og:type"        content="website" />
        <meta property="og:url"         content={URL} />
        <meta property="og:title"       content={TITLE} />
        <meta property="og:description" content={DESC} />
        <meta property="og:image"       content={IMG} />
        <meta property="og:locale"      content="en_CA" />
        <meta property="og:site_name"   content="NT Digital Group" />

        {/* Twitter / X */}
        <meta name="twitter:card"        content="summary_large_image" />
        <meta name="twitter:title"       content={TITLE} />
        <meta name="twitter:description" content={DESC} />
        <meta name="twitter:image"       content={IMG} />
      </Helmet>

      <div className="relative w-full min-h-screen">
        <Navbar />
        <main>
          <Hero />
          <Stats />
          <Services />
          <Portfolio />
          <Process />
          <WhyUs />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
