import { AnimatePresence, spring } from "framer-motion";
import { motion as MOTION } from "framer-motion";
import { useState, useRef } from "react";
import { FiGithub, FiTwitter, FiLinkedin, FiMenu, FiX } from "react-icons/fi";
import emailjs from "@emailjs/browser";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);

    const [contactFormOpen, setContactFormOpen] = useState(false);
    const openContactForm = () => setContactFormOpen(true);
    const closeContactForm = () => setContactFormOpen(false);

    // ✅ Added useRef for EmailJS sendForm()
    const formRef = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm(
            "service_e4aolw3",
            "template_g5hz3tl",

            // ✅ FIX: send the form element instead of JS object
            formRef.current,

            "zO5nseOA7n9AKQZ9Q",
        )
            .then(() => {
                alert("Message Sent Successfully!");
                closeContactForm();
            })
            .catch((err) => {
                console.error(err);
                alert("Failed to send message.");
            });
    };

    return (
        <>
        <header className='top-0 bg-black sticky w-full z-50 transition-all duration-300'>

            <div className='container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-20'>

                {/* LogoName */}
                <MOTION.div
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                        type: "spring",
                        stiffness: 100,
                        damping: 25,
                        delay: 0.3,
                        duration: 1.2
                    }}
                    className='flex items-center'>
                    <div className='h-10 w-10 rounded-xl bg-gradient-to-r from-gray-500 to-gray-100 flex items-center justify-center text-purple-600 font-bold text-xl mr-3'>
                        S
                    </div>

                    <span className='text-xl font-bold bg-gradient-to-r from-gray-300 to-gray-100 bg-clip-text text-transparent'>
                        ShriramCodes
                    </span>

                </MOTION.div>

                {/* Desktop Navigation */}
                <nav className="lg:flex hidden space-x-8">
                    {["Home", "About", "Projects", "Contact"].map((item, index) => (
                        <MOTION.a
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                type: "spring",
                                stiffness: 100,
                                damping: 20,
                                delay: 0.7 + index * 0.2
                            }}
                            key={item}
                            className="relative text-gray-800 dark:text-gray-200 hover:text-violet-600 dark:hover:text-violet-400 font-medium transition-colors duration-300 group"
                            href={`#${item.toLowerCase()}`}>
                            {item}
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-violet-600 group-hover:w-full transition-all duration-300"></span>
                        </MOTION.a>
                    ))}

                </nav>

                {/* Social icons - Desktop */}
                <div className="md:flex hidden items-center spaxe-x-4">
                    <MOTION.a
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.3, duration: 0.8 }}
                        href="https://github.com/shriramlonikar" className="text-gray-300 dark-text-gray-300 p-2 hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-300">
                        <FiGithub className="w-5 h-5" />
                    </MOTION.a>

                    <MOTION.a
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.3, duration: 0.8 }}
                        href="https://www.linkedin.com/in/shriram-lonikar-b1a546333/" className="text-gray-300 dark-text-gray-300 p-2 hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-300">
                        <FiLinkedin className="w-5 h-5" />
                    </MOTION.a>

                    {/* Hire Me Button */}
                    <MOTION.button
                        onClick={openContactForm}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            delay: 1.6,
                            duration: 0.8,
                            type: spring,
                            stiffness: 100,
                            damping: 15
                        }}
                        className="ml-4 px-4 py-2 rounded-xl bg-gradient-to-r from-gray-400 to-gray-100 text-violet-700 font-bold hover:from-violet-700 hover:to-purple-700 hover:text-white transition-all duration-500">
                        Hire Me
                    </MOTION.button>
                </div>

                {/* Mobile menu button */}
                <div className="md:hidden flex items-center">
                    <MOTION.button
                        whileTap={{ scale: 0.7 }}
                        onClick={toggleMenu}
                        className="text-gray-300">
                        {isOpen ? <FiX className="h-6 w-6" /> : <FiMenu />}
                    </MOTION.button>
                </div>
            </div>

            {/* Mobile Menu */}
            <MOTION.div
                initial={{ opacity: 0, height: 0 }}
                animate={{
                    opacity: isOpen ? 1 : 0,
                    height: isOpen ? "auto" : 0
                }}
                transition={{ duration: 0.5 }}
                className="md:hidden overflow-hidden bg-white dark:bg-gray-900 shadow-lg px-4 py-5 space-y-5">
                <nav className="flex flex-col space-y-3">
                    {["Home", "About", "Projects", "Contact"].map((item) => (
                        <a onClick={toggleMenu} className="text-gray-300 font-medium py-2" key={item} href={`#${item.toLowerCase()}`}>
                            {item}
                        </a>
                    ))}
                </nav>

                <div className="pt-4 border-t border-gray-400 dark:border-gray-700">
                    <div className="flex space-x-5">

                        <a href="https://github.com/shriramlonikar">
                            <FiGithub className="h-5 w-5 text-gray-300" />
                        </a>

                        <a href="https://www.linkedin.com/in/shriram-lonikar-b1a546333/">
                            <FiLinkedin className="h-5 w-5 text-gray-300" />
                        </a>
                    </div>

                    <button
                        onClick={() => {
                            toggleMenu()
                            openContactForm()
                        }}
                        className="mt-4 block w-full px-4 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-violet-400 font-bold">
                        Contact Me
                    </button>

                </div>

            </MOTION.div>

            {/* Contact Form */}
            <AnimatePresence>
                {contactFormOpen && (
                    <MOTION.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="fixed inset-0 bg-black/50 background-blur-sm z-50 flex items-center justify-center p-4"
                    >
                        <MOTION.div
                            initial={{ scale: 0.8, opacity: 0, y: 30 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.8, opacity: 0, y: 30 }}
                            transition={{
                                type: "spring",
                                damping: 30,
                                stiffness: 200,
                                duration: 0.8
                            }}
                            className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md p-6">

                            <div className="flex justify-between items-center mb-4">
                                <h1 className="text-2xl font-bold text-gray-300">
                                    Get In Touch
                                </h1>

                                <button onClick={closeContactForm}>
                                    <FiX className="w-5 h-5 text-gray-300 font-extrabold" />
                                </button>
                            </div>

                            {/* Input Forms */}
                            <form ref={formRef} className="space-y-4" onSubmit={sendEmail}>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="Your Email"
                                        className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 bg-gray-700"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                                        Message
                                    </label>
                                    <textarea
                                        rows="4"
                                        id="message"
                                        name="message"
                                        placeholder="Your Message"
                                        className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 bg-gray-700"
                                    />
                                </div>

                                <MOTION.button
                                    type="submit"
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="w-full px-4 py-2 bg-gradient-to-r from-violet-600 to-violet-400 hover:from-violet-700 hover:to-purple-700 transition-all duration-300 rounded-lg shadow-md hover:shadow-lg hover:shadow-violet-600/50">
                                    Send Message
                                </MOTION.button>

                            </form>

                        </MOTION.div>
                    </MOTION.div>
                )}
                {/* <MOTION.div>

                </MOTION.div> */}
            </AnimatePresence>

        </header>
        </>
    )
}

export default Header;
