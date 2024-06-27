import { VStack, even } from "@react-native-material/core";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import { Text, Card, Title, Subheading, Divider } from 'react-native-paper';

const EventDetailsScreen = ({ route }) => {
    /**
     * This screen displays the details of a single event (given by route.params).
     * The user navigates here when selecting "View Details" of some event on the 
     * EventsListScreen.
     * 
     * Details of an event include:
     *      -Required: type ('inPerson' or 'online'), title, host
     *      -Not Required: date, startTime, endTime, location, zoomLink, 
     *                     zoomPassword, description, enrolledUsers, notes 
     */

    const { event } = route.params;

    return (
        <View style={styles.container}>
            <Title>{event.title}</Title>
            {event.description && <Subheading>{event.description}</Subheading>}
            <VStack style={{alignSelf: 'stretch'}} m={40} spacing={5}>
                <View>
                    <Text variant="titleMedium">Host</Text><Divider />
                    <Text variant="bodyMedium">{!event.host ? 'N/A' : event.host}</Text>
                </View>
                <View>
                    <Text variant="titleMedium">Date</Text><Divider />
                    <Text variant="bodyMedium">{!event.date ? 'N/A' : event.date}</Text>
                </View>
                <View>
                    <Text variant="titleMedium">Start Time</Text><Divider />
                    <Text variant="bodyMedium">{!event.startTime ? 'N/A' : new Date(event.startTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</Text>
                </View>
                <View>
                    <Text variant="titleMedium">End Time</Text><Divider />
                    <Text variant="bodyMedium">{!event.startTime ? 'N/A' : new Date(event.endTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</Text>
                </View>
                <View>
                    <Text variant="titleMedium">Type</Text><Divider />
                    <Text variant="bodyMedium">{event.type === "online" ? "Online" : "In Person"}</Text>
                </View>
                <View>
                    <Text variant="titleMedium">Location</Text><Divider />
                    <Text variant="bodyMedium">{!event.location ? 'N/A' : event.location}</Text>
                </View>
                {!event.zoomLink ? <></> :                 
                <View>
                    <Text variant="titleMedium">Zoom Link</Text><Divider />
                    <Text variant="bodyMedium">{!event.zoomLink ? 'N/A' : event.zoomLink}</Text>
                </View>}
                {!event.zoomPassword ? <></> :                 
                <View>
                    <Text variant="titleMedium">Zoom Password</Text><Divider />
                    <Text variant="bodyMedium">{!event.zoomPassword ? 'N/A' : event.zoomPassword}</Text>
                </View>}
                {!event.notes ? <></> :                 
                <View>
                    <Text variant="titleMedium">Notes</Text><Divider />
                    <Text variant="bodyMedium">{!event.notes ? 'N/A' : event.notes}</Text>
                </View>}
            </VStack>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});

export default EventDetailsScreen;