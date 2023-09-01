import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Image } from "react-native";
import { Pressable } from "react-native";

const PlaceItem = ({ place, onSelect }) => {
  return (
    <Pressable onPress={onSelect}>
      <View>
        <Image source={{ uri: place.imageUri }} />
        <Text>{place.title}</Text>
        <Text>{place.address}</Text>
      </View>
    </Pressable>
  );
};

export default PlaceItem;

const styles = StyleSheet.create({
    
});
