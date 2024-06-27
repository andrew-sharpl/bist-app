import React from 'react';
import { Modal, Portal, Text, Button, Provider } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { View } from 'react-native';

const PickerModal = ({ visible, show, hide, options, selectedValue, onValueChange, children }) => {
    const containerStyle = {backgroundColor: 'white', padding: 20, margin: 20, borderRadius: 5};

    return (
        <Modal visible={visible} onDismiss={hide} contentContainerStyle={containerStyle} testID='picker-modal'>
            <View>
                {children}
            </View>
            <Picker
                selectedValue={selectedValue}
                // onValueChange={(itemValue, itemIndex) => setViewType(itemValue)}
                onValueChange={onValueChange}
                testID="picker"
            >
                { options.map(o => <Picker.Item label={o.label} value={o.value} />)}
            </Picker>
            <Button
                onPress={hide}
                mode="contained"
                title='Close'
                accessibilityLabel='Close Picker Modal'
                width={100}
            >
                Close
            </Button>
        </Modal>
    )
};

export default PickerModal;