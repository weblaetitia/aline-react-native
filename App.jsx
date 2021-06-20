import { Entypo, FontAwesome, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { Image, View } from 'react-native'
import { Provider } from 'react-redux'
import { combineReducers, createStore } from 'redux'
import favs from './reducers/favorites'
import filter from './reducers/filter'
import token from './reducers/token'
import infos from './reducers/userInfos'
import AccountModalScreen from './screens/AccountModalScreen'
import ExploreScreen from './screens/Explore'
import FavScreen from './screens/Fav'
import FilterModalScreen from './screens/FilterModalScreen'
import MoreInfoScreen from './screens/MoreInfo'
import PlaceModalScreen from './screens/PlaceModalScreen'
import ProductModalScreen from './screens/ProductModalScreen'
import SearchScreen from './screens/Search'
import SearchedResultsScreen from './screens/SearchedResults'
import SignInScreen from './screens/SignIn'
import SignUpScreen from './screens/SignUp'
import logo from './assets/images/logo.png'

// import {LogBox} from "react-native";
// LogBox.ignoreAllLogs();
// LogBox.ignoreLogs(['Warning: ...']);

const store = createStore(combineReducers({ token, favs, infos, filter }))

// colors vars
const blueDark = '#033C47'
const mintLight = '#D5EFE8'

function LogoTitle() {
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Image style={{ width: 75, height: 26 }} source={logo} />
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

const Tab = createBottomTabNavigator()

const MainStack = createStackNavigator()
const RootStack = createStackNavigator()

function MyTabs() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#033C47',
        inactiveTintColor: 'rgba(3, 60, 71, 0.7)',
        activeBackgroundColor: mintLight,
        inactiveBackgroundColor: mintLight,
        safeAreaInset: { bottom: 'never', top: 'never' },
        style: {
          backgroundColor: mintLight,
        },
      }}
    >
      <Tab.Screen
        name="Explorer"
        component={ExploreScreen}
        options={{
          tabBarLabel: 'Explorer',
          tabBarIcon: ({ color }) => <FontAwesome5 name="search-location" size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="Deposit"
        component={SearchScreen}
        options={{
          tabBarLabel: 'Trouver',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="barcode-scan" size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="Fav"
        component={FavScreen}
        options={{
          tabBarLabel: 'Favoris',
          tabBarIcon: ({ color }) => <FontAwesome name="heart" size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="MoreInfo"
        component={MoreInfoScreen}
        options={{
          tabBarLabel: 'Infos',
          tabBarIcon: ({ color }) => <Entypo name="info-with-circle" size={24} color={color} />,
        }}
      />
    </Tab.Navigator>
  )
}

function MainStackScreen() {
  return (
    <MainStack.Navigator>
      <MainStack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }} />
      <MainStack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
      <MainStack.Screen
        name="Explore"
        component={MyTabs}
        options={{
          headerTitle: () => <LogoTitle />,
          // headerLeft: props => <FeedAline {...props}/>,
          headerLeft: null,
          headerStyle: {
            backgroundColor: mintLight,
          },
          headerTintColor: blueDark,
        }}
      />
    </MainStack.Navigator>
  )
}

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStack.Navigator mode="modal" headerMode="none">
          <RootStack.Screen name="Main" component={MainStackScreen} />
          <RootStack.Screen name="Place" component={PlaceModalScreen} />
          <RootStack.Screen name="Product" component={ProductModalScreen} />
          <RootStack.Screen name="Filter" component={FilterModalScreen} />
          <RootStack.Screen name="Account" component={AccountModalScreen} />
          <RootStack.Screen name="SearchedResults" component={SearchedResultsScreen} />
        </RootStack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

// keep this at the end
export default App
