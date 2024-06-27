import * as React from 'react';
import { Button, Card, Text } from 'react-native-paper';
// import { Text, View } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useState } from "react";
import { useServices } from '../../api/services';
import { Flex } from '@react-native-material/core';
import { useNavigation } from '@react-navigation/native';


function EventCard({ event, isEnrolled, refresh, userData }){
    /**
     * This component displays the information for a single event and allows a user to 
     * enroll or unenroll from it.
     * Props:
     *    event: Event
     *        - The event to be displayed as a card
     *        - has the following properties:
     *              id, title, subheading, date, description, location, slots, enrolledUsers
     *    isEnrolled: bool
     *        - True if the current user is already registered for this event,
     *          False if they are not currently registered for this event
     *    refresh
     *    userData
     */
    const { getApi, getGlobalStorage } = useServices();
    const navigation = useNavigation();

    const handleEnroll = async () => {
        const res = await getApi().enrollInEvent(event.id);
        refresh();
    }

    const handleUnenroll = async () => {
        const res = await getApi().unenrollInEvent(event.id);
        refresh();
    }

    const formatDate = date => date.toDateString();

    return (
        <Card key={event.id} style={{ marginVertical: 4 }} mode="outlined" role="listitem">
            <Card.Title title={event.title} titleVariant={"titleLarge"} subtitle={event.subheading} />
            <Card.Content>
                <Text variant="bodyMedium">Date: {formatDate(new Date(event.date))}</Text>
                <Text variant="bodyMedium">Start Time: {!event.startTime ? 'N/A' : new Date(event.startTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</Text>
                <Text variant="bodyMedium">End Time: {!event.startTime ? 'N/A' : new Date(event.endTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</Text>
                <Text variant="bodyMedium">Location: {event.location}</Text>
            </Card.Content>
            <Card.Actions>
                <Button mode="contained" testID={`View More: ${event.id}`} onPress={() => navigation.navigate("Event Details", { event: {...event, date: formatDate(new Date(event.date))} })}>View More</Button>
                {isEnrolled ? <Button mode="contained" testID={`Unenroll: ${event.id}`} buttonColor="red" onPress={() => {handleUnenroll();}}>Un-Enroll</Button> : <Button mode="contained" testID={`Enrol: ${event.id}`} buttonColor="green" onPress={() => {handleEnroll();}}>Enroll</Button>}
            </Card.Actions>
        </Card>
    );
}
  
export default EventCard;