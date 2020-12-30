import React, { useState, useEffect } from "react";
import { Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Axios from "axios";
import Chat from "./components/Chat";
import { NavigationContainer } from "@react-navigation/native";
import SignIn from "./components/signIn";
import { createStackNavigator } from "@react-navigation/stack";
import AuthContext from "./components/context";
import SignUp from "./components/signUp";
export default function App({ navigation }) {
  const Stack = createStackNavigator();
  const [TOKEN, setTOKEN] = useState("");

  const [userExistErr, setUserExistErr] = useState(false);
  const storeData = async (data) => {
    try {
      await AsyncStorage.setItem("data", JSON.stringify(data));
    } catch (e) {
      throw e;
    }
  };
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("data");
      const value = jsonValue != null ? JSON.parse(jsonValue) : null;
      value ? setTOKEN(value.TOKEN) : 0;
    } catch (e) {
      throw e;
    }
  };
  const removeData = async () => {
    try {
      await AsyncStorage.removeItem("data");
    } catch (e) {
      throw e;
    }
  };

  const signOut = () => {
    setTOKEN("");
    removeData();
  };
  useEffect(() => {
    getData();
  });
  const authContext = React.useMemo(
    () => ({
      signIn: async (userName, password) => {
        Axios.post("https://agile-savannah-40608.herokuapp.com/login", {
          name: userName,
          password: password,
        }).then((res) => {
          setTOKEN(res.data);
          storeData({
            TOKEN: res.data,
            userName: userName,
          }).catch((err) => {
            console.log(err);
          });
        });
      },

      signUp: (userName, password) => {
        Axios.post("https://agile-savannah-40608.herokuapp.com/signup", {
          name: userName,
          password: password,
        })
          .then((res) => {
            setTOKEN(res.data);
            storeData({
              TOKEN: res.data,
              userName: userName,
            });
          })
          .catch((err) => setUserExistErr(true));
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {!TOKEN ? (
            <>
              <Stack.Screen
                options={{
                  headerShown: false,
                }}
                name="Sign in"
                component={SignIn}
              />
              <Stack.Screen name="Sign up" component={SignUp} />
            </>
          ) : (
            <Stack.Screen
              options={{
                headerStyle: { backgroundColor: "rgba(0,0,0,.6)" },
                headerTitleStyle: { color: "white" },
                headerRight: () => (
                  <Button
                    style={{ marginRight: 10 }}
                    mode="contained"
                    color="#dc3545"
                    uppercase="false"
                    onPress={signOut}
                  >
                    sign out
                  </Button>
                ),
              }}
              name="Chat"
              component={Chat}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
