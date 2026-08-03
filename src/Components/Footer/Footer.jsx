import React from 'react';
import { NavLink } from 'react-router';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white/30 backdrop-blur-xl backdrop-saturate-200 border-t border-white/40 mt-auto">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                
                {/* Main Footer Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    
                    {/* Brand Section */}
                    <div className="col-span-1 sm:col-span-2 lg:col-span-1">
                        <NavLink to="/" className="flex items-center mb-4">
                            <span className='text-2xl font-bold text-gray-800'>Bake</span>
                            <span className="text-2xl font-bold text-red-600">Berry</span>
                        </NavLink>
                        <p className="text-gray-500 text-sm leading-relaxed mb-4">
                            Artisan bakery crafting moments of joy through exceptional breads, pastries, and desserts.
                        </p>
                        <div className="flex space-x-4">
                            {/* Social Icons */}
                            <a href="#" className="w-10 h-10 rounded-full bg-red-600/10 hover:bg-red-600/20 text-red-600 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12z"/>
                                </svg>
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-red-600/10 hover:bg-red-600/20 text-red-600 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.104c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 0021.163-11.766c0-.213-.005-.426-.015-.637A9.936 9.936 0 0024 4.557z"/>
                                </svg>
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-red-600/10 hover:bg-red-600/20 text-red-600 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.244 3.768-5.487 0-2.866-2.063-4.869-5.008-4.869-3.41 0-5.409 2.559-5.409 5.198 0 1.03.397 2.135.89 2.735.098.119.112.223.085.345-.09.378-.293 1.195-.334 1.363-.052.218-.169.266-.392.16-1.46-.68-2.372-2.817-2.372-4.532 0-3.688 2.68-7.073 7.725-7.073 4.054 0 7.204 2.889 7.204 6.747 0 4.027-2.54 7.273-6.067 7.273-1.183 0-2.295-.614-2.675-1.339l-.727 2.771c-.263 1.011-.974 2.279-1.45 3.052 1.08.333 2.216.514 3.383.514 6.61 0 11.977-5.366 11.977-11.987C23.994 5.367 18.627 0 12.017 0z"/>
                                </svg>
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-red-600/10 hover:bg-red-600/20 text-red-600 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wider mb-4">Quick Links</h3>
                        <ul className="space-y-3">
                            <li>
                                <NavLink to="/" className="text-gray-500 hover:text-red-600 transition-colors duration-300 text-sm">
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/products" className="text-gray-500 hover:text-red-600 transition-colors duration-300 text-sm">
                                    Products
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/about" className="text-gray-500 hover:text-red-600 transition-colors duration-300 text-sm">
                                    About Us
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/contact" className="text-gray-500 hover:text-red-600 transition-colors duration-300 text-sm">
                                    Contact
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wider mb-4">Support</h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="text-gray-500 hover:text-red-600 transition-colors duration-300 text-sm">
                                    FAQ
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-500 hover:text-red-600 transition-colors duration-300 text-sm">
                                    Shipping Policy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-500 hover:text-red-600 transition-colors duration-300 text-sm">
                                    Returns Policy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-500 hover:text-red-600 transition-colors duration-300 text-sm">
                                    Privacy Policy
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wider mb-4">Contact Us</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3 text-gray-500 text-sm">
                                <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                                </svg>
                                <span>123 Bakery Street, Food City, FC 12345</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-500 text-sm">
                                <svg className="w-5 h-5 text-red-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                                </svg>
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-500 text-sm">
                                <svg className="w-5 h-5 text-red-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                                </svg>
                                <span>info@bakeberry.com</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-500 text-sm">
                                <svg className="w-5 h-5 text-red-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                                <span>Mon-Sat: 7:00 AM - 9:00 PM</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200/50 my-8"></div>

                {/* Bottom Bar */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-gray-500 text-center sm:text-left">
                        &copy; {currentYear} <span className="text-red-600 font-medium">BakeBerry</span>. All rights reserved.
                    </p>
                    
                    {/* Payment Methods */}
                    <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Secure Payments</span>
                        <div className="flex gap-2">
                            <svg className="w-8 h-6" viewBox="0 0 38 24" fill="none">
                                <rect width="38" height="24" rx="4" fill="white" className="border border-gray-200"/>
                                <path d="M11 8H9L8 16h2l1-8zM15 8h-2l-1 8h2l1-8zM20 8h-2l-1 8h2l1-8zM25 8h-2l-1 8h2l1-8z" fill="#1A1F71"/>
                            </svg>
                            <svg className="w-8 h-6" viewBox="0 0 38 24" fill="none">
                                <rect width="38" height="24" rx="4" fill="white" className="border border-gray-200"/>
                                <circle cx="12" cy="12" r="8" fill="#EB001B"/>
                                <circle cx="26" cy="12" r="8" fill="#F79E1B"/>
                                <path d="M19 7a8 8 0 010 10 8 8 0 000-10z" fill="#FF5F00"/>
                            </svg>
                            <svg className="w-8 h-6" viewBox="0 0 38 24" fill="none">
                                <rect width="38" height="24" rx="4" fill="white" className="border border-gray-200"/>
                                <path d="M15 6h8v12h-8V6z" fill="#000"/>
                                <path d="M16 6h7v12h-7V6z" fill="#000"/>
                            </svg>
                            <svg className="w-8 h-6" viewBox="0 0 38 24" fill="none">
                                <rect width="38" height="24" rx="4" fill="white" className="border border-gray-200"/>
                                <path d="M14 6h10v12H14V6z" fill="#000"/>
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Newsletter Signup */}
                <div className="mt-8 pt-8 border-t border-gray-200/50">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div>
                            <h4 className="text-sm font-semibold text-gray-800">Subscribe to our newsletter</h4>
                            <p className="text-xs text-gray-500">Get the latest updates on new products and special offers</p>
                        </div>
                        <div className="flex w-full sm:w-auto gap-2">
                            <input 
                                type="email" 
                                placeholder="Enter your email" 
                                className="flex-1 sm:w-64 px-4 py-2 bg-white/20 backdrop-blur-md border-2 border-red-600/30 focus:border-red-600 rounded-xl text-sm text-gray-700 placeholder:text-gray-400/70 focus:outline-none transition-all duration-300"
                            />
                            <button className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-red-600/25 hover:-translate-y-0.5 whitespace-nowrap">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;