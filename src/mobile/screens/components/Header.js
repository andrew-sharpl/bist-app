import React, { memo } from 'react';
import { StyleSheet, Text } from 'react-native';
import { theme } from '../../core/theme';


const Header = ({ children }) => (
  /*
  * A component for a readable, reusable Header text component.
  */
  <Text style={styles.header}>{children}</Text>
);

const styles = StyleSheet.create({
  header: {
    fontSize: 26,
    color: theme.colors.primary,
    fontWeight: 'bold',
    paddingVertical: 14,
  },
});

export default memo(Header);