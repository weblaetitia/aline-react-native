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
    <Tab.Navigator>
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Fav" component={FavScreen} />
      <Tab.Screen name="MoreInfo" component={MoreInfoScreen} />
    </Tab.Navigator>
  )
}


function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="SignIn" component={SignInScreen} options={{headerShown: false}}/>
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Explore" component={MyTabs} 
                                      options={{ 
                                        headerTitle: props => <LogoTitle {...props}/>,
                                        headerLeft: props => <FeedAline {...props}/>,
                                        headerStyle: {
                                        backgroundColor: '#D5EFE8',
                                        },
                                        headerTintColor: '#033C47',
                                        }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}



// keep this at the end
export default App