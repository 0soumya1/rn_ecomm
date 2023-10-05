import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import {useNavigation} from '@react-navigation/native';
import { Button, TextInput } from 'react-native-paper';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector} from "react-redux";
import { signUP } from "../redux/Users/Action";

const SignUp = () => {
  const dispatch = useDispatch()
  const [name, setName] = useState(""); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigation = useNavigation();

  const userList = useSelector((state) => state.userReducer.userList);

  useEffect(async() => {
    const auth = await AsyncStorage.getItem("user");
    if (auth) {
      navigation.navigate("home");
    }
  }, []);

  const collectData = () => {
    if ((!name, !email, !password)) {
      setError(true);
      return false;
    }

    let data = {
      name: name,
      email: email,
      password: password
    };

    dispatch(signUP(data, navigate))

  };

  return (
    <View>
      <Text>Register</Text>

      <View>
        <TextInput
          size="small"
          mode="outlined"
          label="Name"
          value={name}
          onChangeText={(e) => setName(e.target.value)}
        />
      </View>
      <br />
      {error && !name && (
        <Text className="invalid-input">Enter Valid Name</Text>
      )}

      <View>
        <TextInput
          mode="outlined"
          size="small"
          label="Email"
          value={email}
          onChangeText={(e) => setEmail(e.target.value)}
        />
      </View>
      <br />
      {error && !email && (
        <Text className="invalid-input">Enter Valid Email</Text>
      )}
      <View>
        <TextInput
          mode="outlined"
          size="small"
          type="password"
          label="Password"
          value={password}
          onChangeText={(e) => setPassword(e.target.value)}
        />
      </View>
      <br />
      {error && !password && (
        <Text className="invalid-input" style={{ marginLeft: "-60px" }}>
          Enter Valid Password
        </Text>
      )}

      <Button
        size="small"
        style={{ width: "100px" }}
        mode="contained"
        onPress={()=>collectData()}
      >
        SignUp
      </Button>
    </View>
  )
}

export default SignUp