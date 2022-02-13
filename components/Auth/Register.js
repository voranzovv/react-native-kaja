import { View, Text, TextInput, Button,StyleSheet } from "react-native";
import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const classes = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});

export default function Register() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  console.log(user);

  const handleRegister = () => {
    console.log("registering");
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        updateProfile(auth.currentUser, { displayName: name });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <View className={classes.container}>
      <Text>Register</Text>
      <TextInput
        placeholder={"name"}
        value={name}
        onChangeText={(e) => {
          setname(e);
        }}
      />
      <TextInput
        placeholder={"email"}
        value={email}
        onChangeText={(text) => {
          setemail(text);
        }}
      />
      <TextInput
        placeholder={"password"}
        value={password}
        onChangeText={(e) => {
          setpassword(e);
        }}
      />
      <Button title={"Register"} onPress={handleRegister} />
      <Button
        title={"Logout"}
        onPress={() => {
          signOut(auth);
        }}
      />
      <Button title={"Login"} onPress={handleLogin} />
      <Text>{user?.displayName}</Text>
      <Text>Hello guys</Text>
    </View>
  );
}


