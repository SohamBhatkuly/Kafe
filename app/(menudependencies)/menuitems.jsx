import React, { useState } from 'react';
import { View, Text, Image, Pressable, Modal, ScrollView, TouchableOpacity, Button } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 

const MenuItems = ({ items }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [extrasQuantities, setExtrasQuantities] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState([]);

  const openModal = (item) => {
    setSelectedItem(item);
    setExtrasQuantities({});
    setQuantity(1);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedItem(null);
  };

  const updateExtraQuantity = (extra, increment) => {
    setExtrasQuantities((prev) => {
      const newQuantity = (prev[extra] || 0) + increment;
      if (newQuantity < 0) return prev;
      return { ...prev, [extra]: newQuantity };
    });
  };

  const addToCart = () => {
    if (selectedItem) {
      const cartItem = {
        ...selectedItem,
        extras: Object.entries(extrasQuantities)
          .filter(([_, qty]) => qty > 0)
          .map(([extra, qty]) => ({ name: extra, quantity: qty })),
        quantity,
      };

      setCart((prevCart) => [...prevCart, cartItem]);
      closeModal();
    }
  };

  return (
    <View>
      {items.length > 0 ? (
        <ScrollView>
          {items.map((item) => (
            <Pressable
              key={item.id}
              onPress={() => openModal(item)}
              className="bg-black flex-row items-center my-2 p-2"
            >
              <Image source={item.image} className="w-40 h-40 mr-3" />
              <View>
                <Text className="text-white text-lg">{item.name}</Text>
                <Text className="text-white">{item.price}</Text>
                <View className="flex-row items-center">
                  <Text className="text-white mr-1">{item.rating}</Text>
                  <FontAwesome name="star" size={16} color="yellow" />
                </View>
                <Image
                  source={item.isVeg ? require('../(menudependencies)/menuimgs/veg1.png') : require('../(menudependencies)/menuimgs/nonveg1.webp')}
                  className="w-4 h-4"
                />
              </View>
            </Pressable>
          ))}
        </ScrollView>
      ) : (
        <Text className="text-white">No items found</Text>
      )}

      {selectedItem && (
    <Modal
      visible={modalVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={closeModal}
    >
      <View className="flex-1 bg-black bg-opacity-100">
        <View className="bg-white p-5 w-full h-full relative">
       
          <TouchableOpacity onPress={closeModal} style={{ position: 'absolute', top: 20, left: 20 }}>
            <AntDesign name="close" size={24} color="black" />
          </TouchableOpacity>

      
          <View className="flex-1 pt-4">
            <ScrollView contentContainerStyle={{ paddingBottom: 150 }}>
              <Image source={selectedItem.image} className="w-[100%] h-[50%] my-4" />
              <Text className="text-xl font-bold">{selectedItem.name}</Text>
              <Text>{selectedItem.description}</Text>
              <Text className="mt-1">Ingredient: {selectedItem.ingredient}</Text>


              <Text className="mt-4 font-bold">Choose Extras:</Text>
              {selectedItem.extras?.map((extra, index) => (
                <View key={index} className="flex-row justify-between items-center my-2">
                  <Text>{extra}</Text>
                  <View className="flex-row items-center">
                    <TouchableOpacity
                      onPress={() => updateExtraQuantity(extra, -1)}
                      className="w-8 h-8 rounded-full bg-black justify-center items-center"
                    >
                      <Text className="text-white">-</Text>
                    </TouchableOpacity>
                    <Text className="mx-4">{extrasQuantities[extra] || 0}</Text>
                    <TouchableOpacity
                      onPress={() => updateExtraQuantity(extra, 1)}
                      className="w-8 h-8 rounded-full bg-black justify-center items-center"
                    >
                      <Text className="text-white">+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}

              {/* Quantity Section */}
            
                </ScrollView>
                  <View className="flex-row items-center justify-between my-4">
             
                <View className="flex-row items-center">
                  <TouchableOpacity
                    onPress={() => setQuantity((prev) => Math.max(1, prev - 1))}
                    className="w-8 h-8 rounded-full bg-black justify-center items-center"
                  >
                    <Text className="text-white">-</Text>
                  </TouchableOpacity>
                  <Text className="mx-4">{quantity}</Text>
                  <TouchableOpacity
                    onPress={() => setQuantity((prev) => prev + 1)}
                    className="w-8 h-8 rounded-full bg-black justify-center items-center"
                  >
                    <Text className="text-white">+</Text>
                  </TouchableOpacity>
                </View>

            
                <TouchableOpacity
                  onPress={addToCart}
                  className="bg-black rounded-lg py-3 items-center flex-1 max-w-xs"
                  style={{ marginLeft: 10 }} 
                >
                  <Text className="text-white">Add to Cart</Text>
                </TouchableOpacity>
              </View>

          </View>
        </View>
      </View>
    </Modal>


      )}
    </View>
  );
};

export default MenuItems;
