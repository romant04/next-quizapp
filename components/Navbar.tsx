import Image from "next/image";
import React from "react";
import Login from "./Login";

function Navbar() {
    return (
        <div className="flex flex-row items-center justify-between h-20 pl-10 pr-10 text-white">
            <div className="flex flex-row items-center gap-5">
                <Image src={"/iconQ.png"} alt="qIcon" width={65} height={65} />
                <h1 className="text-4xl">Quiz-portal</h1>
            </div>
            <Login />
        </div>
    );
}

export default Navbar;
