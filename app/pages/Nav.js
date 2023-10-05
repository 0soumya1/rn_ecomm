import {View, Text} from 'react-native';
import React from 'react';
import {useNavigation, Link} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Nav = async () => {
  const auth = await AsyncStorage.getItem('user');
  const navigation = useNavigation();

  const logout = async () => {
   await AsyncStorage.removeItem('user');
    navigation.navigate('signup');
  };

  return (
    <View>
      <View onPress={() => navigation.navigate('home')}>
        <FontAwesome name="shopping-cart" style={{fontSize: 30}} />
        <Text>Admin Panel</Text>
      </View>

      {auth ? (
        <>
          <Link onPress={logout} to="signup">
            Logout ({JSON.parse(auth).name}){' '}
          </Link>
        </>
      ) : (
        <View>
          {' '}
          <Link to="signup">SignUp</Link>&nbsp;&nbsp;
          <Link to="login">SignIn</Link>
        </View>
      )}
    </View>
  );
};

export default Nav;
