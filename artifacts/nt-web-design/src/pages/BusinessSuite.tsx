import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/Navbar";
import { NTBusinessSuite } from "@/components/sections/NTBusinessSuite";
import { Footer } from "@/components/Footer";

const TITLE = "NT Business Suite — AI Revenue Platform";
const DESC  = "The all-in-one AI operating system for service businesses. AI Text-Back, Auto-Booking, and Review Engine — stop losing leads to voicemail.";
const URL   = "https://ntwebux.com/business-suite";
const IMG   = "https://ntwebux.com/logo.png";

export default function BusinessSuite() {
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
        <meta property="og:locale"      content="en_CA" />
        <meta property="og:site_name"   content="NT Web Design" />
        <meta name="twitter:card"        content="summary_large_image" />
        <meta name="twitter:title"       content={TITLE} />
        <meta name="twitter:description" content={DESC} />
        <meta name="twitter:image"       content={IMG} />
      </Helmet>

      <div className="relative w-full min-h-screen">
        <Navbar />
        <main>
          <NTBusinessSuite />
        </main>
        <Footer />
      </div>
    </>
  );
}
