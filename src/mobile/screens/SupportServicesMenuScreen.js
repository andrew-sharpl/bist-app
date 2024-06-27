import { Text, View, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { useServices } from "../api/services";
import { useState, useEffect } from 'react';
import { VStack, HStack, Flex } from "@react-native-material/core";
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const SupportServicesMenuScreen = ({ userData }) => {
    /**
     *  The user is directed to this screen after selecting the "Support Services" icon 
     *  on the HomeScreen.
     *  The user can navigate to either the UserEventsScreen or the ProgramsListScreen.
     */
    const { getApi } = useServices();
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <VStack m={30} spacing={20}>
                <TouchableOpacity accessibilityLabel="My Events" onPress={() => navigation.navigate("My Events")}>
                    <HStack border={5} borderRadius={25} p={20} spacing={20}>
                        <MaterialIcons name="home-repair-service" size={100} color="black" />
                        <Flex style={center}><Text style={{ fontSize: 20}}>My Services</Text></Flex>
                    </HStack>
                </TouchableOpacity>
                <TouchableOpacity accessibilityLabel="Events List" onPress={() => navigation.navigate("Events List")}>
                    <HStack border={5} borderRadius={25} p={20} spacing={20}>
                        <FontAwesome name="search-plus" size={100} color="black" />
                        <Flex style={center}><Text style={{ fontSize: 20}}>Find Services</Text></Flex>
                    </HStack>
                </TouchableOpacity>
            </VStack>
        </View>
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

export default SupportServicesMenuScreen;