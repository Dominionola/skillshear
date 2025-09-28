import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className=" fixed w-full shadow-md bg-white flex items-center justify-between h-16 font-sans">
      <div className=" flex px-5">

        <Link className="flex items-center " href="/">
          <Image src="/logo.png" alt="Logo" width={50} height={100} />
          <h2 className="text-2xl font-bold text-black">SkillShare</h2>
        </Link>
      </div>

      <div className="hidden md:flex gap-4 px-5">
        <Link href="/" className="text-gray-600">Home</Link>
        <Link href="/about" className="text-gray-600">About</Link>
        <Link href="/post" className="text-gray-600">Posts</Link>
      </div>

      <div className="flex">
<Link>Login</Link>
<Link className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-md" href="/signup">Sign Up</Link>
      </div>
    </nav>
  );
}
