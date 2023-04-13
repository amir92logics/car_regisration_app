import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View, TouchableOpacity, Image, ScrollView} from 'react-native';
import { Heading } from './Heading';
import { Error } from './Error';
import { Input } from './Input';
import { FilledButton } from './FilledButton';
import { TextButton } from './TextButton';
import { Loading } from './Loading';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import { HeaderIconButton } from './HeaderIconButton';
import {Picker} from '@react-native-picker/picker';
import { sleep } from '../utils/sleep';
import { Card } from './Card';

export function ModalComp({modalVisible, handleModal, carData, AddCar, UpdateCar, setCurrentCarData}){
    const [carBrand, setCarBrand] = React.useState('');
    const [modelNum, setModelNum] = React.useState('');
    const [regNum, setRegNum] = React.useState('');
    const [carColor, setCarColor] = React.useState('Blue');
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState('');
    const [url, seturl] = useState('');
  const [picselect, setpicselect] = useState(false);

  React.useEffect(() => {
    if(carData){
    seturl(carData.url)
    setCarBrand(carData.name)
    setModelNum(carData.model)
    setRegNum(carData['registration-no'])
    }
  }, [carData])

// You can also use as a promise without 'callback':
const selectpic = () => {
    seturl('');
    const options = {
      mediaType: 'photo',
      includeBase64: true,
      quality: 1.0,
      maxWidth: 200,
      maxHeight: 200,
      cameraType: 'front',
      storageOptions: {
        skipBackup: true,
      },
    };
    //launchImageLibrary
    launchImageLibrary(options, response => {
      //console.log('Response = ', response);
      if (response.didCancel) {
        //console.log('User cancelled photo picker');
        setgrant(true);
      } else if (response.error) {
        //console.log('ImagePicker Error: ', response.error);
        setgrant(true);
      } else if (response.customButton) {
        //console.log('User tapped custom button: ', response.customButton);
        setgrant(true);
      } else {
        setpicselect(true);
        // let source = {uri: response.uri};
        // seturl(response.data);
        // // You can also display the image using data:
        // let source = {
        //   uri: 'data:image/jpeg;base64,' + response.assets[0].base64,
        // };
        let baseImage = response.assets[0].base64;
        //console.log(baseImage);
        seturl(baseImage);

        // console.log('response.uri = ', baseImage);
        // markAttd(baseImage);
        // this.setState({
        //   avatarSource: source,
        // });
        // console.log(source);
      }
    });
  };
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleModal}>
          
        <View style={styles.centeredView}>
          
          <View style={styles.modalView}>
            <View style={{ alignSelf: 'flex-end'}}>
          <HeaderIconButton
            size={20}
            name={'closecircle'}
            onPress={handleModal}
          />
          </View>
          <Heading style={styles.title}>{carData ? "Update" : "Register"} Car</Heading>
      <Error error={error} />
      <ScrollView>
      {picselect || url ? (
                <Image
                onPress={selectpic}
                  style={{
                    height: 160,
                    width: 160,
                    alignSelf: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 10
                  }}
                  source={{uri: `${url.includes('https://') ? '' : 'data:image/png;base64,'}` + url}}
                />
              ) : null}
          <FilledButton title={`${carData ? "Update" : "Add"} Image`} onPress={selectpic} style={styles.loginButton}  />  
      <Input
        style={styles.input}
        placeholder={'Brand Name'}
        // keyboardType={'text'}
        value={carBrand}
        onChangeText={setCarBrand}
      />
      <Input
        style={styles.input}
        placeholder={'Model Nmber'}
        keyboardType={'numeric'}
        value={modelNum}
        onChangeText={setModelNum}
      />
        <Input
        style={styles.input}
        placeholder={'Registration Nmber'}
        // keyboardType={'text'}
        value={regNum}
        onChangeText={(e) => {
          // carsList.some(item => {
          //   if (item['registration-no'] === e) {
          //     setError('This number is already registered.');
          //     return true;
          //   }
          //   setError('');
          setRegNum(e)
            // return false;
            
          // })
        }}
      />
      <Picker
      style={styles.pickerStyle}
  selectedValue={carColor}
  onValueChange={(itemValue, itemIndex) =>
    setCarColor(itemValue)
  }>
  <Picker.Item label="Blue" value="Blue" />
  <Picker.Item label="Yellow" value="Yellow" />
  <Picker.Item label="White" value="White" />
  <Picker.Item label="Black" value="Black" />
</Picker>
      <FilledButton
        title={`${carData ? "Update" : "Register"} Car`}
        style={styles.loginButton}
        onPress={async () => {
          if(carData){
            if(url && modelNum && regNum && carColor && carBrand){
              setLoading(true);
              await sleep(2000);
              const res =  UpdateCar({id: carData.id, url, modelNum, regNum, carColor, carBrand});
              if(res){
                setLoading(false);
                 handleModal();
                 seturl('')
                 setCarBrand('')
                 setModelNum('')
                 setRegNum('')
                 setCurrentCarData('')
                 setError('')

              } 
            } else {
              setError('Please fill all the fields properly.');
              setLoading(false);
            }
          }else{
            if( url && modelNum && regNum && carColor && carBrand){
              setLoading(true);
              await sleep(2000);
              // console.log(url, modelNum, regNum, carColor, carBrand, 'dfsdsdf')
              const res = AddCar({url, modelNum, regNum, carColor, carBrand});
              if(res){
                setLoading(false);
                 handleModal();
                 seturl('')
                 setCarBrand('')
                 setModelNum('')
                 setRegNum(carData['registration-no'])
                 setCurrentCarData('')
                 setError('')
              } 
            } else {
              setError('Please fill all the fields properly.');
              setLoading(false);
            }
            }
         
        }}
      />
      </ScrollView>
      {/* <TextButton
        title={'Have u an account? Create one'}
        onPress={() => {
          navigation.navigate('Registration');
        }}
      /> */}
      <Loading loading={loading} />
            {/* <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={handleModal}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable> */}
          </View>
          
        </View>
        
      </Modal>
      {/* <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable> */}
    </View>
  );
};

const styles = StyleSheet.create({
  pickerStyle:{  
    width: '100%',
    padding: 10
}  ,
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    marginTop: 100,
    maxHeight: "80%",
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    marginVertical: 8,
    width: '100%'
  },
  loginButton: {
    marginVertical: 32,
  },
});
