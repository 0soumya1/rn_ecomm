import {View, Text, ToastAndroid} from 'react-native';
import React, {useState, useContext} from 'react';
import axios from 'axios';
import {BASE_URL} from '../Const';
import {useNavigation} from '@react-navigation/native';
import {Button, Headline, TextInput} from 'react-native-paper';
import {AuthContext} from '../AuthContext';
import style from '../style';
// import Select from 'react-select';
// import RNPickerSelect from 'react-native-picker-select';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  //   const [error, setError] = useState(false);
  const {store, setStore} = useContext(AuthContext);
  const navigation = useNavigation();

  const headerData = {
    authorization: `bearer ${store.token}`,
  };

  const toast = msg => {
    return ToastAndroid.show(msg, ToastAndroid.LONG, ToastAndroid.CENTER);
  };

//   const categoryOptions = [
//     {value: 'Breakfast', label: 'Breakfast'},
//     {value: 'Lunch', label: 'Lunch'},
//     {value: 'Snacks', label: 'Snacks'},
//     {value: 'Dinner', label: 'Dinner'},
//   ];

//   const handleCategoryChange = e => {
//     console.log(e, 'e');
//     setCategory(e);
//   };

  const addProduct = () => {
    // if ((!name, !price, !category?.label)) {
    //   setError(true);
    //   return false;
    // }

    const userId = store._id;

    let data = {
      name: name,
      price: price,
      category: category?.label,
      userId: userId,
    };

    axios
      .post(BASE_URL + 'add-product', data, {
        headers: headerData,
      })
      .then(res => {
        if (res?.data) {
          toast('Item Added');
          navigation.navigate('home');
        } else {
          toast('not found');
        }
      })
      .catch(() => {
        toast('err in add api call');
      });
    
  };

  return (
    <View>
      <Headline style={style.heading}>Add Item</Headline>

      <TextInput
        style={style.inputs}
        placeholder="Name"
        value={name}
        onChangeText={e => setName(e)}
      />
      <TextInput
        style={style.inputs}
        inputMode='numeric'
        placeholder="Price"
        value={price}
        onChangeText={e => setPrice(e)}
      />

      {/* <Select
        placeholder="Select Category"
        value={category}
        options={categoryOptions}
        onChangeText={e => handleCategoryChange(e)}
      /> */}

      {/* <View style={style.container}>
        <RNPickerSelect
          onValueChange={value => console.log(value)}
          items={[
            {value: 'Breakfast', label: 'Breakfast'},
            {value: 'Lunch', label: 'Lunch'},
            {value: 'Snacks', label: 'Snacks'},
            {value: 'Dinner', label: 'Dinner'},
          ]}
        />
      </View> */}

      <Button textColor="white" style={style.btn} onPress={() => addProduct()}>
        Save
      </Button>
    </View>
  );
};

export default AddProduct;
