// Login.js
import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, TextInput, TouchableOpacity,
  KeyboardAvoidingView, ImageBackground,
  Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const checkLoginStatus = async () => {
      const loggedInUser = await AsyncStorage.getItem("loggedInUser");
      if (loggedInUser) {
        setIsLoggedIn(true);
      }
    };
    checkLoginStatus();
  }, []);

  const handleLogin = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/users');
      const users = await response.json();
  
      const user = users.find(
        (account) => account.email === username && account.password === password // Sử dụng email thay vì username
      );
  
      if (user) {
        alert("Đăng nhập thành công");
        await AsyncStorage.setItem("loggedInUser", JSON.stringify(user));
        setIsLoggedIn(true);
        navigation.navigate('Home');
      } else {
        alert("Email hoặc mật khẩu không chính xác");
      }
    } catch (error) {
      console.error('Lỗi khi gọi API:', error);
      alert("Có lỗi xảy ra. Vui lòng thử lại sau.");
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("loggedInUser");
    setIsLoggedIn(false);
  };

  if (isLoggedIn) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Chào mừng bạn đã đăng nhập!</Text>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Đăng xuất</Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View>
        <ImageBackground style={styles.background}>
          <Text style={styles.title}>ĐĂNG NHẬP</Text>
          <View style={{ marginTop: 40 }}>
            <View style={styles.iconinput}>
              <Icon name="user" size={30} color="gray" />
              <TextInput
                style={styles.input}
                placeholder="Nhập tên đăng nhập hoặc email"
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
            <Text style={{ alignSelf: 'flex-end' }}>Quên mật khẩu?</Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Đăng nhập</Text>
          </TouchableOpacity>
          <View style={styles.rowContainer}>
            <Text>Bạn chưa có tài khoản? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={{ color: 'red' }}> Đăng kí</Text>
            </TouchableOpacity>
          </View>
          <StatusBar style="auto" />
        </ImageBackground>
      </View>
    </KeyboardAvoidingView>
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

export default Login;
