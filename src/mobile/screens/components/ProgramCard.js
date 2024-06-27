import * as React from 'react';
import { Button, Card, Text } from 'react-native-paper';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useState } from "react";
import { useServices } from '../../api/services';
import { useNavigation } from '@react-navigation/native';


function ProgramCard({program, userData}){
  /**
   * Programs are currently not supported in the backend. 
   * A program is a recurring event or a series of events.
   *  This component displays the information for a program (i.e. a series of events)
   *  Props:
   *      program: Program
   *          - has the following properties: 
   *              id, title, subheading, description
   */
  const { getApi, getGlobalStorage } = useServices();
  const navigation = useNavigation();


  
  return (
    <Card style={{ marginVertical: 4}}>
    {/* <Card.Title title={program.title} subtitle={program.subheading} /> */}
    <Card.Content>
      <Text variant="titleLarge">{program.title}</Text>
      <Text variant='subheading'>{program.subheading}</Text>
      <Text variant="bodyMedium">{program.description}</Text>
    </Card.Content>
    <Card.Actions>
      <Button mode="contained" onPress={() => {
        navigation.navigate("Program Details", {programId: program.id});
        }}>View Details</Button>
    </Card.Actions>
  </Card>)
}
  

export default ProgramCard;