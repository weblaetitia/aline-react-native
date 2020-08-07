import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';

function signInScreen(props) {
    return (
      <View style={styles.container}>
          <Image
            style={{ width: 75, height: 26 }}
            source={require('../assets/logoaline.svg')}
            />
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