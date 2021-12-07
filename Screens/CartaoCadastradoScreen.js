import React, { useContext, useState, useEffect } from 'react';
import {
  Image,
  Button,
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Pressable,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { UserContext } from '../Context/UserContext';
import firebase from 'firebase';

export default function CartaoCadastradoScreen({ navigation, logado }) {
  const [dados, setDados] = useState([]);
  const [usuario, setUsuario] = useContext(UserContext);

   const pressionarItem = (id) => {
    navigation.navigate('cartao', {id: id});
  }

useEffect(() => {
    const cartoes = [];
    firebase
      .firestore()
      .collection('cartoes')
      .onSnapshot((snapshot) => {
        snapshot.docs.forEach((doc) => {
          const { numero, nome, codigo, validade } = doc.data();
          cartoes.push({
            id: doc.id,
            numero: numero,
            nome: nome,
            codigo: codigo,
            validade: validade
          });
        });
        setDados([...cartoes]);
      });
  }, []);

  const Item = ({ item }) => {
    return (
      <Pressable onPress={() => {pressionarItem(item.id)}}>
        <View style={{ borderBottomWidth: 1, paddingVertical: 8 }}>
          <Text>{item.nome}</Text>
        </View>
      </Pressable>
    );
  };
  

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flex: 0.05,
          backgroundColor: '#0E1F0B',
          flexDirection: 'row',
          padding: 8,
        }}>
        <TouchableOpacity onPress={() => navigation.navigate('perfil')}>
          <Ionicons name="arrow-back" size={30} color="#C8F4C0" />
        </TouchableOpacity>
        <Text style={{ fontSize: 22, color: '#C8F4C0' }}>
          {' '}
          CARTÕES CADASTRADOS
        </Text>
      </View>
      <View style={{ flex: 0.9, justifyContent: 'center' }}>
        <FlatList
          data={dados}
          renderItem={Item}
          keyExtractor={(item) => item.id}
        />
        <View
          style={{
            alignItems: 'center',
          }}>
          <Button
            color= '#0E1F0B'
            title="NOVO"
            onPress={() => navigation.navigate('novocartao')}
          />
        </View>
      </View>
    </View>
  );
}
