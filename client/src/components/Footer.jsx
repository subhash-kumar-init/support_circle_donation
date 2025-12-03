import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-[#111] text-white py-10 mt-10">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Column 1 */}
                    <div className="col-one">
                        <h4 className="text-xl font-bold mb-4 text-orange-500">Support Circle</h4>
                        <p className="mb-2">Address : Delhi-NCR 201206 </p>
                        <p className="mb-2">
                            Contact No : 
                            <a href="tel:+917667526600" className="hover:text-orange-500"> +91 7667526600</a>
                        </p>
                        <p>
                            Email : 
                            <a href="mailto:subhash.projects.init@gmail.com" className="hover:text-orange-500">
                                subhash.projects.init@gmail.com
                            </a>
                        </p>
                    </div>

                    {/* Column 2 */}
                    <div className="col-two">
                        <h4 className="text-xl font-bold mb-4 text-orange-500">Important Links</h4>
                        <ul className="space-y-2">
                            <li><a href="#home" className="hover:text-orange-500">Home</a></li>
                            <li><a href="#donation" className="hover:text-orange-500">Donations</a></li>
                            <li><a href="#mission-id" className="hover:text-orange-500">Missions</a></li>
                            <li><a href="#about" className="hover:text-orange-500">About us</a></li>
                            <li><a href="#contact" className="hover:text-orange-500">Contact us</a></li>
                        </ul>
                    </div>

                    {/* Column 3 */}
                    <div className="col-one">
                        <h4 className="text-xl font-bold mb-4 text-orange-500">Social Media</h4>

                        <div className="social flex space-x-4 mb-4">

                            {/* Facebook */}
                            <a 
                                href="https://facebook.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                            >
                                <img src="/img/icons/facebook.png" alt="facebook" className="w-8 h-8 hover:scale-110 transition" />
                            </a>

                            {/* Instagram */}
                            <a 
                                href="https://instagram.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                            >
                                <img src="/img/icons/instagram.png" alt="instagram" className="w-8 h-8 hover:scale-110 transition" />
                            </a>

                            {/* YouTube */}
                            <a 
                                href="https://youtube.com" 
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img src="/img/icons/youtube.png" alt="youtube" className="w-8 h-8 hover:scale-110 transition" />
                            </a>

                            {/* LinkedIn */}
                            <a 
                                href="https://www.linkedin.com/in/subhash-kumar5/" 
                                target="_blank" 
                                rel="noopener noreferrer"
                            >
                                <img src="/img/icons/linkedin.png" alt="linkedin" className="w-8 h-8 hover:scale-110 transition" />
                            </a>

                            {/* Gmail (mailto link) */}
                            <a 
                                href="mailto:subhash.projects.init@gmail.com"
                            >
                                <img src="/img/icons/gmail.png" alt="gmail" className="w-8 h-8 hover:scale-110 transition" />
                            </a>

                            {/* ⭐ GitHub (NEW) */}
                            <a 
                                href="https://github.com/subhash-kumar-init" 
                                target="_blank" 
                                rel="noopener noreferrer"
                            >
                                <img src="/img/icons/github.png" alt="github" className="w-8 h-8 hover:scale-110 transition" />
                            </a>

                        </div>

                        <p>Copyright &copy; 2024 | All Right Reserved by support_circle</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
