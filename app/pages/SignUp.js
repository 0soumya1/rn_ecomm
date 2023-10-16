import {View, Text, ToastAndroid} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import {BASE_URL} from '../Const';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {Button, Headline, TextInput} from 'react-native-paper';
import {AuthContext} from '../AuthContext';
import style from '../style';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('Sign Up');
  const {store, setStore} = useContext(AuthContext);
  const [error, setError] = useState(false);
  const navigation = useNavigation();

  const toast = msg => {
    return ToastAndroid.show(msg, ToastAndroid.LONG, ToastAndroid.CENTER);
  };

  useEffect(() => {
    if (store.user) {
      setName(store.user?.name);
      setEmail(store.user?.email);
      setPassword(store.user?.password);
    }
  }, []);

  const collectData = () => {
    if ((!name, !email, !password)) {
      setError(true);
      return false;
    }

    let data = {
      name: name.trim(),
      email: email.trim(),
      password: password.trim(),
    };

    axios
      .post(BASE_URL + 'register', data)
      .then(res => {
        if (res?.data?.auth) {
          setStore({
            ...store,
            user: res?.data?.result,
            token: res?.data?.auth,
          });
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

  const handleFlickType = () => {
    if (type == 'Sign Up') {
      setType('Sign In');
      navigation.navigate('login');
    } else {
      setType('Sign Up');
    }
  };

  return (
    <View>
      <Headline style={style.heading}>Sign Up</Headline>
      <TextInput
        style={style.inputs}
        placeholder="Name"
        value={name}
        onChangeText={e => setName(e)}
      />
      {error && !name && <Text style={style.invalid}>Enter Valid Name</Text>}

      <TextInput
        style={style.inputs}
        placeholder="Email"
        value={email}
        onChangeText={e => setEmail(e)}
      />
      {error && !email && <Text style={style.invalid}>Enter Valid Email</Text>}

      <TextInput
        style={style.inputs}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={e => setPassword(e)}
      />
      {error && !password && (
        <Text style={style.invalid}>Enter Valid Password</Text>
      )}

      <Button textColor="white" style={style.btn} onPress={() => collectData()}>
        Save
      </Button>

      {!store.user && (
        <Text
          style={{margin: 20, alignSelf: 'center'}}
          onPress={handleFlickType}>
          {'Already have account? Sign In'}
        </Text>
      )}
    </View>
  );
};

export default SignUp;
