import {View, Text, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Button, Searchbar, ActivityIndicator} from 'react-native-paper';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import {getItemList} from '../redux/Items/Action';
import {deleteItem} from '../redux/Items/Action';

const ProductList = () => {
  const [itemList1, setItemList1] = useState([]);
  const [itemList2, setItemList2] = useState([]);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const itemList = useSelector(state => state.itemReducer.itemList);

  useEffect(() => {
    dispatch(getItemList());
  }, []);

  useEffect(() => {
    setItemList1(itemList);
    setItemList2(itemList);
  }, [itemList]);

  const deleteProduct = (id) => {
    dispatch(deleteItem(id));
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
      <Text>Food Items</Text>

      <View className="row1">
        <View>
          <Searchbar
            placeholder="Search"
            size="small"
            onChangeText={e => handleSearch(e.target.value)}
          />
        </View>
        <View>
          <Button mode="contained" onPress={() => navigation.navigate('add')}>
            <Fontisto name="shopping-basket-add" style={{fontSize: 30}} />
            Add
          </Button>
        </View>
      </View>
      <br />
      {itemList1.length > 0 ? (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              <FlatList>
                data={itemList1}
                renderItem=
                {({item}) => (
                  <tr keyExtractor={item=>item._id}>
                    <td style={{textTransform: 'uppercase'}}>{item.name}</td>
                    <td>₹ {item.price}</td>
                    <td>{item.category}</td>
                    <td>
                      <MaterialIcons
                        name="edit"
                        style={{fontSize: 10}}
                        className="icon"
                        onPress={() => navigation.navigate('update' + item._id)}
                      />

                      <MaterialIcons
                        name="delete"
                        style={{fontSize: 10}}
                        className="icon"
                        onPress={() => deleteProduct(item._id)}
                      />
                    </td>
                  </tr>
                )}
              </FlatList>
            </tbody>
          </table>
        </>
      ) : (
        <ActivityIndicator animating={true} />
      )}
    </View>
  );
};

export default ProductList;
