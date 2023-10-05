import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import Select from 'react-select';
import {useParams} from 'react-router-dom';
import {useNavigation} from '@react-navigation/native';
import {Button, TextInput} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {getItemDetail} from '../redux/RootActions';
import {updateItem} from '../redux/RootActions';

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');

  const params = useParams();
  const navigation = useNavigation();

  const itemDetail = useSelector(state => state.itemReducer.itemDetail);

  const categoryOptions = [
    {value: 'Breakfast', label: 'Breakfast'},
    {value: 'Lunch', label: 'Lunch'},
    {value: 'Snacks', label: 'Snacks'},
    {value: 'Dinner', label: 'Dinner'},
  ];

  const handleCategoryChange = e => {
    setCategory(e);
  };

  useEffect(() => {
    dispatch(getItemDetail(params));
  }, []);

  useEffect(() => {
    setName(itemDetail.name);
    setPrice(itemDetail.price);
    setCategory({value: itemDetail.category, label: itemDetail.category});
  }, [itemDetail]);

  const updateProduct = () => {
    const data = {
      name: name,
      price: price,
      category: category?.label,
    };

    dispatch(updateItem(data, navigation, params));
  };

  return (
    <View>
      <Text>Update Item</Text>

      <View>
        <TextInput
          size="small"
          mode="outlined"
          label="Name"
          value={name}
          onChangeText={e => setName(e.target.value)}
        />
      </View>
      <br />

      <View>
        <TextInput
          size="small"
          mode="outlined"
          inputMode="numeric"
          label="Price"
          value={price}
          onChangeText={e => setPrice(e.target.value)}
        />
      </View>
      <br />

      <View style={{width: '222px', margin: 'auto'}}>
        <Select
          placeholder="Select Category"
          value={category}
          options={categoryOptions}
          onChangeText={e => handleCategoryChange(e)}
        />
      </View>
      <br />

      <Button mode="contained" onPress={() => updateProduct()}>
        Save
      </Button>
    </View>
  );
};

export default UpdateProduct;
