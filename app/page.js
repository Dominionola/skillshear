import HeroSection from "./components/layout/HeroSection";
import Footer from "./components/layout/Footer";

export default function Home() {
  return (
    <div className="font-sans min-h-screen p-8 pt-16 gap-16  ">
      <main className="flex flex-col gap-[32px] w-full ">
        <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw]">
          <HeroSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
