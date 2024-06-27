import React, { memo } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput as Input } from 'react-native-paper';
import { theme } from '../../../core/theme';

// type Props = React.ComponentProps<typeof Input> & { errorText?: string };

const TextInput = ({ errorText, innerRef, ...props }) => (
  /** 
   * A custom text input with error text.
   * Same as React Native Paper TextInput, except has the following modifications: 
   * (1) has additional prop "errorText", which is a string to be displayed as 
   *    error text under the TextInput
   * (2) has additional prop "ref", which is a useRef() refering to the current 
   *     TextInput, that used in the OnSubmitEditing prop of the previous field. 
   *     This allows for when the user selects the next button on the keyboard 
   *     in the previous input field, the cursor will automatically move to the 
   *     current input field.
   *     (See RegisterScreen for example usage). 
  */
 
  <View style={styles.container}>
    <Input
      style={styles.input}
      ref={innerRef}
    //   selectionColor={theme.colors.primary}
      underlineColor="transparent"
      mode="outlined"
      {...props}
    />
    {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 12,
  },
  input: {
    backgroundColor: theme.colors.surface,
    // backgroundColor: 'transparent'
  },
  error: {
    fontSize: 14,
    color: theme.colors.error,
    paddingHorizontal: 4,
    paddingTop: 4,
  },
});

export default memo(TextInput);