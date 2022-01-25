import { View, Text, StyleSheet, Button } from 'react-native';
import React from 'react';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase';

export default function Home({name, duration, price, id}) {
    const handleDelete = () => {
        deleteDoc(doc(db, "Services", id))
        .then(() => {
            console.log("Document successfully deleted!");
        }).catch((error) => {
            console.log("Error removing document: ", error);
        });
    }

  return (
    <View style={styles.container}>
      <Text>{name}</Text>
      <Text>{duration}</Text>
      <Text>{price}</Text>
      <Button title={"Delete"} onPress={(e) => {handleDelete(id)} }/>
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'green',
        padding: 10,
        marginTop: 10,
    }
})
