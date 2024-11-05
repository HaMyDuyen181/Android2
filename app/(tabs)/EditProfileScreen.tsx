import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const EditProfileScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Lấy thông tin người dùng từ API khi vào màn hình
  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    const userId = 1; // ID người dùng
    try {
      const response = await fetch(`https://fakestoreapi.com/users/${userId}`);
      if (response.ok) {
        const userData = await response.json();
        setName(`${userData.name.firstname} ${userData.name.lastname}`);
        setEmail(userData.email);
      } else {
        Alert.alert("Lỗi", "Không thể tải thông tin người dùng.");
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu người dùng:", error);
      Alert.alert("Lỗi", "Không thể tải thông tin người dùng.");
    }
  };

  const handleSave = async () => {
    if (!name || !email) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    
    setIsLoading(true);
    const userId = 1; // ID người dùng
  
    try {
      const response = await fetch(`https://fakestoreapi.com/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          username: "johnd",
          password: "m38rmF$",
          name: {
            firstname: name.split(" ")[0],
            lastname: name.split(" ")[1] || "",
          },
          address: {
            geolocation: {
              lat: "-37.3159",
              long: "81.1496",
            },
            city: "kilcoole",
            street: "new road",
            number: 7682,
            zipcode: "12926-3874",
          },
          phone: "1-570-236-7033",
        }),
      });

      if (response.ok) {
        Alert.alert("Thông báo", "Thông tin đã được cập nhật thành công!");
        fetchUserProfile(); // Cập nhật lại thông tin hiển thị sau khi lưu thành công
        navigation.goBack(); // Quay lại trang trước
      } else {
        throw new Error("Cập nhật thông tin thất bại");
      }
    } catch (error) {
      console.error("Lỗi:", error);
      Alert.alert("Lỗi", "Đã có lỗi xảy ra, vui lòng thử lại sau!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoBack = () => {
    navigation.navigate("AccountScreen"); // Điều hướng đến AccountScreen
  };

  return (
    <View style={styles.container}>
      <View style={styles.backButtonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Text style={styles.backButtonText}>Quay lại</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Chỉnh sửa thông tin</Text>

      <TextInput
        style={styles.input}
        placeholder="Tên"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      {isLoading ? (
        <ActivityIndicator size="large" color="#4caf50" />
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Lưu thay đổi</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f7f7f7",
  },
  backButtonContainer: {
    marginBottom: 20,
  },
  backButton: {
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    alignItems: "center",
  },
  backButtonText: {
    color: "#4caf50",
    fontSize: 16,
    fontWeight: "bold",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#4caf50",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default EditProfileScreen;
