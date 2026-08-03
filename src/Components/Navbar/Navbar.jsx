import React from 'react';
import { NavLink } from 'react-router';

const Navbar = () => {
    return (
        <div>
            <div className="navbar bg-white/30 backdrop-blur-xl backdrop-saturate-200 shadow-2xl border-b border-white/40 sticky top-0 z-50">
                {/* Left side - Premium Toggle with Brand Name */}
                <div className="navbar-start flex items-center gap-2">
                    {/* Premium Grid Toggle Button */}
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle hover:bg-red-600/20 hover:scale-105 transition-all duration-300 bg-white/20 backdrop-blur-md border border-white/30">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                            </svg>
                        </div>
                        <ul tabIndex="-1" className="menu menu-sm dropdown-content bg-white/80 backdrop-blur-xl backdrop-saturate-200 rounded-2xl z-50 mt-3 w-56 p-2 shadow-2xl border border-white/40">
                            <li><NavLink to="/" className={({ isActive }) => 
                                `hover:bg-red-600/20 hover:text-red-600 rounded-lg transition-all duration-300 ${isActive ? 'bg-red-600/20 text-red-600 font-semibold shadow-sm' : 'text-gray-700'}`
                            }>🏠 Home</NavLink></li>
                            <li><NavLink to="/products" className={({ isActive }) => 
                                `hover:bg-red-600/20 hover:text-red-600 rounded-lg transition-all duration-300 ${isActive ? 'bg-red-600/20 text-red-600 font-semibold shadow-sm' : 'text-gray-700'}`
                            }>🛍️ Products</NavLink></li>
                            <li><NavLink to="/about" className={({ isActive }) => 
                                `hover:bg-red-600/20 hover:text-red-600 rounded-lg transition-all duration-300 ${isActive ? 'bg-red-600/20 text-red-600 font-semibold shadow-sm' : 'text-gray-700'}`
                            }>ℹ️ About</NavLink></li>
                            <li><NavLink to="/contact" className={({ isActive }) => 
                                `hover:bg-red-600/20 hover:text-red-600 rounded-lg transition-all duration-300 ${isActive ? 'bg-red-600/20 text-red-600 font-semibold shadow-sm' : 'text-gray-700'}`
                            }>📞 Contact</NavLink></li>
                            <div className="divider my-1 border-gray-200/50"></div>
                            <li><NavLink to="/dashboard" className={({ isActive }) => 
                                `hover:bg-red-600/20 hover:text-red-600 rounded-lg transition-all duration-300 ${isActive ? 'bg-red-600/20 text-red-600 font-semibold shadow-sm' : 'text-gray-700'}`
                            }>📊 Dashboard</NavLink></li>
                            <li><NavLink to="/settings" className={({ isActive }) => 
                                `hover:bg-red-600/20 hover:text-red-600 rounded-lg transition-all duration-300 ${isActive ? 'bg-red-600/20 text-red-600 font-semibold shadow-sm' : 'text-gray-700'}`
                            }>⚙️ Settings</NavLink></li>
                            <li><NavLink to="/logout" className={({ isActive }) => 
                                `hover:bg-red-600/20 text-red-600 rounded-lg transition-all duration-300 ${isActive ? 'bg-red-600/20 font-semibold' : ''}`
                            }>🚪 Logout</NavLink></li>
                        </ul>
                    </div>
                    
                    {/* Brand Name */}
                    <NavLink to="/">
                        <span className='text-3xl font-bold'>Bake</span><span  className=" btn-ghost text-xl font-bold text-red-600 hover:text-red-700 hover:scale-105 transition-all duration-300">Berry</span>
                    </NavLink>
                </div>
                
                {/* Center - Navigation Links (Desktop) */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-2">
                        <li><NavLink to="/" className={({ isActive }) => 
                            `font-medium px-3 py-2 rounded-xl transition-all duration-300 text-gray-700 ${
                                isActive 
                                ? 'bg-red-600/20 text-red-600 font-semibold shadow-sm backdrop-blur-sm border border-white/30' 
                                : 'hover:bg-red-600/10 hover:text-red-600 hover:backdrop-blur-sm'
                            }`
                        }>Home</NavLink></li>
                        <li><NavLink to="/products" className={({ isActive }) => 
                            `font-medium px-3 py-2 rounded-xl transition-all duration-300 text-gray-700 ${
                                isActive 
                                ? 'bg-red-600/20 text-red-600 font-semibold shadow-sm backdrop-blur-sm border border-white/30' 
                                : 'hover:bg-red-600/10 hover:text-red-600 hover:backdrop-blur-sm'
                            }`
                        }>Products</NavLink></li>
                        <li><NavLink to="/about" className={({ isActive }) => 
                            `font-medium px-3 py-2 rounded-xl transition-all duration-300 text-gray-700 ${
                                isActive 
                                ? 'bg-red-600/20 text-red-600 font-semibold shadow-sm backdrop-blur-sm border border-white/30' 
                                : 'hover:bg-red-600/10 hover:text-red-600 hover:backdrop-blur-sm'
                            }`
                        }>About</NavLink></li>
                        <li><NavLink to="/contact" className={({ isActive }) => 
                            `font-medium px-3 py-2 rounded-xl transition-all duration-300 text-gray-700 ${
                                isActive 
                                ? 'bg-red-600/20 text-red-600 font-semibold shadow-sm backdrop-blur-sm border border-white/30' 
                                : 'hover:bg-red-600/10 hover:text-red-600 hover:backdrop-blur-sm'
                            }`
                        }>Contact</NavLink></li>
                    </ul>
                </div>
                
                {/* Right side - Search, Cart, Profile */}
                <div className="navbar-end flex items-center gap-2">
                    {/* Search Bar */}
                    <div className="form-control">
                        <input 
                            type="text" 
                            placeholder="Search" 
                            className="border-2  input input-bordered w-32 md:w-auto bg-white/20 backdrop-blur-md border-red-600 text-gray-700 placeholder:text-gray-400/70 focus:border-red-600/50 focus:outline-none transition-all duration-300 rounded-xl"
                        />
                    </div>
                    
                    {/* Cart Button with Badge */}
                    <button className="btn btn-ghost btn-circle hover:bg-red-600/20 hover:scale-110 transition-all duration-300 bg-white/20 backdrop-blur-md border border-white/30">
                        <div className="indicator">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <span className="badge badge-xs bg-red-600 text-white border-none indicator-item shadow-lg">3</span>
                        </div>
                    </button>
                    
                    {/* Profile Button */}
                    <button className="btn btn-ghost btn-circle hover:bg-red-600/20 hover:scale-110 transition-all duration-300 bg-white/20 backdrop-blur-md border border-white/30">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Navbar;