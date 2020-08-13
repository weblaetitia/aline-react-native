import React from 'react';
import { ScrollView } from 'react-native';
import { AlinePopin } from '../components/aline-lib';



/* Color ref */
var blueDark = '#033C47';
var mint = '#2DB08C';


function TestScreen() {

    return (
      <ScrollView>

        <AlinePopin text='this is a popin!' />

      </ScrollView>
    )

}

// keep this line at the end
export default TestScreen  