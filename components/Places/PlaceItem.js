import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Image } from "react-native";
import { Pressable } from "react-native";

const PlaceItem = ({ place, onSelect }) => {
  console.log(place);
  return (
    <Pressable onPress={onSelect}>
      <View>
        <Image source={{ uri: place.item.imageUri }} />
        <Text>{place.item.title}</Text>
        <Text>{place.item.address}</Text>
      </View>
    </Pressable>
  );
};

export default PlaceItem;

const styles = StyleSheet.create({});
