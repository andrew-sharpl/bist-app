import { StyleSheet, View, TouchableOpacity, ScrollView } from "react-native";
import { Stack, IconButton, Button } from "@react-native-material/core";
import {  Text, TextInput as TInput } from 'react-native-paper';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useState, useRef } from "react";
import { useServices } from "../api/services";
import { Link } from "@react-navigation/native";
import TextInput from "./components/subcomponents/TextInput";
import Header from "./components/Header";
import { theme } from "../core/theme";
// import Button from "./components/subcomponents/Button";

const LoginScreen = ({ navigation }) => {
    /*
    * The initial screen that an unauthenticated user sees.
    * On successful authentication, navigates to the home screen.
    * Also allows for a new user to navigate to the Register screen.
    */
    const { getApi, getGlobalStorage } = useServices();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleEmailChange = (newEmail) => {
        setEmailError('');
        setEmail(newEmail);
    }

    const handlePasswordChange = (newPassword) => {
        setPasswordError('');
        setPassword(newPassword);
    }

    const handleLogin = async () => {
        if (!email.length) {
            setEmailError('Please enter an email.');
            return;
        }

        if (!password.length) {
            setPasswordError('Please enter a password.');
            return;
        }

        setPasswordError('');
        setEmailError('');

        try {
            const result = await getApi().login(email, password);

            await getGlobalStorage().set("token", result.token);

            navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }]
            });
        } catch (error) {
            if ('email' in error.errors) {
                setEmailError(error.errors.email);
            }
            if ('password' in error.errors) {
                setPasswordError(error.errors.password);
            }
        }
    };

    const togglePasswordVisibility = () => setShowPassword(prev => !prev);
    const passwordLoginRef = useRef();

    return (
        <ScrollView style={styles.scrollContainer} centerContent={true} >
            <View style={styles.container}>
                <Stack spacing={2} style={{ margin: 16, width: 300 }} >
                    <Header>Please log in</Header>
                    <TextInput
                        value={email}
                        autoFocus={true}
                        blurOnSubmit={false}
                        onSubmitEditing={() => {
                            passwordLoginRef.current.focus();
                        }}
                        error={emailError.length > 0}
                        errorText={emailError}
                        autoCapitalize="none"
                        onChangeText={handleEmailChange}
                        accessibilityLabel="Email"
                        label="Email"
                        inputMode="email"
                        textContentType="emailAddress"
                        keyboardType="email-address"
                        returnKeyType="next"
                        leading={props => <Icon name="account" {...props} />}
                    />
                    <TextInput
                        value={password}
                        innerRef={passwordLoginRef}
                        error={passwordError.length > 0}
                        errorText={passwordError}
                        onChangeText={handlePasswordChange}
                        accessibilityLabel="Password"
                        returnKeyType="done"
                        label="Password"
                        textContentType="password"
                        secureTextEntry={!showPassword}
                        // trailing={props => <Icon name="eye" {...props} onPress={togglePasswordVisibility} />}
                        right={<Icon name="eye" onPress={togglePasswordVisibility}/>}
                    />
                    <Button title="Login"onPress={handleLogin} mode="contained" accessibilityRole="button" style={styles.button} />
                    <View style={{...styles.row, marginTop: 15}}>
                        <Text style={styles.label}>Don't have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                        <Text style={styles.link}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                    {/* <Text> <Link style={styles.link} to={{ screen: 'Signup' }}>Sign Up</Link></Text> */}
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

export default LoginScreen;