import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Button,
} from "react-native";
import React, { useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import { ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../config/firebase";
import { Timestamp } from "firebase/firestore";

export default function Upload() {
  const [file, setFile] = useState(null);
  const handleDocumentSelection = () => {
    DocumentPicker.getDocumentAsync({
      type: "image/*",
    }).then((res) => {
    //   setFile(res);
      console.log(Timestamp);
    });
  };

  const handleUpload = () => {
      console.log("upload", file.name);
    const storageRef = ref(storage,file.name);
    const uploadTask =uploadBytesResumable(storageRef, file.file);
    uploadTask.on(
        "state_changed",
        (snapshot) => {
            const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
        }
    )

  }
  return (
    <View>
      <SafeAreaView>
        <StatusBar barStyle={"dark-content"} />
        <Text>Upload</Text>
        <Button title="Select 📑" onPress={handleDocumentSelection} />
        {file && <Button title="Upload 📤" onPress={handleUpload} />}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
