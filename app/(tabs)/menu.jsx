import React, { useRef, useState } from 'react';
import { ScrollView, View, Text } from 'react-native';
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
    require('../(menudependencies)/menuimgs/coffeeroasted(2).jpg'), // Adjust the pathcoffeeroasted(2)
    require('../(menudependencies)/menuimgs/burger2.jpg'), // Adjust the path
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
        <View className="color-main pl-5 fs-5">
          <Text className="color-main text-lg">What's on your mind?</Text>
        </View>
        <Categories scrollToSection={scrollToSection} />

        {/* Filter Buttons here */}
        <FilterButtons filterByPrice={filterByPrice} filterByRating={filterByRating} />

        {/* Render Menu Items by Category */}
        {uniqueCategories.map(category => (
          <View  className="pl-3"key={category} ref={sectionRefs[category]}>
            <MenuItems items={filteredItems.filter(item => item.type === category)} />
          </View>
        ))}

      </ScrollView>
    </SafeAreaView>
  );
};

export default Menu;
