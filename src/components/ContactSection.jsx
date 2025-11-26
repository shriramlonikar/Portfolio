import React from 'react'
import { motion as MOTION } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useState } from 'react'
import emailjs from "@emailjs/browser";
import { FiX } from "react-icons/fi";


const ContactSection = () => {

    // Main Refs
    const circleRef = useRef(null)
    const sectionRef = useRef(null)
    const initialTextRef = useRef(null)
    const finalTextRef = useRef(null)


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

    const [contactFormOpen, setContactFormOpen] = useState(false);
        const openContactForm = () => setContactFormOpen(true);
        const closeContactForm = () => setContactFormOpen(false);

    useEffect(() => {
        // Register GSAP plugins
        gsap.registerPlugin(ScrollTrigger)

        // make sure all scrollTrigger instences are properly killed
        const Cleanup = () => {
            ScrollTrigger.getAll().forEach((st) => {
                if(st.vars.trigger === sectionRef.current){
                    st.kill(true)
                }
            })
        }

        //Cleanup anu existion scrollTrigger
        Cleanup()
        
        // Set initial states
        gsap.set(circleRef.current, { scale:1, backgroundColor:"white"})
        gsap.set(initialTextRef.current, {opacity:1})
        gsap.set(finalTextRef.current, {opacity:0})

        // Create the main timeline
        const tl = gsap.timeline({
            scrollTrigger:{
                trigger: sectionRef.current,
                start: "top top",
                end: "+=200%",
                pin: true,
                scrub: 0.5,
                anticipatePin: 1,
                fastScrollEnd: true,
                preventOverlaps: true,
                invalidateOnRefresh: true,
            },
        })

        // initial state to mid-zoom (0-50%)
        tl.to(
            circleRef.current,
            {
                scale: 5,
                backgroundColor: "#9333EA",
                ease: "power1.inOut",
                duration: 0.5,
            },
            0,
        )

        // Fade initial during first half
        tl.to(
            initialTextRef.current,
            {
                opacity: 0,
                ease: "power1.out",
                duration: 0.2,
            },
            0.1,
        )

        // Mid-zoom to final stage (50-100%)
        tl.to(
            circleRef.current,
            {
                scale:17,
                backgroundColor: "#E9D5FF",
                boxShadow: "0 0 50px 20px rgba(233, 213, 255, 0.3)",
                ease: "power2.inOut",
                duration: 0.5,
            },
            0.5
        )

        // Fade in final text during second half
        tl.to(
            finalTextRef.current,
            {
                opacity: 1,
                ease: "power2.in",
                duration: 0.2
            },
            0.7
        )

        // return cleanup
        return Cleanup

    },[])

  return (
    <section
    id='contact'
    ref={sectionRef}
    className='flex items-center justify-center bg-black relative'
    style={{overscrollBehavior: "none"}}
    >

        {/* Simple circle with minimal nesting */}
        <div
        ref={circleRef}
        className='w-24 sm:w-28 md:w-32 h-24 sm:h-28 md:h-32 rounded-full flex items-center justify-center relative transition-shadow duration-1000 shadow-violet-300/50 shadow-lg bg-gradient-to-r from-violet-100 to-pink-100'
        >
            {/* Initial Text */}
            <p 
            ref={initialTextRef}
            className='text-black font-bold text-base sm:text-lg md:text-xl absolute inset-0 flex items-center text-center'
            >
                SCROLL DOWN
            </p>

            {/* Final Text */}
            <div
            ref={finalTextRef}
            className='text-center relative flex flex-col items-center justify-center opacity-0'
            >
                <h1 className='text-black md:w-[10rem] w-[20rem] lg:scale-[0.4] sm:scale-[0.25] scale-[0.07] md:font-bold text-sm sm:text-base leading-none mb-5'>
                    Open to Opportunities
                </h1>

                <p className='text-black lg:w-[40rem] w-[20rem] absolute sm:mt-3 mt-1 md:scale-[0.1] scale-[0.068]'>
                    Full-Stack developer specialized in crafting robust, modren, responsive web interfaces using React, Tailwind CSS, and advanced UI animation techniques with neat and clean backend using Nodejs, FastAPI. Passionate in Machine Learning, Deep Learning, GenAI to build modern and intelligent solutions. 
                </p>

                <button 
                onClick={openContactForm}
                className='px-10 py-2 rounded-xl bg-black hover:bg-white hover:text-black transition-all duration-500 scale-[0.1] absolute sm:mt-9 mt-7 text-nowrap'>
                    Contact Me
                </button>

            </div>

        </div>

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

    </section>
  )
}

export default ContactSection
