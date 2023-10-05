import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import {useNavigation} from '@react-navigation/native';
import { Button, TextInput } from 'react-native-paper';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/RootActions";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const userList = useSelector((state) => state.userReducer.userList);
  
  useEffect(async () => {
    const auth = await AsyncStorage.getItem("user");
    if (auth) {
      navigation.navigate("home");
    }
  }, []);

  const handleLogin = () => {

    let data = {
      email: email,
      password: password
    };

    dispatch(loginUser(data,navigate))

  };

  return (
    <View>
      <Text>SignIn</Text>

      <View>
        <TextInput
          size="small"
          mode="outlined"
          label="Email"
          value={email}
          onChangeText={(e) => setEmail(e.target.value)}
        />
      </View>
      <br />

      <View>
        <TextInput
          size="small"
          mode="outlined"
          type="password"
          label="Password"
          value={password}
          onChangeText={(e) => setPassword(e.target.value)}
        />
      </View>
      <br />
        <Button size="small" mode="contained" onPress={() => handleLogin()}>
          Save
        </Button>
    </View>
  )
}

export default Login;