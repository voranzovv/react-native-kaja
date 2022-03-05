import { View, Text } from "react-native";
import React, { useState } from "react";
import Home from "./components/home";
import { useEffect } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "./config/firebase";
import AddService from './components/AddService';
import Register from './components/Auth/Register';
import Booking from './components/booking';
import Upload from "./components/upload";
import ImageUpload from "./components/ImgUpload";

export default function App() {
  const [Service, setService] = useState([]);
  // useEffect(() => {
  //   const serviceRef = collection(db, "Services");
  //   const q = query(serviceRef, orderBy("name", "desc"));

  //   onSnapshot(q, (snapshot) => {
  //     const services = snapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     }));
  //     setService(services);
  //     console.log(services);
  //   });
  // }, []);
  return (
    <View>
      {/* <Register/> */}
      {/* <AddService/> */}
      {/* <Text>we have {Service.length} services</Text> */}
      {/* {Service.map((s) => {
        return (
          <Home
            key={s.id}
            name={s.name}
            duration={s.duration}
            price={s.price}
            id={s.id}
          />
        );
      })} */}

      {/* <Booking/> */}
      <Upload/>
      <ImageUpload />
      
    </View>
  );
}
