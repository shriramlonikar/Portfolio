import { footer } from 'framer-motion/client'
import React from 'react'
import { FiGithub, FiTwitter, FiLinkedin } from 'react-icons/fi'

const Footer = () => {
  return (
    <footer className='bg-black text-white py-16 px-6 mt-40'>
        <div className='max-w-6xl mx-auto'>
            <div className='flex justify-between items-center'>

                {/* Logo and Description */}
                <h2 className='text-3xl font-bold bg-gradient-to-r from-purple-400 to-purple-200 bg-clip-text text-transparent'>
                    ShriramCodes
                </h2>

                {/* scroll Links */}
                <div>
                    <h3 className='text-xl font-semibold mb-4 text-purple-200'>
                        Connect
                    </h3>
                    <div className='flex space-x-4'>
                        <a className='text-gray-700 hover:text-violet-400 transition-colors' href="#">
                            <FiGithub className='w-5 h-5'/>
                        </a><a className='text-gray-700 hover:text-violet-400 transition-colors' href="#">
                            <FiLinkedin className='w-5 h-5'/>
                        </a><a className='text-gray-700 hover:text-violet-400 transition-colors' href="#">
                            <FiTwitter className='w-5 h-5'/>
                        </a>
                    </div>
                </div>

            </div>

            {/* Copytight */}
            {/* <div className='border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center'>

            </div> */}
        </div>
    </footer>
  )
}

export default Footer
