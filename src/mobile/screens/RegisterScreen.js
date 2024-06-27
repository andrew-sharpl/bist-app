import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native";
import { Stack, Button } from "@react-native-material/core";
import { TextInput as TInput } from 'react-native-paper';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useState, useRef } from "react";
import { useServices } from "../api/services";
import { Link } from "@react-navigation/native";
import TextInput from "./components/subcomponents/TextInput";
import { theme } from "../core/theme";
// import Button from "./components/subcomponents/Button";
import Header from "./components/Header";

const RegisterScreen = ({ navigation }) => {
    /*
    * Allows a new user to create an account.
    * On successful registration, navigates to the home screen.
    */
    const { getApi, getGlobalStorage } = useServices();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    
    const handleFirstNameChange = (newFirstName) => {
        setFirstNameError('');
        setFirstName(newFirstName);
    }

    const handleLastNameChange = (newLastName) => {
        setLastNameError('');
        setLastName(newLastName);
    }
    
    const handleEmailChange = (newEmail) => {
        setEmailError('');
        setEmail(newEmail);
    }

    const handlePasswordChange = (newPassword) => {
        setPasswordError('');
        setPassword(newPassword);
    }

    const handleConfirmPasswordChange = (newConfirmPassword) => {
        setConfirmPasswordError('');
        setConfirmPassword(newConfirmPassword);
    }
    

    const handleSubmit = async (e) => {

        var error = 0;

        // check if blank
        if (!firstName.length) {
            setFirstNameError('Please enter your first name.');
            error = 1;
        }

        if (!lastName.length) {
            setLastNameError('Please enter your last name.');
            error = 1;
        }
        
        if (!email.length) {
            setEmailError('Please enter an email.');
            error = 1;
        }

        if (!password.length) {
            setPasswordError('Please enter a password.');
            error = 1;
        }

        if (!confirmPassword.length) {
            setConfirmPasswordError('Please re-enter your password.');
            error = 1;
        }

        // error checking for email and password + confirm password

        var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (!(emailRegex.test(email))) {
            // console.log("EMAIL FAILED");
            setEmailError('Please enter a valid email address.');
            error = 1;
        }

        var passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

        if (!(passwordRegex.test(password))) {
            // might want to use a password strength meter or list requirements

            if (password.length < 6) {
                setPasswordError('Your password must be least 6 characters.');
            } else {
                setPasswordError('Your password must contain at least one number, one uppercase letter, and one lowercase letter.');
            }
            error = 1;
           
        } else if (password.localeCompare(confirmPassword) !== 0) {
            setPasswordError('Passwords do not match');
            error = 1;
        }

        if (error === 1){
            return;
        }

        setFirstNameError('');
        setLastNameError('');
        setEmailError('');
        setPasswordError('');
        setConfirmPasswordError('');
        
        
        try {
            const result = await getApi().register(firstName, lastName, email, password);

            await getGlobalStorage().set("token", result.token);

            navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }]
            });
        } catch (error) {
            if ('firstName' in error.errors) {
                setFirstNameError(error.errors.firstName);
            }

            if ('lastName' in error.errors) {
                setLastNameError(error.errors.lastName);
            }

            if ('email' in error.errors) {
                setEmailError(error.errors.email);
            }

            if ('password' in error.errors) {
                setPasswordError(error.errors.password);
            }
        }
    };


    // const togglePasswordVisibility = () => setShowPassword(prev => !prev);
    // const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(prev => !prev);

    // these are so that when user hits next, cursor will automatically go to the next input field
    const lastNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    return (
        <ScrollView style={styles.scrollContainer} centerContent={true} >
            <View style={styles.container}>


                <Stack spacing={2} style={{ margin: 16, width: 300 }} >
                <Header>Create an Account</Header>

                <TextInput
                        value={firstName}
                        autoFocus={true}
                        blurOnSubmit={false}
                        onSubmitEditing={() => {
                            lastNameRef.current.focus();
                        }}
                        error={firstNameError.length > 0}
                        errorText={firstNameError}
                        onChangeText={handleFirstNameChange}
                        accessibilityLabel="First Name"
                        label="First Name"
                        inputMode="text"
                        textContentType="givenName"
                        keyboardType="default"
                        returnKeyType="next"
                        // leading={props => <Icon name="account" {...props} />}
                    />
                    <TextInput
                        value={lastName}
                        innerRef={lastNameRef}
                        // autoFocus={true}
                        blurOnSubmit={false}
                        onSubmitEditing={() => {
                            emailRef.current.focus();
                        }}
                        error={lastNameError.length > 0}
                        errorText={lastNameError}
                        onChangeText={handleLastNameChange}
                        accessibilityLabel="Last Name"
                        label="Last Name"
                        inputMode="text"
                        textContentType="familyName"
                        keyboardType="default"
                        returnKeyType="next"
                        leading={props => <Icon name="account" {...props} />}
                    />
                    <TextInput
                        value={email}
                        innerRef={emailRef}
                        // autoFocus={true}
                        blurOnSubmit={false}
                        onSubmitEditing={() => {
                            passwordRef.current.focus();
                        }}
                        error={emailError.length > 0}
                        errorText={emailError}
                        onChangeText={handleEmailChange}
                        accessibilityLabel="Email"
                        label="Email"
                        inputMode="email"
                        autoCompleteType="email"
                        autoCapitalize="none"
                        textContentType="emailAddress"
                        keyboardType="email-address"
                        returnKeyType="next"
                        leading={props => <Icon name="account" {...props} />}
                    />
                    <TextInput
                        value={password}
                        innerRef={passwordRef}
                        // autoFocus={true}
                        blurOnSubmit={false}
                        onSubmitEditing={() => {
                            confirmPasswordRef.current.focus();
                        }}
                        error={passwordError.length > 0}
                        errorText={passwordError}
                        onChangeText={handlePasswordChange}
                        accessibilityLabel="Password"
                        returnKeyType="next"
                        label="Password"
                        textContentType="password"
                        secureTextEntry={!showPassword}
                        // right={props => <Icon name="eye" {...props} onPress={togglePasswordVisibility} />}
                        // secureTextEntry
                        right={                    
                        <TInput.Icon
                            name="eye"
                            onPress={() => {
                            setShowPassword(!showPassword);
                            return false;
                            }}
                        />}
                    />
                    <TextInput
                        value={confirmPassword}
                        innerRef={confirmPasswordRef}
                        // autoFocus={true}
                        // blurOnSubmit={false}
                        error={confirmPasswordError.length > 0}
                        errorText={confirmPasswordError}
                        onChangeText={handleConfirmPasswordChange}
                        accessibilityLabel="Confirm Password"
                        returnKeyType="done"
                        label="Confirm Password"
                        textContentType="password"
                        // secureTextEntry={!showConfirmPassword}
                        secureTextEntry={!showConfirmPassword}
                        right={         
                        <TInput.Icon
                            name="eye"
                            onPress={() => {
                            setShowConfirmPassword(!showConfirmPassword);
                            return false;
                            }}
                        />}
                    />
                    <Button title="Register" mode="contained" onPress={handleSubmit} accessibilityRole="button" style={styles.button} />
                    <View style={{...styles.row, marginTop: 15}}>
                        <Text style={styles.label}>Already have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.link}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </Stack>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    //   width: Dimensions.get("window").width,
    //   height: Dimensions.get("window").height
    },
    scrollContainer: {
        flex: 1,
        backgroundColor: 'white'
    },
    link: {
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
    label: {
        color: theme.colors.secondary,
    },
    button: {
        marginTop: 24,
        padding: 5
    },
    row: {
        flexDirection: 'row',
        marginTop: 4,
    },
  });

export default RegisterScreen;