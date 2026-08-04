import React, { useState, useEffect } from 'react';
import Products from '../Products/Products';
import menuData from '../../../public/menuData.json';

const Menu = () => {
    const [categories, setCategories] = useState([]);
    const [allItems, setAllItems] = useState([]);
    const [activeCategory, setActiveCategory] = useState('all');

    useEffect(() => {
        setCategories(menuData.categories);
        setAllItems(menuData.menuItems);
    }, []);

    return (
        <Products 
            items={allItems}
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            title="Our Menu"
            subtitle="Experience the art of baking with our handcrafted selection of premium artisan breads, delicate pastries, and indulgent desserts."
            itemsPerPage={6}
            showHeader={true}
            showFilters={true}
            showPagination={true}
        />
    );
};

export default Menu;