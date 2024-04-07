import React, {useEffect, useState, useContext} from 'react';
import {BASE_URL} from '../Const';
import axios from 'axios';
import {View, Text, ToastAndroid} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Button, Headline, TextInput, ActivityIndicator} from 'react-native-paper';
import {AuthContext} from '../AuthContext';
import style from '../style';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState('Sign In');

  const {store, setStore} = useContext(AuthContext);
  const navigation = useNavigation();

  const toast = msg => {
    return ToastAndroid.show(msg, ToastAndroid.LONG, ToastAndroid.CENTER);
  };

  useEffect(() => {
    if (store.user) {
      setEmail(store.user?.email);
      setPassword(store.user?.password);
    }
  }, []);

  const handleLogin = () => {
    setLoading(true);
    let data = {
      email: email.trim(),
      password: password.trim(),
    };

    axios
      .post(BASE_URL + 'login', data)
      .then(res => {
        if (res?.data?.auth) {
          setStore({
            ...store,
            user: res?.data?.user,
            token: res?.data?.auth,
          });
          toast('Login Successful');
          navigation.navigate('home');
          setLoading(false);
        } else {
          toast('please enter correct details');
          setLoading(false);
        }
      })
      .catch(() => {
        toast('api err');
        setLoading(false);
      });
  };

  const handleFlickType = () => {
    if (type == 'Sign In') {
      setType('Sign Up');
      navigation.navigate('signup');
    } else {
      setType('Sign In');
    }
  };

  return (
    <View>
      <Headline style={style.heading}>Sign In</Headline>
      <TextInput
        style={style.inputs}
        placeholder="Email"
        value={email}
        onChangeText={e => setEmail(e)}
      />
      <TextInput
        style={style.inputs}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={e => setPassword(e)}
      />

      {!loading && (
        <Button
          textColor="white"
          style={style.btn}
          onPress={() => handleLogin()}>
          Save
        </Button>
      )}

      {!store.user && (
        <Text
          style={{margin: 20, alignSelf: 'center'}}
          onPress={handleFlickType}>
          {'New Here? Sign Up'}
        </Text>
      )}
      {loading && <ActivityIndicator animating={true} />}
    </View>
  );
};

export default Login;
