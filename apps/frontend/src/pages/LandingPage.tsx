import Navbar from "../components/layout/Navbar";
import Hero from "../components/hero/Hero";
import Features from "../components/features/Features";
import Footer from "../components/layout/Footer";

import { useUpload } from "../hooks/useUpload";

const LandingPage = () => {
  const { upload, loading } = useUpload();

  const handleUpload = async (file: File) => {
    await upload(file);
  };

  return (
    <>
      <Navbar />

      <main className="flex-grow w-full max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop flex flex-col gap-section-gap pb-section-gap pt-16">
        <Hero
          onFileSelected={handleUpload}
          loading={loading}
        />

        <Features />
      </main>

      <Footer />
    </>
  );
};

export default LandingPage;