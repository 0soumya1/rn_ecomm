import axios from "axios";
import { BASE_URL } from "../../common/Const";
import { ToastAndroid } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AT_SIGNUP = "AT_SIGNUP";
export const AT_LOGIN = "AT_LOGIN";

const toast = (msg) => {
  return ToastAndroid.show(msg, ToastAndroid.LONG, ToastAndroid.CENTER);
};

export const signUP = (data) => async (dispatch) => {
  axios
    .post(BASE_URL + "register", data)
    .then((res) => {
      if (res?.data?.auth) {
        AsyncStorage.setItem("user", (res?.data?.result));
        AsyncStorage.setItem("token", (res?.data?.auth));
        dispatch({
          type: AT_SIGNUP,
          payload: res?.data,
        });
        toast("SignUp Successful");
        window.location.reload("home");
      } else {
        toast("please enter correct details");
      }
      })
      .catch((err) => {
        toast("api err");
      });
  };

  export const loginUser = (data) => async (dispatch) => {
    axios
      .post(BASE_URL + "login", data)
      .then((res) => {
        if (res?.data?.auth) {
          AsyncStorage.setItem("user", (res?.data?.user));
          AsyncStorage.setItem("token", (res?.data?.auth));
          dispatch({
            type: AT_LOGIN,
            payload: res?.data,
          });
          toast("Login Successful");
          window.location.reload("home")
        } else {
          toast("please enter correct details");
        }
        })
        .catch((err) => {
          toast("api err");
        });
    };