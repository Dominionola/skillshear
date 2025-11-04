import HeroSection from "./components/layout/HeroSection";
import Footer from "./components/layout/Footer";
import FeatureSection from "./components/layout/FeatureSection";
import DiscoverCommunity from "./components/layout/DiscoverCommunity";
import CallToAction from "./components/layout/CallToAction";
import { AuthContextProvider } from "./context/AuthContext";

export default function Home() {
  return (
    <AuthContextProvider>
      <div className="font-sans min-h-screen  md:p-0 pt-16 gap-16  ">
        <main className="flex flex-col gap-[32px] w-full ">
          <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw]">
            <HeroSection />
          </div>
          <FeatureSection />
          <DiscoverCommunity />
          <CallToAction />
        </main>
        <Footer />
      </div>
    </AuthContextProvider>
  );
}
