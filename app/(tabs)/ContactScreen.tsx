import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const ContactScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    // Xử lý gửi thông tin liên hệ ở đây
    alert("Thông tin đã được gửi!");
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.title}>Liên hệ với chúng tôi</Text>
      <Text style={styles.subtitle}>Chúng tôi rất muốn nghe ý kiến từ bạn!</Text>

      <TextInput
        style={styles.input}
        placeholder="Tên của bạn"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email của bạn"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.textarea}
        placeholder="Tin nhắn của bạn"
        value={message}
        onChangeText={setMessage}
        multiline
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Gửi</Text>
      </TouchableOpacity>

      <Text style={styles.contactInfoTitle}>Thông tin liên hệ</Text>
      <Text style={styles.contactInfo}>
        Địa chỉ: 60C Trương Văn Thành, Phường Hiệp Phú, Quận 9
      </Text>
      <Text style={styles.contactInfo}>
        Email: hamyduyen@gmail.com
      </Text>
      <Text style={styles.contactInfo}>
        Điện thoại: (+84) 335 235 807
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  textarea: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#3399FF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  contactInfoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  contactInfo: {
    marginBottom: 10,
  },
});

export default ContactScreen;
