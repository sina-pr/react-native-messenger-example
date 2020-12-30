import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  ScrollView,
  ImageBackground,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Axios from "axios";
import { FontAwesome } from "@expo/vector-icons";
import AuthContext from "./context";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Chat = () => {
  const [chats, setChats] = useState([]);
  const [user, setUser] = useState("");
  const index = 0;
  const [text, setText] = useState("");
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("data");
      const value = jsonValue != null ? JSON.parse(jsonValue) : null;
      value ? setUser(value.userName) : 0;
      console.log(value);
    } catch (e) {
      throw e;
    }
  };
  const sendMessage = () => {
    if (text) {
      Axios.post("https://agile-savannah-40608.herokuapp.com/chat", {
        user: user,
        message: text,
      });
      setText("");
    }
  };
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    Axios.get("https://agile-savannah-40608.herokuapp.com/chats").then((res) =>
      setChats(res.data)
    );
  }, [chats]);
  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <ImageBackground
        source={require("../assets/chat-background.jpg")}
        resizeMode="cover"
        style={{
          flex: 1,
        }}
      >
        <View style={{ flex: 1 }}>
          <ScrollView>
            {chats.map((chat, index) => {
              if (index <= chats.length && index > 0) {
                if (
                  parseInt(chats[index - 1].date.slice(8, 10)) <
                  parseInt(chat.date.slice(8, 10))
                ) {
                  return (
                    <View
                      key={chat.date}
                      style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 26,
                          color: "white",
                          backgroundColor: "rgba(204, 79, 204 ,0.4)",
                          padding: 3,
                          paddingHorizontal: 30,
                          borderRadius: 10,
                          marginVertical: 5,
                        }}
                      >
                        {chat.date.slice(5, 10)}
                      </Text>
                    </View>
                  );
                }
              }
              if (chat.user == user) {
                return (
                  <View style={styles.own_msgs_container} key={chat._id}>
                    <View style={styles.own_msgs_text}>
                      <Text style={styles.name}>~{chat.user}</Text>
                      <Text style={styles.msgs_text}>{chat.msg}</Text>
                      <Text style={styles.time}>{chat.date.slice(11, 16)}</Text>
                    </View>
                  </View>
                );
              } else {
                return (
                  <View style={styles.msgs_container} key={chat._id}>
                    <View style={styles.n_own_msgs_txt}>
                      <Text style={styles.name}>~{chat.user}</Text>
                      <Text style={styles.msgs_text}>{chat.msg}</Text>
                      <Text style={styles.time}>{chat.date.slice(11, 16)}</Text>
                    </View>
                  </View>
                );
              }
            })}
          </ScrollView>
        </View>

        <View
          style={{
            marginHorizontal: 20,

            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TextInput
            style={{
              borderRadius: 15,
              fontSize: 18,
              flex: 1,
              borderWidth: 2,
              borderColor: "grey",
              color: "white",
              padding: 8,
              paddingLeft: 20,
              paddingRight: 20,
              margin: 10,
            }}
            value={text}
            onChangeText={(text) => setText(text)}
          />
          <FontAwesome
            onPress={sendMessage}
            name="send-o"
            size={22}
            color="white"
          />
        </View>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  own_msgs_container: {
    display: "flex",

    alignItems: "flex-end",
    marginRight: 3,
    margin: 10,
  },
  name: {
    fontSize: 12,
    color: "white",
  },
  own_msgs_text: {
    fontSize: 20,
    padding: 10,
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 0,
    borderRadius: 10,
    backgroundColor: "#6561d4",
  },
  msgs_container: {
    display: "flex",
    alignItems: "flex-start",
    margin: 10,
    marginLeft: 3,
  },
  n_own_msgs_txt: {
    fontSize: 20,
    padding: 10,
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderRadius: 10,
    borderBottomLeftRadius: 0,
    backgroundColor: "#6A6A6A",
  },
  msgs_text: {
    fontSize: 20,

    color: "white",
  },
  time: {
    color: "white",
    padding: 2,
  },
});
export default Chat;
