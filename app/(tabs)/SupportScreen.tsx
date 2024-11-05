import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const SupportScreen = () => {
  const navigation = useNavigation(); // Khai báo navigation
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    alert("Thông tin đã được gửi!");
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="auto" />

      {/* Nút Quay lại */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>Quay lại</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Hỗ trợ</Text>
      <Text style={styles.subtitle}>Liên hệ với chúng tôi</Text>

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

      <Text style={styles.faqTitle}>Câu hỏi thường gặp</Text>
      <Text style={styles.faq}>
        1. Làm thế nào để tôi thay đổi mật khẩu?
        {"\n"}Trả lời: Bạn có thể thay đổi mật khẩu trong phần "Cài đặt" của ứng dụng.
      </Text>
      <Text style={styles.faq}>
        2. Tôi cần hỗ trợ kỹ thuật, tôi phải làm gì?
        {"\n"}Trả lời: Vui lòng gửi yêu cầu hỗ trợ qua biểu mẫu trên.
      </Text>
      <Text style={styles.faq}>
        3. Tôi có thể kiểm tra lịch sử đặt hàng ở đâu?
        {"\n"}Trả lời: Bạn có thể kiểm tra lịch sử đặt hàng trong phần "Tài khoản".
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
  backButton: {
    marginBottom: 10,
  },
  backButtonText: {
    color: '#3399FF',
    fontSize: 16,
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
  faqTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  faq: {
    marginBottom: 10,
  },
});

export default SupportScreen;
