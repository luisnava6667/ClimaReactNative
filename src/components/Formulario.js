/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableWithoutFeedback,
  Animated,
  LogBox,
  Alert,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
const Formulario = ({busqueda, guardarBusqueda, guardarConsultar}) => {
  const {ciudad, pais} = busqueda;
  useEffect(() => {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
  }, []);
  const [animacionboton] = useState(new Animated.Value(1));
  const consultarClima = () => {
    if (ciudad.trim() === '' || pais.trim() === '') {
      mostrarAlerta();
      return;
    }
    //consultar la api
    guardarConsultar(true);
  };
  const mostrarAlerta = () => {
    Alert.alert('Error', 'Agrega una ciudad y país para la búsqueda', [
      {text: 'Entendido'},
    ]);
  };
  const animacionEntrada = () => {
    Animated.spring(animacionboton, {
      toValue: 0.9,
    }).start();
  };
  const animacionSalida = () => {
    Animated.spring(animacionboton, {
      toValue: 1,
      friction: 4,
      tension: 30,
    }).start();
  };
  const estiloAnimacion = {
    transform: [{scale: animacionboton}],
  };
  return (
    <>
      <View style={styles.formulario}>
        <View>
          <TextInput
            value={ciudad}
            onChangeText={ciudad => guardarBusqueda({...busqueda, ciudad})}
            placeholder="Ciudad"
            placeholderTextColor="#666"
            style={styles.input}
          />
        </View>
        <View>
          <Picker
            selectedValue={pais}
            onValueChange={pais => guardarBusqueda({...busqueda, pais})}
            itemStyle={{height: 120, backgroundColor: '#fff'}}>
            <Picker.Item label="-- Seleccione un país --" value="" />
            <Picker.Item label="Argentina" value="AR" />
            <Picker.Item label="Mexico" value="MX" />
            <Picker.Item label="Estado Unidos" value="US" />
            <Picker.Item label="Colombia" value="CO" />
            <Picker.Item label="Costa Rica" value="CR" />
            <Picker.Item label="España" value="ES" />
            <Picker.Item label="Perú" value="PE" />
          </Picker>
        </View>
        <TouchableWithoutFeedback
          onPressIn={() => animacionEntrada()}
          onPressOut={() => animacionSalida()}
          onPress={() => consultarClima()}>
          <Animated.View style={[styles.btnBuscar, estiloAnimacion]}>
            <Text style={styles.textoBuscar}>Buscar Clima</Text>
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  formulario: {},
  input: {
    padding: 10,
    height: 50,
    backgroundColor: '#fff',
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  btnBuscar: {
    marginTop: 50,
    backgroundColor: '#000',
    padding: 10,
    justifyContent: 'center',
  },
  textoBuscar: {
    color: '#fff',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center',
    fontSize: 18,
  },
});

export default Formulario;
