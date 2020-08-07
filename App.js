import React from 'react';

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


function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Explore" component={MyTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Fav" component={FavScreen} />
      <Tab.Screen name="MoreInfo" component={MoreInfoScreen} />
    </Tab.Navigator>
  )
}


// keep this at the end
export default App