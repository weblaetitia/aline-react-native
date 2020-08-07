import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';

function signInScreen(props) {
    return (
      <View style={styles.container}>
        <Text>Hi this is sign-in screen</Text>
        <Button
        title="Go to sign-up"
        onPress={() => props.navigation.navigate('SignUp')}
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
export default signInScreen  