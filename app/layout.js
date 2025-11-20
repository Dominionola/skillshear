import { Geist, Geist_Mono, EB_Garamond, Poppins } from "next/font/google";
import "./globals.css";
import ConditionalNavbar from "./components/ConditionalNavbar";
import { AuthContextProvider } from "./context/AuthContext";
import PrivateRouter from "./components/PrivateRoute";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // Add weights as needed
});

export const metadata = {
  title: {
    default: "Skill Shear - Share and Learn Skills",
    template: "%s | Skill Shear",
  },
  description: "Join Skill Shear to share your skills and learn from a vibrant community. Connect, collaborate, and grow together.",
  keywords: ["skill sharing", "community", "learning", "collaboration", "education", "skills"],
  openGraph: {
    title: "Skill Shear - Share and Learn Skills",
    description: "Join Skill Shear to share your skills and learn from a vibrant community.",
    url: "https://skillshear.com",
    siteName: "Skill Shear",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Skill Shear - Share and Learn Skills",
    description: "Join Skill Shear to share your skills and learn from a vibrant community.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${ebGaramond.variable} ${poppins.variable} antialiased`}
      >
        <div className="flex flex-col">
          <ConditionalNavbar />
          <AuthContextProvider>

            {children}

          </AuthContextProvider>
        </div>
      </body>
    </html>
  );
}
