import {View, Text, ToastAndroid} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import {BASE_URL} from '../Const';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Button, Headline, TextInput} from 'react-native-paper';
import {AuthContext} from '../AuthContext';
import style from '../style';
// import SelectDropdown from 'react-native-select-dropdown';

const UpdateProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const {store, setStore} = useContext(AuthContext);

  const navigation = useNavigation();
  const route = useRoute();

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

  useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails = () => {
    axios
      .get(BASE_URL + `product/${route.params._id}`, {
        headers: headerData,
      })
      .then(res => {
        if (res?.data) {
          console.log(res?.data, 'get product detail');
          setName(res?.data?.name);
          setPrice(res?.data?.price);
          setCategory(res?.data?.category);
          // setCategory({value: res?.data?.category, label: res?.data?.category});
        } else {
          toast('no record found');
        }
      })
      .catch(() => {
        toast('err in getitem api call');
      });
  };

  const updateProduct = () => {
    const data = {
      name: name,
      price: price,
      category: category,
    };
    axios
      .put(BASE_URL + `product/${route.params._id}`, data, {
        headers: headerData,
      })
      .then(res => {
        if (res?.data) {
          console.log(res?.data, 'updated item');
          toast('Item Updated');
          navigation.navigate('home');
        } else {
          toast('no record found');
        }
      })
      .catch(() => {
        toast('err in update api call');
      });
  };
  return (
    <View>
      <Headline style={style.heading}>Update Item</Headline>

      <TextInput
        style={style.inputs}
        placeholder="Name"
        value={name}
        onChangeText={e => setName(e)}
      />
      <TextInput
        style={style.inputs}
        inputMode="numeric"
        placeholder="Price"
        value={price}
        onChangeText={e => setPrice(e)}
      />

      <TextInput
        style={style.inputs}
        placeholder="Category"
        value={category}
        onChangeText={e => setCategory(e)}
      />

      {/* <SelectDropdown
        style={style.inputs}
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
      /> */}

      <Button
        textColor="white"
        style={style.btn}
        onPress={() => updateProduct()}>
        Save
      </Button>
    </View>
  );
};

export default UpdateProduct;
