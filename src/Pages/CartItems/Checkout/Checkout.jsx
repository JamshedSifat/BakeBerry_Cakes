import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { 
    ArrowLeft, 
    CreditCard, 
    Truck, 
    Shield, 
    CheckCircle,
    User,
    Mail,
    Phone,
    MapPin,
    Building,
    Home,
    Package,
    ShoppingBag,
    Lock,
    ChevronRight,
    AlertCircle
} from 'lucide-react';

const Checkout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const cartData = location.state || { cartItems: [], total: 0 };
    
    const [step, setStep] = useState(1);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        // Personal Info
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        
        // Shipping Address
        address: '',
        apartment: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'USA',
        
        // Payment
        cardNumber: '',
        cardName: '',
        expiry: '',
        cvv: '',
        
        // Options
        saveInfo: false,
        giftWrap: false,
        deliveryNotes: ''
    });

    const [errors, setErrors] = useState({});

    // Handle input change
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        // Clear error for this field
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    // Validate step
    const validateStep = (stepNumber) => {
        const newErrors = {};
        let isValid = true;

        if (stepNumber === 1) {
            if (!formData.firstName.trim()) {
                newErrors.firstName = 'First name is required';
                isValid = false;
            }
            if (!formData.lastName.trim()) {
                newErrors.lastName = 'Last name is required';
                isValid = false;
            }
            if (!formData.email.trim()) {
                newErrors.email = 'Email is required';
                isValid = false;
            } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
                newErrors.email = 'Email is invalid';
                isValid = false;
            }
            if (!formData.phone.trim()) {
                newErrors.phone = 'Phone is required';
                isValid = false;
            }
            if (!formData.address.trim()) {
                newErrors.address = 'Address is required';
                isValid = false;
            }
            if (!formData.city.trim()) {
                newErrors.city = 'City is required';
                isValid = false;
            }
            if (!formData.state.trim()) {
                newErrors.state = 'State is required';
                isValid = false;
            }
            if (!formData.zipCode.trim()) {
                newErrors.zipCode = 'ZIP code is required';
                isValid = false;
            }
        }

        if (stepNumber === 2) {
            if (!formData.cardNumber.trim()) {
                newErrors.cardNumber = 'Card number is required';
                isValid = false;
            } else if (formData.cardNumber.replace(/\s/g, '').length < 16) {
                newErrors.cardNumber = 'Card number must be 16 digits';
                isValid = false;
            }
            if (!formData.cardName.trim()) {
                newErrors.cardName = 'Name on card is required';
                isValid = false;
            }
            if (!formData.expiry.trim()) {
                newErrors.expiry = 'Expiry date is required';
                isValid = false;
            }
            if (!formData.cvv.trim()) {
                newErrors.cvv = 'CVV is required';
                isValid = false;
            } else if (formData.cvv.length < 3) {
                newErrors.cvv = 'CVV must be 3-4 digits';
                isValid = false;
            }
        }

        setErrors(newErrors);
        return isValid;
    };

    // Handle next step
    const handleNext = () => {
        if (validateStep(step)) {
            setStep(step + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    // Handle previous step
    const handlePrevious = () => {
        setStep(step - 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Handle place order
    const handlePlaceOrder = () => {
        if (validateStep(2)) {
            setIsProcessing(true);
            // Simulate API call
            setTimeout(() => {
                setIsProcessing(false);
                setIsComplete(true);
            }, 2000);
        }
    };

    // Format card number
    const formatCardNumber = (value) => {
        const v = value.replace(/\s/g, '').replace(/\D/g, '');
        const parts = v.match(/.{1,4}/g);
        return parts ? parts.join(' ') : v;
    };

    // Format expiry
    const formatExpiry = (value) => {
        const v = value.replace(/\D/g, '');
        if (v.length >= 2) {
            return v.slice(0, 2) + '/' + v.slice(2, 4);
        }
        return v;
    };

    // Format currency
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    // Generate order number
    const orderNumber = `ORD-${Date.now().toString().slice(-8)}`;

    if (isComplete) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-white via-red-50/20 to-pink-50/20 py-8 sm:py-12 flex items-center justify-center">
                <div className="bg-white/40 backdrop-blur-xl rounded-3xl p-8 sm:p-12 max-w-md w-full mx-4 text-center border border-white/40 shadow-2xl">
                    <div className="inline-block p-4 bg-green-500/10 rounded-full mb-4 animate-bounce">
                        <CheckCircle className="w-16 h-16 text-green-500" />
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">Order Placed! 🎉</h2>
                    <p className="text-gray-400 font-light mb-4">Your order has been confirmed successfully.</p>
                    <div className="bg-white/30 backdrop-blur-sm rounded-xl p-4 mb-6">
                        <p className="text-sm text-gray-500">Order Number</p>
                        <p className="text-lg font-bold text-red-600">{orderNumber}</p>
                    </div>
                    <p className="text-sm text-gray-400 mb-6">We'll send you a confirmation email shortly.</p>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <button 
                            onClick={() => navigate('/products')}
                            className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-medium rounded-full transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-red-600/30 flex items-center justify-center gap-2"
                        >
                            <ShoppingBag className="w-4 h-4" />
                            Continue Shopping
                        </button>
                        <button 
                            onClick={() => navigate('/orders')}
                            className="flex-1 px-6 py-3 bg-white/30 backdrop-blur-sm hover:bg-white/50 text-gray-700 font-medium rounded-full transition-all duration-300 border border-white/40"
                        >
                            View Orders
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-red-50/20 to-pink-50/20 py-8 sm:py-12">
            <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
                
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                    <button 
                        onClick={() => navigate(-1)}
                        className="text-gray-400 hover:text-red-600 transition-colors duration-300 p-2 hover:bg-red-600/10 rounded-full"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-light text-gray-800 flex items-center gap-3">
                        <CreditCard className="w-6 h-6 sm:w-8 sm:h-8 text-red-600" />
                        Checkout
                    </h1>
                </div>

                {/* Progress Steps */}
                <div className="flex items-center justify-between max-w-md mx-auto mb-8">
                    {[1, 2, 3].map((num) => (
                        <div key={num} className="flex items-center">
                            <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 ${
                                step >= num 
                                    ? 'bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-lg shadow-red-600/30' 
                                    : 'bg-white/30 backdrop-blur-sm text-gray-400 border border-gray-200/50'
                            }`}>
                                {step > num ? <CheckCircle className="w-4 h-4" /> : num}
                            </div>
                            {num < 3 && (
                                <div className={`w-12 sm:w-16 h-0.5 mx-2 ${
                                    step > num ? 'bg-red-600' : 'bg-gray-200'
                                }`} />
                            )}
                        </div>
                    ))}
                </div>

                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                    
                    {/* Main Form */}
                    <div className="flex-1">
                        <div className="bg-white/40 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-white/40 shadow-lg">
                            
                            {/* Step 1: Shipping Info */}
                            {step === 1 && (
                                <div className="space-y-6">
                                    <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                        <Truck className="w-5 h-5 text-red-600" />
                                        Shipping Information
                                    </h2>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                First Name *
                                            </label>
                                            <input
                                                type="text"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleChange}
                                                className={`w-full px-4 py-2.5 bg-white/20 backdrop-blur-sm border-2 ${
                                                    errors.firstName ? 'border-red-500' : 'border-red-600/30 focus:border-red-600'
                                                } rounded-xl text-gray-700 placeholder:text-gray-400/70 focus:outline-none transition-all duration-300`}
                                                placeholder="John"
                                            />
                                            {errors.firstName && (
                                                <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Last Name *
                                            </label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleChange}
                                                className={`w-full px-4 py-2.5 bg-white/20 backdrop-blur-sm border-2 ${
                                                    errors.lastName ? 'border-red-500' : 'border-red-600/30 focus:border-red-600'
                                                } rounded-xl text-gray-700 placeholder:text-gray-400/70 focus:outline-none transition-all duration-300`}
                                                placeholder="Doe"
                                            />
                                            {errors.lastName && (
                                                <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Email *
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className={`w-full px-4 py-2.5 bg-white/20 backdrop-blur-sm border-2 ${
                                                    errors.email ? 'border-red-500' : 'border-red-600/30 focus:border-red-600'
                                                } rounded-xl text-gray-700 placeholder:text-gray-400/70 focus:outline-none transition-all duration-300`}
                                                placeholder="john@example.com"
                                            />
                                            {errors.email && (
                                                <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Phone *
                                            </label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className={`w-full px-4 py-2.5 bg-white/20 backdrop-blur-sm border-2 ${
                                                    errors.phone ? 'border-red-500' : 'border-red-600/30 focus:border-red-600'
                                                } rounded-xl text-gray-700 placeholder:text-gray-400/70 focus:outline-none transition-all duration-300`}
                                                placeholder="(555) 123-4567"
                                            />
                                            {errors.phone && (
                                                <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Street Address *
                                        </label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-2.5 bg-white/20 backdrop-blur-sm border-2 ${
                                                errors.address ? 'border-red-500' : 'border-red-600/30 focus:border-red-600'
                                            } rounded-xl text-gray-700 placeholder:text-gray-400/70 focus:outline-none transition-all duration-300`}
                                            placeholder="123 Main St"
                                        />
                                        {errors.address && (
                                            <p className="text-xs text-red-500 mt-1">{errors.address}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Apartment/Suite (Optional)
                                        </label>
                                        <input
                                            type="text"
                                            name="apartment"
                                            value={formData.apartment}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2.5 bg-white/20 backdrop-blur-sm border-2 border-red-600/30 focus:border-red-600 rounded-xl text-gray-700 placeholder:text-gray-400/70 focus:outline-none transition-all duration-300"
                                            placeholder="Apt 4B"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                City *
                                            </label>
                                            <input
                                                type="text"
                                                name="city"
                                                value={formData.city}
                                                onChange={handleChange}
                                                className={`w-full px-4 py-2.5 bg-white/20 backdrop-blur-sm border-2 ${
                                                    errors.city ? 'border-red-500' : 'border-red-600/30 focus:border-red-600'
                                                } rounded-xl text-gray-700 placeholder:text-gray-400/70 focus:outline-none transition-all duration-300`}
                                                placeholder="New York"
                                            />
                                            {errors.city && (
                                                <p className="text-xs text-red-500 mt-1">{errors.city}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                State *
                                            </label>
                                            <input
                                                type="text"
                                                name="state"
                                                value={formData.state}
                                                onChange={handleChange}
                                                className={`w-full px-4 py-2.5 bg-white/20 backdrop-blur-sm border-2 ${
                                                    errors.state ? 'border-red-500' : 'border-red-600/30 focus:border-red-600'
                                                } rounded-xl text-gray-700 placeholder:text-gray-400/70 focus:outline-none transition-all duration-300`}
                                                placeholder="NY"
                                            />
                                            {errors.state && (
                                                <p className="text-xs text-red-500 mt-1">{errors.state}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                ZIP Code *
                                            </label>
                                            <input
                                                type="text"
                                                name="zipCode"
                                                value={formData.zipCode}
                                                onChange={handleChange}
                                                className={`w-full px-4 py-2.5 bg-white/20 backdrop-blur-sm border-2 ${
                                                    errors.zipCode ? 'border-red-500' : 'border-red-600/30 focus:border-red-600'
                                                } rounded-xl text-gray-700 placeholder:text-gray-400/70 focus:outline-none transition-all duration-300`}
                                                placeholder="10001"
                                            />
                                            {errors.zipCode && (
                                                <p className="text-xs text-red-500 mt-1">{errors.zipCode}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Country
                                            </label>
                                            <select
                                                name="country"
                                                value={formData.country}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2.5 bg-white/20 backdrop-blur-sm border-2 border-red-600/30 focus:border-red-600 rounded-xl text-gray-700 focus:outline-none transition-all duration-300"
                                            >
                                                <option value="USA">United States</option>
                                                <option value="Canada">Canada</option>
                                                <option value="UK">United Kingdom</option>
                                                <option value="Australia">Australia</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Delivery Notes (Optional)
                                        </label>
                                        <textarea
                                            name="deliveryNotes"
                                            value={formData.deliveryNotes}
                                            onChange={handleChange}
                                            rows="2"
                                            className="w-full px-4 py-2.5 bg-white/20 backdrop-blur-sm border-2 border-red-600/30 focus:border-red-600 rounded-xl text-gray-700 placeholder:text-gray-400/70 focus:outline-none transition-all duration-300 resize-none"
                                            placeholder="Any special delivery instructions..."
                                        />
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <input
                                            type="checkbox"
                                            name="saveInfo"
                                            checked={formData.saveInfo}
                                            onChange={handleChange}
                                            className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                                        />
                                        <label className="text-sm text-gray-600">
                                            Save this information for next time
                                        </label>
                                    </div>
                                </div>
                            )}

                            {/* Step 2: Payment */}
                            {step === 2 && (
                                <div className="space-y-6">
                                    <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                        <CreditCard className="w-5 h-5 text-red-600" />
                                        Payment Information
                                    </h2>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Card Number *
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                name="cardNumber"
                                                value={formData.cardNumber}
                                                onChange={(e) => {
                                                    const formatted = formatCardNumber(e.target.value);
                                                    handleChange({
                                                        target: { name: 'cardNumber', value: formatted }
                                                    });
                                                }}
                                                className={`w-full px-4 py-2.5 pl-10 bg-white/20 backdrop-blur-sm border-2 ${
                                                    errors.cardNumber ? 'border-red-500' : 'border-red-600/30 focus:border-red-600'
                                                } rounded-xl text-gray-700 placeholder:text-gray-400/70 focus:outline-none transition-all duration-300`}
                                                placeholder="1234 5678 9012 3456"
                                                maxLength="19"
                                            />
                                            <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            {errors.cardNumber && (
                                                <p className="text-xs text-red-500 mt-1">{errors.cardNumber}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Name on Card *
                                        </label>
                                        <input
                                            type="text"
                                            name="cardName"
                                            value={formData.cardName}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-2.5 bg-white/20 backdrop-blur-sm border-2 ${
                                                errors.cardName ? 'border-red-500' : 'border-red-600/30 focus:border-red-600'
                                            } rounded-xl text-gray-700 placeholder:text-gray-400/70 focus:outline-none transition-all duration-300`}
                                            placeholder="John Doe"
                                        />
                                        {errors.cardName && (
                                            <p className="text-xs text-red-500 mt-1">{errors.cardName}</p>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Expiry Date *
                                            </label>
                                            <input
                                                type="text"
                                                name="expiry"
                                                value={formData.expiry}
                                                onChange={(e) => {
                                                    const formatted = formatExpiry(e.target.value);
                                                    handleChange({
                                                        target: { name: 'expiry', value: formatted }
                                                    });
                                                }}
                                                className={`w-full px-4 py-2.5 bg-white/20 backdrop-blur-sm border-2 ${
                                                    errors.expiry ? 'border-red-500' : 'border-red-600/30 focus:border-red-600'
                                                } rounded-xl text-gray-700 placeholder:text-gray-400/70 focus:outline-none transition-all duration-300`}
                                                placeholder="MM/YY"
                                                maxLength="5"
                                            />
                                            {errors.expiry && (
                                                <p className="text-xs text-red-500 mt-1">{errors.expiry}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                CVV *
                                            </label>
                                            <input
                                                type="password"
                                                name="cvv"
                                                value={formData.cvv}
                                                onChange={handleChange}
                                                className={`w-full px-4 py-2.5 bg-white/20 backdrop-blur-sm border-2 ${
                                                    errors.cvv ? 'border-red-500' : 'border-red-600/30 focus:border-red-600'
                                                } rounded-xl text-gray-700 placeholder:text-gray-400/70 focus:outline-none transition-all duration-300`}
                                                placeholder="•••"
                                                maxLength="4"
                                            />
                                            {errors.cvv && (
                                                <p className="text-xs text-red-500 mt-1">{errors.cvv}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <input
                                            type="checkbox"
                                            name="giftWrap"
                                            checked={formData.giftWrap}
                                            onChange={handleChange}
                                            className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                                        />
                                        <label className="text-sm text-gray-600 flex items-center gap-1">
                                            <Gift className="w-4 h-4" />
                                            Add gift wrapping ($5.00)
                                        </label>
                                    </div>

                                    <div className="bg-red-600/5 rounded-xl p-4 border border-red-600/10">
                                        <div className="flex items-start gap-3">
                                            <Shield className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                                            <div>
                                                <p className="text-sm font-medium text-gray-800">Secure Payment</p>
                                                <p className="text-xs text-gray-400">Your payment information is encrypted and secure.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Navigation Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 mt-8 pt-6 border-t border-gray-200/50">
                                {step > 1 ? (
                                    <button 
                                        onClick={handlePrevious}
                                        className="px-6 py-3 bg-white/30 backdrop-blur-sm hover:bg-white/50 text-gray-700 font-medium rounded-full transition-all duration-300 border border-white/40 flex items-center justify-center gap-2"
                                    >
                                        <ArrowLeft className="w-4 h-4" />
                                        Back
                                    </button>
                                ) : (
                                    <button 
                                        onClick={() => navigate('/cart')}
                                        className="px-6 py-3 bg-white/30 backdrop-blur-sm hover:bg-white/50 text-gray-700 font-medium rounded-full transition-all duration-300 border border-white/40 flex items-center justify-center gap-2"
                                    >
                                        <ArrowLeft className="w-4 h-4" />
                                        Return to Cart
                                    </button>
                                )}
                                
                                <button 
                                    onClick={step === 2 ? handlePlaceOrder : handleNext}
                                    disabled={isProcessing}
                                    className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-medium rounded-full transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-red-600/30 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {isProcessing ? (
                                        <>
                                            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                                            Processing...
                                        </>
                                    ) : step === 2 ? (
                                        <>
                                            <Lock className="w-4 h-4" />
                                            Place Order
                                        </>
                                    ) : (
                                        <>
                                            Continue to Payment
                                            <ChevronRight className="w-4 h-4" />
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:w-96 flex-shrink-0">
                        <div className="bg-white/40 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-white/40 shadow-lg sticky top-24">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                <Package className="w-5 h-5 text-red-600" />
                                Order Summary
                            </h3>
                            
                            <div className="space-y-3 max-h-60 overflow-y-auto mb-4">
                                {cartData.cartItems && cartData.cartItems.map((item) => (
                                    <div key={item.id} className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 flex-shrink-0"></div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-700 truncate">{item.name}</p>
                                            <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                                        </div>
                                        <span className="text-sm font-medium text-red-600">
                                            {formatCurrency(item.price * item.quantity)}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-gray-200/50 pt-3 space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Subtotal</span>
                                    <span className="text-gray-700">{formatCurrency(cartData.total || 0)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Shipping</span>
                                    <span className="text-gray-700">Free</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Tax</span>
                                    <span className="text-gray-700">{formatCurrency((cartData.total || 0) * 0.08)}</span>
                                </div>
                                <div className="border-t border-gray-200/50 pt-2 mt-2">
                                    <div className="flex justify-between text-base font-semibold">
                                        <span className="text-gray-800">Total</span>
                                        <span className="text-red-600">
                                            {formatCurrency((cartData.total || 0) * 1.08)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 p-3 bg-red-600/5 rounded-xl border border-red-600/10">
                                <div className="flex items-center gap-2 text-xs text-gray-400">
                                    <Shield className="w-3.5 h-3.5 text-red-600" />
                                    <span>Your information is secure and encrypted</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Checkout;