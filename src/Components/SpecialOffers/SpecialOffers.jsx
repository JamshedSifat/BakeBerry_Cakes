import React, { useState, useEffect } from 'react';
import { 
    Clock, 
    Star, 
    Gift, 
    Sparkles, 
    ChevronRight,
    ShoppingBag,
    Timer,
    Percent,
    Coffee,
    Cookie,
    Cake,
    Heart,
    Crown,
    Zap,
    TrendingUp
} from 'lucide-react';

const iconMap = {
    Coffee: Coffee,
    Cake: Cake,
    Cookie: Cookie,
    ShoppingBag: ShoppingBag,
    Gift: Gift,
    Heart: Heart,
    Sparkles: Sparkles,
    Timer: Timer,
    TrendingUp: TrendingUp,
    Crown: Crown
};

const SpecialOffers = () => {
    const [activeTab, setActiveTab] = useState('all');
    const [offers, setOffers] = useState([]);
    const [tabs, setTabs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filteredOffers, setFilteredOffers] = useState([]);

    // Load data from JSON file
    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await fetch('/specialOffersData.json');
                const data = await response.json();
                setOffers(data.offers);
                setTabs(data.tabs);
                setFilteredOffers(data.offers);
                setLoading(false);
            } catch (error) {
                console.error('Error loading offers data:', error);
                setLoading(false);
            }
        };
        loadData();
    }, []);

    // Filter offers based on active tab
    useEffect(() => {
        if (activeTab === 'all') {
            setFilteredOffers(offers);
        } else {
            setFilteredOffers(offers.filter(offer => offer.type === activeTab));
        }
    }, [activeTab, offers]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-white via-red-50/20 to-pink-50/20 py-8 sm:py-12 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent"></div>
                    <p className="mt-4 text-gray-400 font-light">Loading offers...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-red-50/20 to-pink-50/20 py-8 sm:py-12">
            <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
                
                {/* Header */}
                <div className="text-center mb-10 sm:mb-16">
                    <div className="inline-block mb-4 sm:mb-6">
                        <span className="px-4 sm:px-6 py-1.5 sm:py-2 text-[10px] sm:text-xs font-medium tracking-[0.2em] uppercase text-red-600 bg-red-600/5 rounded-full border border-red-600/10 flex items-center gap-2">
                            <Gift className="w-3 h-3 sm:w-4 sm:h-4 text-red-600" />
                            Special Offers
                        </span>
                    </div>
                    <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light mb-3 sm:mb-4">
                        <span className="text-gray-800">Exclusive</span>
                        <span className="text-red-600 font-medium ml-2 sm:ml-3">Deals</span>
                    </h1>
                    <p className="text-xs sm:text-sm md:text-base text-gray-400 max-w-2xl mx-auto font-light leading-relaxed px-4">
                        Don't miss out on our handpicked special offers and discounts. 
                        Fresh deals added daily to make your experience even sweeter.
                    </p>
                </div>

                {/* Tabs */}
                <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 sm:mb-12">
                    {tabs.map((tab) => {
                        const Icon = iconMap[tab.icon] || Sparkles;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`group px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-500 flex items-center gap-2 ${
                                    activeTab === tab.id
                                        ? 'bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-2xl shadow-red-600/30 scale-105'
                                        : 'bg-white/40 backdrop-blur-sm text-gray-600 hover:bg-red-600/10 hover:text-red-600 border border-white/20'
                                }`}
                            >
                                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                {tab.label}
                            </button>
                        );
                    })}
                </div>

               

                {/* Offers Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                    {filteredOffers.map((offer) => {
                        const Icon = iconMap[offer.icon] || Gift;
                        return (
                            <div 
                                key={offer.id}
                                className="group bg-white/40 backdrop-blur-xl rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg sm:shadow-xl hover:shadow-2xl sm:hover:shadow-3xl transition-all duration-700 hover:-translate-y-2 sm:hover:-translate-y-3 border border-white/40"
                            >
                                {/* Image */}
                                <div className="relative overflow-hidden h-40 sm:h-48">
                                    <img 
                                        src={offer.image} 
                                        alt={offer.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                                    
                                    {/* Discount Badge */}
                                    <div className={`absolute top-3 sm:top-4 left-3 sm:left-4 bg-gradient-to-r ${offer.color} text-white px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold shadow-lg flex items-center gap-1`}>
                                        <Percent className="w-3 h-3" />
                                        {offer.discount}
                                    </div>

                                    {/* Badge */}
                                    <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-black/40 backdrop-blur-md px-2 sm:px-3 py-1 rounded-full border border-white/20">
                                        <span className="text-white text-[8px] sm:text-[10px] font-medium uppercase tracking-wider">
                                            {offer.badge}
                                        </span>
                                    </div>

                                    {/* Popular Badge */}
                                    {offer.isPopular && (
                                        <div className="absolute top-12 sm:top-14 right-3 sm:right-4 bg-gradient-to-r from-yellow-500 to-orange-500 px-2 sm:px-3 py-0.5 rounded-full border border-white/20 mt-1">
                                            <span className="text-white text-[8px] sm:text-[10px] font-medium uppercase tracking-wider flex items-center gap-1">
                                                <Star className="w-2 h-2 sm:w-3 sm:h-3 fill-white" />
                                                Popular
                                            </span>
                                        </div>
                                    )}

                                    {/* Valid Until */}
                                    <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 bg-black/40 backdrop-blur-md px-2 sm:px-3 py-1 rounded-full flex items-center gap-1 sm:gap-2 border border-white/10">
                                        <Timer className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-white/70" />
                                        <span className="text-white/80 text-[8px] sm:text-[10px] font-medium">
                                            {offer.validUntil}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-4 sm:p-5 md:p-6">
                                    <div className="flex items-start justify-between mb-2">
                                        <div className="flex-1">
                                            <h3 className="text-base sm:text-lg md:text-xl font-medium text-gray-800 mb-0.5">
                                                {offer.title}
                                            </h3>
                                            <p className="text-xs sm:text-sm text-gray-400 font-light">
                                                {offer.description}
                                            </p>
                                        </div>
                                        <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br ${offer.color} flex items-center justify-center flex-shrink-0 ml-2`}>
                                            <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                        </div>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="mt-4">
                                        <div className="flex justify-between text-[10px] sm:text-xs text-gray-400 mb-1">
                                            <span>Available</span>
                                            <span className="text-red-600 font-medium">{offer.available}% Left</span>
                                        </div>
                                        <div className="w-full h-1.5 bg-gray-200/50 rounded-full overflow-hidden">
                                            <div 
                                                className={`h-full bg-gradient-to-r ${offer.color} rounded-full transition-all duration-1000`} 
                                                style={{ width: `${offer.available}%` }}
                                            ></div>
                                        </div>
                                    </div>

                                    {/* Action Button */}
                                    <button className="mt-4 w-full px-4 py-2.5 sm:py-3 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white text-xs sm:text-sm font-medium rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-red-600/30 flex items-center justify-center gap-2 group/btn">
                                        <span>Claim Offer</span>
                                        <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {filteredOffers.length === 0 && (
                    <div className="text-center py-12 sm:py-20">
                        <div className="inline-block p-4 bg-white/30 backdrop-blur-md rounded-full mb-4">
                            <Gift className="w-12 h-12 text-gray-300" />
                        </div>
                        <p className="text-gray-400 text-base sm:text-lg font-light">No offers available in this category.</p>
                        <p className="text-gray-300 text-sm font-light mt-1">Check back later for new deals!</p>
                    </div>
                )}

              

            </div>
        </div>
    );
};

export default SpecialOffers;