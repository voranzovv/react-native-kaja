import { Button, StyleSheet, Text, View, Picker } from "react-native";
import React, { useState, useEffect } from "react";
import DatePicker from "react-native-datepicker";
import { collection, onSnapshot, query, where, addDoc } from "firebase/firestore";
import { db } from "../config/firebase";

const timeSlots = [
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
];

const Booking = () => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [selectedValue, setSelectedValue] = useState("");
  const [availableSlots, setAvailableSlots] = useState(timeSlots);
  const [selectedService, setSelectedService] = useState("");
  const [services, setServices] = useState(["Make-up", "Clean-up", "Facial"]);

  useEffect(() => {
    const bookingRef = collection(db, "Bookings");
    const q = query(bookingRef, where("date", "==", date));
    onSnapshot(q, (snapshot) => {
      const slots = timeSlots.filter((slot) => {
        return !snapshot.docs.map((doc) => doc.data().time).includes(slot);
      });
      setAvailableSlots(slots);
    });
  }, [date]);

  const onPressBook = () => {
    const bookingRef = collection(db, "Bookings");
    const booking = {
      date: date,
      time: selectedValue,
      serviceName: selectedService,
      price: selectedService === "Make-up" ? 1000 : 500,
      user: "voranzov",

    }
    addDoc(bookingRef, booking);
  };
  return (
    <View>
      <Text>Booking</Text>
      <DatePicker
        minDate={new Date()}
        mode="date"
        modal
        open={open}
        date={date}
        onDateChange={setDate}
        onConfirm={(date) => {
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
      <View>
        <Picker
          selectedValue={selectedValue}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        >
          <Picker.Item label={"Please select the time"} value={""} />
          {availableSlots.map((time, index) => {
            return <Picker.Item label={time} value={time} key={index} />;
          })}
        </Picker>
      </View>
      <View>
        <Picker
          selectedValue={selectedService}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedService(itemValue)
          }
        >
          <Picker.Item label={"Please select the service"} value={""} />
          {services.map((service, index) => {
            return <Picker.Item label={service} value={service} key={index} />;
          })}
        </Picker>
      </View>
      <Button title="Book" color="#841584" onPress={onPressBook} />
    </View>
  );
};

export default Booking;

const styles = StyleSheet.create({});
