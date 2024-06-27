import { TextInput, View, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { useServices } from "../api/services";
import { useState, useEffect } from 'react';
import { VStack, HStack, Flex } from "@react-native-material/core";
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AppointmentCard from "./components/AppointmentCard";
import LoadingScreen from "./LoadingScreen";
import { Text, Button, Dialog, Portal, Provider } from 'react-native-paper';

const AppointmentViewScreen = ({ userData }) => {
     /**
     * This screen displays a list of the user's appointments.
     * The user navigates here when selecting "View Upcoming Appointments" on
     * the AppointmentScreen.
     */

    const navigation = useNavigation();
    const { getApi } = useServices();
    const [appointments, setAppointment] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [showDelete, setShowDelete] = useState(false);
    const showDialog = () => setShowDelete(true);
    const hideDialog = () => setShowDelete(false);

    const fetchData = async () => {
        const res = await getApi().getAppointments(userData.name);

        setAppointment(res);
        setIsLoading(false);
    };

    const deleteAppointment = async () => {
        try{
            const res = await getApi().deleteAppointment(selectedAppointment);
            console.log(res);
        } catch (err) {
            console.log(err);
        } finally {
            setSelectedAppointment(null);
            setShowDelete(false);
            fetchData();
        }
    }

    useEffect( () => {
        fetchData();
    }, [setAppointment, setIsLoading]);

    if (isLoading) {
        return <LoadingScreen />;
    }

    if (!appointments.length) {
        return (
            <View style={styles.container}>
                <Text>There are no appointments to display.</Text>
            </View>
        );
    };

    return (
        <Provider>
            <View style={styles.view}>
            <Portal>
                <Dialog visible={showDelete} onDismiss={hideDialog}>
                    <Dialog.Title>Confirm Delete</Dialog.Title>
                    <Dialog.Content>
                        <Text variant="bodyMedium">Are you sure you want to delete this appointment?</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <HStack spacing={5}>
                            <Button mode="contained" onPress={deleteAppointment} >Yes</Button>
                            <Button onPress={hideDialog}>No</Button>
                        </HStack>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerstyle={styles.scrollView} >
                <>{appointments
                    .sort(function(a1, a2){
                        const res = new Date(a1.date) - new Date(a2.date);
                        if (res === 0) {
                            return new Date(a1.time) - new Date(a2.time);
                        }
                        return res;   
                    })
                    .map((apt) =>
                        <AppointmentCard
                            key={'apt'+ apt._id}
                            appointment={apt}
                            refresh={fetchData}
                            userData={userData}
                            handleDelete={() => {
                                setSelectedAppointment(apt._id);
                                showDialog();
                            }}
                        />
                    )
                    }</>
            </ScrollView>
            </View>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    scrollView: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    },
    view: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    }
});

export default AppointmentViewScreen;