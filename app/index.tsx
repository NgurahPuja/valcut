import { useEffect, useState } from "react";
import { View,  Image, StyleSheet, Alert, ActivityIndicator } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import * as MediaLibrary from "expo-media-library";
import { Dimensions } from "react-native";
import Button from '@/components/Button';
import IconButton from '@/components/IconButton';
import { StatusBar } from 'expo-status-bar';
const { width, height } = Dimensions.get("window");

export default function Index() {
  const [image, setImage] = useState<string | null>(null);
  const [imageWidth, setImageWidth] = useState(0);
  const [imageHeight, setImageHeight] = useState(0);
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!permissionResponse?.granted) {
      requestPermission();
    }
  }, [permissionResponse]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });
    

    if (!result.canceled) {
      const asset = result.assets[0];
      setLoading(true);
      
      setTimeout(() => {
      setImage(asset.uri);
      setImageWidth(asset.width || 300);
      setImageHeight(asset.height || 300);
      setLoading(false);
      }, 1000);



      
    }
  };

const compressImage = async (uri: string) => {
  // get the image size

  // optional: you can get real width/height using Image.getSize if needed

  // set target width only if image is large
  const actions = [];
  if (imageWidth && imageWidth > 960) {
    actions.push({ resize: { width: 960 } });
  }

  const result = await ImageManipulator.manipulateAsync(uri, actions, {
    compress: 0.65,
    format: ImageManipulator.SaveFormat.JPEG,
  });

  return result;
};
  const onSaveImageAsync = async () => {
    if (!image) return Alert.alert("Please pick an image first!");
    try {
      const compressed = await compressImage(image);
      await MediaLibrary.saveToLibraryAsync(compressed.uri);
      Alert.alert("Saved!", "Compressed image saved to gallery.");
    } catch (e) {
      console.log(e);
    }
  };

  const removeImage = () => {
    setImage(null)
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" /> 
      {loading && (
  <ActivityIndicator
    size="large"
    color="#51c8e6ff'"
    style={{ transform: [{ scale: 1.5 }] }}
  />
)}

      {!loading && image && (
        <>
          <Image
            source={{ uri: image }}
            style={styles.image}
            resizeMode="contain"
          />
          <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
            <IconButton icon="delete" label="Delete" onPress={removeImage} />
            <Button label="Download Compress" onPress={onSaveImageAsync} />
          </View>
        </>
      )}

      {!loading && !image && (
        <Button theme="primary" label="Choose a photo" onPress={pickImage} />
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#ffffffff'
  },
  image: {
    width: width,         // full screen width
    height: height * 0.6, // take about 60% of screen height
  },
  buttonContainer: {
    flexDirection: 'row',
    margin: 10
  }
  
});