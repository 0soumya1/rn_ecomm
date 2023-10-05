import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PrivateComponent = async()=>{
    const auth = await AsyncStorage.getItem("user");
    return auth? <Outlet/>: <Navigate to = "signup" />
}

export default PrivateComponent;