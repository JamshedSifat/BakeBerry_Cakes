
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import {
    User,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Edit2,
    Save,
    X,
    ShoppingBag,
    Heart,
    Settings,
    LogOut,
    CreditCard,
    Package,
    Clock,
    CheckCircle,
    AlertCircle,
    Upload,
    Camera,
    Award,
    Star,
    TrendingUp,
    Shield
} from 'lucide-react';

const MyProfile = () => {
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState('profile');
    
    // User data state
    const [userData, setUserData] = useState({
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1 (555) 123-4567',
        address: '123 Baker Street, New York, NY 10001',
        joinDate: 'January 2024',
        avatar: '/api/placeholder/150/150'
    });

    // Form state for editing
    const [formData, setFormData] = useState({ ...userData });
    const [isSaving, setIsSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);

    // Order history data
    const [orders, setOrders] = useState([
        {
            id: 'ORD-001',
            date: '2024-01-15',
            status: 'Delivered',
            total: 45.99,
            items: [
                { name: 'Chocolate Cake', quantity: 2, price: 25.99 },
                { name: 'Croissant', quantity: 3, price: 4.50 }
            ]
        },
        {
            id: 'ORD-002',
            date: '2024-01-10',
            status: 'Processing',
            total: 32.50,
            items: [
                { name: 'Sourdough Bread', quantity: 1, price: 8.99 },
                { name: 'Tiramisu', quantity: 2, price: 12.50 }
            ]
        },
        {
            id: 'ORD-003',
            date: '2024-01-05',
            status: 'Delivered',
            total: 67.98,
            items: [
                { name: 'Red Velvet Cake', quantity: 1, price: 29.99 },
                { name: 'Vegan Apple Pie', quantity: 2, price: 18.99 }
            ]
        }
    ]);

    // Wishlist data
    const [wishlist, setWishlist] = useState([
        { id: 1, name: 'Chocolate Truffle Cake', price: 35.99, image: '/api/placeholder/100/100' },
        { id: 2, name: 'Artisan Baguette', price: 6.99, image: '/api/placeholder/100/100' }
    ]);

    // Stats
    const stats = {
        totalOrders: orders.length,
        totalSpent: orders.reduce((sum, order) => sum + order.total, 0),
        favoriteItems: wishlist.length,
        memberSince: 'Jan 2024'
    };

    useEffect(() => {
        // Load user data from localStorage or API
        const savedUser = localStorage.getItem('userData');
        if (savedUser) {
            try {
                const parsed = JSON.parse(savedUser);
                setUserData(parsed);
                setFormData(parsed);
            } catch (error) {
                console.error('Error loading user data:', error);
            }
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            setUserData(formData);
            localStorage.setItem('userData', JSON.stringify(formData));
            setIsEditing(false);
            setSaveSuccess(true);
            setTimeout(() => setSaveSuccess(false), 3000);
        } catch (error) {
            console.error('Error saving profile:', error);
        } finally {
            setIsSaving(false);
        }
    };

    const handleCancel = () => {
        setFormData(userData);
        setIsEditing(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('userData');
        navigate('/login');
    };

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'delivered':
                return 'text-green-600 bg-green-100';
            case 'processing':
                return 'text-blue-600 bg-blue-100';
            case 'shipped':
                return 'text-purple-600 bg-purple-100';
            case 'cancelled':
                return 'text-red-600 bg-red-100';
            default:
                return 'text-gray-600 bg-gray-100';
        }
    };

    const getStatusIcon = (status) => {
        switch (status.toLowerCase()) {
            case 'delivered':
                return <CheckCircle className="w-4 h-4" />;
            case 'processing':
                return <Clock className="w-4 h-4" />;
            case 'shipped':
                return <Package className="w-4 h-4" />;
            case 'cancelled':
                return <AlertCircle className="w-4 h-4" />;
            default:
                return <Clock className="w-4 h-4" />;
        }
    };

    const tabs = [
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'orders', label: 'Orders', icon: ShoppingBag },
        { id: 'wishlist', label: 'Wishlist', icon: Heart },
        { id: 'settings', label: 'Settings', icon: Settings }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-red-50/20 to-pink-50/20 pt-20 sm:pt-24">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl sm:text-4xl font-light text-gray-800">
                        My <span className="text-red-600 font-medium">Profile</span>
                    </h1>
                    <p className="text-gray-400 text-sm mt-1">Manage your account and preferences</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <div className="lg:w-72 flex-shrink-0">
                        <div className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-xl border border-white/40 p-6 sticky top-24">
                            {/* Profile Avatar */}
                            <div className="text-center mb-6">
                                <div className="relative inline-block">
                                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-red-600/20 shadow-lg mx-auto">
                                        <img 
                                            src={userData.avatar} 
                                            alt={userData.name}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.target.src = `https://ui-avatars.com/api/?name=${userData.name}&background=red&color=fff`;
                                            }}
                                        />
                                    </div>
                                    <button className="absolute bottom-0 right-0 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-all duration-300 shadow-lg hover:scale-105">
                                        <Camera className="w-4 h-4" />
                                    </button>
                                </div>
                                <h2 className="text-lg font-semibold text-gray-800 mt-3">{userData.name}</h2>
                                <p className="text-sm text-gray-500">{userData.email}</p>
                                <p className="text-xs text-gray-400 mt-1">
                                    Member since {userData.joinDate}
                                </p>
                            </div>

                            {/* Navigation Tabs */}
                            <nav className="space-y-1">
                                {tabs.map((tab) => {
                                    const Icon = tab.icon;
                                    const isActive = activeTab === tab.id;
                                    return (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                                                isActive
                                                    ? 'bg-red-600/20 text-red-600 font-semibold shadow-sm'
                                                    : 'text-gray-600 hover:bg-red-600/10 hover:text-red-600'
                                            }`}
                                        >
                                            <Icon className="w-5 h-5" />
                                            <span className="text-sm">{tab.label}</span>
                                            {tab.id === 'orders' && orders.length > 0 && (
                                                <span className="ml-auto bg-red-600 text-white text-xs rounded-full px-2 py-0.5">
                                                    {orders.length}
                                                </span>
                                            )}
                                            {tab.id === 'wishlist' && wishlist.length > 0 && (
                                                <span className="ml-auto bg-pink-600 text-white text-xs rounded-full px-2 py-0.5">
                                                    {wishlist.length}
                                                </span>
                                            )}
                                        </button>
                                    );
                                })}
                            </nav>

                            {/* Logout Button */}
                            <div className="mt-6 pt-6 border-t border-gray-200/50">
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-600/10 transition-all duration-300"
                                >
                                    <LogOut className="w-5 h-5" />
                                    <span className="text-sm font-medium">Logout</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 min-w-0">
                        <div className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-xl border border-white/40 p-6 sm:p-8">
                            
                            {/* Stats Cards */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                                <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-4 text-center">
                                    <ShoppingBag className="w-6 h-6 text-red-600 mx-auto mb-1" />
                                    <p className="text-2xl font-bold text-gray-800">{stats.totalOrders}</p>
                                    <p className="text-xs text-gray-500">Total Orders</p>
                                </div>
                                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 text-center">
                                    <TrendingUp className="w-6 h-6 text-green-600 mx-auto mb-1" />
                                    <p className="text-2xl font-bold text-gray-800">${stats.totalSpent.toFixed(2)}</p>
                                    <p className="text-xs text-gray-500">Total Spent</p>
                                </div>
                                <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-4 text-center">
                                    <Heart className="w-6 h-6 text-pink-600 mx-auto mb-1" />
                                    <p className="text-2xl font-bold text-gray-800">{stats.favoriteItems}</p>
                                    <p className="text-xs text-gray-500">Wishlist</p>
                                </div>
                                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 text-center">
                                    <Award className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                                    <p className="text-2xl font-bold text-gray-800">{stats.memberSince}</p>
                                    <p className="text-xs text-gray-500">Member Since</p>
                                </div>
                            </div>

                            {/* Profile Tab */}
                            {activeTab === 'profile' && (
                                <div>
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-xl font-semibold text-gray-800">Personal Information</h3>
                                        {!isEditing ? (
                                            <button
                                                onClick={() => setIsEditing(true)}
                                                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all duration-300 text-sm font-medium"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                                Edit Profile
                                            </button>
                                        ) : (
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={handleCancel}
                                                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all duration-300 text-sm font-medium flex items-center gap-2"
                                                >
                                                    <X className="w-4 h-4" />
                                                    Cancel
                                                </button>
                                                <button
                                                    onClick={handleSave}
                                                    disabled={isSaving}
                                                    className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all duration-300 text-sm font-medium flex items-center gap-2"
                                                >
                                                    {isSaving ? (
                                                        <>
                                                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                                                            Saving...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Save className="w-4 h-4" />
                                                            Save Changes
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    {saveSuccess && (
                                        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-xl flex items-center gap-2">
                                            <CheckCircle className="w-5 h-5" />
                                            Profile updated successfully!
                                        </div>
                                    )}

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-2 bg-white/50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all duration-300"
                                                />
                                            ) : (
                                                <div className="flex items-center gap-2 px-4 py-2 bg-white/30 rounded-xl">
                                                    <User className="w-5 h-5 text-gray-400" />
                                                    <span className="text-gray-800">{userData.name}</span>
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                            {isEditing ? (
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-2 bg-white/50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all duration-300"
                                                />
                                            ) : (
                                                <div className="flex items-center gap-2 px-4 py-2 bg-white/30 rounded-xl">
                                                    <Mail className="w-5 h-5 text-gray-400" />
                                                    <span className="text-gray-800">{userData.email}</span>
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                            {isEditing ? (
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-2 bg-white/50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all duration-300"
                                                />
                                            ) : (
                                                <div className="flex items-center gap-2 px-4 py-2 bg-white/30 rounded-xl">
                                                    <Phone className="w-5 h-5 text-gray-400" />
                                                    <span className="text-gray-800">{userData.phone}</span>
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                            {isEditing ? (
                                                <textarea
                                                    name="address"
                                                    value={formData.address}
                                                    onChange={handleInputChange}
                                                    rows="2"
                                                    className="w-full px-4 py-2 bg-white/50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all duration-300"
                                                />
                                            ) : (
                                                <div className="flex items-center gap-2 px-4 py-2 bg-white/30 rounded-xl">
                                                    <MapPin className="w-5 h-5 text-gray-400" />
                                                    <span className="text-gray-800">{userData.address}</span>
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Joined</label>
                                            <div className="flex items-center gap-2 px-4 py-2 bg-white/30 rounded-xl">
                                                <Calendar className="w-5 h-5 text-gray-400" />
                                                <span className="text-gray-800">{userData.joinDate}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Orders Tab */}
                            {activeTab === 'orders' && (
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-6">Order History</h3>
                                    {orders.length === 0 ? (
                                        <div className="text-center py-12">
                                            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                            <p className="text-gray-500">No orders yet</p>
                                            <button 
                                                onClick={() => navigate('/#products')}
                                                className="mt-4 text-red-600 hover:text-red-700 font-medium"
                                            >
                                                Start Shopping →
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {orders.map((order) => (
                                                <div key={order.id} className="bg-white/30 rounded-xl p-4 border border-gray-200/50 hover:shadow-lg transition-all duration-300">
                                                    <div className="flex flex-wrap items-start justify-between gap-4">
                                                        <div>
                                                            <div className="flex items-center gap-3">
                                                                <span className="font-semibold text-gray-800">{order.id}</span>
                                                                <span className={`text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1 ${getStatusColor(order.status)}`}>
                                                                    {getStatusIcon(order.status)}
                                                                    {order.status}
                                                                </span>
                                                            </div>
                                                            <p className="text-sm text-gray-500 mt-1">{order.date}</p>
                                                            <div className="mt-2">
                                                                {order.items.map((item, index) => (
                                                                    <span key={index} className="text-sm text-gray-600">
                                                                        {item.name} × {item.quantity}
                                                                        {index < order.items.length - 1 && ', '}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="text-lg font-bold text-red-600">${order.total.toFixed(2)}</p>
                                                            <button className="text-sm text-red-600 hover:text-red-700 font-medium">
                                                                View Details
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Wishlist Tab */}
                            {activeTab === 'wishlist' && (
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-6">My Wishlist</h3>
                                    {wishlist.length === 0 ? (
                                        <div className="text-center py-12">
                                            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                            <p className="text-gray-500">Your wishlist is empty</p>
                                            <button 
                                                onClick={() => navigate('/#products')}
                                                className="mt-4 text-red-600 hover:text-red-700 font-medium"
                                            >
                                                Explore Products →
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {wishlist.map((item) => (
                                                <div key={item.id} className="flex items-center gap-4 bg-white/30 rounded-xl p-4 border border-gray-200/50 hover:shadow-lg transition-all duration-300">
                                                    <img 
                                                        src={item.image} 
                                                        alt={item.name}
                                                        className="w-20 h-20 rounded-lg object-cover"
                                                        onError={(e) => {
                                                            e.target.src = '/api/placeholder/100/100';
                                                        }}
                                                    />
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="font-medium text-gray-800 truncate">{item.name}</h4>
                                                        <p className="text-red-600 font-semibold">${item.price.toFixed(2)}</p>
                                                        <button className="text-xs text-red-600 hover:text-red-700 font-medium mt-1">
                                                            Add to Cart
                                                        </button>
                                                    </div>
                                                    <button className="text-gray-400 hover:text-red-600 transition-colors duration-300">
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Settings Tab */}
                            {activeTab === 'settings' && (
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-6">Settings</h3>
                                    <div className="space-y-4">
                                        <div className="bg-white/30 rounded-xl p-4 border border-gray-200/50">
                                            <h4 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                                                <Shield className="w-5 h-5 text-red-600" />
                                                Privacy & Security
                                            </h4>
                                            <div className="space-y-2">
                                                <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-red-50 transition-colors duration-200 text-sm text-gray-600">
                                                    Change Password
                                                </button>
                                                <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-red-50 transition-colors duration-200 text-sm text-gray-600">
                                                    Two-Factor Authentication
                                                </button>
                                                <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-red-50 transition-colors duration-200 text-sm text-gray-600">
                                                    Manage Devices
                                                </button>
                                            </div>
                                        </div>

                                        <div className="bg-white/30 rounded-xl p-4 border border-gray-200/50">
                                            <h4 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                                                <CreditCard className="w-5 h-5 text-red-600" />
                                                Payment Methods
                                            </h4>
                                            <div className="space-y-2">
                                                <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-red-50 transition-colors duration-200 text-sm text-gray-600">
                                                    Add Payment Method
                                                </button>
                                                <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-red-50 transition-colors duration-200 text-sm text-gray-600">
                                                    Manage Saved Cards
                                                </button>
                                            </div>
                                        </div>

                                        <div className="bg-white/30 rounded-xl p-4 border border-gray-200/50">
                                            <h4 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                                                <Bell className="w-5 h-5 text-red-600" />
                                                Notifications
                                            </h4>
                                            <div className="space-y-3">
                                                <label className="flex items-center justify-between">
                                                    <span className="text-sm text-gray-600">Order Updates</span>
                                                    <div className="relative inline-flex items-center cursor-pointer">
                                                        <input type="checkbox" className="sr-only peer" defaultChecked />
                                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                                                    </div>
                                                </label>
                                                <label className="flex items-center justify-between">
                                                    <span className="text-sm text-gray-600">Promotions & Offers</span>
                                                    <div className="relative inline-flex items-center cursor-pointer">
                                                        <input type="checkbox" className="sr-only peer" />
                                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                                                    </div>
                                                </label>
                                                <label className="flex items-center justify-between">
                                                    <span className="text-sm text-gray-600">Wishlist Updates</span>
                                                    <div className="relative inline-flex items-center cursor-pointer">
                                                        <input type="checkbox" className="sr-only peer" defaultChecked />
                                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                                                    </div>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;