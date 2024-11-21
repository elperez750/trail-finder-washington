import React from "react";
import Navbar from "../components/Navbar";


interface MainLayOutProps {
    children: React.ReactNode;
}


const MainLayout: React.FC<MainLayOutProps> = ({ children }) => {
return (
    <div className="w-full min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">{children}</main>
    </div>
)
}


export default MainLayout;
