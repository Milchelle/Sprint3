import React, { useState, useContext } from 'react';
import { Image, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { UserContext } from '../Context/UserContext';
import { useForm, Controller } from 'react-hook-form';
import firebase from 'firebase';

export default function LoginScreen({ navigation, logado }) {
  const [usuario, setUsuario] = useContext(UserContext);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const pressionaCadastrar = () => {
    navigation.navigate('registrar');
  };
  const pressionaEntrar = (values) => {
   const { email, senha } = values;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, senha)
      .then((userCredential) => {
        setUsuario({ nome: userCredential.user.displayName, logado: true });
      })
      .catch((error) => alert(error.message));
   
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flex: 0.1,
          backgroundColor: '#0E1F0B',
          justifyContent: 'center',
        }}>
        <Text style={{ color: '#C8F4C0', fontSize: 25, padding: 8 }}>
          LOGIN
        </Text>
      </View>
      <View
        style={{ flex: 0.9, justifyContent: 'center', alignItems: 'center' }}>
        <Controller
          control={control}
          name="email"
          rules={{
            required: { value: true, message: 'E-mail obrigatório' },
          }}
          render={({ field: { value, onChange } }) => (
            <TextInput
              style={{ backgroundColor: '#C8F4C0', height: 40, width: 300 }}
              autoCapitalize={false}
              keyboardType="email-address"
              placeholder="E-mail"
              value={value}
              onChangeText={(text) => onChange(text)}
            />
          )}
        />
        {errors?.email && (
          <Text style={{ color: 'red' }}>{errors?.email?.message}</Text>
        )}
        <Controller
          control={control}
          name="senha"
          rules={{
            required: { value: true, message: 'Senha obrigatória' },
          }}
          render={({ field: { value, onChange } }) => (
            <TextInput
              style={{
                backgroundColor: '#C8F4C0',
                height: 40,
                width: 300,
                marginTop: 5,
              }}
              autoCapitalize={false}
              secureTextEntry={true}
              placeholder="Senha"
              value={value}
              onChangeText={(text) => onChange(text)}
            />
          )}
        />
        {errors?.senha && (
          <Text style={{ color: 'red' }}>{errors?.senha?.message}</Text>
        )}
        <View style={{ width: 300, marginTop: 10, borderRadius: 10}}  >
        <Button color="#0E1F0B" title = "ENTRAR"  onPress={handleSubmit(pressionaEntrar)}/>
      </View>
      <View style={{ width: 300, marginTop: 5, borderRadius: 10}}>
        <Button  color="#0E1F0B" title = "CADASTRE-SE" onPress={pressionaCadastrar} />
      </View>
        
      </View>
    </View>
  );
}
