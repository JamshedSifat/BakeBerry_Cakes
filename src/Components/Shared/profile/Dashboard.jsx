
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import {
    ShoppingBag,
    Package,
    Clock,
    CheckCircle,
    AlertCircle,
    DollarSign,
    Star,
    Heart,
    User,
    ChevronRight,
    Search,
    Filter,
    Eye,
    LogOut,
    Settings,
    Bell
} from 'lucide-react';

const Dashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');
    const [selectedOrder, setSelectedOrder] = useState(null);

    // User data
    const [userData] = useState({
        name: 'Sarah Johnson',
        email: 'sarah@email.com',
        joinDate: 'Jan 2024'
    });

    // Orders data
    const [orders] = useState([
        {
            id: 'ORD-001',
            date: 'Jan 15, 2024',
            status: 'delivered',
            total: 74.48,
            items: [
                { name: 'Chocolate Cake', quantity: 2, price: 25.99 },
                { name: 'Croissant', quantity: 5, price: 4.50 }
            ],
            tracking: [
                { status: 'Order Placed', time: '10:30 AM', done: true },
                { status: 'Preparing', time: '11:00 AM', done: true },
                { status: 'Delivered', time: '12:30 PM', done: true }
            ]
        },
        {
            id: 'ORD-002',
            date: 'Jan 14, 2024',
            status: 'processing',
            total: 51.97,
            items: [
                { name: 'Sourdough Bread', quantity: 3, price: 8.99 },
                { name: 'Tiramisu', quantity: 2, price: 12.50 }
            ],
            tracking: [
                { status: 'Order Placed', time: '2:15 PM', done: true },
                { status: 'Preparing', time: '2:30 PM', done: true },
                { status: 'Delivered', time: null, done: false }
            ]
        },
        {
            id: 'ORD-003',
            date: 'Jan 12, 2024',
            status: 'delivered',
            total: 48.98,
            items: [
                { name: 'Red Velvet Cake', quantity: 1, price: 29.99 },
                { name: 'Vegan Apple Pie', quantity: 1, price: 18.99 }
            ],
            tracking: [
                { status: 'Order Placed', time: '9:00 AM', done: true },
                { status: 'Preparing', time: '9:30 AM', done: true },
                { status: 'Delivered', time: '10:15 AM', done: true }
            ]
        }
    ]);

    // Wishlist
    const [wishlist] = useState([
        { id: 1, name: 'Chocolate Truffle Cake', price: 35.99, rating: 4.8 },
        { id: 2, name: 'Artisan Sourdough', price: 8.99, rating: 4.9 }
    ]);

    // Stats
    const stats = {
        totalOrders: orders.length,
        totalSpent: orders.filter(o => o.status === 'delivered').reduce((sum, o) => sum + o.total, 0),
        activeOrders: orders.filter(o => o.status === 'processing').length,
        wishlistCount: wishlist.length
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'processing': return 'bg-blue-100 text-blue-700';
            case 'delivered': return 'bg-green-100 text-green-700';
            case 'cancelled': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'processing': return <Clock className="w-3 h-3" />;
            case 'delivered': return <CheckCircle className="w-3 h-3" />;
            case 'cancelled': return <AlertCircle className="w-3 h-3" />;
            default: return <Package className="w-3 h-3" />;
        }
    };

    const getStatusLabel = (status) => {
        return status.charAt(0).toUpperCase() + status.slice(1);
    };

    const handleLogout = () => {
        localStorage.removeItem('userToken');
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-red-50/30 pt-20">
            <div className="container mx-auto px-4 py-6 max-w-6xl">
                
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">
                            Welcome back, {userData.name}!
                        </h1>
                        <p className="text-sm text-gray-500">Here's your order summary</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow">
                            <Bell className="w-5 h-5 text-gray-600" />
                        </button>
                        <button 
                            onClick={() => navigate('/cart')}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium flex items-center gap-2"
                        >
                            <ShoppingBag className="w-4 h-4" />
                            Cart
                        </button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white rounded-xl p-4 shadow-md">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs text-gray-500">Total Orders</p>
                                <p className="text-2xl font-bold text-gray-800">{stats.totalOrders}</p>
                            </div>
                            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                                <Package className="w-5 h-5 text-red-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-4 shadow-md">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs text-gray-500">Active Orders</p>
                                <p className="text-2xl font-bold text-gray-800">{stats.activeOrders}</p>
                            </div>
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <Clock className="w-5 h-5 text-blue-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-4 shadow-md">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs text-gray-500">Total Spent</p>
                                <p className="text-2xl font-bold text-gray-800">${stats.totalSpent.toFixed(2)}</p>
                            </div>
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                <DollarSign className="w-5 h-5 text-green-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-4 shadow-md">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs text-gray-500">Wishlist</p>
                                <p className="text-2xl font-bold text-gray-800">{stats.wishlistCount}</p>
                            </div>
                            <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                                <Heart className="w-5 h-5 text-pink-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="border-b border-gray-200 px-4">
                        <div className="flex gap-4 py-3">
                            {['overview', 'orders', 'wishlist'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                                        activeTab === tab
                                            ? 'bg-red-600 text-white'
                                            : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="p-4">
                        {/* Overview Tab */}
                        {activeTab === 'overview' && (
                            <div>
                                <h3 className="font-semibold text-gray-800 mb-3">Recent Orders</h3>
                                <div className="space-y-3">
                                    {orders.slice(0, 2).map((order) => (
                                        <div key={order.id} className="border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow">
                                            <div className="flex flex-wrap items-center justify-between gap-2">
                                                <div>
                                                    <div className="flex items-center gap-3">
                                                        <span className="font-medium text-gray-800 text-sm">{order.id}</span>
                                                        <span className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${getStatusColor(order.status)}`}>
                                                            {getStatusIcon(order.status)}
                                                            {getStatusLabel(order.status)}
                                                        </span>
                                                    </div>
                                                    <p className="text-xs text-gray-500 mt-1">{order.date}</p>
                                                    <p className="text-xs text-gray-600 mt-1">
                                                        {order.items.length} item{order.items.length > 1 ? 's' : ''}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-bold text-red-600">${order.total.toFixed(2)}</p>
                                                    <button 
                                                        onClick={() => setSelectedOrder(order)}
                                                        className="text-xs text-red-600 hover:text-red-700 font-medium flex items-center gap-1"
                                                    >
                                                        View <ChevronRight className="w-3 h-3" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button 
                                    onClick={() => setActiveTab('orders')}
                                    className="mt-3 text-sm text-red-600 hover:text-red-700 font-medium"
                                >
                                    View all orders →
                                </button>
                            </div>
                        )}

                        {/* Orders Tab */}
                        {activeTab === 'orders' && (
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-semibold text-gray-800">All Orders</h3>
                                    <div className="flex items-center gap-2">
                                        <div className="relative">
                                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <input
                                                type="text"
                                                placeholder="Search orders..."
                                                className="pl-9 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-red-600 focus:border-transparent"
                                            />
                                        </div>
                                        <button className="p-1.5 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100">
                                            <Filter className="w-4 h-4 text-gray-600" />
                                        </button>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    {orders.map((order) => (
                                        <div key={order.id} className="border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow">
                                            <div className="flex flex-wrap items-center justify-between gap-2">
                                                <div>
                                                    <div className="flex flex-wrap items-center gap-2">
                                                        <span className="font-medium text-gray-800 text-sm">{order.id}</span>
                                                        <span className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${getStatusColor(order.status)}`}>
                                                            {getStatusIcon(order.status)}
                                                            {getStatusLabel(order.status)}
                                                        </span>
                                                    </div>
                                                    <p className="text-xs text-gray-500 mt-1">{order.date}</p>
                                                    <div className="flex flex-wrap gap-1 mt-1">
                                                        {order.items.slice(0, 2).map((item, idx) => (
                                                            <span key={idx} className="text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-600">
                                                                {item.name} × {item.quantity}
                                                            </span>
                                                        ))}
                                                        {order.items.length > 2 && (
                                                            <span className="text-xs text-gray-400">+{order.items.length - 2}</span>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-bold text-red-600">${order.total.toFixed(2)}</p>
                                                    <button 
                                                        onClick={() => setSelectedOrder(order)}
                                                        className="text-xs text-red-600 hover:text-red-700 font-medium flex items-center gap-1"
                                                    >
                                                        Details <Eye className="w-3 h-3" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Wishlist Tab */}
                        {activeTab === 'wishlist' && (
                            <div>
                                <h3 className="font-semibold text-gray-800 mb-3">My Wishlist</h3>
                                {wishlist.length === 0 ? (
                                    <div className="text-center py-8">
                                        <Heart className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                                        <p className="text-gray-500 text-sm">Your wishlist is empty</p>
                                        <button 
                                            onClick={() => navigate('/menu')}
                                            className="mt-2 text-red-600 hover:text-red-700 text-sm font-medium"
                                        >
                                            Browse Products →
                                        </button>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {wishlist.map((item) => (
                                            <div key={item.id} className="border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow">
                                                <h4 className="font-medium text-gray-800">{item.name}</h4>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <div className="flex items-center gap-1">
                                                        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                                                        <span className="text-xs text-gray-600">{item.rating}</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-between mt-2">
                                                    <span className="font-bold text-red-600">${item.price.toFixed(2)}</span>
                                                    <button className="px-3 py-1 bg-red-600 text-white text-xs rounded-lg hover:bg-red-700 transition-colors">
                                                        Add to Cart
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Profile & Settings */}
                <div className="mt-6 bg-white rounded-xl shadow-md p-4">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white font-semibold">
                                {userData.name.charAt(0)}
                            </div>
                            <div>
                                <p className="font-medium text-gray-800 text-sm">{userData.name}</p>
                                <p className="text-xs text-gray-500">{userData.email}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button 
                                onClick={() => navigate('/profile')}
                                className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm flex items-center gap-1"
                            >
                                <User className="w-4 h-4" />
                                Profile
                            </button>
                            <button 
                                onClick={() => navigate('/settings')}
                                className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm flex items-center gap-1"
                            >
                                <Settings className="w-4 h-4" />
                                Settings
                            </button>
                            <button 
                                onClick={handleLogout}
                                className="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm flex items-center gap-1"
                            >
                                <LogOut className="w-4 h-4" />
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Order Details Modal */}
            {selectedOrder && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                        <div className="p-4 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white rounded-t-2xl">
                            <div>
                                <h3 className="font-semibold text-gray-800">{selectedOrder.id}</h3>
                                <p className="text-xs text-gray-500">{selectedOrder.date}</p>
                            </div>
                            <button
                                onClick={() => setSelectedOrder(null)}
                                className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                            >
                                <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="p-4">
                            {/* Status */}
                            <div className="flex items-center justify-between mb-4">
                                <span className={`text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1 ${getStatusColor(selectedOrder.status)}`}>
                                    {getStatusIcon(selectedOrder.status)}
                                    {getStatusLabel(selectedOrder.status)}
                                </span>
                                <span className="font-bold text-red-600">${selectedOrder.total.toFixed(2)}</span>
                            </div>

                            {/* Tracking */}
                            {selectedOrder.tracking && (
                                <div className="mb-4">
                                    <h4 className="text-sm font-medium text-gray-800 mb-2">Tracking</h4>
                                    <div className="space-y-3">
                                        {selectedOrder.tracking.map((step, idx) => (
                                            <div key={idx} className="flex items-start gap-3">
                                                <div className="flex flex-col items-center">
                                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step.done ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-400'}`}>
                                                        {step.done ? <CheckCircle className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                                                    </div>
                                                    {idx < selectedOrder.tracking.length - 1 && (
                                                        <div className={`w-0.5 h-6 ${step.done ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                                                    )}
                                                </div>
                                                <div>
                                                    <p className={`text-sm ${step.done ? 'text-gray-800' : 'text-gray-400'}`}>
                                                        {step.status}
                                                    </p>
                                                    <p className="text-xs text-gray-500">{step.time || 'Pending'}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Items */}
                            <div className="mb-4">
                                <h4 className="text-sm font-medium text-gray-800 mb-2">Items</h4>
                                <div className="space-y-1">
                                    {selectedOrder.items.map((item, idx) => (
                                        <div key={idx} className="flex items-center justify-between text-sm">
                                            <span className="text-gray-700">{item.name} × {item.quantity}</span>
                                            <span className="text-gray-800">${(item.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2">
                                <button className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium">
                                    Order Again
                                </button>
                                <button 
                                    onClick={() => setSelectedOrder(null)}
                                    className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;