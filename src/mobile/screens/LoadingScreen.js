import React from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { View } from 'react-native';

const LoadingScreen = () => {
    return (
        <View style={center}>
            <ActivityIndicator animating={true} size={50} />
        </View>
    );
};

const center = { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: 'white'};

export default LoadingScreen;