import React from "react";
import { useContext, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { TextInput, Button, Text } from "react-native-paper";
import AuthContext from "./context";

const SignIn = ({ navigation }) => {
  const [nameText, setNameText] = useState("");
  const [passText, setPassText] = useState("");

  const state = useContext(AuthContext);
  const sendInfo = () => {
    state.signIn(nameText, passText);
  };
  const navigateToSignIn = () => {
    navigation.navigate("Sign up");
  };
  return (
    <View
      style={[
        styles.container,
        { paddingTop: StatusBar.currentHeight + hp("2%") },
      ]}
    >
      <ScrollView>
        <View
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: hp("6%"),
          }}
        >
          <Image
            source={require("../assets/chat-logo.png")}
            style={{ width: hp("45%"), height: hp("45%"), marginTop: hp("1%") }}
          />
        </View>
        <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>
          <View>
            <TextInput
              label="name"
              mode="outlined"
              style={styles.text_input}
              value={nameText}
              onChangeText={(nameText) => setNameText(nameText)}
            />
          </View>
          <View>
            <TextInput
              label="Password"
              mode="outlined"
              style={styles.text_input}
              value={passText}
              onChangeText={(passText) => setPassText(passText)}
            />
          </View>
        </KeyboardAvoidingView>

        <View style={{ marginTop: hp("7.5%") }}>
          <Button style={styles.signIn_btn} mode="contained" onPress={sendInfo}>
            Sign in
          </Button>
          <Button
            style={styles.create_account_btn}
            mode="outlined"
            onPress={navigateToSignIn}
          >
            Create account
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },

  signIn_btn: {
    margin: 5,
    marginHorizontal: 70,
    marginBottom: 5,
    borderRadius: 15,
  },
  create_account_btn: {
    margin: 5,
    borderRadius: 15,
    marginHorizontal: 70,
  },
  text_input: {
    marginHorizontal: 50,
    height: 45,
    marginTop: 2,
    backgroundColor: "white",
  },
});

export default SignIn;
