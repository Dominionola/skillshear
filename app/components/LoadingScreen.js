import Image from 'next/image';

export default function LoadingScreen() {
  return (
    <div className="min-h-screen w-full relative">
      {/* Radial Gradient Background from Bottom */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(125% 125% at 50% 90%, #fff 40%, #2563eb 100%)",
        }}
      />
      {/* Your Content/Components */}
      <div className="w-full h-screen flex items-center justify-center relative z-10">
        <Image
          src="/logo.png"
          alt="Loading..."
          width={80}
          height={80}
          className="motion-safe:animate-spin"
        />
      </div>
    </div>
  );
}
