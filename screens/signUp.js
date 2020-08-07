import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';

function signUpScreen(props) {
    return (
      <View style={styles.container}>
        <Text>Hi this is sign-up screen</Text>
        <Button
        title="Back to sign-in"
        onPress={() => props.navigation.navigate('SignIn')}
        />
        <Button
        title="Go to EXPLORE"
        onPress={() => props.navigation.navigate('Explore')}
        />
        <StatusBar style="auto" />
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });


// keep this line at the end
export default signUpScreen  