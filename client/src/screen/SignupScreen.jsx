import { Image, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import Fontisto from 'react-native-vector-icons/dist/Fontisto';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from "@react-navigation/native";

import { useFormik } from "formik";
import { registerValidate } from '../helper/validate';
import convertToBase64 from '../helper/convert';
import { registerUser } from '../helper/helper';
import Toast from "react-native-toast-message";
import LoadingPopup from "./LoadingPopup";


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
    fontSize: 40,
    fontWeight: "500",
    color: "#262626",
    marginBottom: 30,
  },
  signInText: {
    textAlign: "center",
    fontSize: 18,
    color: "#262626",
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
    marginTop: 40,
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
    marginTop: 50,
  },
  leftVectorContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
  },
  leftVectorImage: {
    height: 250,
    width: 160,
  },
  socialMediaContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 25,
  },
  socialIcon: {
    backgroundColor: "#FFFFFF",
    height: 40,
    width: 40,
    marginRight: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  loadingContent: {
    backgroundColor: "transparent",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});

const SignupScreen = () => {

  const navigation = useNavigation();
  const [file, setFile] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "mani.rider999cool@gmail.com",
      username: "Manikanta",
      password: "Mani@123"
    },
    validate: registerValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        values = await Object.assign(values, { profile: file || '' });
        await registerUser(values);
        Toast.show({
          type: 'success',
          text1: 'Register Successfully!',
          text2: 'You have successfully registered. Welcome aboard!',
          visibilityTime: 2000,
        });
        navigation.navigate("username");
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: error,
          visibilityTime: 2000,
        });
      } finally { setIsLoading(false) }
    }
  });

  // formik doesnot support file upload so we need to creat this handler
  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  }

  const handleLogin = () => {
    console.log("Submitting form...");
    formik.handleSubmit();
  }

  return (
    <View style={styles.container}>
      {isLoading && <LoadingPopup />}
      <Toast position='top' bottomOffset={20} />
      <View style={styles.topImageContainer}>
        <Image
          source={require("../assets/topVector.png")}
          style={styles.topImage}
        />
      </View>
      <View style={styles.helloContainer}>
        <Text style={styles.helloText}>Create Account</Text>
      </View>
      <View>
        <Text style={styles.signInText}>Happy to join you</Text>
      </View>
      <View style={styles.inputContainer}>
        <MaterialCommunityIcons name={"email"} size={22} color={"#9A9A9A"} style={styles.inputIcon} />
        {/* <TextInput {...formik.getFieldProps('email')} style={styles.textInput} placeholder="Email" secureTextEntry /> */}
        <TextInput
          value={formik.values.email}
          onChangeText={formik.handleChange('email')}
          onBlur={formik.handleBlur('email')}
          style={styles.textInput}
          placeholder="email"
          id="email"
          name="email"
        />
      </View>
      <View style={styles.inputContainer}>
        <FontAwesome name={"user"} size={24} color={"#9A9A9A"} style={styles.inputIcon} />
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
      <View style={styles.inputContainer}>
        <Fontisto name={"locked"} size={22} color={"#9A9A9A"} style={styles.inputIcon} />
        {/* <TextInput {...formik.getFieldProps('password')} style={styles.textInput} placeholder="Password" secureTextEntry /> */}
        <TextInput
          value={formik.values.password}
          onChangeText={formik.handleChange('password')}
          onBlur={formik.handleBlur('password')}
          style={styles.textInput}
          placeholder="password"
          id="password"
          name="password"
        />
      </View>
      {/* <View style={styles.inputContainer}>
        <FontAwesome name={"mobile"} size={34} color={"#9A9A9A"} style={styles.inputIcon} />
        <TextInput style={styles.textInput} placeholder="Mobile" secureTextEntry />
      </View> */}
      <TouchableOpacity style={styles.signInButtonContainer} onPress={handleLogin}>
        <Text style={styles.signIn}>Create</Text>
        <LinearGradient colors={['#F97794', '#623AA2']} style={styles.linearGradient}>
          <AntDesign name={"arrowright"} size={24} color={"white"} />
        </LinearGradient>
      </TouchableOpacity>
      {/* {isLoading && <ActivityIndicator size="large" color="#0000ff" />} */}
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>Or create account using social media</Text>
      </View>
      <View style={styles.socialMediaContainer}>
        <TouchableOpacity onPress={() => "https://www.instagram.com/"}>
          <Image source={require("../assets/instagram.png")} style={styles.socialIcon} />
        </TouchableOpacity>
        <Image source={require("../assets/twitter.jpg")} style={styles.socialIcon} />
        <Image source={require("../assets/google.png")} style={styles.socialIcon} />
      </View>
      <View style={styles.leftVectorContainer}>
        <Image source={require("../assets/leftVectorSignup.png")} style={styles.leftVectorImage} />
      </View>
    </View>
  );
};

export default SignupScreen;
