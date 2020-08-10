import React from 'react';

import { StyleSheet, ScrollView } from 'react-native';
import { ListItem } from 'react-native-elements';

import { FontAwesome } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import { AppLoading } from 'expo';
import { useFonts, Capriola_400Regular } from '@expo-google-fonts/capriola';


/* Color ref */
var blueDark = '#033C47';
var mint = '#2DB08C';


function MoreInfoScreen() {

  let [fontsLoaded] = useFonts({Capriola_400Regular,}) 
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
            <ListItem
              rightIcon={
                  <FontAwesome
                    name='user'
                    size={20}
                    color= {mint}
                  />
              }
              titleStyle={{color:'#033C47'}}
              title='Mon compte'
              bottomDivider
            />
            <ListItem
              rightIcon={
                  <AntDesign
                    name='logout'
                    size={20}
                    color= {mint}
                  />
              }
              titleStyle={{color:'#033C47'}}
              title='Logout'
              bottomDivider
            />
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
            <ListItem
            rightIcon={
                <MaterialCommunityIcons
                  name='map-marker-plus'
                  size={20}
                  color= {mint}
                />
            }  
            titleStyle={{color:'#033C47'}}
            title='Nourir Aline'
            bottomDivider
            />

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


// keep this line at the end
export default MoreInfoScreen  