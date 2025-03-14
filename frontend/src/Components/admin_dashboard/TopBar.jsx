import React, { useState, useEffect, useRef } from "react";

export const TopBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Toggle dropdown visibility
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <>
            <div className="w-full h-19 bg-[#fff] border-b-2">
                <div className="flex items-center justify-between px-6 py-1">
                    <h1 className="text-3xl  w-45 font-bold bg-[#eee] text-[#118218] px-6 py-3 rounded-tl-2xl rounded-br-xl shadow-black shadow-[4px_3px_0px_rgba(0,0,0,0.25)]">Awkaf</h1>
                    <div className=" flex items-center  justify-around w-45  px-2 py-1 bg-[#118218] text-white text-center cursor-pointer rounded-lg">
                        <span className="h-11 w-11 rounded-4xl bg-white inline-block"></span>
                        <p className="text-lg font-bold ">Admin</p>
                    </div>
                </div>
            </div>
        </>
    );
};


