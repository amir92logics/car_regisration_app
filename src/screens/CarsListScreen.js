import React from 'react';
import { FlatList, StyleSheet } from 'react-native';

import { HeaderIconButton } from '../components/HeaderIconButton';
import { AuthContext } from '../contexts/AuthContext';
import { Car } from '../components/car';
import { HeaderIconsContainer } from '../components/HeaderIconsContainer';
import { ModalComp } from '../components/Modal';
import dummyData from '../../DummyData.json';

export function CarsListScreen({ navigation }) {
  const { logout } = React.useContext(AuthContext);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [carsList, setCarsList] = React.useState([])
  const [currentCarData, setCurrentCarData] = React.useState('')
  React.useEffect(() => {
    setCarsList([...dummyData.cars]);
  }, [])

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderIconsContainer>
          <HeaderIconButton
            size={20}
            name={'pluscircle'}
            onPress={handleModal}
          />
          <HeaderIconButton
            size={20}
            name={'logout'}
            onPress={() => {
              logout();
            }}
          />
        </HeaderIconsContainer>
      ),
    });
  }, [navigation, logout]);

  function renderCar({ item: product }) {
    return <Car car={product}  onPress={onUpdate}/>;
  }
  const handleModal = () => {
    setModalVisible(!modalVisible)
  }
  const AddCar = ({ url, modelNum, regNum, carColor, carBrand }) => {
    const _temp = [...carsList]
    _temp.unshift({
      "id":`00${_temp.length +1}`,
      url,
      "model": modelNum,
      "color": carColor,
      "name": carBrand,
      "registration-no": regNum
    })
    setCarsList(_temp);
    return _temp;
  }
  const UpdateCar = ({id, url, modelNum, regNum, carColor, carBrand }) => {
    const _temp = [...carsList]
    objIndex = _temp.findIndex((obj => obj.id == id));

//Update object's name property.
_temp[objIndex] = {
      id,
      url,
      "model": modelNum,
      "color": carColor,
      "name": carBrand,
      "registration-no": regNum
    }
    setCarsList([..._temp]);
    return _temp;
  }
  const onUpdate = ({id}) => {
    handleModal();
    const _temp = carsList.find(item => {
      if(item.id == id){
        return true;
      }
      return false;
    })

setCurrentCarData(_temp)
  }
  return (
    <>
      <FlatList
        contentContainerStyle={styles.carsListContainer}
        data={carsList}
        renderItem={renderCar}
        keyExtractor={car => `${car.id}`}
      />
      <ModalComp
       carData={currentCarData} 
       setCurrentCarData={setCurrentCarData} 
       UpdateCar={UpdateCar} 
       carsList={carsList} 
       AddCar={AddCar}  
       modalVisible={modalVisible} 
       handleModal={handleModal} 
       />
    </>
  );
}

const styles = StyleSheet.create({
  carsListContainer: {
    paddingVertical: 8,
    marginHorizontal: 8,
  },
});
