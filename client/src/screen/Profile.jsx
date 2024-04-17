import React, { useState, useEffect } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { View, Text, TextInput, TouchableOpacity, Image, Alert, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import { profileValidate } from '../helper/validate';
import { updateUser } from '../helper/helper';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import useFetch from '../hooks/fetch.hook';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingPopup from './LoadingPopup';
import LinearGradient from 'react-native-linear-gradient';

const Profile = () => {
    const navigation = useNavigation();
    const { isLoading, apiData, serverError } = useFetch();
    console.log(apiData, "apiData");

    const formik = useFormik({
        initialValues: {
            firstName: apiData?.firstName,
            lastName: apiData?.lastName,
            mobile: String(apiData?.mobile) || '',
            email: apiData?.email,
            address: apiData?.address,
        },
        enableReinitialize: true,
        validate: profileValidate,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async (values) => {
            const updateData = { ...values };
            try {
                await updateUser(updateData);
                Toast.show({ type: 'success', text1: 'Updated successfully!' });
            } catch (error) {
                showToast('error', 'Could not update.');
                Toast.show({ type: 'error', text1: 'Could not update.' });
            }
        },
    });

    useEffect(() => {
        // Check if apiData.mobile is undefined or null, if yes, set formik mobile field to an empty string
        if (apiData && (apiData.mobile === undefined || apiData.mobile === null)) {
            formik.setFieldValue('mobile', '');
        }
    }, [apiData]);

    const userLogout = async () => {
        try {
            // Remove the token from AsyncStorage
            await AsyncStorage.removeItem('token');
            // Navigate to the desired screen (e.g., login screen)
            navigation.navigate('username');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (

        <View style={styles.container}>
            {isLoading && <LoadingPopup />}
            <Toast position='top' bottomOffset={20} />
            <View style={styles.topImageContainer}>
                <Image source={require("../assets/topVector.png")} style={styles.topImage} />
            </View>
            <View style={styles.helloContainer}>
                <Text style={styles.helloText}>Profile</Text>
            </View>
            <View>
                <View style={styles.inputContainer}>
                    <AntDesign name={"user"} size={24} color={"#9A9A9A"} style={styles.inputIcon} />
                    <TextInput
                        onChangeText={formik.handleChange('firstName')}
                        value={formik.values.firstName}
                        placeholder="First Name"
                        style={styles.textInput}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <AntDesign name={"user"} size={24} color={"#9A9A9A"} style={styles.inputIcon} />
                    <TextInput
                        onChangeText={formik.handleChange('lastName')}
                        value={formik.values.lastName}
                        placeholder="Last Name"
                        style={styles.textInput}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <FontAwesome name={"mobile"} size={34} color={"#9A9A9A"} style={styles.inputIcon} />
                    <TextInput
                        onChangeText={formik.handleChange('mobile')}
                        value={formik.values.mobile}
                        placeholder="Mobile"
                        style={styles.textInput}
                        keyboardType='number-pad'
                    />
                </View>
                <View style={styles.inputContainer}>
                    <MaterialCommunityIcons name={"email"} size={22} color={"#9A9A9A"} style={styles.inputIcon} />
                    <TextInput
                        onChangeText={formik.handleChange('email')}
                        value={formik.values.email}
                        placeholder="Email"
                        style={styles.textInput}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Entypo name={"address"} size={24} color={"#9A9A9A"} style={styles.inputIcon} />
                    <TextInput
                        onChangeText={formik.handleChange('address')}
                        value={formik.values.address}
                        placeholder="Address"
                        style={styles.textInput}
                    />
                </View>
                <TouchableOpacity style={styles.updateButtonContainer} onPress={formik.handleSubmit}>
                    <Text style={styles.signIn}>Update</Text>
                    <LinearGradient colors={['#F97794', '#623AA2']} style={styles.linearGradient}>
                        <AntDesign name={"arrowright"} size={24} color={"white"} />
                    </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity style={styles.logoutButtonContainer} onPress={userLogout}>
                    <Text style={styles.logout}>Logout</Text>
                    <LinearGradient colors={['#F97794', '#623AA2']} style={styles.linearGradient}>
                        <AntDesign name={"arrowright"} size={24} color={"white"} />
                    </LinearGradient>
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
        marginVertical: 15,
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
    updateButtonContainer: {
        flexDirection: "row",
        marginTop: 40,
        width: "90%",
        justifyContent: 'flex-end',
    },
    logoutButtonContainer: {
        flexDirection: "row",
        marginTop: 30,
        width: "90%",
        justifyContent: 'flex-end',
    },
    signIn: {
        color: "#262626",
        fontSize: 25,
        fontWeight: "bold",
    },
    logout: {
        color: "red",
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
        zIndex: -1,
    }
});

export default Profile;
