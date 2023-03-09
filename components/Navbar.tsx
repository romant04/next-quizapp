import Image from "next/image";
import React from "react";
import Login from "./login";

function Navbar() {
    return (
        <div className="flex flex-row justify-between items-center pl-10 pr-10 text-white h-20">
            <div className="flex flex-row items-center gap-5">
                <Image src={"/iconQ.png"} alt="qIcon" width={65} height={65} />
                <h1 className="text-4xl">Quiz-portal</h1>
            </div>
            <Login />
        </div>
    );
}

export default Navbar;
