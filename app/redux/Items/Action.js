import axios from "axios";
import { BASE_URL } from "../../common/Const";
import { ToastAndroid } from "react-native";
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AT_ITEM_LIST = "AT_ITEM_LIST";
export const AT_ADD_ITEM = "AT_ADD_ITEM";
export const AT_DELETE_ITEM = "AT_DELETE_ITEM";
export const AT_GET_ITEM_BY_ID = "AT_GET_ITEM_BY_ID";
export const AT_UPDATE_ITEM = "AT_UPDATE_ITEM";

const headerData = {
  authorization: "bearer " + AsyncStorage.getItem("token"),
};

const toast = (msg) => {
    return ToastAndroid.show(msg, ToastAndroid.LONG, ToastAndroid.CENTER);
  };

export const getItemList = () => async (dispatch) => {
  axios
    .get(BASE_URL + "products", {
      headers: headerData,
    })
    .then((res) => {
      if (res.data) {
        dispatch({
          type: AT_ITEM_LIST,
          payload: res?.data,
        });
      } else {
        toast("err in get itemlist");
      }
    })
    .catch((err) => {
      toast("api err");
    });
};

export const addItem = (data, navigation) => async (dispatch) => {
  const navigation = useNavigation();

  axios
    .post(BASE_URL + "add-product", data, {
      headers: headerData,
    })
    .then((res) => {
      dispatch({
        type: AT_ADD_ITEM,
        payload: res?.data,
      });
      toast("Item Added");
      navigation.navigate("home");
    })
    .catch((err) => {
      toast("api err");
    });
};

export const deleteItem = (id) => async (dispatch) => {
  axios
    .delete(BASE_URL + `product/${id}`, {
      headers: headerData,
    })
    .then((res) => {
      if (res?.data?.deletedCount) {
        dispatch({
          type: AT_DELETE_ITEM,
          payload: res?.data,
        });
        dispatch(getItemList());
        toast("Item Deleted");
      } else {
        toast("not deleted");
      }
    })
    .catch((err) => {
      toast("api err");
    });
};

export const getItemDetail = (params) => async (dispatch) => {
  axios
  .get(BASE_URL + `product/${params.id}`, {
    headers: headerData,
  })
  .then((res) => {
    if (res.data) {
      dispatch({
        type: AT_GET_ITEM_BY_ID,
        payload: res?.data,
      });
    } else {
      toast("no record found");
    }
  })
  .catch((err) => {
    toast("api err");
  });
};

export const updateItem = (data, navigation, params) => async (dispatch) => {
  const navigation = useNavigation();

  axios
    .put(BASE_URL + `product/${params.id}`, data, {
      headers: headerData,
    })
    .then((res) => {
      if (res.data) {
        dispatch({
          type: AT_UPDATE_ITEM,
          payload: res?.data,
        });
        toast("Item Updated");
        navigation.navigate("home");
      } else {
        toast("no record found");
      }
    })
    .catch((err) => {
      toast("api err");
    });
};