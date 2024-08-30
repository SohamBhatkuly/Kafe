import React, { useRef, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Categories from '../(menudependencies)/Categories'; 
import MenuItems from '../(menudependencies)/menuitems';
import { items } from '../(menudependencies)/menuindex';
import SlidingImages from '../(menudependencies)/slidingimages';
import FilterButtons from '../(menudependencies)/filterbuttons'; // Move FilterButtons here

const Menu = () => {
  const scrollViewRef = useRef(null);

  // Create references for each unique category section
  const sectionRefs = items.reduce((acc, item) => {
    if (!acc[item.type]) acc[item.type] = React.createRef();
    return acc;
  }, {});

  // Scroll to the section when a category button is clicked
  const scrollToSection = (type) => {
    const sectionRef = sectionRefs[type];
    if (sectionRef?.current) {
      sectionRef.current.measureLayout(
        scrollViewRef.current,
        (x, y) => {
          scrollViewRef.current.scrollTo({ y, animated: true });
        }
      );
    }
  };

  // Get unique categories
  const uniqueCategories = [...new Set(items.map(item => item.type))];

  // State for managing filtered items
  const [filteredItems, setFilteredItems] = useState(items);
  const [filterApplied, setFilterApplied] = useState(false);

  const filterByPrice = () => {
    if (!filterApplied) {
      const sortedItems = [...items].sort((a, b) => a.price - b.price);
      setFilteredItems(sortedItems);
      setFilterApplied(true);
    } else {
      resetFilters(); // Reset items when filter is clicked again
    }
  };

  const filterByRating = () => {
    if (!filterApplied) {
      const sortedItems = [...items].sort((a, b) => b.rating - a.rating);
      setFilteredItems(sortedItems);
      setFilterApplied(true);
    } else {
      resetFilters(); // Reset items when filter is clicked again
    }
  };

  const resetFilters = () => {
    setFilteredItems(items); // Reset to original items
    setFilterApplied(false);
  };

  const images = [
    require('../(menudependencies)/menuimgs/latte.jpeg'), // Adjust the path
    require('../(menudependencies)/menuimgs/muffins.jpg'), // Adjust the path
    // Add more images as needed
  ];

  return (
    <SafeAreaView className="bg-black flex-1">
      <ScrollView 
        ref={scrollViewRef} 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <SlidingImages images={images} />
        
        <Categories scrollToSection={scrollToSection} />

        {/* Filter Buttons here */}
        <FilterButtons filterByPrice={filterByPrice} filterByRating={filterByRating} />

        {/* Render Menu Items by Category */}
        {uniqueCategories.map(category => (
          <View key={category} ref={sectionRefs[category]}>
            <MenuItems items={filteredItems.filter(item => item.type === category)} />
          </View>
        ))}

      </ScrollView>
    </SafeAreaView>
  );
};

export default Menu;
