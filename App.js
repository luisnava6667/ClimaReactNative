/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Keyboard,
  Alert,
} from 'react-native';
import Clima from './src/components/Clima';
import Formulario from './src/components/Formulario';
const App = () => {
  const [busqueda, guardarBusqueda] = useState({
    ciudad: '',
    pais: '',
  });
  const [consultar, guardarConsultar] = useState(false);
  const [resultado, guardarResultado] = useState({});
  const [bgcolor, guardarBgcolor] = useState('rgb(71,149,212)');
  const {ciudad, pais} = busqueda;
  useEffect(() => {
    const consultarClima = async () => {
      if (consultar) {
        const appId = '1484638a29d1d1e7fd8919289c1ab691';
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
        try {
          const respuesta = await fetch(url);
          const resultado = await respuesta.json();
          guardarResultado(resultado);
          guardarConsultar(false);
          //modifica los colores de fondo basado en la temperatura
          const kelvin = 273.15;
          const {main} = resultado;
          const actual = main.temp - kelvin;
          if (actual < 10) {
            guardarBgcolor('rgb(105,108,149)');
          } else if (actual >= 10 && actual < 25) {
            guardarBgcolor('rgb(71,149,212)');
          } else {
            guardarBgcolor('rgb(178,28,61)');
          }
          if (resultado.cod === '404') {
            mostrarAlerta();
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
    consultarClima();
  }, [consultar]);
  const mostrarAlerta = () => {
    Alert.alert('Error', 'No hay resultados, intenta con otra ciudad o pais', [
      {text: 'Ok'},
    ]);
  };
  const ocultarTeclado = () => {
    Keyboard.dismiss();
  };
  const bgColorApp = {
    backgroundColor: bgcolor,
  };
  return (
    <>
      <TouchableWithoutFeedback onPress={() => ocultarTeclado()}>
        <View style={[styles.app, bgColorApp]}>
          <View style={styles.contenido}>
            <Clima resultado={resultado} />
            <Formulario
              busqueda={busqueda}
              guardarBusqueda={guardarBusqueda}
              guardarConsultar={guardarConsultar}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

const styles = StyleSheet.create({
  app: {
    flex: 1,
    justifyContent: 'center',
  },
  contenido: {
    marginHorizontal: '2.5%',
  },
});

export default App;
