import {View, Text, ToastAndroid} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import {BASE_URL} from '../Const';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {Button, Headline, TextInput} from 'react-native-paper';
import { AuthContext } from '../AuthContext';
import style from '../style';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { store, setStore } = useContext(AuthContext);
//   const [error, setError] = useState(false);
  const navigation = useNavigation();

  const toast = (msg) => {
    return ToastAndroid.show(msg, ToastAndroid.LONG, ToastAndroid.CENTER);
  };

  useEffect(() => {
    if(store.user){
        setName(store.user?.name);
        setEmail(store.user?.email);
        setPassword(store.user?.password);
      }
  }, []);

  const collectData = () => {
    // if ((!name, !email, !password)) {
    //   setError(true);
    //   return false;
    // }

    let data = {
      name: name,
      email: email,
      password: password,
    };

    axios
      .post(BASE_URL + 'register', data)
      .then(res => {
        if (res?.data?.auth) {
            setStore({
                ...store,
                user: res?.data?.result,
                token: res?.data?.auth
              })
        //   AsyncStorage.setItem('user', res?.data?.result);
        //   AsyncStorage.setItem('token', res?.data?.auth);
          toast('SignUp Successful');
          navigation.navigate('home');
        } else {
          toast('please enter correct details');
        }
      })
      .catch(() => {
        toast('api signup err');
      });
  };

  return (
    <View>
      <Headline style={style.heading}>SignUp</Headline>
      <TextInput
        style={style.inputs}
        placeholder="Name"
        value={name}
        onChangeText={(e) => setName(e)}
      />
      <TextInput
        style={style.inputs}
        placeholder="Email"
        value={email}
        onChangeText={(e) => setEmail(e)}
      />
      <TextInput
        style={style.inputs}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={(e) => setPassword(e)}
      />

      <Button
        textColor="white"
        style={style.btn}
        onPress={() => collectData()}>
        Save
      </Button>
    </View>
  );
};

export default SignUp;
