import React, {useEffect, useState, useContext} from 'react';
import {BASE_URL} from '../Const';
import axios from 'axios';
import {
  View,
  Text,
  ToastAndroid,
  TouchableOpacity,
  Appearance,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  Button,
  Headline,
  TextInput,
  ActivityIndicator,
} from 'react-native-paper';
import {AuthContext} from '../AuthContext';
import style from '../style';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState('Sign In');
  // const [theme, setTheme] = useState('');
  const [theme, setTheme] = useState(Appearance.getColorScheme());

  const {store, setStore} = useContext(AuthContext);
  const navigation = useNavigation();

  Appearance.addChangeListener(scheme => {
    setTheme(scheme.colorScheme);
  });

  // useEffect(() => {
  //   // const colorScheme = Appearance.getColorScheme();
  //   const listener = Appearance.addChangeListener(colorTheme => {
  //     console.log(colorTheme);
  //     if (colorTheme.colorScheme === 'dark') {
  //       setTheme('DARK');
  //     } else {
  //       setTheme('LIGHT');
  //     }
  //   });

  //   return () => {
  //     listener;
  //   };
  // }, []);

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
    <View
      style={{
        flex: 1,
        backgroundColor: theme === 'light' ? '#EFECEC' : '#070F2B',
      }}>
      <Headline style={[style.heading, {color: theme === 'light' ? 'purple' : "#B51B75"}]}>Sign In</Headline>
      <TextInput
        style={{
          backgroundColor: 'white',
          // backgroundColor: theme === 'LIGHT' ? '#EFECEC' : "black",
          // borderColor: theme === 'LIGHT' ? "black" : "#EFECEC",
          marginHorizontal: 50,
          marginVertical: 5,
        }}
        placeholder="Enter Email"
        value={email}
        onChangeText={e => setEmail(e)}
      />
      <TextInput
        style={style.inputs}
        placeholder="Enter Password"
        secureTextEntry={true}
        value={password}
        onChangeText={e => setPassword(e)}
      />

      {!loading && (
        <Button style={[style.btn, {backgroundColor : theme === "light" ? "purple" :"#B51B75"}]} onPress={() => handleLogin()}>
          <Text style={{color: 'white', fontSize: 16}}>Save</Text>
        </Button>
      )}

      {!store.user && (
        <Text
          style={{
            margin: 20,
            alignSelf: 'center',
            fontWeight: '600',
            fontSize: 15,
            color: theme === 'light' ? '#424769' : '#EFECEC',
          }}
          onPress={handleFlickType}>
          {'New Here? Sign Up'}
        </Text>
      )}
      {loading && <ActivityIndicator animating={true} />}
    </View>
  );
};

export default Login;
