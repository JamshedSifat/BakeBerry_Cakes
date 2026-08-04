import React, { useState } from 'react';
import { Search as SearchIcon, X } from 'lucide-react';
import Search from './Search';

const MobileSearchToggle = ({ className = "" }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className={`md:hidden btn btn-ghost btn-circle hover:bg-red-600/20 hover:scale-110 transition-all duration-300 bg-white/20 backdrop-blur-md border border-white/30 ${className}`}
            >
                {isOpen ? (
                    <X className="h-5 w-5 text-red-600" />
                ) : (
                    <SearchIcon className="h-5 w-5 text-red-600" />
                )}
            </button>

            {isOpen && (
                <>
                    <div 
                        className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                        onClick={() => setIsOpen(false)}
                    ></div>
                    <div className="md:hidden fixed top-16 left-0 right-0 z-40 bg-white/90 backdrop-blur-2xl p-4 shadow-2xl border-b border-white/40 animate-slide-down">
                        <Search 
                            placeholder="Search for products..." 
                            variant="full"
                            onSearch={() => setIsOpen(false)}
                        />
                    </div>
                </>
            )}

            <style>{`
                @keyframes slide-down {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-slide-down {
                    animation: slide-down 0.3s ease-out;
                }
            `}</style>
        </>
    );
};

export default MobileSearchToggle;