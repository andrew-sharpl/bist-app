import { View, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { Text, Button, Dialog, Portal, Provider } from 'react-native-paper';
import { useServices } from "../api/services";
import { useState, useEffect, useRef } from 'react';
import { VStack, HStack, Flex } from "@react-native-material/core";
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import TextInput from "./components/subcomponents/TextInput";

const AppointmentFormScreen = ({ route, userData }) => {
    /**
     * This screen is encountered by a user when they want to create a new event or 
     * edit an already existing event.
     * 
     * The user navigates here when selecting "Add New Appointment" on the AppointmentsScreen
     * or when selecting the "Edit" button on an AppointmentCard for some already existing
     * appointment on the "My Appointments"screen (i.e. AppointmentViewScreen.js).
     */
    const { appointment } = route.params;

    const navigation = useNavigation();
    const { getApi } = useServices();

    const [host, setHost] = useState(appointment?.host || '');
    const [date, setDate] = useState(appointment?.date ? new Date(appointment.date) : new Date());
    const [time, setTime] = useState(appointment?.time ? new Date(appointment.time) : new Date());
    const [phone, setPhone] = useState(appointment?.phone || '');
    const [location, setLocation] = useState(appointment?.location || '');
    const [about, setAbout] = useState(appointment?.about || '');
    const [bring, setBring] = useState(appointment?.bring || '');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [hostError, setHostError] = useState('');
    // const [dateError, setDateError] = useState('');
    // const [timeError, setTimeError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    // const [locationError, setLocationError] = useState('');

    const scrollRef = useRef();


    const [showDialog, setShowDialog] = useState(false);

    const handleSubmit = async () => {
        const form = {
            user: userData.name,
            host: host,
            date: date,
            time: time,
            phone: phone,
            location: location,
            about: about,
            bring: bring
        };

        var form_error = 0;
        setPhoneError('');

        if (!host) {
            // there should be at least the host as an input
            // TODO: add on screen error
            setHostError("Please enter a host for this appointment.");
            // setShowDialog(true);
            form_error = 1;
        }
        if (phone.length > 0) {
            const phone_re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
            if (!phone_re.test(phone)) {
                setPhoneError("Please enter a valid phone number.");
                // setShowDialog(true);
                form_error = 1;
            }
        } 
        
        if (form_error === 1) {
            // if error, scroll to top of form 
            // (without this, the user may not see error messages and may 
            // think that the submit button is unresponsive if their screen size is too short)
            scrollRef.current?.scrollTo({
                y: 0,
                animated: true,
              });
            return;
        } else {
            setHostError('');
            setPhoneError('');
            //handle form submission here
            if (appointment) {
                const res = await getApi().updateAppointment({ ...form, _id: appointment._id });
            } else {
                const res = await getApi().createAppointment(form);
            }
            // console.log(appointment);
            // TODO: add onsuccess feedback
            navigation.navigate("Appointments")

        }
    }

    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShowDatePicker(false);
        setDate(currentDate);
    };

    const onChangeTime = (event, selectedTime) => {
        const currentTime = selectedTime;
        setShowTimePicker(false);
        setTime(currentTime);
    };

    const showMode = (currentMode) => {
        if (Platform.OS === 'android') {
            setShowDatePicker(false);
            setShowTimePicker(false);
            // for iOS, add a button that closes the picker
        }
    };

    const showDatepicker = () => {
        showMode('date');
        setShowDatePicker(true);
    };

    const showTimepicker = () => {
        showMode('time');
        setShowTimePicker(true);
    };

    const options = {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      };

    return (
        <Provider>
            <Portal>
                <Dialog visible={showDialog} onDismiss={() => setShowDialog(false)}>
                    <Dialog.Title>Incomplete Fields</Dialog.Title>
                    <Dialog.Content>
                        <Text variant="bodyMedium">Please fill in at least one input field.</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <HStack spacing={5}>
                            <Button onPress={() => setShowDialog(false)}>OK</Button>
                        </HStack>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
            <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false} contentContainerstyle={styles.scrollView} style={styles.container}>
                <VStack border={0} borderRadius={10} p={40} marginBottom={20} spacing={20}>
                    <Flex style={center}><Text style={{ fontSize: 30, width: 200, textAlign: 'center'}}>{appointment ? "Edit" : "Create"} Appointment</Text></Flex>
                    <HStack style={center}>
                        <TextInput 
                        // style={{width: '100%' }} 
                        label='Host' 
                        // mode='outlined' 
                        value={host} 
                        error={hostError.length > 0}
                        errorText={hostError}
                        onChangeText={setHost}/>
                    </HStack>
                    <HStack style={center}>
                        <Button style={{width: 200}} onPress={showDatepicker} buttonColor="lightblue" title='Choose Date'>Choose Date</Button>
                        {showDatePicker && (<DateTimePicker testID="dateTimePicker" value={date} mode={'date'} is24Hour={true} onChange={onChangeDate}/>)}
                    </HStack>
                    <HStack style={center}>
                        <Text>{date.toLocaleDateString("en-US", options)}</Text>
                    </HStack>
                    <HStack style={center}>
                        <Button style={{width: 200}} onPress={showTimepicker} buttonColor="lightblue" title='Choose Time'>Choose Time</Button>
                        {showTimePicker && (<DateTimePicker testID="dateTimePicker" value={time} mode={'time'} is24Hour={true} onChange={onChangeTime}/>)}
                    </HStack>
                    <HStack style={center}>
                        <Text>{time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</Text>
                    </HStack>
                    <HStack style={center}>
                        <TextInput 
                        label='Phone Number'                         
                        value={phone.toString()} 
                        error={phoneError.length > 0}
                        errorText={phoneError}
                        textContentType="telephoneNumber"
                        keyboardType="phone-pad"
                        inputMode="tel" 
                        onChangeText={setPhone}/>
                    </HStack>
                    <HStack style={center}>
                        <TextInput 
                        label='Location' 
                        value={location} 
                        onChangeText={setLocation}/>
                    </HStack>
                    <HStack style={center}>
                        <TextInput 
                        label='About' 
                        value={about} 
                        onChangeText={setAbout}/>
                    </HStack>
                    <HStack style={center}>
                        <TextInput 
                        label='Bring' 
                        value={bring} 
                        onChangeText={setBring}/>
                    </HStack>
                    <HStack style={center}>
                        <Button style={{width: 200}} mode="contained" title="Submit" buttonColor="green" onPress={handleSubmit}>Submit</Button>
                    </HStack>
                    <HStack style={center}>
                        <Button style={{width: 200}} mode="contained" title="Cancel" buttonColor="red" onPress={() => {navigation.navigate("Appointments");}}>Cancel</Button>
                    </HStack>
                </VStack>
            </ScrollView>
        </Provider>
    );
}

const center = { alignItems: "center", justifyContent: "center", };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        // alignItems: "center",
        // justifyContent: "center",
        overflow: 'hidden'
    },
});

export default AppointmentFormScreen;