import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button } from "react-native";
import { launchCameraAsync } from "expo-image-picker";

const ImagePicker = () => {
  async function takeImageHandler() {
    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    console.log(image);
  }

  return (
    <View>
      <View></View>
      <Button title="take image" onPress={takeImageHandler} />
    </View>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({});
