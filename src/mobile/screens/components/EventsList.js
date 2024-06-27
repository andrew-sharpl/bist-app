import { Text, View, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView } from "react-native";
import { useServices } from "../../api/services";
import { useState, useEffect } from 'react';
import { VStack, HStack, Flex } from "@react-native-material/core";
import { FontAwesome } from '@expo/vector-icons';
import EventCard from "./EventCard";

const EventsList = ({ events, userEnrollments, refresh, userData }) => {
    /**
     * This component displays a stack of EventCard components.
     * Props:
     *      events: list of Events
     *          - the events to be displayed in the component as EventCards
     *      userEnrollments: list of Events
     *          - the events that the user is currently enrolled in
     *      refresh
     *      userData
     * 
     */
    const { getApi } = useServices();

    if (!events.length) {
        return (
            <View style={styles.center}>
                <Text>There are no events to display.</Text>
            </View>
        );
    };

    return (
        <>
            <ScrollView contentContainerStyle={styles.container}>
                <VStack m={30} spacing={20} role="list" testID="Events List">
                    {events.map(pEvent => <EventCard event={pEvent} isEnrolled={userEnrollments.some(e => e.id === pEvent.id)} refresh={refresh} userData={userData}/>)}
                </VStack>
            </ScrollView>
        </>
    );
}

const center = { alignItems: "center", justifyContent: "center"};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
    },
    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#fff",
    }
});

export default EventsList;