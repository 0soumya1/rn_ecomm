import {View, Text, ToastAndroid} from 'react-native';
import React, {useState,useEffect, useContext} from 'react';
import axios from 'axios';
import {BASE_URL} from '../Const';
import {useNavigation} from '@react-navigation/native';
import {Button, Headline, TextInput} from 'react-native-paper';
import {AuthContext} from '../AuthContext';
import style from '../style';
import {useParams} from 'react-router-dom';
import Select from 'react-select';

const UpdateProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const {store, setStore} = useContext(AuthContext);
  const navigation = useNavigation();
  const params = useParams();

  const headerData = {
    authorization: `bearer ${store.token}`,
  };

  const toast = msg => {
    return ToastAndroid.show(msg, ToastAndroid.LONG, ToastAndroid.CENTER);
  };

  // const categoryOptions = [
  //   { value: "Breakfast", label: "Breakfast" },
  //   { value: "Lunch", label: "Lunch" },
  //   { value: "Snacks", label: "Snacks" },
  //   { value: "Dinner", label: "Dinner" },
  // ];

  // const handleCategoryChange = (e) => {
  //   console.log(e, "e");
  //   setCategory(e);
  // };

  useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails = async () => {
    console.log(params);

    axios
      .get(BASE_URL + `product/${params.id}`, {
        headers: headerData,
      })
      .then(res => {
        if (res?.data) {
          console.log(res?.data, 'res in get item');
          setName(res?.data?.name);
          setPrice(res?.data?.price);
          setCategory({value: res?.data?.category, label: res?.data?.category});
        } else {
          toast('no record found');
        }
      })
      .catch(() => {
        toast('err in getitem api call');
      });
  };

  const updateProduct = async () => {
    const data = {
      name: name,
      price: price,
      category: category?.label,
    };
    axios
      .put(BASE_URL + `product/${params.id}`, data, {
        headers: headerData,
      })
      .then(res => {
        if (res?.data) {
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

      {/* <Select
        placeholder="Select Category"
        value={category}
        options={categoryOptions}
        onChangeText={e => handleCategoryChange(e)}
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
