import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { 
    Search as SearchIcon, 
    X, 
    Clock, 
    TrendingUp, 
    Sparkles,
    ArrowRight,
    Package,
    Coffee,
    Cake,
    Cookie,
    Croissant,
    Sandwich
} from 'lucide-react';

const searchData = [
    { id: 1, name: 'Artisan Sourdough', category: 'Breads', price: 8.99, icon: Croissant },
    { id: 2, name: 'Butter Croissant', category: 'Pastries', price: 3.99, icon: Coffee },
    { id: 3, name: 'Red Velvet Cake', category: 'Cakes', price: 34.99, icon: Cake },
    { id: 4, name: 'Chocolate Chip Cookies', category: 'Cookies', price: 2.99, icon: Cookie },
    { id: 5, name: 'French Baguette', category: 'Breads', price: 4.99, icon: Sandwich },
    { id: 6, name: 'Chocolate Danish', category: 'Pastries', price: 4.49, icon: Coffee },
];

const Search = ({ 
    placeholder = "Search products...", 
    variant = "default", // "default", "compact", "full"
    onSearch,
    className = ""
}) => {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [recentSearches, setRecentSearches] = useState([]);
    const searchRef = useRef(null);

    const trendingSearches = ['Croissant', 'Cake', 'Cookies', 'Bread', 'Pastries'];

    useEffect(() => {
        if (query.trim() === '') {
            setResults([]);
            return;
        }
        const filtered = searchData.filter(item =>
            item.name.toLowerCase().includes(query.toLowerCase()) ||
            item.category.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filtered);
    }, [query]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const saved = localStorage.getItem('recentSearches');
        if (saved) {
            try {
                setRecentSearches(JSON.parse(saved));
            } catch (error) {
                console.error('Error loading recent searches:', error);
            }
        }
    }, []);

    const saveRecentSearch = (searchTerm) => {
        const updated = [searchTerm, ...recentSearches.filter(s => s !== searchTerm)];
        const limited = updated.slice(0, 5);
        setRecentSearches(limited);
        localStorage.setItem('recentSearches', JSON.stringify(limited));
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim() === '') return;
        saveRecentSearch(query);
        setIsOpen(false);
        if (onSearch) {
            onSearch(query);
        } else {
            navigate(`/search?q=${encodeURIComponent(query)}`);
        }
        setQuery('');
    };

    const handleResultClick = (item) => {
        saveRecentSearch(item.name);
        setIsOpen(false);
        setQuery('');
        navigate(`/product/${item.id}`);
    };

    const clearSearch = () => {
        setQuery('');
        setResults([]);
        setIsOpen(false);
    };

    const handleRecentClick = (search) => {
        setQuery(search);
        saveRecentSearch(search);
        setIsOpen(false);
        if (onSearch) {
            onSearch(search);
        } else {
            navigate(`/search?q=${encodeURIComponent(search)}`);
        }
    };

    const getVariantClasses = () => {
        switch (variant) {
            case 'compact': return 'w-32 lg:w-40 xl:w-48';
            case 'full': return 'w-full';
            default: return 'w-32 lg:w-48 xl:w-64';
        }
    };

    return (
        <div ref={searchRef} className={`relative ${className}`}>
            <form onSubmit={handleSearch} className="relative">
                <input 
                    type="text" 
                    placeholder={placeholder}
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setIsOpen(true);
                    }}
                    onFocus={() => setIsOpen(true)}
                    className={`${getVariantClasses()} px-4 py-2 pl-9 bg-white/20 backdrop-blur-md border-2 border-red-600/30 focus:border-red-600 text-gray-700 placeholder:text-gray-400/70 focus:outline-none transition-all duration-300 rounded-xl text-sm`}
                />
                <SearchIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                {query && (
                    <button
                        type="button"
                        onClick={clearSearch}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 hover:bg-red-600/10 rounded-full transition-all duration-300"
                    >
                        <X className="w-3.5 h-3.5 text-gray-400 hover:text-red-600 transition-colors" />
                    </button>
                )}
            </form>

            {isOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white/90 backdrop-blur-2xl rounded-2xl shadow-3xl border border-white/40 max-h-[400px] overflow-hidden z-50">
                    <div className="overflow-y-auto max-h-[400px] p-2">
                        {recentSearches.length > 0 && query === '' && (
                            <div className="mb-4">
                                <div className="flex items-center justify-between px-3 py-2">
                                    <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                        <Clock className="w-3.5 h-3.5" />
                                        Recent Searches
                                    </h4>
                                    <button 
                                        onClick={() => {
                                            setRecentSearches([]);
                                            localStorage.removeItem('recentSearches');
                                        }}
                                        className="text-xs text-red-600 hover:text-red-700 font-medium transition-colors"
                                    >
                                        Clear All
                                    </button>
                                </div>
                                <div className="flex flex-wrap gap-2 px-3">
                                    {recentSearches.map((search, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleRecentClick(search)}
                                            className="px-3 py-1.5 bg-white/50 backdrop-blur-sm hover:bg-red-600/10 rounded-full text-xs text-gray-600 hover:text-red-600 transition-all duration-300 border border-gray-200/50"
                                        >
                                            {search}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {query === '' && recentSearches.length === 0 && (
                            <div className="mb-4">
                                <div className="flex items-center gap-2 px-3 py-2">
                                    <TrendingUp className="w-3.5 h-3.5 text-red-600" />
                                    <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                        Trending Now
                                    </h4>
                                </div>
                                <div className="flex flex-wrap gap-2 px-3">
                                    {trendingSearches.map((search, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleRecentClick(search)}
                                            className="px-3 py-1.5 bg-gradient-to-r from-red-600/10 to-pink-600/10 hover:from-red-600/20 hover:to-pink-600/20 rounded-full text-xs text-gray-600 hover:text-red-600 transition-all duration-300 border border-red-600/10"
                                        >
                                            <span className="flex items-center gap-1">
                                                <Sparkles className="w-2.5 h-2.5 text-red-600" />
                                                {search}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {query && (
                            <div>
                                {results.length > 0 ? (
                                    <div>
                                        <div className="flex items-center justify-between px-3 py-2">
                                            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                                <Package className="w-3.5 h-3.5" />
                                                Results ({results.length})
                                            </h4>
                                            <span className="text-[10px] text-gray-300">Press Enter to see all</span>
                                        </div>
                                        {results.map((item) => {
                                            const Icon = item.icon;
                                            return (
                                                <div
                                                    key={item.id}
                                                    onClick={() => handleResultClick(item)}
                                                    className="flex items-center gap-3 px-3 py-2.5 hover:bg-red-600/5 rounded-xl cursor-pointer transition-all duration-300 group"
                                                >
                                                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-red-600/10 to-pink-600/10">
                                                        <Icon className="w-5 h-5 text-red-600" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="text-sm font-medium text-gray-800 group-hover:text-red-600 transition-colors">
                                                            {item.name}
                                                        </h4>
                                                        <p className="text-xs text-gray-400 flex items-center gap-2">
                                                            <span>{item.category}</span>
                                                            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                                            <span className="text-red-600 font-medium">${item.price.toFixed(2)}</span>
                                                        </p>
                                                    </div>
                                                    <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-red-600 group-hover:translate-x-1 transition-all duration-300" />
                                                </div>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <div className="inline-block p-4 bg-red-600/5 rounded-full mb-3">
                                            <SearchIcon className="w-8 h-8 text-gray-300" />
                                        </div>
                                        <p className="text-gray-400 font-light">No results found for <span className="text-red-600 font-medium">"{query}"</span></p>
                                        <p className="text-xs text-gray-300 mt-1">Try adjusting your search terms</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {query === '' && (
                            <div className="border-t border-gray-200/50 pt-3 mt-2">
                                <div className="flex items-center gap-2 px-3 py-1">
                                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                        Browse Categories
                                    </span>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 px-3 py-2">
                                    {['Breads', 'Pastries', 'Cakes', 'Cookies', 'Muffins', 'Pies'].map((category) => (
                                        <button
                                            key={category}
                                            onClick={() => handleRecentClick(category)}
                                            className="px-3 py-2 bg-white/30 backdrop-blur-sm hover:bg-red-600/10 rounded-xl text-xs text-gray-600 hover:text-red-600 transition-all duration-300 border border-gray-200/50 text-left"
                                        >
                                            {category}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Search;