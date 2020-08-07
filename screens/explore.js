import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';

function ExploreScreen() {
    return (
      <View style={styles.container}>
        <Image
            style={{ width: 75, height: 26 }}
            source={require('../assets/logo.png')}
            />
        <Text>Hi this is HOME!</Text>
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
export default ExploreScreen  