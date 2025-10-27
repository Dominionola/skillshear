import Link from "next/link"
import Image from "next/image";

export default function CallToAction() {
    <div className="bg-blue-600 text-white p-4 rounded-md">
      <h2 className="text-lg font-semibold">Join Our Community</h2>
      <p className="text-sm">Connect with like-minded individuals and enhance your skills.</p>
      <Link href="/join" className="mt-2 inline-block bg-white text-blue-600 font-medium py-2 px-4 rounded-md">
        Get Started
      </Link>
    </div>
}