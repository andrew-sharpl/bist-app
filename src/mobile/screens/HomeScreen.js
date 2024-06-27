import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useServices } from "../api/services";
import { VStack, HStack } from "@react-native-material/core";
import { AntDesign } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Header from "./components/Header";
import { theme } from "../core/theme";

const HomeScreen = ({ userData }) => {
    const { getApi, getGlobalStorage } = useServices();
    const navigation = useNavigation();

    if (!userData) {
        return <Text>Loading...</Text>;
    }

    const isAdmin = userData.permissions.includes("admin");
    // const isAdmin = false;

    const handleLogout = async () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }]
        });
        await getGlobalStorage().delete("token");
    }

    const unimplementedFeatureAlert = () =>
    Alert.alert(
      "Unimplemented Feature",
      "This feature will be implemented in a future version.",
      [
        {
          text: "Dismiss",
          style: "cancel"
        }
      ]
    );

    return (
        <View style={styles.container}>
            {/* <Text>Logged In: { userData.name }</Text> */}
            <Header>Welcome, { userData.name }.</Header>
            <VStack m={30} spacing={30}>
                <HStack spacing={30}>
                    <TouchableOpacity accessibilityLabel="Appointments" onPress={() => navigation.navigate("Appointments")}>
                        <VStack style={center}>
                            <AntDesign name="calendar" size={100} color="black" />
                            <Text style={styles.label}>Appointments</Text>
                        </VStack>
                    </TouchableOpacity>
                    <TouchableOpacity accessibilityLabel="Events" onPress={() => navigation.navigate("Support Services Menu")}>
                        <VStack style={center}>
                            <FontAwesome name="handshake-o" size={100} color="black" />
                            <Text style={styles.label}>Support Services</Text>
                        </VStack>
                    </TouchableOpacity>
                </HStack>
                <HStack spacing={30}>
                    <TouchableOpacity onPress={unimplementedFeatureAlert}>
                        <VStack style={center}>
                            <AntDesign name="idcard" size={100} color="black" />
                            <Text style={styles.label}>ID Cards</Text>
                        </VStack>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={unimplementedFeatureAlert}>
                        <VStack style={center}>
                            <FontAwesome5 name="question-circle" size={100} color="black" />
                            <Text style={styles.label}>Help</Text>
                        </VStack>
                    </TouchableOpacity>
                </HStack>
                <HStack spacing={30}>
                    { isAdmin &&
                    <TouchableOpacity onPress={unimplementedFeatureAlert}>
                        <VStack style={center}>
                            <MaterialIcons name="admin-panel-settings" size={100} color="black" />
                            <Text style={styles.label}>Admin</Text>
                        </VStack>
                    </TouchableOpacity>
                    }
                    <TouchableOpacity accessibilityLabel="Logout" onPress={handleLogout}>
                        <VStack style={center}>
                            <MaterialCommunityIcons name="logout-variant" size={100} color="black" />
                            <Text style={styles.label}>Logout</Text>
                        </VStack>
                    </TouchableOpacity>
                </HStack>
            </VStack>
        </View>
    );
};

const center = { alignItems: "center", justifyContent: "center"};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    label: {
        // color: theme.colors.secondary,
        color: "black",
        // fontWeight: 'bold'
    },
});

export default HomeScreen;