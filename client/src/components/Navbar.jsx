import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { pathname } = useLocation();

    // Detect scrolling
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Menu items list
    const menuLinks = [
        { label: "Home", to: "/" },
        { label: "Donations", href: "#donation" },
        { label: "Missions", href: "#mission-id" },
        { label: "About", href: "#about" },
        { label: "Contact", href: "#contact" },
        { label: "Admin", to: "/admin" },
    ];

    return (
        <div
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 
            ${scrolled ? "bg-black/80 backdrop-blur-xl shadow-lg" : "bg-black/40 backdrop-blur-md"}`}
        >
            <header>
                <div className="container mx-auto px-4">
                    <nav className="flex items-center justify-between py-4">

                        {/* LOGO */}
                        <Link
                            className="text-2xl font-extrabold tracking-wide text-white hover:text-orange-400 transition duration-300"
                            to="/"
                        >
                            Support Circle
                        </Link>

                        {/* MOBILE TOGGLE */}
                        <button
                            className="lg:hidden text-white focus:outline-none"
                            type="button"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <span className="text-4xl">&#9776;</span>
                        </button>

                        {/* MENU */}
                        <div
                            className={`absolute lg:relative top-full left-0 w-full lg:w-auto 
                            transition-all duration-300
                            ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 lg:max-h-full lg:opacity-100"} 
                            overflow-hidden lg:overflow-visible 
                            bg-black/95 lg:bg-transparent`}
                        >
                            <ul className="flex flex-col lg:flex-row lg:space-x-8 p-4 lg:p-0">

                                {menuLinks.map((link, index) => (
                                    <li key={index}>
                                        {link.to ? (
                                            <Link
                                                to={link.to}
                                                className={`nav-link text-white block py-2 transition-all duration-300
                                                ${pathname === link.to
                                                        ? "text-orange-400 font-semibold"
                                                        : "hover:text-orange-400"}`}
                                            >
                                                {link.label}
                                            </Link>
                                        ) : (
                                            <a
                                                href={link.href}
                                                className="nav-link text-white block py-2 transition-all duration-300 hover:text-orange-400"
                                            >
                                                {link.label}
                                            </a>
                                        )}
                                    </li>
                                ))}

                            </ul>
                        </div>
                    </nav>
                </div>
            </header>
        </div>
    );
};

export default Navbar;
