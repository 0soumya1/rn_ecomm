import { View, Text } from 'react-native'
import React, { useState } from 'react'
import Select from "react-select";
import {useNavigation} from '@react-navigation/native';
import { Button, TextInput } from 'react-native-paper';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { addItem } from "../redux/Items/Action";

const AddProduct = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState(false);
  const navigation = useNavigation();

  const categoryOptions = [
    { value: "Breakfast", label: "Breakfast" },
    { value: "Lunch", label: "Lunch" },
    { value: "Snacks", label: "Snacks" },
    { value: "Dinner", label: "Dinner" },
  ];

  const handleCategoryChange = (e) => {
    setCategory(e);
  };

  const addProduct = async () => {
    if ((!name, !price, !category?.label)) {
      setError(true);
      return false;
    }

    const userId = await AsyncStorage.getItem("user")._id;

    let data = {
      name: name,
      price: price,
      category: category?.label,
      userId: userId,
    };

    dispatch(addItem(data, navigation));
  };

  return (
    <View>
      <Text>Add Item</Text>

      <View>
        <TextInput
          size="small"
          mode="outlined"
          label="Name"
          value={name}
          onChangeText={(e) => setName(e.target.value)}
        />
      </View>
      <br />
      {error && !name && (
        <Text className="invalid-input">Enter Valid Name</Text>
      )}

      <View>
        <TextInput
          size="small"
          mode="outlined"
          inputMode="numeric"
          label="Price"
          value={price}
          onChangeText={(e) => setPrice(e.target.value)}
        />
      </View>
      <br />
      {error && !price && (
        <Text className="invalid-input">Enter Valid Price</Text>
      )}

      <View style={{ width: "222px", margin: "auto" }}>
        <Select
          placeholder="Select Category"
          value={category}
          options={categoryOptions}
          onChangeText={(e) => handleCategoryChange(e)}
        />
      </View>
      <br />
      {error && !category?.label && (
        <Text className="invalid-input" style={{ marginLeft: "-60px" }}>
          Enter Valid Category
        </Text>
      )}

      <Button mode="contained" onPress={() => addProduct()}>
        Save
      </Button>
    </View>
  )
}

export default AddProduct;