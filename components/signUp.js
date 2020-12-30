import { TextInput, Button, HelperText } from "react-native-paper";
import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import AuthContext from "./context";
const SignUp = ({ navigation }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  const [passValidError, setPassValidError] = useState("");
  const [samePassError, setSamePassError] = useState("");
  const [nameValidError, setNameValidError] = useState("");
  const state = useContext(AuthContext);
  const IsPasswordsSame = (pass1, pass2) => {
    if (pass1 != pass2) {
      setSamePassError("Passwords are not same");
    } else {
      setSamePassError("");
    }
  };
  const validatePass = (pass) => {
    if (pass.length < 5) {
      setPassValidError("Minimum length 5");
    } else {
      setPassValidError("");
    }
  };
  const validUserName = (userN) => {
    if (userN.length < 4) {
      setNameValidError("User name should be higher than 4.");
    } else {
      setNameValidError("");
    }
  };
  const sendInfo = () => {
    if (
      password.length >= 5 &&
      password == passwordConf &&
      userName.length >= 4
    ) {
      state.signUp(userName, password);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <KeyboardAvoidingView
          style={{
            flex: 1,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <View style={{ height: 80, marginTop: hp("10%") }}>
            <TextInput
              style={styles.text_input}
              mode="outlined"
              label="User name"
              onChangeText={(userName) => {
                setUserName(userName);
                validUserName(userName);
              }}
              value={userName}
            />
            <HelperText type="error" visible={nameValidError}>
              {nameValidError}
            </HelperText>
          </View>
          <View style={{ marginTop: hp(".1%"), marginBottom: 5, height: 80 }}>
            <TextInput
              style={styles.text_input}
              mode="outlined"
              label="Password"
              onChangeText={(password) => {
                setPassword(password);
                validatePass(password);
              }}
              value={password}
            />
            <HelperText type="error" visible={passValidError}>
              {passValidError}
            </HelperText>
          </View>
          <View style={{ height: 80, marginTop: hp(".1%") }}>
            <TextInput
              style={styles.text_input}
              mode="outlined"
              label="Confirm password"
              onChangeText={(passwordConf) => {
                setPasswordConf(passwordConf);
                IsPasswordsSame(password, passwordConf);
              }}
              value={passwordConf}
            />
            <HelperText type="error" visible={samePassError}>
              {samePassError}
            </HelperText>
          </View>

          <Button
            mode="outlined"
            onPress={sendInfo}
            style={[styles.signUp_btn, styles.btns]}
          >
            Sign up
          </Button>
          <Button
            onPress={() => {
              navigation.navigate("Sign in");
            }}
            style={[styles.btns]}
            mode="contained"
          >
            Go back
          </Button>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "white",
  },
  warning_text_container: {
    marginTop: 10,
    height: 30,
  },
  warning_text: {
    color: "#dc3545",
    fontSize: 15,
  },
  btns: {
    width: wp("40%"),
    borderRadius: 15,
  },
  signUp_btn: {
    margin: 20,
    marginTop: hp("17%"),
  },
  text_input: {
    width: wp("50%"),
    height: 45,
    backgroundColor: "white",
  },
});
export default SignUp;
