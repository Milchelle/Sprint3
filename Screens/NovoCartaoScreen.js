import React, { useState, useContext } from 'react';
import {
  Image,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View, 
  TouchableOpacity
} from 'react-native';
import Ionicons from  'react-native-vector-icons/Ionicons';
import {UserContext} from '../Context/UserContext';
import firebase from 'firebase';

export default function NovoCartaoScreen({ navigation, logado }) {

  const [numero, setNumero] = useState('');
  const [nome, setNome] = useState('');
  const [codigo, setCodigo] = useState('');
  const [validade, setValidade] = useState('');

  const pressionaSalvar = () => {
    firebase.firestore().collection('cartoes').add({
      numero: numero,
      nome: nome,
      codigo: codigo,
      validade: validade
    });
    navigation.navigate('cartaocadastrado');
  };

   return(
    <View style={{flex: 1}}>
     <View style={{ flex: 0.05, backgroundColor: '#0E1F0B', flexDirection: 'row', padding: 8}}>
       <TouchableOpacity onPress={() => navigation.navigate('cartaocadastrado')}>
          <Ionicons
          name="arrow-back"
          size={30}
          color="#C8F4C0"
          />
        </TouchableOpacity>
        <Text style={{fontSize: 22, color: '#C8F4C0'}}> NOVO CARTÃO </Text>
      </View>
    <View style={{flex: 0.9, justifyContent: "center", alignItems: "center"}}>
      <TextInput
        style={{backgroundColor:"#C8F4C0", height: 40, width: 300}}
        autoCapitalize = { true }
        placeholder = "Numero do Cartão"
        value = {numero}
        onChangeText = {(text) => setNumero(text)}
      />
      <TextInput
        style={{backgroundColor:"#C8F4C0", height: 40, width: 300, marginTop: 5}}
        autoCapitalize = { false }
        keyboardType = "name"
        placeholder = "Nome"
        value = {nome}
        onChangeText = {(text) => setNome(text)}
      /> 
      <TextInput
        style={{backgroundColor:"#C8F4C0", height: 40, width: 300, marginTop: 5}}
        autoCapitalize = { false }
        placeholder = "Codigo"
        value = {codigo}
        onChangeText = {(text) => setCodigo(text)}
      /> 
        <TextInput
        style={{backgroundColor:"#C8F4C0", height: 40, width: 300, marginTop: 5}}
        autoCapitalize = { false }
        placeholder = "Data de Validade"
        value = {validade}
        onChangeText = {(text) => setValidade(text)}
      /> 
      <View style={{ width: 300, marginTop: 10, borderRadius: 10}}  >
        <Button color="#0E1F0B" title = "SALVAR" onPress={pressionaSalvar}  />
      </View>
      <View style={{ width: 300, marginTop: 5, borderRadius: 10}}>
        <Button  color="#0E1F0B"title = "CANCELAR"onPress={() => navigation.goBack()}/>
      </View>
      </View>
    </View>
  );

}
