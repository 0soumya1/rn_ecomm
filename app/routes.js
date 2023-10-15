import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../app/pages/Login';
import ProductList from '../app/pages/ProductList';
import AddProduct from '../app/pages/AddProduct';
import UpdateProduct from '../app/pages/UpdateProduct';
import SignUp from '../app/pages/SignUp';
import Nav from '../app/pages/Nav';

const stack = createNativeStackNavigator();
const Routes = () => {
  return (
    <>
      <NavigationContainer>
        <Nav/>
        <stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName="login">
          <stack.Screen name="login" component={Login} />
          <stack.Screen name="home" component={ProductList} />
          <stack.Screen name="add" component={AddProduct} />
          <stack.Screen name="update" component={UpdateProduct} />
          <stack.Screen name="signup" component={SignUp} />
          {/* <stack.Screen name="logout" component={Logout} /> */}
        </stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default Routes;
