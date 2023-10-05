import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Nav from '../pages/Nav';
import AddProduct from '../pages/AddProduct';
import ProductList from '../pages/ProductList';
import UpdateProduct from '../pages/UpdateProduct';
import SignUp from '../pages/SignUp';
import Login from '../pages/Login';
import PrivateComponent from '../pages/PrivateComponent';

const stack = createNativeStackNavigator();
const Routes = () => {
  return (
    <>
      <NavigationContainer>
        <Nav />
        <stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="signup">
          <stack.Screen component={PrivateComponent}>
            <stack.Screen name="home" component={ProductList} />
            <stack.Screen name="add" component={AddProduct} />
            <stack.Screen name="update" component={UpdateProduct} />
            <stack.Screen name="logout" component={<h1>Logout component</h1>} />
          </stack.Screen>

          <stack.Screen name="signup" component={SignUp} />
          <stack.Screen name="login" component={Login} />
        </stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default Routes;
