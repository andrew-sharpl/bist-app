import * as React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Button, Card } from 'react-native-paper';
import { VStack, HStack, Flex } from "@react-native-material/core";
import { useServices } from '../../api/services';
import { useNavigation } from '@react-navigation/native';


function AppointmentCard ({appointment, refresh, userData, handleDelete}) {
    /**
   * This component displays the information for a single appointment
   * Props:
   *    appointment: Appointment
   *        - The appointment to be displayed as a card
   *        - has the following properties:
   *              host, date, time, phone, location, about, bring
   *    userData
   *    refresh
   */

    const { getApi, getGlobalStorage } = useServices();
    const navigation = useNavigation();

    const options = {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      };

    return(
        <Card key={appointment._id} style={{ marginVertical: 4}} mode="outlined" role="listitem">
            <Card.Title title='Appointment' />
            <Card.Content>
                <VStack spacing={10}>
                    {/* <Button mode="contained" title='Update' onPress={() => {getApi.updateAppointment(appointment);} }>Update</Button> */}
                    {/* consider making new screen similar to create for updating */}
                    <HStack>
                        <Flex style={center}><Text style={styles.detailLabel}>Host:</Text></Flex>
                        <Flex style={center}><Text style={styles.wideDetail}>{!appointment.host ? '-' : appointment.host}</Text></Flex>
                    </HStack>
                    <HStack>
                        <Flex style={center}><Text style={styles.detailLabel}>Date:</Text></Flex>
                        <Flex style={center}><Text style={styles.wideDetail}>{!appointment.date ? '-' : new Date(appointment.date).toLocaleDateString("en-US", options)}</Text></Flex>
                    </HStack>
                    <HStack>
                        <Flex style={center}><Text style={styles.detailLabel}>Time:</Text></Flex>
                        <Flex style={center}><Text style={styles.regularDetail}>{!appointment.time ? '-' : new Date(appointment.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</Text></Flex>
                    </HStack>
                    {!appointment.phone ? '-' :                     
                    <HStack>
                        <Flex style={center}><Text style={styles.detailLabel}>Phone:</Text></Flex>
                        <Flex style={center}><Text style={styles.regularDetail}>{!appointment.phone ? '-' : appointment.phone}</Text></Flex>
                    </HStack>}

                    {!appointment.location ? '-' :                     
                    <HStack>
                        <Flex style={center}><Text style={styles.detailLabel}>Location:</Text></Flex>
                        <Flex style={center}><Text style={styles.regularDetail}>{!appointment.location ? '-' : appointment.location}</Text></Flex>
                    </HStack>}

                    {!appointment.about ? '-' :                     
                    <HStack>
                        <Flex style={center}><Text style={styles.detailLabel}>About:</Text></Flex>
                        <Flex style={center}><Text style={styles.regularDetail}>{!appointment.about ? '-' : appointment.about}</Text></Flex>
                    </HStack>}
                    {!appointment.bring ? '-' : 
                    <HStack>
                        <Flex style={center}><Text style={styles.detailLabel}>Bring:</Text></Flex>
                        <Flex style={center}><Text style={styles.regularDetail}>{!appointment.bring ? '-' : appointment.bring}</Text></Flex>
                    </HStack>
                    }
                    <HStack style={{ marginTop: 10}} spacing={10}>
                        <Button mode="contained" title='Edit' onPress={() => navigation.navigate("Appointment Form", { appointment }) }>Edit</Button>
                        <Button mode="contained" buttonColor="red" title='Remove' onPress={handleDelete}>Remove</Button>
                    </HStack>
                </VStack>
            </Card.Content>
        </Card>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "lightgrey",
        alignItems: "center",
        justifyContent: "center",
    },
    detailLabel: { fontSize: 20, width: 100, flexWrap: 'wrap'},
    wideDetail: { fontSize: 20, width: 140, flexWrap: 'wrap'},
    regularDetail: { fontSize: 20, width: 130, flexWrap: 'wrap'}
});

const center = { alignItems: "center", justifyContent: "center", };

export default AppointmentCard;