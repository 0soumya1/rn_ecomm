import {View, Text, ToastAndroid} from 'react-native';
import React, {useState, useContext} from 'react';
import axios from 'axios';
import {BASE_URL} from '../Const';
import {useNavigation} from '@react-navigation/native';
import {Button, Headline, TextInput} from 'react-native-paper';
import {AuthContext} from '../AuthContext';
import style from '../style';
// import SelectDropdown from 'react-native-select-dropdown';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState(false);
  const {store, setStore} = useContext(AuthContext);
  const navigation = useNavigation();

  const headerData = {
    authorization: `bearer ${store.token}`,
  };

  const toast = msg => {
    return ToastAndroid.show(msg, ToastAndroid.LONG, ToastAndroid.CENTER);
  };

  // const categoryOptions = [
  //   {value: 'Breakfast', label: 'Breakfast'},
  //   {value: 'Lunch', label: 'Lunch'},
  //   {value: 'Snacks', label: 'Snacks'},
  //   {value: 'Dinner', label: 'Dinner'},
  // ];

  // const handleCategoryChange = (e) => {
  //   setCategory(e);
  // };

  // const categoryOptions = ['Breakfast', 'Lunch', 'Snacks', 'Dinner'];

  const addProduct = () => {
    if ((!name, !price, !category)) {
      setError(true);
      return false;
    }

    const userId = store.user._id;

    let data = {
      name: name,
      price: price,
      category: category,
      userId: userId,
    };

    axios
      .post(BASE_URL + 'add-product', data, {
        headers: headerData,
      })
      .then(resp => {
        console.log(resp?.data, "item added")
        if (resp?.data) {
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
      {error && !name && (
        <Text style={style.invalid}>Enter Valid Name</Text>
      )}

      <TextInput
        style={style.inputs}
        inputMode="numeric"
        placeholder="Price"
        value={price}
        onChangeText={e => setPrice(e)}
      />
      {error && !price && (
        <Text style={style.invalid}>Enter Valid Price</Text>
      )}

      <TextInput
        style={style.inputs}
        placeholder="Category"
        value={category}
        onChangeText={e => setCategory(e)}
      />
      {error && !category && (
        <Text style={style.invalid}>Enter Valid Category</Text>
      )}

        {/* <Select
          placeholder="Select Category"
          value={category}
          options={categoryOptions}
          onChange={e => handleCategoryChange(e)}
        /> */}

      {/* <SelectDropdown
        data={categoryOptions}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index);
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem.label;
        }}
        rowTextForSelection={(item, index) => {
          return item.label;
        }}
        value={category}
        onChangeText={e => handleCategoryChange(e)}
      /> */}

      <Button textColor="white" style={style.btn} onPress={() => addProduct()}>
        Save
      </Button>
    </View>
  );
};

export default AddProduct;
