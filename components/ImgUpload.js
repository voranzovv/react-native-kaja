import { View, Text, Button } from 'react-native'
import React, { useState } from 'react'
import * as DocumentPicker from "expo-document-picker";
import { ref } from 'firebase/storage';
import { storage } from '../config/firebase';
import { Timestamp } from 'firebase/firestore';
import { uploadBytesResumable } from 'firebase/storage';


export default function ImgUpload() {
    const [image, setImage] = useState(null)
    const handleDocumentSelection =()=>{
        DocumentPicker.getDocumentAsync({
            type: "image/*",
        })
        .then(
            (res)=>{
                setImage(res)
                console.log('image',image)
            }
        )
    }

    const handleUpload =()=>{

        const storageRef = ref(storage,`images/${Date.now()}${image.name}`)
        const uploadTask = uploadBytesResumable(storageRef,image.file)
        console.log(uploadTask)
    }
  return (
    <View>
      <Text>ImgUpload</Text>
      <Button title="Select 📑" onPress={handleDocumentSelection} />
      <Button title="Upload 📤" onPress={handleUpload} />
    </View>
  )
}