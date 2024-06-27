import { Text, View, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { useServices } from "../api/services";
import { useState, useEffect } from 'react';
import { VStack, HStack, Flex } from "@react-native-material/core";
import { FontAwesome } from '@expo/vector-icons';
import ProgramCard from "./components/ProgramCard";
import LoadingScreen from "./LoadingScreen";

const ProgramsListScreen = ({ userData }) => {
    /**
     * Programs are currently not supported in the backend. 
     * A program is a recurring event or a series of events.
     * This screen displays a list of programs.
     * The user navigates here when selecting "Find Services" on the SupportServicesMenuScreen.
     */
    const { getApi } = useServices();
    const [programs, setPrograms] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect( () => {
        const fetchData = async () => {
            const result = await getApi().getPrograms();
            setPrograms(result);
            setIsLoading(false);

        };
        fetchData();

    }, [setPrograms, setIsLoading]);

    if (isLoading) {
        return <LoadingScreen />;
    }
    return (
        <>
            <View style={styles.container}>
                <VStack m={30} spacing={20}>
                    <>{programs.map(program => <ProgramCard key={program.id} program={program} userData={userData}/>)}</>
                </VStack>
            </View>
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

export default ProgramsListScreen;