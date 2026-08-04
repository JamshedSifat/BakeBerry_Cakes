import React, { useState } from 'react';
import { 
    MapPin, 
    Phone, 
    Mail, 
    Clock as ClockIcon,
    ChevronRight,
    Send,
    CheckCircle,
    AlertCircle,
    MessageCircle,
    Sparkles
} from 'lucide-react';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import Map from '../map/map';

const Contact = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
        if (!formData.message.trim()) newErrors.message = 'Message is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                subject: '',
                message: ''
            });
            setTimeout(() => setIsSuccess(false), 5000);
        }, 1500);
    };

    const contactInfo = [
        {
            icon: MapPin,
            title: 'Visit Us',
            details: ['123 Bakery Street', 'Food City, FC 12345'],
            color: 'from-red-500/20 to-red-600/10'
        },
        {
            icon: Phone,
            title: 'Call Us',
            details: ['+1 (555) 123-4567', 'Mon-Sat: 7AM - 9PM'],
            color: 'from-pink-500/20 to-pink-600/10'
        },
        {
            icon: Mail,
            title: 'Email Us',
            details: ['info@bakeberry.com', 'support@bakeberry.com'],
            color: 'from-purple-500/20 to-purple-600/10'
        },
        {
            icon: ClockIcon,
            title: 'Working Hours',
            details: ['Mon-Sat: 7:00 AM - 9:00 PM', 'Sunday: 8:00 AM - 6:00 PM'],
            color: 'from-blue-500/20 to-blue-600/10'
        }
    ];

    const socialLinks = [
        { icon: FaFacebook, label: 'Facebook', color: 'hover:bg-blue-600' },
        { icon: FaTwitter, label: 'Twitter', color: 'hover:bg-sky-500' },
        { icon: FaInstagram, label: 'Instagram', color: 'hover:bg-pink-600' },
        { icon: FaYoutube, label: 'YouTube', color: 'hover:bg-red-600' }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-red-50/20 to-pink-50/20 py-8 sm:py-12">
            <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
                
                {/* Header */}
                <div className="text-center mb-10 sm:mb-12">
                    <div className="inline-block mb-4">
                        <span className="px-4 sm:px-6 py-1.5 sm:py-2 text-[10px] sm:text-xs font-medium tracking-[0.2em] uppercase text-red-600 bg-red-600/5 rounded-full border border-red-600/10 flex items-center gap-2">
                            <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 text-red-600" />
                            Contact Us
                        </span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-3 sm:mb-4">
                        <span className="text-gray-800">Get In</span>
                        <span className="text-red-600 font-medium ml-2 sm:ml-3">Touch</span>
                    </h1>
                    <p className="text-xs sm:text-sm md:text-base text-gray-400 max-w-2xl mx-auto font-light leading-relaxed px-4">
                        Have a question, suggestion, or just want to say hello? We'd love to hear from you.
                        Reach out to us anytime.
                    </p>
                </div>

               

                {/* Main Contact Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                    
                    {/* Left - Contact Form */}
                    <div className="bg-white/40 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 border border-white/40 shadow-lg">
                        <div className="mb-6">
                            <h3 className="text-xl sm:text-2xl font-light text-gray-800">
                                Send Us a <span className="text-red-600 font-medium">Message</span>
                            </h3>
                            <p className="text-sm text-gray-400 font-light mt-1">
                                We'll get back to you within 24 hours
                            </p>
                        </div>

                        {isSuccess && (
                            <div className="mb-4 p-4 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-green-500" />
                                <p className="text-sm text-green-600 font-medium">Message sent successfully! We'll get back to you soon.</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1">
                                        First Name <span className="text-red-500">*</span>
                                    </label>
                                    <input 
                                        type="text" 
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        placeholder="John" 
                                        className={`w-full px-4 py-2.5 bg-white/20 backdrop-blur-sm border-2 ${
                                            errors.firstName ? 'border-red-500' : 'border-red-600/30 focus:border-red-600'
                                        } rounded-xl text-sm text-gray-700 placeholder:text-gray-400/70 focus:outline-none transition-all duration-300`}
                                    />
                                    {errors.firstName && (
                                        <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                                            <AlertCircle className="w-3 h-3" />
                                            {errors.firstName}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1">
                                        Last Name <span className="text-red-500">*</span>
                                    </label>
                                    <input 
                                        type="text" 
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        placeholder="Doe" 
                                        className={`w-full px-4 py-2.5 bg-white/20 backdrop-blur-sm border-2 ${
                                            errors.lastName ? 'border-red-500' : 'border-red-600/30 focus:border-red-600'
                                        } rounded-xl text-sm text-gray-700 placeholder:text-gray-400/70 focus:outline-none transition-all duration-300`}
                                    />
                                    {errors.lastName && (
                                        <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                                            <AlertCircle className="w-3 h-3" />
                                            {errors.lastName}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">
                                    Email Address <span className="text-red-500">*</span>
                                </label>
                                <input 
                                    type="email" 
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="john@example.com" 
                                    className={`w-full px-4 py-2.5 bg-white/20 backdrop-blur-sm border-2 ${
                                        errors.email ? 'border-red-500' : 'border-red-600/30 focus:border-red-600'
                                    } rounded-xl text-sm text-gray-700 placeholder:text-gray-400/70 focus:outline-none transition-all duration-300`}
                                />
                                {errors.email && (
                                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                                        <AlertCircle className="w-3 h-3" />
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">
                                    Subject <span className="text-red-500">*</span>
                                </label>
                                <input 
                                    type="text" 
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    placeholder="How can we help?" 
                                    className={`w-full px-4 py-2.5 bg-white/20 backdrop-blur-sm border-2 ${
                                        errors.subject ? 'border-red-500' : 'border-red-600/30 focus:border-red-600'
                                    } rounded-xl text-sm text-gray-700 placeholder:text-gray-400/70 focus:outline-none transition-all duration-300`}
                                />
                                {errors.subject && (
                                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                                        <AlertCircle className="w-3 h-3" />
                                        {errors.subject}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">
                                    Message <span className="text-red-500">*</span>
                                </label>
                                <textarea 
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="4" 
                                    placeholder="Your message..." 
                                    className={`w-full px-4 py-2.5 bg-white/20 backdrop-blur-sm border-2 ${
                                        errors.message ? 'border-red-500' : 'border-red-600/30 focus:border-red-600'
                                    } rounded-xl text-sm text-gray-700 placeholder:text-gray-400/70 focus:outline-none transition-all duration-300 resize-none`}
                                ></textarea>
                                {errors.message && (
                                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                                        <AlertCircle className="w-3 h-3" />
                                        {errors.message}
                                    </p>
                                )}
                            </div>

                            <button 
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-medium rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-red-600/30 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-4 h-4" />
                                        Send Message
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Right - Contact Info & Map */}
                    <div className="space-y-6">
                        {/* Contact Info Cards */}
                        <div className="bg-white/40 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/40 shadow-lg">
                            <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-red-600" />
                                Contact Information
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-start gap-4 p-3 rounded-xl hover:bg-white/30 transition-all duration-300 group">
                                    <div className="w-10 h-10 bg-gradient-to-br from-red-600/10 to-pink-600/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                                        <MapPin className="w-5 h-5 text-red-600" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-800">Address</h4>
                                        <p className="text-xs text-gray-400 font-light">123 Bakery Street, Food City, FC 12345</p>
                                        <a href="#" className="text-xs text-red-600 hover:text-red-700 font-medium transition-colors">
                                            Get Directions →
                                        </a>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 p-3 rounded-xl hover:bg-white/30 transition-all duration-300 group">
                                    <div className="w-10 h-10 bg-gradient-to-br from-red-600/10 to-pink-600/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                                        <Phone className="w-5 h-5 text-red-600" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-800">Phone</h4>
                                        <p className="text-xs text-gray-400 font-light">+1 (555) 123-4567</p>
                                        <p className="text-xs text-gray-400 font-light">+1 (555) 987-6543</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 p-3 rounded-xl hover:bg-white/30 transition-all duration-300 group">
                                    <div className="w-10 h-10 bg-gradient-to-br from-red-600/10 to-pink-600/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                                        <Mail className="w-5 h-5 text-red-600" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-800">Email</h4>
                                        <p className="text-xs text-gray-400 font-light">info@bakeberry.com</p>
                                        <p className="text-xs text-gray-400 font-light">support@bakeberry.com</p>
                                    </div>
                                </div>
                            </div>

                            {/* Social Links */}
                            <div className="mt-6 pt-6 border-t border-gray-200/50">
                                <p className="text-sm text-gray-600 mb-3">Follow us on social media</p>
                                <div className="flex gap-3">
                                    {socialLinks.map((social) => {
                                        const Icon = social.icon;
                                        return (
                                            <a
                                                key={social.label}
                                                href="#"
                                                className={`w-10 h-10 rounded-full bg-white/30 backdrop-blur-sm hover:${social.color} flex items-center justify-center transition-all duration-300 hover:scale-110 hover:text-white text-gray-500 border border-white/40 hover:border-transparent`}
                                                aria-label={social.label}
                                            >
                                                <Icon className="w-4 h-4" />
                                            </a>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Map Placeholder */}
                        <div className="bg-white/40 backdrop-blur-xl rounded-2xl sm:rounded-3xl overflow-hidden border border-white/40 shadow-lg">
                           <Map></Map>
                        </div>
                    </div>

                </div>

             

            </div>
        </div>
    );
};

export default Contact;