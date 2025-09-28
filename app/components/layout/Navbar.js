import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className=" fixed w-full shadow-md bg-white">
      <div className=" flex px-5">

        <Link className="flex items-center " href="/">
          <Image src="/logo.png" alt="Logo" width={50} height={100} />
          <h2 className="text-2xl font-bold text-black">SkillShare</h2>
        </Link>
      </div>

      <div>
        
      </div>
    </nav>
  );
}
