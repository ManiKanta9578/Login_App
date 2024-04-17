import { Image, ImageBackground, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React from "react";
import Fontisto from 'react-native-vector-icons/dist/Fontisto';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";
import { resetPasswordValidate } from "../helper/validate";
import { resetPassword } from "../helper/helper";
import LoadingPopup from "./LoadingPopup";
import Toast from "react-native-toast-message";
import { useAuthStore } from "../store/store";
import useFetch from "../hooks/fetch.hook";

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

});

const ResetScreen = () => {

    const navigation = useNavigation();

    const { username } = useAuthStore(state => state.auth);
    const { isLoading, apiData, status, serverError } = useFetch('createResetSession');

    const formik = useFormik({
        initialValues: {
            password: "Mani@1234",
            confirmPassword: "Mani@1234"
        },
        validate: resetPasswordValidate,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async (values) => {
            try {
                await resetPassword({ username, password: values.password });
                Toast.show({ type: 'success', text1: 'Reset successfully...!', visibilityTime: 2000, });
                navigation.navigate("password");
            } catch (error) {
                Toast.show({ type: 'error', text1: error || "Could not Reset!", visibilityTime: 2000, });
            }
        }
    });

    const handleReset = () => {
        formik.handleSubmit();
    }

    if (serverError) return Toast.show({ type: 'error', text1: serverError.message });

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
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
                        <Text style={styles.helloText}>Reset</Text>
                    </View>

                    <View style={styles.inputContainer}>
                        <Fontisto name={"locked"} size={22} color={"#9A9A9A"} style={styles.inputIcon} />
                        {/* <TextInput style={styles.textInput} placeholder="Password" secureTextEntry /> */}
                        <TextInput
                            value={formik.values.password}
                            onChangeText={formik.handleChange('password')}
                            onBlur={formik.handleBlur('password')}
                            style={styles.textInput}
                            placeholder="Password"
                            id="password"
                            name="password"
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Fontisto name={"locked"} size={22} color={"#9A9A9A"} style={styles.inputIcon} />
                        {/* <TextInput style={styles.textInput} placeholder="Confirm Password" secureTextEntry /> */}
                        <TextInput
                            value={formik.values.confirmPassword}
                            onChangeText={formik.handleChange('confirmPassword')}
                            onBlur={formik.handleBlur('confirmPassword')}
                            style={styles.textInput}
                            placeholder="ConfirmPassword"
                            id="confirmPassword"
                            name="confirmPassword"
                            secureTextEntry
                        />
                    </View>
                    <TouchableOpacity style={styles.signInButtonContainer} onPress={handleReset}>
                        <Text style={styles.signIn}>Reset</Text>
                        <LinearGradient colors={['#F97794', '#623AA2']} style={styles.linearGradient}>
                            <AntDesign name={"arrowright"} size={24} color={"white"} />
                        </LinearGradient>
                    </TouchableOpacity>
                    <View style={styles.leftVectorContainer}>
                        <Image source={require("../assets/leftVectorSignup.png")} style={styles.leftVectorImage} />
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default ResetScreen;
