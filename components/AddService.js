import { View, Text, TextInput, Button } from "react-native";
import React, { useState } from "react";
import { addDoc,collection } from "firebase/firestore";
import { db } from "../config/firebase";

export default function AddService() {
  const [name, setname] = useState("");
  const [duration, setduration] = useState("");
  const [price, setprice] = useState("");

  const handleSave = () => {
    const serviceRef = collection(db, "Services");
    addDoc(serviceRef, {
        name:name,
        duration:duration,
        price:price
    })
    .then(() => {
        console.log("Document successfully written!");
        setname("");
        setduration("");
        setprice("");
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
    })

  }
  return (
    <View>
      <Text>Add Service</Text>
      {name}
      <TextInput
        placeholder={"name"}
        value={name}
        onChangeText={(e) => {
          setname(e);
        }}
      />
      <TextInput
        placeholder={"price"}
        value={price}
        onChangeText={(e) => {
          setprice(e);
        }}
      />
      <TextInput
        placeholder={"duration"}
        value={duration}
        onChangeText={(e) => {
          setduration(e);
        }}
      />
      <Button title={"Add"} onPress={handleSave}/>
    </View>
  );
}
