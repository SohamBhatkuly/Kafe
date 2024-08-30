import React, { useState } from 'react';
import { View, Text, FlatList, Image, Pressable, Modal } from 'react-native';
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
        <FlatList
          data={items}
          renderItem={({ item }) => (
            <Pressable onPress={() => openModal(item)} className="bg-black items-center my-5 flex-row">
              <Image source={item.image} className="w-40 h-40 self-start mr-3" />
              <View>
                <Text className="text-white">{item.name}</Text>
                <Text className="text-white">{item.price}</Text>
                <View className="flex-row items-center">
                  <Text className="text-white mr-1">{item.rating}</Text>
                  <FontAwesome name="star" size={16} color="yellow" />
                </View>
              </View>
            </Pressable>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
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
          <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
            <View className="bg-white p-10 rounded-lg w-[90%] h-[90%] justify-start items-center">
              <Text className="text-lg font-bold">{selectedItem.name}</Text>
              <Image source={selectedItem.image} className="w-40 h-40 mt-5 mb-5" />
              <Text>{selectedItem.description}</Text>
              <Text className="mt-3">Price: {selectedItem.price}</Text>
              <Text>Rating: {selectedItem.rating}</Text>
              <Pressable onPress={closeModal} className="absolute top-2 left-2 p-2 border-1 border-red-300 rounded">
                <Text className="text-lg color-main">X</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default MenuItems;
