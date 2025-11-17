export default function LoadingScreen() {
    return (
       <div className="w-full h-screen flex items-center justify-center bg-white">
         <Image
           src="/logo.png"
           alt="Loading..."
           width={80}
           height={80}
           className="motion-safe:animate-spin"
         />
       </div>
        );
}