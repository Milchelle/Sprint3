import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, View, Text, TextInput } from 'react-native';
import firebase from 'firebase';


export default function CartaoScreen({ navigation, route }) {
  const { id } = route.params;
 const [numero, setNumero] = useState('');
  const [nome, setNome] = useState('');
  const [codigo, setCodigo] = useState('');
  const [validade, setValidade] = useState('');
  
   useEffect(async () => {
    const docRef = firebase.firestore().collection('cartoes').doc(id);
    const doc = await docRef.get();
    const { numero, nome, codigo, validade } = doc.data();
    setNumero(numero);
    setNome(nome);
    setCodigo(codigo);
    setValidade(validade);
  }, []);

  const pressionaApagar = () => {
    const docRef = firebase.firestore().collection('cartoes').doc(id);
    docRef.delete();
    navigation.navigate('cartaocadastrado');
  };

  const pressionaSalvar = () => {
    const docRef = firebase.firestore().collection('cartoes').doc(id);
    docRef.set({
      numero: numero,
      nome: nome,
      codigo: codigo,
      validade: validade
    });
    navigation.navigate('cartaocadastrado');
  };

 

  return(
    <View style={styles.conteudo}>
      <TextInput
        style={styles.campo}
        autoCapitalize={true}
        placeholder="Numero"
        value={numero}
        onChangeText={(text) => setNumero(text)}
      />
      <TextInput
        style={styles.campo}
        autoCapitalize={false}
        keyboardType="name"
        placeholder="Nome"
        value={nome}
        onChangeText={(text) => setNome(text)}
      />
      <TextInput
        style={styles.campo}
        autoCapitalize={false}
        placeholder="Codigo"
        value={codigo}
        onChangeText={(text) => setCodigo(text)}
      />
      <TextInput
        style={styles.campo}
        autoCapitalize={false}
        placeholder="Validade"
        value={validade}
        onChangeText={(text) => setValidade(text)}
      />
       <View style={{ width: 300, marginTop: 10, borderRadius: 10}}  >
        <Button color='#0E1F0b' title = "SALVAR" onPress={pressionaSalvar}  />
      </View>
      <View style={{ width: 300, marginTop: 5, borderRadius: 10}}>
        <Button  color='#0E1F0b' title = "APAGAR"onPress={pressionaApagar}  />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  conteudo: {
    flex: 1,
    justifyContent: 'center',
    padding: 8,
  },
  campo: {
    marginBottom: 16,
    padding: 10,
    borderBottomColor: '#bbb',
    borderBottomWidth: 1,
  },
});
