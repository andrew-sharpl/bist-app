import { Text, View, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { useServices } from "../api/services";
import { useState, useEffect } from 'react';
import { VStack, HStack, Flex } from "@react-native-material/core";
import { FontAwesome } from '@expo/vector-icons';
import EventCard from "./components/EventCard";
import EventsList from "./components/EventsList";
import LoadingScreen from "./LoadingScreen";

const UserEventsScreen = ({ userData }) => {
    /**
     * This screen displays a list of events that the user is currently enrolled/registered in.
     * The user navigates here when selecting "My Services" on the SupportServicesMenuScreen.
     */
    const { getApi } = useServices();
    const [isLoading, setIsLoading] = useState(true);
    const [enrolledEvents, setEnrolledEvents] = useState([]);

    const email = userData.email;

    const fetchData = async () => {
        const result = await getApi().getEnrolledEvents(email);
        setEnrolledEvents(result);

        setIsLoading(false);

    };
    
    useEffect( () => {
        fetchData();
    }, [setEnrolledEvents, setIsLoading]);

    // const eventCards = programEvents.map(pEvent => <EventCard key={pEvent.id} event={pEvent} userData={userData}/>);

    if (isLoading) {
        return <LoadingScreen />;
    }

    return (
        <View style={styles.container}>
            <EventsList events={enrolledEvents} userEnrollments={enrolledEvents} refresh={fetchData} userData={userData}/>
        </View>
    );
}

const center = { alignItems: "center", justifyContent: "center"};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
});

export default UserEventsScreen;