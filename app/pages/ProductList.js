import {View, Text, FlatList, ToastAndroid} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import axios from 'axios';
import {BASE_URL} from '../Const';
import {useNavigation, useRoute} from '@react-navigation/native';
import {AuthContext} from '../AuthContext';
import style from '../style';
import {
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
  const route = useRoute();

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
  }, [route?.params]);

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

  const handleEdit = item => {
    navigation.navigate('update', item);
  };

  return (
    <View>
      <Headline style={style.head}>Food Items</Headline>
      <>
        <View style={style.row}>
          <Searchbar
            style={style.searchBar}
            placeholder="Search"
            onChangeText={e => handleSearch(e)}
          />

          <MaterialIcons
            name="add"
            style={{fontSize: 50, color: 'purple'}}
            onPress={() => navigation.navigate('add')}
          />
        </View>
      </>

      {itemList1.length > 0 ? (
        <FlatList
          data={itemList1}
          renderItem={({item}) => (
            <View keyExtractor={item => item._id} style={style.table}>
              <Text style={{textTransform: 'uppercase', width: 75}}>
                {item?.name}
              </Text>
              <Text style={{width: 50}}>₹ {item?.price}</Text>
              <Text style={{width: 75}}>{item?.category}</Text>

              <MaterialIcons
                name="edit"
                style={{fontSize: 20, color: 'purple'}}
                onPress={() => handleEdit(item)}
              />

              <MaterialIcons
                name="delete"
                style={{fontSize: 20, color: 'purple'}}
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
