import { Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React from "react";
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import Fontisto from 'react-native-vector-icons/dist/Fontisto';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from "@react-navigation/native";

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
  }
});

const SignupScreen = () => {

  const navigation = useNavigation();

  const handleLogin = () => {
    navigation.navigate("Login");
  }

  return (
    <View style={styles.container}>
      <View style={styles.topImageContainer}>
        <Image
          source={require("../assets/topVector.png")}
          style={styles.topImage}
        />
      </View>
      <View style={styles.helloContainer}>
        <Text style={styles.helloText}>Create Account</Text>
      </View>
      <View style={styles.inputContainer}>
        <FontAwesome name={"user"} size={24} color={"#9A9A9A"} style={styles.inputIcon} />
        <TextInput style={styles.textInput} placeholder="Username" />
      </View>
      <View style={styles.inputContainer}>
        <Fontisto name={"locked"} size={22} color={"#9A9A9A"} style={styles.inputIcon} />
        <TextInput style={styles.textInput} placeholder="Password" secureTextEntry />
      </View>
      <View style={styles.inputContainer}>
        <MaterialCommunityIcons name={"email"} size={22} color={"#9A9A9A"} style={styles.inputIcon} />
        <TextInput style={styles.textInput} placeholder="Email" secureTextEntry />
      </View>
      <View style={styles.inputContainer}>
        <FontAwesome name={"mobile"} size={34} color={"#9A9A9A"} style={styles.inputIcon} />
        <TextInput style={styles.textInput} placeholder="Mobile" secureTextEntry />
      </View>
      <TouchableOpacity style={styles.signInButtonContainer} onPress={handleLogin}>
        <Text style={styles.signIn}>Create</Text>
        <LinearGradient colors={['#F97794', '#623AA2']} style={styles.linearGradient}>
          <AntDesign name={"arrowright"} size={24} color={"white"} />
        </LinearGradient>
      </TouchableOpacity>
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>Or create account using social media</Text>
      </View>
      <View style={styles.socialMediaContainer}>
        <Image source={require("../assets/instagram.png")} style={styles.socialIcon} />
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
