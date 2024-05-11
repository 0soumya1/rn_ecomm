import {View, Text, ToastAndroid, Appearance} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import axios from 'axios';
import {BASE_URL} from '../Const';
import {useNavigation} from '@react-navigation/native';
import {
  Button,
  Headline,
  TextInput,
  ActivityIndicator,
} from 'react-native-paper';
import {AuthContext} from '../AuthContext';
import style from '../style';
// import SelectDropdown from 'react-native-select-dropdown';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [theme, setTheme] = useState('');
  const [theme, setTheme] = useState(Appearance.getColorScheme());
  const {store, setStore} = useContext(AuthContext);
  const navigation = useNavigation();

  const headerData = {
    authorization: `bearer ${store.token}`,
  };

  const toast = msg => {
    return ToastAndroid.show(msg, ToastAndroid.LONG, ToastAndroid.CENTER);
  };

  Appearance.addChangeListener(scheme => {
    setTheme(scheme.colorScheme);
  });

  // useEffect(() => {
  //   // const colorScheme = Appearance.getColorScheme();
  //   const listener = Appearance.addChangeListener(colorTheme => {
  //     console.log(colorTheme);
  //     if (colorTheme.colorScheme === 'dark') {
  //       setTheme('DARK');
  //     } else {
  //       setTheme('LIGHT');
  //     }
  //   });
  //   return () => {
  //     listener;
  //   };
  // }, []);

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
    setLoading(true);

    if ((!name, !price, !category)) {
      setLoading(false);
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
        if (resp?.data) {
          toast('Item Added');
          navigation.navigate('home', Math.random());
          setLoading(false);
        } else {
          toast('not found');
          setLoading(false);
        }
      })
      .catch(() => {
        toast('err in add api call');
        setLoading(false);
      });
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme === 'light' ? '#EFECEC' : 'black',
      }}>
      <Headline style={[style.heading, {color: theme === 'light' ? 'purple' : "#B51B75"}]}>Add Item</Headline>

      <TextInput
        style={style.inputs}
        placeholder="Name"
        value={name}
        onChangeText={e => setName(e)}
      />
      {error && !name && <Text style={style.invalid}>Enter Valid Name</Text>}

      <TextInput
        style={style.inputs}
        inputMode="numeric"
        placeholder="Price"
        value={price}
        onChangeText={e => setPrice(e)}
      />
      {error && !price && <Text style={style.invalid}>Enter Valid Price</Text>}

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
      {!loading && (
        <Button
          textColor="white"
          style={[style.btn, {backgroundColor : theme === "light" ? "purple" :"#B51B75"}]}
          onPress={() => addProduct()}>
          <Text style={{color: 'white', fontSize: 16}}>Save</Text>
        </Button>
      )}
      {loading && <ActivityIndicator animating={true} />}
    </View>
  );
};

export default AddProduct;
