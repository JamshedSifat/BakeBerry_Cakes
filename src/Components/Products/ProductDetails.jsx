// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router';
// import { ArrowLeft } from 'lucide-react';
// import ProductDetailsComponent from '../../Components/Products/ProductDetails';
// import { useCart } from '../../hooks/useCart';

// const ProductDetails = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const { addToCart } = useCart();
//     const [product, setProduct] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const loadProduct = async () => {
//             try {
//                 const response = await fetch('/productsData.json');
//                 const data = await response.json();
//                 const found = data.products.find(item => item.id === parseInt(id));
//                 setProduct(found || null);
//                 setLoading(false);
//             } catch (error) {
//                 console.error('Error loading product:', error);
//                 setLoading(false);
//             }
//         };
//         loadProduct();
//     }, [id]);

//     if (loading) {
//         return (
//             <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-red-50/20 to-pink-50/20">
//                 <div className="text-center">
//                     <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent"></div>
//                     <p className="mt-4 text-gray-400 font-light">Loading product...</p>
//                 </div>
//             </div>
//         );
//     }

//     if (!product) {
//         return (
//             <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-red-50/20 to-pink-50/20">
//                 <div className="text-center">
//                     <p className="text-gray-400 font-light">Product not found</p>
//                     <button 
//                         onClick={() => navigate('/')}
//                         className="mt-4 text-red-600 hover:text-red-700 font-medium"
//                     >
//                         Go Home
//                     </button>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-white via-red-50/20 to-pink-50/20 py-8 sm:py-12">
//             <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
//                 <button 
//                     onClick={() => navigate(-1)}
//                     className="flex items-center gap-2 text-gray-400 hover:text-red-600 transition-colors duration-300 mb-6"
//                 >
//                     <ArrowLeft className="w-4 h-4" />
//                     Back
//                 </button>
//                 <ProductDetailsComponent 
//                     product={product}
//                     onClose={() => navigate(-1)}
//                     onAddToCart={addToCart}
//                 />
//             </div>
//         </div>
//     );
// };

// export default ProductDetails;