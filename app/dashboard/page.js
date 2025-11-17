"use client"

import { UserAuth } from "../context/ContextAuth"
import { useRouter } from "next/navigation";
import PrivteRouter from "../components/PrivateRoute";

export default function dashboardpage( ){

    const { session, signOut } = UserAuth();
    const router = useRouter();
    const handleSignOut = async (e) => {
        try {
            e.preventDefault();
            await signOut();
            router.push("/");
        } catch (error) {
            console.error("Error signing out:", error);
        }
    }

    console.log("Dashboard session:", session);
    return(
        <PrivteRouter>
        <div className="pt-16">
           <h1 className="text-4xl">This is the Dashboard</h1>
           <div> welcome {session?.user?.email}
            </div>
            <p className="bg-red-600 px-4 py-3 border cursor-pointer inline-block rounded-xl" onClick={handleSignOut}>Signout</p>
        </div>
        </PrivteRouter>
    )
}