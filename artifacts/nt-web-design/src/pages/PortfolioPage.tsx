import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/Navbar";
import { Portfolio } from "@/components/sections/Portfolio";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/Footer";

const TITLE = "Portfolio — NT Web Design";
const DESC  = "Explore our work: bilingual websites, SaaS platforms, e-commerce stores, and AI-powered applications built for high-performance businesses.";
const URL   = "https://ntwebux.com/portfolio";
const IMG   = "https://ntwebux.com/logo.png?v=2";

export default function PortfolioPage() {
  return (
    <>
      <Helmet>
        <title>{TITLE}</title>
        <meta name="description" content={DESC} />
        <link rel="canonical" href={URL} />
        <meta property="og:type"        content="website" />
        <meta property="og:url"         content={URL} />
        <meta property="og:title"       content={TITLE} />
        <meta property="og:description" content={DESC} />
        <meta property="og:image"       content={IMG} />
        <meta name="twitter:card"        content="summary_large_image" />
        <meta name="twitter:title"       content={TITLE} />
        <meta name="twitter:description" content={DESC} />
        <meta name="twitter:image"       content={IMG} />
      </Helmet>

      <div className="relative w-full min-h-screen">
        <Navbar />
        <main style={{ paddingTop: "80px" }}>
          <Portfolio />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
