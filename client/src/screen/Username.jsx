import React, { useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";
import { usernameValidate } from "../helper/validate";
import { useAuthStore } from "../store/store";
import LoadingPopup from "./LoadingPopup";
import Toast from "react-native-toast-message";


const Username = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const setUsername = useAuthStore(state => state.setUsername);

  const formik = useFormik({
    initialValues: {
      username: "Srikar",
    },
    validate: usernameValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        setUsername(values.username);
        navigation.navigate('password');
      } catch (error) {
        console.error(error);
        Toast.show({ type: 'error', text1: 'Error', text2: error.message, visibilityTime: 2000 });
      } finally {
        setIsLoading(false);
      }
    }
  });


  const handleRegister = () => {
    navigation.navigate("Signup");
  };

  const handleSubmit = () => {
    console.log("Submitting form...");
    formik.handleSubmit();
  };


  return (
    <View style={styles.container}>
      {isLoading && <LoadingPopup />}
      <Toast position='top' bottomOffset={20} />
      <View style={styles.topImageContainer}>
        <Image source={require("../assets/topVector.png")} style={styles.topImage} />
      </View>
      <View style={styles.helloContainer}>
        <Text style={styles.helloText}>Hello</Text>
      </View>
      <View>
        <Text style={styles.signInText}>Sign in to your account</Text>
      </View>
      <View>
        <View style={styles.inputContainer}>
          <AntDesign name={"user"} size={24} color={"#9A9A9A"} style={styles.inputIcon} />
          {/* <TextInput {...formik.getFieldProps('username')} style={styles.textInput} placeholder="Username" /> */}
          <TextInput
            value={formik.values.username}
            onChangeText={formik.handleChange('username')}
            onBlur={formik.handleBlur('username')}
            style={styles.textInput}
            placeholder="Username"
            id="username"
            name="username"
          />
        </View>
        <TouchableOpacity style={styles.signInButtonContainer} onPress={handleSubmit}>
          <Text style={styles.signIn}>Let's Go</Text>
          <LinearGradient colors={['#F97794', '#623AA2']} style={styles.linearGradient}>
            <AntDesign name={"arrowright"} size={24} color={"white"} />
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleRegister}>
          <Text style={styles.footerText}>Don't have an account?<Text style={{ textDecorationLine: "underline" }}>Create</Text></Text>
        </TouchableOpacity>
      </View>
      <View style={styles.leftVectorContainer}>
        <Image source={require("../assets/leftVector.png")} style={styles.leftVectorImage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5F5F5",
    flex: 1,
    position: "relative"
  },
  topImageContainer: {},
  topImage: {
    width: "100%",
    height: 130,
    zIndex: -1,
  },
  helloContainer: {},
  helloText: {
    textAlign: "center",
    fontSize: 70,
    fontWeight: "500",
    color: "#262626",
  },
  signInText: {
    textAlign: "center",
    fontSize: 18,
    color: "#262626",
    marginBottom: 30,
  },
  inputContainer: {
    backgroundColor: "#FFFFFF",
    flexDirection: 'row',
    borderRadius: 20,
    marginHorizontal: 40,
    elevation: 10,
    marginVertical: 20,
    alignItems: "center",
    height: 50,
  },
  inputIcon: {
    marginLeft: 15,
    marginRight: 5,
  },
  textInput: {
    flex: 1,
  },
  forgotPasswordText: {
    color: "#BEBEBE",
    textAlign: "right",
    width: "90%",
    fontSize: 15,
  },
  signInButtonContainer: {
    flexDirection: "row",
    marginTop: 120,
    width: "90%",
    justifyContent: 'flex-end',
  },
  signIn: {
    color: "#262626",
    fontSize: 25,
    fontWeight: "bold",
  },
  linearGradient: {
    height: 34,
    width: 56,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
  },
  footerText: {
    color: "#262626",
    textAlign: "center",
    fontSize: 18,
    marginTop: 120,
  },
  leftVectorContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
  },
  leftVectorImage: {
    height: 450,
    width: 250,
  }
});

export default Username;
