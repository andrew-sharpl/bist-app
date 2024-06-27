import { Text, View, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { useServices } from "../api/services";
import { useState, useEffect } from 'react';
import { VStack, HStack, Flex } from "@react-native-material/core";
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const AppointmentsScreen = ({ userData }) => {
     /**
     * This screen displays a choice for the user to create appointments or view
     * them. The user navigates here when selecting "Appointments" on
     * the HomeScreen.
     */

    const { getApi } = useServices();

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <VStack m={30} spacing={20}>
                <TouchableOpacity onPress={() => navigation.navigate("Appointment Form", { appointment: null })}>
                    <HStack border={5} borderRadius={25} p={20} spacing={20}>
                        <FontAwesome name="calendar-plus-o" size={70} color="black" />
                        <Flex style={center}><Text style={{ fontSize: 20}}>Add New Appointment</Text></Flex>
                    </HStack>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("My Appointments")}>
                    <HStack border={5} borderRadius={25} p={20} spacing={20} >
                        <FontAwesome name="calendar" size={70} color="black" />
                        <Flex style={center}><Text style={{ fontSize: 20, width: 200, flexWrap: 'wrap'}}>View Upcoming Appointments</Text></Flex>
                    </HStack>
                </TouchableOpacity>
            </VStack>
        </View>
    );
}

const center = { alignItems: "center", justifyContent: "center", };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});

export default AppointmentsScreen;