import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert, StyleSheet } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { useFormik } from 'formik';
import { profileValidate } from '../helper/validate';
import { updateUser } from '../helper/helper';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import useFetch from '../hooks/fetch.hook';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {
    const navigation = useNavigation();
    const [profileImage, setProfileImage] = useState(apiData?.profile);
    const { isLoading, apiData, serverError } = useFetch();

    const formik = useFormik({
        initialValues: {
            firstName: apiData?.firstName,
            lastName: apiData?.lastName,
            mobile: apiData?.mobile,
            email: apiData?.email,
            address: apiData?.address,
        },
        enableReinitialize: true,
        validate: profileValidate,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async (values) => {
            const updateData = {
                ...values,
                profile: profileImage || apiData?.profile || ''
            };
            try {
                await updateUser(updateData);
                showToast('success', 'Updated successfully!');
            } catch (error) {
                showToast('error', 'Could not update.');
            }
        },
    });

    const showToast = (type, message) => {
        Toast.show({
            type: type,
            text1: message,
        });
    };

    const pickImage = () => {
        const options = {
            title: 'Select Profile Picture',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                setProfileImage(response.uri);
            }
        });
    };

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
            <View style={styles.card}>
                <Text style={styles.title}>Profile</Text>
                <TouchableOpacity onPress={pickImage}>
                    {profileImage ? (
                        <Image source={{ uri: profileImage }} style={styles.profileImage} />
                    ) : (
                        <View style={styles.placeholderImage}>
                            <Text>No Image</Text>
                        </View>
                    )}
                </TouchableOpacity>

                <TextInput
                    onChangeText={formik.handleChange('firstName')}
                    value={formik.values.firstName}
                    placeholder="First Name"
                    style={styles.input}
                />
                <TextInput
                    onChangeText={formik.handleChange('lastName')}
                    value={formik.values.lastName}
                    placeholder="Last Name"
                    style={styles.input}
                />
                <TextInput
                    onChangeText={formik.handleChange('mobile')}
                    value={formik.values.mobile}
                    placeholder="Mobile"
                    style={styles.input}
                />
                <TextInput
                    onChangeText={formik.handleChange('email')}
                    value={formik.values.email}
                    placeholder="Email"
                    style={styles.input}
                />
                <TextInput
                    onChangeText={formik.handleChange('address')}
                    value={formik.values.address}
                    placeholder="Address"
                    style={styles.input}
                />
                {/* Similar text inputs for lastName, mobile, email, address */}
                <TouchableOpacity onPress={formik.handleSubmit} style={styles.button}>
                    <Text style={styles.buttonText}>Update</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={userLogout} style={styles.logout}>
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        backgroundColor: 'rgba(255,255,255,0.9)',
        borderRadius: 20,
        padding: 20,
        width: '90%',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    placeholderImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'lightgray',
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        marginVertical: 5,
    },
    button: {
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
    logout: {
        marginTop: 10,
    },
    logoutText: {
        color: 'red',
    },
});

export default Profile;
