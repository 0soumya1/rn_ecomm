import {View, Text, FlatList, ToastAndroid} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import axios from 'axios';
import {BASE_URL} from '../Const';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../AuthContext';
import style from '../style';
import {
  Button,
  Searchbar,
  ActivityIndicator,
  Headline,
} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [itemList1, setItemList1] = useState([]);
  const [itemList2, setItemList2] = useState([]);
  const {store, setStore} = useContext(AuthContext);

  const navigation = useNavigation();

  const headerData = {
    authorization: `bearer ${store.token}`,
  };

  const toast = msg => {
    return ToastAndroid.show(msg, ToastAndroid.LONG, ToastAndroid.CENTER);
  };

  useEffect(() => {
    setItemList1(products);
    setItemList2(products);
  }, [products]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    axios
      .get(BASE_URL + 'products', {
        headers: headerData,
      })
      .then(resp => {
        if (resp?.data) {
          setProducts(resp.data);
        } else {
          toast('not found');
        }
      })
      .catch(() => {
        toast('err in get api call');
      });
  };

  const deleteProduct = id => {
    axios
      .delete(BASE_URL + `product/${id}`, {
        headers: headerData,
      })
      .then(resp => {
        if (resp.data) {
          getProducts(resp.data);
          toast('Item Deleted');
        } else {
          toast('not deleted');
        }
      })
      .catch(() => {
        toast('err in delete api call');
      });
  };

  const handleSearch = key => {
    let search = key.toLowerCase();
    const result = itemList2.filter(a => {
      return (
        a?.name?.toLowerCase().match(search) ||
        a?.price?.toString().match(search) ||
        a?.category?.toLowerCase().match(search)
      );
    });
    setItemList1(result);
  };

  return (
    <View>
      <Headline>Food Items</Headline>
      <>
        <View>
          <Searchbar placeholder="Search" onChangeText={e => handleSearch(e)} />
        </View>

        <View>
          <Button mode="contained" onPress={() => navigation.navigate('add')}>
            Add
          </Button>
        </View>
      </>

      {itemList1.length > 0 ? (
        <FlatList
          data={itemList1}
          renderItem={({item}) => (
            <View keyExtractor={item => item._id} style={style.table}>
              <Text style={{textTransform: 'uppercase'}}>{item?.name}</Text>
              <Text>₹ {item?.price}</Text>
              <Text>{item?.category}</Text>

              <MaterialIcons
                name="edit"
                style={{fontSize: 20}}
                className="icon"
                onPress={() => navigation.navigate('update')}
              />

              <MaterialIcons
                name="delete"
                style={{fontSize: 20}}
                className="icon"
                onPress={() => deleteProduct(item._id)}
              />
            </View>
          )}
        />
      ) : (
        <ActivityIndicator animating={true} />
      )}
    </View>
  );
};

export default ProductList;
