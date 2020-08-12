console.disableYellowBox = true;

import React from 'react';
import { Image, Button } from 'react-native'

// Navigation
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
import SignInScreen from './screens/signIn'
import SignUpScreen from './screens/signUp'
import ExploreScreen from './screens/explore'
import SearchScreen from './screens/search'
import FavScreen from './screens/fav'
import MoreInfoScreen from './screens/moreInfo'

// icons
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

// redux
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import token from './reducers/token'
const store = createStore(combineReducers({ token }));


// colors vars
var blueDark = '#033C47'
var mintLight = '#D5EFE8'



function LogoTitle() {
  return (
    <Image
      style={{ width: 75, height: 26 }}
      source={require('./assets/logo.png')}
    />
  )
}

function FeedAline() {
  return (
    <Image
      style={{ width: 34, height: 26 , marginLeft: 22}}
      source={require('./assets/icons/feedAline.png')}
    />
  )
}

function MyTabs() {
  return (
    <Tab.Navigator tabBarOptions={{
      activeTintColor: '#033C47',
      inactiveTintColor: 'rgba(3, 60, 71, 0.7)',
      activeBackgroundColor: mintLight,
      inactiveBackgroundColor: mintLight,
      safeAreaInset: { bottom: 'never', top: 'never' } ,
      style: {
        backgroundColor: mintLight
      }
    }}>
      <Tab.Screen name="Explorer" component={ExploreScreen}
                                options={{
                                  tabBarLabel: 'Explorer',
                                  tabBarIcon: ({ color, size }) => (
                                    <FontAwesome5 name="search-location" size={24} color={color} />
                                  ),
                                }} />
      <Tab.Screen name="Deposit" component={SearchScreen} 
                                options={{
                                  tabBarLabel: 'Scanner',
                                  tabBarIcon: ({ color, size }) => (
                                    <MaterialCommunityIcons name="barcode-scan" size={24} color={color} />
                                  ),
                                }} />
      <Tab.Screen name="Fav" component={FavScreen} 
                              options={{
                                tabBarLabel: 'Favoris',
                                tabBarIcon: ({ color, size }) => (
                                  <FontAwesome name="heart" size={24} color={color} />
                                ),
                              }} />
      <Tab.Screen name="MoreInfo" component={MoreInfoScreen} 
                              options={{
                                tabBarLabel: 'Infos',
                                tabBarIcon: ({ color, size }) => (
                                  <Entypo name="info-with-circle" size={24} color={color} />
                                ),
                              }} />
    </Tab.Navigator>
  )
}


function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="SignIn" component={SignInScreen} options={{headerShown: false}}/>
          <Stack.Screen name="SignUp" component={SignUpScreen} options={{headerShown: false}}/>
          <Stack.Screen name="Explore" component={MyTabs} 
                                        options={{ 
                                          headerTitle: props => <LogoTitle {...props}/>,
                                          headerLeft: props => <FeedAline {...props}/>,
                                          headerStyle: {
                                          backgroundColor: mintLight,
                                          },
                                          headerTintColor: blueDark,
                                          }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}



// keep this at the end
export default App