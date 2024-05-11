import {View, Text, ToastAndroid, Appearance} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import {BASE_URL} from '../Const';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {
  Button,
  Headline,
  TextInput,
  ActivityIndicator,
} from 'react-native-paper';
import {AuthContext} from '../AuthContext';
import style from '../style';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('Sign Up');
  const {store, setStore} = useContext(AuthContext);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [theme, setTheme] = useState('');
  const [theme, setTheme] = useState(Appearance.getColorScheme());
  const navigation = useNavigation();

  const toast = msg => {
    return ToastAndroid.show(msg, ToastAndroid.LONG, ToastAndroid.CENTER);
  };

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

  useEffect(() => {
    if (store.user) {
      setName(store.user?.name);
      setEmail(store.user?.email);
      setPassword(store.user?.password);
    }
  }, []);

  const collectData = () => {
    setLoading(true);
    if ((!name, !email, !password)) {
      setLoading(false);
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
          setLoading(false);
        } else {
          toast('please enter correct details');
          setLoading(false);
        }
      })
      .catch(() => {
        toast('api signup err');
        setLoading(false);
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
    <View
      style={{
        flex: 1,
        backgroundColor: theme === 'light' ? '#EFECEC' : '#070F2B',
      }}>
      <Headline style={[style.heading, {color: theme === 'light' ? 'purple' : "#B51B75"}]}>Sign Up</Headline>
      <TextInput
        style={style.inputs}
        placeholder="Enter Name"
        value={name}
        onChangeText={e => setName(e)}
      />
      {error && !name && <Text style={style.invalid}>Enter Valid Name</Text>}

      <TextInput
        style={style.inputs}
        placeholder="Enter Email"
        value={email}
        onChangeText={e => setEmail(e)}
      />
      {error && !email && <Text style={style.invalid}>Enter Valid Email</Text>}

      <TextInput
        style={style.inputs}
        placeholder="Enter Password"
        secureTextEntry={true}
        value={password}
        onChangeText={e => setPassword(e)}
      />
      {error && !password && (
        <Text style={style.invalid}>Enter Valid Password</Text>
      )}

      {!loading && (
        <Button
          textColor="white"
          style={[style.btn, {backgroundColor : theme === "light" ? "purple" :"#B51B75"}]}
          onPress={() => collectData()}>
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
          {'Already have account? Sign In'}
        </Text>
      )}
      {loading && <ActivityIndicator animating={true} />}
    </View>
  );
};

export default SignUp;
