import { Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React from "react";
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import Fontisto from 'react-native-vector-icons/dist/Fontisto';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";
import { passwordValidate } from "../helper/validate";
import useFetch from "../hooks/fetch.hook";
import { useAuthStore } from "../store/store";
import { verifyPassword } from "../helper/helper";
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
    fontSize: 50,
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

const Password = () => {

  const navigation = useNavigation();
  const { username } = useAuthStore(state => state.auth);
  const { isLoading, apiData, serverError } = useFetch(`/user/${username}`);

  const formik = useFormik({
    initialValues: {
      password: "Mani@123",
    },
    validate: passwordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        await verifyPassword({ username, password: values.password });
        Toast.show({
          type: 'success',
          text1: 'Login Successfully...!',
          // text2: 'You have successfully registered. Welcome aboard!',
          visibilityTime: 2000,
        });
        // navigation.navigate("username");
      } catch (error) {
        Toast.show({ type: 'error', text1: error, visibilityTime: 2000, });
      }
    }
  });

  const handleRegister = () => {
    navigation.navigate("Signup");
  }
  const handleReset = () => {
    navigation.navigate("Recovery");
  }

  const handleSignIn = () => {
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
        <Text style={styles.helloText}>Hello {apiData?.firstName || username}</Text>
      </View>
      <View>
        <Text style={styles.signInText}>Sign in to your account</Text>
      </View>
      <View style={styles.inputContainer}>
        <Fontisto name={"locked"} size={24} color={"#9A9A9A"} style={styles.inputIcon} />
        <TextInput
          value={formik.values.password}
          onChangeText={formik.handleChange('password')}
          onBlur={formik.handleBlur('password')}
          style={styles.textInput}
          placeholder="password"
          id="password"
          name="password"
          secureTextEntry
        />
      </View>
      <TouchableOpacity onPress={handleReset}>
        <Text style={styles.forgotPasswordText}>forgot your password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.signInButtonContainer} onPress={handleSignIn}>
        <Text style={styles.signIn}>Sign In</Text>
        <LinearGradient colors={['#F97794', '#623AA2']} style={styles.linearGradient}>
          <AntDesign name={"arrowright"} size={24} color={"white"} />
        </LinearGradient>
      </TouchableOpacity>
      <View style={styles.leftVectorContainer}>
        <ImageBackground source={require("../assets/leftVector.png")} style={styles.leftVectorImage} />
      </View>
    </View>
  );
};

export default Password;
