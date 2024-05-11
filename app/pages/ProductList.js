import {
  View,
  Text,
  FlatList,
  ToastAndroid,
  ScrollView,
  Appearance,
} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import axios from 'axios';
import {BASE_URL} from '../Const';
import {useNavigation, useRoute} from '@react-navigation/native';
import {AuthContext} from '../AuthContext';
import style from '../style';
import {Searchbar, ActivityIndicator, Headline} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [itemList1, setItemList1] = useState([]);
  const [itemList2, setItemList2] = useState([]);
  // const [theme, setTheme] = useState('');
  const [theme, setTheme] = useState(Appearance.getColorScheme());
  const {store, setStore} = useContext(AuthContext);

  const navigation = useNavigation();
  const route = useRoute();

  const headerData = {
    authorization: `bearer ${store.token}`,
  };
  // console.log('token------------', headerData);

  const toast = msg => {
    return ToastAndroid.show(msg, ToastAndroid.LONG, ToastAndroid.CENTER);
  };

  Appearance.addChangeListener(scheme => {
    setTheme(scheme.colorScheme);
  });

  // useEffect(() => {
  //   // const colorScheme = Appearance.getColorScheme();
  //   const listener = Appearance.addChangeListener(colorTheme => {
  //     // console.log(colorTheme);
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
        console.log('response-------------', resp.data);
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
    <ScrollView
      style={{
        backgroundColor: theme === 'light' ? '#EFECEC' : 'black',
      }}>
      <View  >
        <Headline style={[style.head, {color: theme === 'light' ? 'purple' : "#B51B75"}]}>Food Items</Headline>
        <>
          <View style={style.row}>
            <Searchbar
              style={style.searchBar}
              placeholder="Search"
              onChangeText={e => handleSearch(e)}
            />

            <MaterialIcons
              name="add"
              style={{fontSize: 50, color: theme === 'light' ? 'purple' : "#B51B75"}}
              onPress={() => navigation.navigate('add')}
            />
          </View>
        </>

        <View>
          {itemList1.length > 0 ? (
            <FlatList
              data={itemList1}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{paddingBottom: 10}}
              renderItem={({item}) => (
                <View keyExtractor={item => item._id} style={style.table}>
                  <Text style={{textTransform: 'uppercase', width: 100}}>
                    {item?.name}
                  </Text>
                  <Text style={{width: 50}}>₹ {item?.price}</Text>
                  <Text style={{width: 80}}>{item?.category}</Text>

                  <MaterialIcons
                    name="edit"
                    style={{fontSize: 20, color: theme === 'light' ? 'purple' : "#B51B75"}}
                    onPress={() => handleEdit(item)}
                  />

                  <MaterialIcons
                    name="delete"
                    style={{fontSize: 20, color: theme === 'light' ? 'purple' : "#B51B75"}}
                    onPress={() => deleteProduct(item._id)}
                  />
                </View>
              )}
              ListEmptyComponent={()=>(
                <Text style={{fontSize: 18, fontWeight:"500"}}>No Data Found</Text>
              )}
            />
          ) : (
            <ActivityIndicator animating={true} />
          )}
        </View>
      </View>
     </ScrollView>
  );
};

export default ProductList;
