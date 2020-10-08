import React, { useEffect } from 'react';

import { AsyncStorage, StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements';

import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { AppLoading } from 'expo';
import { useFonts, Capriola_400Regular } from '@expo-google-fonts/capriola';
import token from '../reducers/token';
import { connect } from 'react-redux';

import * as Linking from 'expo-linking';

/* Color ref */
var blueDark = '#033C47';
var mint = '#2DB08C';

function MoreInfoScreen(props) {

  let [fontsLoaded] = useFonts({Capriola_400Regular,}) 
  
  /* Logout delete in  */
  async function logout() {
    console.log("hello")
    await AsyncStorage.removeItem('@token');
    console.log("bye")
    props.navigation.navigate('SignIn')
  }

  /* Redirect to signUn */
  function signin() {
    props.navigation.navigate('SignIn')
  }
  
  let lignes;
  if (props.token) {
    lignes = (  <View>
                <TouchableOpacity onPress={() => props.navigation.navigate('Account')}>
                  <ListItem rightIcon={
                      <FontAwesome
                        name='user'
                        size={20}
                        color= {mint}
                      />}
                  titleStyle={{color:'#033C47'}}            
                  title='Mon compte'
                  bottomDivider
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={logout}>
              <ListItem rightIcon={<AntDesign name='logout' size={20} color={mint} />}
                titleStyle={{color:'#033C47'}}            
                title='Se déconnecter'
                bottomDivider
              /></TouchableOpacity>
              </View>
                )
  } else {
    lignes = <TouchableOpacity onPress={signin} >
              <ListItem
                rightIcon={
                    <FontAwesome
                      name='sign-in'
                      size={20}
                      color= {mint}
                    />
                  }
                titleStyle={{color:'#033C47'}}            
                title="S'inscrire"
                bottomDivider
              />
              </TouchableOpacity>
  }

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <ScrollView>

            {/* ALINE ET MOI */}
            <ListItem
                  titleStyle={styles.h1}
                  title='Aline et moi'
                  bottomDivider
            />
            {/* mon compte || se connecter */}
            {lignes}

            <ListItem
              rightIcon={
                  <FontAwesome5
                    name='coins'
                    size={20}
                    color= {mint}
                  />
              }
              titleStyle={{color:'#033C47'}}            
              title='Soutenir Aline'
              bottomDivider
            />

            {/* nourrir Aline */}
            <TouchableOpacity onPress={() => Linking.openURL('https://aline-consigne.herokuapp.com')} >
            <ListItem
            rightIcon={
                <MaterialCommunityIcons
                  name='map-marker-plus'
                  size={20}
                  color= {mint}
                />
            }  
            titleStyle={{color:'#033C47'}}
            title='Nourrir Aline'
            bottomDivider
            />
            </TouchableOpacity>

            {/* RESTONS EN CONTACT */}
            <ListItem
              containerStyle={{paddingTop:30}}
              titleStyle={styles.h1}
              title='Restons en contact'
              bottomDivider
            />
            <ListItem
            rightIcon={
                <FontAwesome
                  name='facebook-f'
                  size={20}
                  color= {mint}
                />
            }  
            titleStyle={{color:'#033C47'}}
            title='Facebook'
            bottomDivider
            />

            {/* instagram */}
            <TouchableOpacity onPress={() => Linking.openURL('https://www.instagram.com/alineconsigne/')} >
            <ListItem
            rightIcon={
                <AntDesign
                  name='instagram'
                  size={20}
                  color= {mint}
                />
            } 
            
            titleStyle={{color:'#033C47'}} 
            title='Instagram'
            bottomDivider
            />
            </TouchableOpacity>

            {/* twitter */}
            <TouchableOpacity onPress={() => Linking.openURL('https://twitter.com/aline_consigne')} >
            <ListItem
            rightIcon={
                <AntDesign
                  name='twitter'
                  size={20}
                  color= {mint}
                />
            }
            titleStyle={{color:'#033C47'}}
            title='Twitter'
            bottomDivider
            />
            </TouchableOpacity>
            
            <ListItem
            rightIcon={
                <FontAwesome5
                  name='desktop'
                  size={20}
                  color= {mint}
                />
            } 
            titleStyle={{color:'#033C47'}} 
            title='Site internet'
            bottomDivider
            />
            <ListItem
            rightIcon={
                <FontAwesome
                  name='share-alt'
                  size={20}
                  color= {mint}
                />
            } 
            titleStyle={{color:'#033C47'}} 
            title='Partager cet application'
            bottomDivider
            />

            {/* INFORMATIONS */}
            <ListItem
              containerStyle={{paddingTop:30}}
              titleStyle={styles.h1}
              title='Informations'
              bottomDivider
            />
            <ListItem
              titleStyle={{color: blueDark}}
              title='Mentions légales'
              bottomDivider
            />
            <ListItem 
              titleStyle={{color: blueDark}}
              title='CGU'
              bottomDivider
            />

          </ScrollView>
      );

    }

  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    h1: {
      fontFamily: 'Capriola_400Regular',
      color: mint,
      fontSize: 18
    },
  });

  function mapStateToProps(state) {
    return{ token: state.token }
    }
    

// keep this line at the end
export default connect(mapStateToProps, null)(MoreInfoScreen);
