console.disableYellowBox = true;

import React from 'react';
import { Image, View } from 'react-native'

// Navigation
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SignInScreen from './screens/signIn';
import SignUpScreen from './screens/signUp';
import ExploreScreen from './screens/explore';
import SearchScreen from './screens/search';
import FavScreen from './screens/fav';
import MoreInfoScreen from './screens/moreInfo';
import ProductModalScreen from './screens/productModalScreen';
import PlaceModalScreen from './screens/placeModalScreen';
import AccountModalScreen from './screens/accountModalScreen';
import SearchedProductsScreen from './screens/searchedProducts';
import SearchedPlacesScreen from './screens/searchedPlaces';

// icons
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

// redux
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import token from './reducers/token';
import infos from './reducers/userInfos';
import filter from './reducers/filter';
import modal from './reducers/mapModal';
import favs from './reducers/favorites';
import userLocation from './reducers/userLocation';
import placesList from './reducers/placesList'
const store = createStore(combineReducers({ token, filter, modal, favs, infos, userLocation, placesList }));



// colors vars
var blueDark = '#033C47'
var mintLight = '#D5EFE8'



function LogoTitle() {
  return (
    <View  style={{ justifyContent: 'center', alignItems: 'center'}} >
    <Image
      style={{ width: 75, height: 26 }}
      source={require('./assets/logo.png')}
    />
    </View>
  )
}

// function FeedAline() {
//   // tip : à l'intérieur d'un header, il faut utiliser useNavigation au lieu de navigate() pour faire un lien
//   // const navigation = useNavigation()
//   return (
//     <Image
//     style={{ width: 34, height: 26 , marginLeft: 22}}
//     source={require('./assets/icons/feedAline.png')}
//   />
//   )
// }


/* #################### Creating a modal stack #################### */
/* use MainStackScreen component as a screen inside RootStackScreen */

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainStack = createStackNavigator();
const RootStack = createStackNavigator();

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
                                  tabBarLabel: 'Trouver',
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

function MainStackScreen() {
  return (
    <MainStack.Navigator>
      <MainStack.Screen name="SignIn" component={SignInScreen} options={{headerShown: false}} />
      <MainStack.Screen name="SignUp" component={SignUpScreen} options={{headerShown: false}} />
      <MainStack.Screen name="Explore" component={MyTabs} 
                                        options={{ 
                                          headerTitle: props => <LogoTitle {...props}/>,
                                          // headerLeft: props => <FeedAline {...props}/>,
                                          headerLeft: null,
                                          headerStyle: {
                                          backgroundColor: mintLight,
                                          },
                                          headerTintColor: blueDark,
                                          }} />
    </MainStack.Navigator>
  );
}


function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
      <RootStack.Navigator mode="modal" headerMode="none"> 
        <RootStack.Screen name="Main" component={MainStackScreen} />
        <RootStack.Screen name="Place" component={PlaceModalScreen} />
        <RootStack.Screen name="Product" component={ProductModalScreen} />
        <RootStack.Screen name="Account" component={AccountModalScreen} />
        <RootStack.Screen name='SearchedProducts' component={SearchedProductsScreen} />
        <RootStack.Screen name='SearchedPlaces' component={SearchedPlacesScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
    </Provider>
  )
}



// keep this at the end
export default App