// Register.js
import React, { useState } from 'react';
import {
  StyleSheet, Text, View, TextInput, TouchableOpacity,
  ImageBackground
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';//dòng này

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const navigation = useNavigation(); // Khai báo useNavigation, dòng này nữa

  const HandleRegisterCheck = async () => {
    if (password !== repassword) {
      alert("Mật khẩu xác nhận không khớp");
      return;
    }
  
    const newUser = {
      username: username,
      password: password,
    };
    
    const existingAccount = await AsyncStorage.getItem("user");
    if (existingAccount) {
      const parsedAccount = JSON.parse(existingAccount);
      var flag = parsedAccount.find((account) => account.username == username);
      if (flag) {
        alert("Tài khoản đã tồn tại");
        return;
      }
      parsedAccount.push(newUser);
      AsyncStorage.setItem("user", JSON.stringify(parsedAccount)).then(() => {
        alert("Đăng kí thành công");
        navigation.navigate("Login");
      });
    } else {
      AsyncStorage.setItem("user", JSON.stringify([newUser])).then(() => {
        alert("Đăng kí thành công");
        navigation.navigate("Login");
      });
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.background}>
        <Text style={styles.title}>ĐĂNG KÍ</Text>
        <View style={{ marginTop: 40 }}>
          <View style={styles.iconinput}>
            <Icon name="user" size={30} color="gray" />
            <TextInput
              style={styles.input}
              placeholder="Nhập email hoặc số điện thoại"
              onChangeText={(e) => setUsername(e)}
            />
          </View>

          <View style={styles.iconinput}>
            <Icon name="lock" size={30} color="gray" />
            <TextInput
              style={styles.input}
              placeholder="Nhập mật khẩu"
              onChangeText={(e) => setPassword(e)}
              secureTextEntry={true}
            />
          </View>

          <View style={styles.iconinput}>
            <Icon name="lock" size={30} color="gray" />
            <TextInput
              style={styles.input}
              placeholder="Xác nhận mật khẩu"
              onChangeText={(e) => setRePassword(e)}
              secureTextEntry={true}
            />
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={HandleRegisterCheck}>
          <Text style={styles.buttonText}>Đăng kí</Text>
        </TouchableOpacity>
        <View style={styles.rowContainer}>
          <Text>Bạn đã có tài khoản? </Text>
          
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={{ color: 'red' }}> Đăng nhập</Text>
          </TouchableOpacity>
        </View>
        <StatusBar style="auto" />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  iconinput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: 'black',
    borderBottomWidth: 0.3,
    marginBottom: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#3399FF',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    width: 300,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#3399FF',
    padding: 10,
    marginTop: 30,
    borderRadius: 20,
  },
  buttonText: {
    width: 300,
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    width: 420,
  },
});

export default Register;
