import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';

const Home = () => {
    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        email: '',
        category: '',
        timingSlot: '',
        gadgetType: '',
        address: '',
        message: ''
    });
    const [selectedMission, setSelectedMission] = useState(null);

    const missionThoughts = {
        1: "Education is the most powerful weapon which you can use to change the world.",
        2: "The best way to find yourself is to lose yourself in the service of others.",
        3: "We make a living by what we get, but we make a life by what we give.",
        4: "No one has ever become poor by giving.",
        5: "Happiness doesn't result from what we get, but from what we give.",
        6: "Service to others is the rent you pay for your room here on earth."
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/donations', formData);
            if (response.data.success) {
                alert(response.data.message || 'Donation request submitted successfully! Check your email for confirmation.');
            } else {
                alert('Donation request submitted successfully!');
            }
            setFormData({
                name: '',
                mobile: '',
                email: '',
                category: '',
                timingSlot: '',
                gadgetType: '',
                address: '',
                message: ''
            });
        } catch (err) {
            console.error(err);
            alert('Error submitting donation request. Please try again.');
        }
    };

    return (
        <div className="bg-gray-900 text-white min-h-screen font-sans">
            <Navbar />

            {/* Hero Section */}
            <section className="home-sec h-screen flex items-center bg-[url('/img/img-1.png')] bg-cover bg-center relative" id="home">
                <div className="absolute inset-0 bg-black/60"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center">
                        <div className="lg:w-1/2 text-center lg:text-left">
                            <h1 className="text-4xl lg:text-6xl font-bold mb-4">Be the Light in Someone’s Darkest Hour</h1>
                            {/* <h2 className="text-2xl lg:text-3xl mb-4">We <span className="text-orange-500">Support Circle</span> manages needs of Deprived...</h2> */}
                            <pre className="text-lg italic mb-2">"सेवा का संकल्प, समाज का समर्थन ।"</pre>
                            <p className="text-lg mb-8">"A pledge to serve, support for society."</p>
                            <div className="buttons">
                                <a href="#contact" className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full transition duration-300">Donate now</a>
                            </div>
                        </div>
                        <div className="lg:w-1/2 mt-10 lg:mt-0 flex justify-center">
                            {/* Image is background, but can add another here if needed */}
                        </div>
                    </div>
                </div>
            </section>

            {/* Donation Section */}
            <section className="don-sec py-20 bg-gray-800" id="donation">
                <div className="container mx-auto px-4">
                    <div className="heading text-center mb-12">
                        <h2 className="text-3xl font-bold text-orange-500">We Have Support like</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { img: 'lecture.png', title: 'Teaching', desc: 'Make a Difference in a Few Hours: Volunteer as a Teacher.' },
                            { img: 'sneakers.png', title: 'Footware', desc: 'Let Your Shoes Walk the Path of Kindness.' },
                            { img: 'salary.png', title: 'Fund', desc: 'Fuel a Dream, Fund a Future: Help us Make an Impact.' },
                            { img: 'gadgets.png', title: 'Gadgets', desc: 'A Small Gesture, A Big Impact. Make a Difference.' },
                            { img: 'book.png', title: 'Stationary', desc: 'Help Them Draw a Brighter Tomorrow.' },
                            { img: 'shopping-bag.png', title: 'Requirements Of NGOs', desc: 'Be Part of the Change: What we Need to Transform Lives.' },
                        ].map((item, index) => (
                            <div key={index} className="don-box bg-gray-700 p-6 rounded-lg text-center hover:transform hover:-translate-y-2 transition duration-300 shadow-lg">
                                <img src={`/img/don/${item.img}`} alt="img" className="w-20 h-20 mx-auto mb-4 object-contain" />
                                <h3 className="text-xl font-bold mb-2 text-orange-400">{item.title}</h3>
                                <p className="mb-4 text-gray-300">{item.desc}</p>
                                <a href="#contact" className="inline-block bg-orange-500 hover:bg-orange-600 text-white py-2 px-6 rounded-full transition duration-300">Donate Now</a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="mission py-20 bg-gray-900" id="mission-id">
                <div className="container mx-auto px-4">
                    <div className="heading text-center mb-12">
                        <h2 className="text-3xl font-bold text-orange-500 mb-4">Our Missions</h2>
                        <p className="text-gray-300 max-w-2xl mx-auto">We have delivered <span className="text-orange-400">Gadgets</span>, <span className="text-orange-400">Stationary</span>, <span className="text-orange-400">Funds</span>, <span className="text-orange-400">Footware</span> and provide <span className="text-orange-400">teachers/Volunteer</span> to needy Peoples. And also Fullfill the Daily <span className="text-orange-400">Requirements of NGOs</span>.</p>
                    </div>
                    <div className="gallery-sec grid grid-cols-2 md:grid-cols-3 gap-4">
                        {[1, 2, 3, 4, 5, 6].map((num) => (
                            <div key={num} className="image overflow-hidden rounded-lg cursor-pointer relative group" onClick={() => setSelectedMission(num)}>
                                <img src={`/img/miss/${num}.jpg`} alt="img" className="w-full h-full object-cover hover:scale-110 transition duration-500" />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <p className="text-white text-center px-2 font-semibold">Click to read more</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mission Modal */}
                {selectedMission && (
                    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setSelectedMission(null)}>
                        <div className="bg-gray-800 p-8 rounded-lg max-w-lg w-full text-center relative" onClick={e => e.stopPropagation()}>
                            <button className="absolute top-4 right-4 text-gray-400 hover:text-white" onClick={() => setSelectedMission(null)}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                            <img src={`/img/miss/${selectedMission}.jpg`} alt="Mission" className="w-full h-64 object-cover rounded-lg mb-6" />
                            <h3 className="text-2xl font-bold text-orange-500 mb-4">Mission Insight</h3>
                            <p className="text-xl text-gray-300 italic">"{missionThoughts[selectedMission]}"</p>
                        </div>
                    </div>
                )}
            </section>

            {/* About Section */}
            <section className="about-sec py-20 bg-gray-800" id="about">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row items-center gap-10">
                        <div className="lg:w-1/3">
                            <img src="/img/img-2.jpeg" alt="about" className="rounded-lg shadow-xl w-full" />
                        </div>
                        <div className="lg:w-2/3">
                            <div className="heading mb-6">
                                <h2 className="text-3xl font-bold text-orange-500">What We Do & Why </h2>
                            </div>
                            <p className="mb-4 text-gray-300 leading-relaxed">We connect NGOs with dedicated teachers to enhance education initiatives, foster learning and empower communities through Knowledge sharing. And provide fundraising support, Stationary, Gadgets to help them to achieve their Goals and create lasting social impact.</p>
                            <p className="text-gray-300 leading-relaxed">We believe in strenghthenig the backbone of social change, and access to stationary is the foundation of effective learning and community work. By supporting NGOs, we enable them to address critical issues, uplift communities, and create a better world for everyone.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="contact-section py-20 bg-gray-900" id="contact">
                <div className="container mx-auto px-4">
                    <div className="heading text-center mb-12">
                        <h2 className="text-3xl font-bold text-orange-500 mb-2">Connect With Us</h2>
                        <p className="text-gray-300">Fill this form, our team will <span className="text-orange-400">contact</span> you.</p>
                    </div>
                    <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-lg shadow-2xl">
                        <form className="contact-form" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="form-group">
                                        <input type="text" className="w-full p-3 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:border-orange-500" placeholder="Your Name" name="name" value={formData.name} onChange={handleChange} required />
                                    </div>
                                    <div className="form-group">
                                        <input type="text" className="w-full p-3 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:border-orange-500" placeholder="Mobile No." name="mobile" value={formData.mobile} onChange={handleChange} required />
                                    </div>
                                    <div className="form-group">
                                        <input type="email" className="w-full p-3 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:border-orange-500" placeholder="Email Address" name="email" value={formData.email} onChange={handleChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="category" className="block mb-2 text-gray-300">Choose a category:</label>
                                        <select id="category" name="category" className="w-full p-3 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:border-orange-500" value={formData.category} onChange={handleChange} required>
                                            <option value="" disabled>--Choose--</option>
                                            <option value="teaching">Teaching</option>
                                            <option value="Requirements of NGOs">Requirements of NGOs</option>
                                            <option value="Footware">Footware</option>
                                            <option value="Books">Books</option>
                                            <option value="Fund">Fund</option>
                                            <option value="Ele. Gadgets">Ele. Gadgets</option>
                                        </select>
                                    </div>

                                    {/* Conditional Timing Slot for Teaching */}
                                    {formData.category === 'teaching' && (
                                        <div className="form-group">
                                            <label htmlFor="timingSlot" className="block mb-2 text-gray-300">Select Preferred Timing:</label>
                                            <select id="timingSlot" name="timingSlot" className="w-full p-3 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:border-orange-500" value={formData.timingSlot} onChange={handleChange} required>
                                                <option value="" disabled>--Select Timing--</option>
                                                <option value="Morning (9AM - 12PM)">Morning (9AM - 12PM)</option>
                                                <option value="Afternoon (2PM - 5PM)">Afternoon (2PM - 5PM)</option>
                                                <option value="Evening (6PM - 8PM)">Evening (6PM - 8PM)</option>
                                            </select>
                                        </div>
                                    )}

                                    {/* Conditional Gadget Type for Ele. Gadgets */}
                                    {formData.category === 'Ele. Gadgets' && (
                                        <div className="form-group">
                                            <label htmlFor="gadgetType" className="block mb-2 text-gray-300">Select Gadget Type:</label>
                                            <select id="gadgetType" name="gadgetType" className="w-full p-3 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:border-orange-500" value={formData.gadgetType} onChange={handleChange} required>
                                                <option value="" disabled>--Select Gadget--</option>
                                                <option value="Laptop">Laptop</option>
                                                <option value="Mobile">Mobile</option>
                                                <option value="Tablet">Tablet</option>
                                                <option value="Others">Others</option>
                                            </select>
                                        </div>
                                    )}
                                </div>
                                <div className="space-y-4">
                                    <div className="form-group">
                                        <input type="text" className="w-full p-3 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:border-orange-500" placeholder="Address" name="address" value={formData.address} onChange={handleChange} required />
                                    </div>
                                    <div className="form-group">
                                        <textarea className="w-full p-3 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:border-orange-500 h-32" name="message" placeholder="Message" value={formData.message} onChange={handleChange}></textarea>
                                    </div>

                                    {/* Conditional QR Code for Fund */}
                                    {formData.category === 'Fund' && (
                                        <div className="form-group bg-gray-700 p-4 rounded-lg border border-orange-500">
                                            <h4 className="text-orange-400 font-bold mb-3 text-center">Scan QR Code to Donate</h4>
                                            <div className="flex justify-center">
                                                <img src="/img/qr-code.jpg" alt="QR Code for Fund Donation" className="w-64 h-auto rounded-lg shadow-lg" />
                                            </div>
                                            <p className="text-gray-300 text-sm text-center mt-3">Scan this QR code with any UPI app to send funds directly</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="mt-8 text-center">
                                <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-10 rounded-full transition duration-300 transform hover:scale-105">Submit Details</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Home;
