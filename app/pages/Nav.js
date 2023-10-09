import {View, Text} from 'react-native';
import React,{useContext} from 'react';
import {useNavigation, Link} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { AuthContext } from '../AuthContext';

const Nav = async () => {
  const { store, setStore } = useContext(AuthContext);
  const auth = store.user;
  const navigation = useNavigation();

  const logout = async () => {
    store.remove.user;
    navigation.navigate('signup');
  };

  return (
    <View>
      <View onPress={() => navigation.navigate('home')}>
        <FontAwesome name="shopping-cart" style={{fontSize: 20}} />
        <Text>Admin Panel</Text>
      </View>

      {auth ? (
        <>
          <Link onPress={logout} to="signup">
            Logout ({store.name}){' '}
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
