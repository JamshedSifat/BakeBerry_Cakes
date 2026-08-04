import React, { useState, useEffect } from 'react';
import { 
    Award, 
    Clock, 
    Heart, 
    Leaf, 
    Coffee, 
    Users, 
    Star,
    Sparkles,
    ChevronRight,
    Truck,
    Shield,
    Gift,
    Play,
    Quote,
    MapPin,
    Phone,
    Mail,
    Clock as ClockIcon
} from 'lucide-react';

const About = () => {
    const [activeTab, setActiveTab] = useState('story');

    // Stats animation
    const stats = [
        { number: '10+', label: 'Years of Experience', icon: Award },
        { number: '50+', label: 'Artisan Products', icon: Coffee },
        { number: '500+', label: 'Happy Customers', icon: Users },
        { number: '4.9', label: 'Average Rating', icon: Star },
    ];

    const team = [
        {
            name: 'Sarah Johnson',
            role: 'Head Baker & Founder',
            image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400&h=400&fit=crop',
            bio: 'With 15 years of baking experience, Sarah brings passion and artistry to every creation.'
        },
        {
            name: 'Michael Chen',
            role: 'Pastry Chef',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
            bio: 'Award-winning pastry chef with expertise in French and Italian desserts.'
        },
        {
            name: 'Emily Rodriguez',
            role: 'Bread Artisan',
            image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
            bio: 'Master of sourdough and artisan breads with a passion for traditional techniques.'
        }
    ];

    const values = [
        {
            icon: Leaf,
            title: 'Natural Ingredients',
            description: 'We source only the finest, natural ingredients for all our products.'
        },
        {
            icon: Heart,
            title: 'Crafted with Love',
            description: 'Every item is handmade with care and dedication to perfection.'
        },
        {
            icon: Clock,
            title: 'Fresh Daily',
            description: 'All our products are baked fresh every morning for optimal quality.'
        },
        {
            icon: Shield,
            title: 'Quality Guarantee',
            description: 'We stand behind every product with our quality satisfaction guarantee.'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-red-50/20 to-pink-50/20 py-8 sm:py-12">
            <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
                
                {/* Hero Section */}
                <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-red-600 to-pink-600 p-8 sm:p-12 md:p-16 mb-12 sm:mb-16">
                    <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]"></div>
                    <div className="relative z-10 max-w-3xl">
                        <div className="inline-block mb-4">
                            <span className="px-4 py-1.5 text-xs font-medium tracking-wider text-white bg-white/20 backdrop-blur-sm rounded-full border border-white/30 flex items-center gap-2">
                                <Sparkles className="w-3.5 h-3.5" />
                                About Us
                            </span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white mb-4">
                            Crafting <span className="font-medium">Delicious</span> Memories
                        </h1>
                        <p className="text-base sm:text-lg text-white/90 font-light leading-relaxed max-w-2xl">
                            At BakeBerry, we believe in the art of baking. Every loaf, pastry, and cake 
                            is crafted with passion, using time-honored techniques and the finest ingredients.
                        </p>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
                    {stats.map((stat) => {
                        const Icon = stat.icon;
                        return (
                            <div key={stat.label} className="bg-white/40 backdrop-blur-xl rounded-2xl p-4 sm:p-6 text-center border border-white/40 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                <div className="inline-block p-3 bg-gradient-to-br from-red-600/10 to-pink-600/10 rounded-xl mb-3">
                                    <Icon className="w-6 h-6 text-red-600" />
                                </div>
                                <p className="text-2xl sm:text-3xl font-bold text-gray-800">{stat.number}</p>
                                <p className="text-xs sm:text-sm text-gray-400 font-light">{stat.label}</p>
                            </div>
                        );
                    })}
                </div>

                {/* Story & Mission Tabs */}
                <div className="mb-12 sm:mb-16">
                    <div className="flex flex-wrap gap-2 sm:gap-3 mb-6">
                        {[
                            { id: 'story', label: 'Our Story' },
                            { id: 'mission', label: 'Our Mission' },
                            { id: 'values', label: 'Our Values' }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-500 ${
                                    activeTab === tab.id
                                        ? 'bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-2xl shadow-red-600/30 scale-105'
                                        : 'bg-white/40 backdrop-blur-sm text-gray-600 hover:bg-red-600/10 hover:text-red-600 border border-white/20'
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className="bg-white/40 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 border border-white/40 shadow-lg">
                        {activeTab === 'story' && (
                            <div className="space-y-4">
                                <h3 className="text-xl sm:text-2xl font-light text-gray-800">
                                    The <span className="text-red-600 font-medium">BakeBerry</span> Story
                                </h3>
                                <div className="space-y-3 text-gray-600 font-light leading-relaxed">
                                    <p>
                                        Founded in 2014, BakeBerry began as a small, family-run bakery with a simple 
                                        mission: to bring the joy of freshly baked, artisan-quality breads and pastries 
                                        to our community.
                                    </p>
                                    <p>
                                        What started as a passion project in a small kitchen has grown into a beloved 
                                        local bakery, known for our commitment to quality, creativity, and the timeless 
                                        art of baking.
                                    </p>
                                    <p>
                                        Today, we continue to honor our roots, baking every item from scratch using 
                                        traditional techniques and the finest natural ingredients.
                                    </p>
                                </div>
                            </div>
                        )}

                        {activeTab === 'mission' && (
                            <div className="space-y-4">
                                <h3 className="text-xl sm:text-2xl font-light text-gray-800">
                                    Our <span className="text-red-600 font-medium">Mission</span>
                                </h3>
                                <div className="space-y-3 text-gray-600 font-light leading-relaxed">
                                    <p>
                                        Our mission is to create exceptional baked goods that bring people together, 
                                        inspire joy, and elevate everyday moments into something special.
                                    </p>
                                    <p>
                                        We are committed to:
                                    </p>
                                    <ul className="space-y-2 pl-4">
                                        <li className="flex items-start gap-2">
                                            <span className="text-red-600 mt-1">✦</span>
                                            <span>Using only the highest quality, natural ingredients</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-red-600 mt-1">✦</span>
                                            <span>Preserving traditional baking techniques</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-red-600 mt-1">✦</span>
                                            <span>Innovating and creating new, exciting flavors</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-red-600 mt-1">✦</span>
                                            <span>Serving our community with warmth and excellence</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        )}

                        {activeTab === 'values' && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                {values.map((value) => {
                                    const Icon = value.icon;
                                    return (
                                        <div key={value.title} className="bg-white/30 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/40 hover:border-red-600/20 transition-all duration-300">
                                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-red-600/10 to-pink-600/10 rounded-xl flex items-center justify-center mb-3">
                                                <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
                                            </div>
                                            <h4 className="text-base sm:text-lg font-medium text-gray-800 mb-1">{value.title}</h4>
                                            <p className="text-xs sm:text-sm text-gray-400 font-light">{value.description}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>

                {/* Team Section */}
                <div className="mb-12 sm:mb-16">
                    <div className="text-center mb-8 sm:mb-10">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-gray-800">
                            Meet Our <span className="text-red-600 font-medium">Team</span>
                        </h2>
                        <p className="text-sm text-gray-400 font-light max-w-2xl mx-auto">
                            The passionate artisans behind every delicious creation
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {team.map((member) => (
                            <div key={member.name} className="group bg-white/40 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/40 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                                <div className="relative overflow-hidden">
                                    <img 
                                        src={member.image} 
                                        alt={member.name}
                                        className="w-full h-56 sm:h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <h4 className="text-lg font-medium text-white">{member.name}</h4>
                                        <p className="text-sm text-white/80">{member.role}</p>
                                    </div>
                                </div>
                                <div className="p-4 sm:p-5">
                                    <p className="text-xs sm:text-sm text-gray-500 font-light leading-relaxed">
                                        {member.bio}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

               

            </div>
        </div>
    );
};

export default About;