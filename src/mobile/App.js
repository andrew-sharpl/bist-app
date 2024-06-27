import ServiceProvider from "./api/services";
import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import * as SecureStore from 'expo-secure-store';
import AppointmentsScreen from "./screens/AppointmentsScreen";
import ProgramDetailsScreen from "./screens/ProgramDetailsScreen";
import ProgramsListScreen from "./screens/ProgramsListScreen";
import SupportServicesMenuScreen from "./screens/SupportServicesMenuScreen";
import UserEventsScreen from "./screens/UserEventsScreen";
import AppointmentFormScreen from "./screens/AppointmentFormScreen";
import AppointmentViewScreen from "./screens/AppointmentViewScreen";
import EventsListScreen from "./screens/EventsListScreen";
import EventDetailsScreen from "./screens/EventDetailsScreen";

const Stack = createNativeStackNavigator();

const App = ({ api }) => {
    const [tokenLoading, setTokenLoading] = useState(false);
    const [token, setToken] = useState(null);
    const [userData, setUserData] = useState(null);

    const globalStorage = {
        async get(key) {
            return await SecureStore.getItemAsync(key);
        },
        async set(key, value) {
            if (key === 'token') {
                setToken(value);
                api.setToken(value);
            }

            return await SecureStore.setItemAsync(key, value);
        },
        async delete(key) {
            if (key === 'token') {
                setToken(null);
                api.setToken(null);
            }

            return await SecureStore.deleteItemAsync(key);
        }
    };
    
    // fetch token from secure store
    useEffect(() => {
        const fetchToken = async () => {
            const fetchedToken = await globalStorage.get("token");
            if (fetchedToken) {
                setToken(fetchedToken);
                api.setToken(fetchedToken);
            }
            setTokenLoading(false);
        };

        fetchToken();
    }, []);

    // decode token and get user data
    useEffect(() => {
        const updateUserData = async () => {
            if (token) {
                try {
                    const userData = await api.decodeToken(token);
                    setUserData(userData);
                } catch (error) {
                    setUserData(null);
                }
            } else {
                setUserData(null);
            }
        }

        updateUserData();
    }, [token]);

    return (
        <ServiceProvider getApi={() => api} getGlobalStorage={() => globalStorage} >
            { tokenLoading ? "Loading..." :
            <NavigationContainer>
                <Stack.Navigator initialRouteName={token ? "Home" : "Login"}>
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="Signup" component={RegisterScreen} />
                    <Stack.Screen name="Home">{ () => <HomeScreen userData={userData} /> }</Stack.Screen>
                    <Stack.Screen name="Appointments">{ () => <AppointmentsScreen userData={userData} /> }</Stack.Screen>
                    <Stack.Screen name="Program Details">{ (programId) => <ProgramDetailsScreen {... programId} userData={userData}/> }</Stack.Screen>
                    <Stack.Screen name="Programs List">{ () => <ProgramsListScreen userData={userData}/> }</Stack.Screen>
                    <Stack.Screen name="Events List">{ () => <EventsListScreen userData={userData}/> }</Stack.Screen>
                    <Stack.Screen name="Support Services Menu">{ () => <SupportServicesMenuScreen userData={userData}/> }</Stack.Screen>
                    <Stack.Screen name="My Events">{ () => <UserEventsScreen userData={userData}/> }</Stack.Screen>
                    <Stack.Screen name="Event Details">{ (event) => <EventDetailsScreen {...event} userData={userData}/> }</Stack.Screen>
                    <Stack.Screen name="Appointment Form">{ (appointment) => <AppointmentFormScreen {...appointment} userData={userData} /> }</Stack.Screen>
                    <Stack.Screen name="My Appointments">{ () => <AppointmentViewScreen userData={userData} /> }</Stack.Screen>
                </Stack.Navigator>
            </NavigationContainer>
            }
        </ServiceProvider>
    );
}

export default App;