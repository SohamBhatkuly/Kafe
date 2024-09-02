import React, { useState } from 'react';
import { View, Text, Image, Pressable, Modal, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const MenuItems = ({ items }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const openModal = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedItem(null);
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
              <Image
                source={item.image}
                className="w-40 h-40 mr-3"
              />
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
            <View className="bg-white p-5 w-full h-full ">
              
              <Image
                source={selectedItem.image}
                className="w-[100%] h-[50%] my-4"
              />
              <Text className="text-xl  font-bold">{selectedItem.name}</Text>
              <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, animi fugiat magnam totam, corporis earum dolorum quae, libero vitae ipsam quibusdam et voluptate molestiae ea? Quas possimus consectetur delectus. Eum?</Text>
              <Text>{selectedItem.description}</Text>
              <Text className="mt-1">Ingredient:{selectedItem.ingredient}</Text>
              <Pressable onPress={closeModal} className="absolute top-2 left-2 p-2 border border-red-300 rounded">
                <Text className="text-lg text-red-500">X</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default MenuItems;
