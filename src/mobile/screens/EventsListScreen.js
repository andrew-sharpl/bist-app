import { View, StyleSheet } from "react-native";
import { useServices } from "../api/services";
import { useState, useEffect } from 'react';
import { Text, Title, Button, TextInput, Divider, Portal, Provider, Subheading } from 'react-native-paper';
import EventsList from "./components/EventsList";
import DateTimePicker from '@react-native-community/datetimepicker';
import { HStack } from "@react-native-material/core";
import { FontAwesome } from '@expo/vector-icons';
// import RNPickerSelect from 'react-native-picker-select';
import { Picker } from '@react-native-picker/picker';
import PickerModal from "./components/PickerModal";
import LoadingScreen from "./LoadingScreen";

const EventsListScreen = ({ route, userData }) => {
    /**
     * This screen displays the list of all events.
     * The user navigates here when selecting "View Details" of some program on the 
     * ProgramsListScreen.
     */
    const { getApi } = useServices();
    // const [month, setMonth] = useState(new Date().toLocaleString('default', { month: 'long' }));
    const [date, setDate] = useState(new Date());
    const [filterValue, setFilterValue] = useState('');
    const [viewType, setViewType] = useState('year');
    const [isLoading, setIsLoading] = useState(true);
    const [events, setEvents] = useState([]);
    const [enrolledEvents, setEnrolledEvents] = useState([]);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showViewPicker, setShowViewPicker] = useState(false);

    const areSameYear = (day1, day2) => {
        return day1.getFullYear() == day2.getFullYear();
    }

    const areSameMonth = (day1, day2) => {
        return areSameYear(day1, day2) && day1.getMonth() == day2.getMonth();
    };

    const areSameDay = (day1, day2) => {
        return areSameMonth(day1, day2) && day1.getDate() == day2.getDate();
    }

    const fetchData = async () => {
        let events = await getApi().getEvents();

        if (filterValue.length) {
            events = events.filter(e => e.title.toLowerCase().includes(filterValue.toLowerCase()));
        }

        if (viewType === 'year') {
            events = events.filter(e => areSameYear(new Date(e.date), date));
        } else if (viewType === 'month') {
            events = events.filter(e => areSameMonth(new Date(e.date), date));
        } else if (viewType === 'day') {
            events = events.filter(e => areSameDay(new Date(e.date), date));
        }
        
        setEvents(events);

        const enrolledEventsResult = await getApi().getEnrolledEvents();
        setEnrolledEvents(enrolledEventsResult);

        setIsLoading(false);
    };

    const onPickerChange = (event, newDate) => {
        const selectedDate = newDate || date;
        // if (Platform.OS === 'android') {
            setShowDatePicker(false);
        // }
        setDate(selectedDate);
    };
    
    useEffect( () => {
        fetchData();

    }, [filterValue, viewType, date, setEnrolledEvents, setIsLoading]);

    // const eventCards = programEvents.map(pEvent => <EventCard key={pEvent.id} event={pEvent} userData={userData}/>);
    const month = date.toLocaleString('default', { month: 'long' });

    const getDisplayDate = () => {
        switch (viewType) {
            case "year":
                return date.getFullYear();
            case "month":
                return date.toJSON().slice(0, 7).split("-").join("/");
            case "day":
                return date.toJSON().slice(0, 10).split("-").join("/");
        }
    };

    if (isLoading) {
        return <LoadingScreen />;
    }
    return (
        <Provider>
            <Portal>
                <PickerModal
                    visible={showViewPicker}
                    show={() => setShowViewPicker(true)}
                    hide={() => setShowViewPicker(false)}
                    options={[
                        {label: 'Year', value: 'year'},
                        {label: 'Month', value: 'month'},
                        {label: 'Day', value: 'day'},
                    ]}
                    onValueChange={(value, index) => setViewType(value)}
                    selectedValue={viewType}
                >
                    <Subheading>Filter by:</Subheading>
                    <Divider />
                </PickerModal>
            </Portal>
            <HStack m={5} style={{flexWrap: 'wrap'}}>
                <View style={styles.hbox} testID="date-picker-parent">
                    <Text variant="titleMedium">Events In: </Text>
                    <Button
                        onPress={() => {
                            setShowDatePicker(p => !p);
                        }}
                        buttonColor="lightblue"
                        accessibilityLabel="Choose Date"
                        title='Choose Date'
                    >
                        Choose Date
                    </Button>
                    { showDatePicker &&
                    <DateTimePicker
                        value={date}
                        mode={'date'}
                        is24Hour={false}
                        onChange={onPickerChange}
                    />}
                </View>
                <View style={styles.hbox} testID="view-picker-parent">
                    <Text variant="titleMedium">View: </Text>
                    {/* <RNPickerSelect
                        style={styles}
                        onValueChange={value => setViewType(value)}
                        placeholder='month'
                        value={viewType}
                        items={[
                            {label: 'Year', value: 'year'},
                            {label: 'Month', value: 'month'},
                            {label: 'Day', value: 'day'},
                        ]}
                        fixAndroidTouchableBug
                    /> */}
                    <Button
                        onPress={() => setShowViewPicker(p => !p)}
                        buttonColor="lightblue"
                        accessibilityLabel="Choose View"
                        title='Choose View'
                    >
                        Choose View
                    </Button>
                </View>
            </HStack>
            <HStack m={10} style={styles.title}>
                <Text variant="titleMedium">Filter by Title: </Text>
                <TextInput
                    value={filterValue}
                    onChangeText={value => setFilterValue(value)}
                    accessibilityLabel="Filter Text Input"
                    style={styles.filterStyle}
                />
                {/* <Button mode="contained" accessibilityLabel="Filter Button" onPress={fetchData}><FontAwesome name="search" size={20} color="black" /></Button> */}
            </HStack>
            <View style={styles.title}>
                <Title>Events for {getDisplayDate()}</Title>
            </View>
            <Divider />
            <EventsList events={events} userEnrollments={enrolledEvents} refresh={fetchData} userData={userData}/>
        </Provider>
    );
}

const center = { alignItems: "center", justifyContent: "center"};

const pickerStyle = {
    fontSize: 16,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 4,
    backgroundColor: '#E0E0E0',
    color: 'black',
}

const styles = StyleSheet.create({
    title: {
        alignItems: "center",
    },
    container: {
        flex: 1,
        alignItems: "center"
    },
    hbox: {
        flexDirection: "row",
        alignItems: "center",
        margin: 5
    },
    filterStyle: {
        height: 40,
        flexGrow: 1,
        backgroundColor: 'transparent'
    },
    inputIOS: pickerStyle,
    inputAndroid: pickerStyle,
});

export default EventsListScreen;