import { View, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { useServices } from "../api/services";
import { useState, useEffect } from 'react';
import { VStack, HStack, Flex } from "@react-native-material/core";
import { FontAwesome } from '@expo/vector-icons';
import { Text, Title, Paragraph, Subheading } from 'react-native-paper';
import EventCard from "./components/EventCard";
import EventsList from "./components/EventsList";
import LoadingScreen from "./LoadingScreen";

const ProgramDetailsScreen = ({ route, userData }) => {
    /**
     * Programs are currently not supported in the backend. 
     * A program is a recurring event or a series of events.
     * This screen displays the details of the program with an ID of programId.
     * The user navigates here when selecting "View Details" of some program on the 
     * ProgramsListScreen.
     */
    const { programId } = route.params;
    const { getApi } = useServices();
    const [program, setProgram] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [programEvents, setProgramEvents] = useState([]);
    const [enrolledEvents, setEnrolledEvents] = useState([]);
    

    const email = userData.email;


    const fetchData = async () => {
        const result = await getApi().getProgramDetails(programId);
        setProgram(result);

        const eventsResult = await getApi().getProgramEvents(programId);
        setProgramEvents(eventsResult);

        const enrolledEventsResult = await getApi().getEnrolledEvents(email);
        setEnrolledEvents(enrolledEventsResult);

        setIsLoading(false);

    };
    
    useEffect( () => {
        fetchData();

    }, [setProgram, setProgramEvents, setEnrolledEvents, setIsLoading]);

    // const eventCards = programEvents.map(pEvent => <EventCard key={pEvent.id} event={pEvent} userData={userData}/>);

    if (isLoading) {
        return <LoadingScreen />;
    }
    return (
        <>
        <Title>{program.title}</Title>
        <Subheading>{program.subheading}</Subheading>
        <Paragraph>{program.description}</Paragraph>
        <Text variant="labelLarge">Program events:</Text>
        <EventsList events={programEvents} userEnrollments={enrolledEvents} refresh={fetchData} userData={userData}/>
        </>

    );
}

const center = { alignItems: "center", justifyContent: "center"};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});

export default ProgramDetailsScreen;