import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons"; // Import biểu tượng từ thư viện

// Define the type for account info
interface AccountInfo {
  name: string;
  email: string;
  avatar: string;
}

const AccountScreen = () => {
  const navigation = useNavigation();
  const [accountInfo, setAccountInfo] = useState<AccountInfo | null>(null); // Thay đổi thành AccountInfo hoặc null
  const [isLoading, setIsLoading] = useState(true);

  // Fetch user data from API
  useEffect(() => {
    const fetchUserData = async () => {
      const userId = 6; // Thay thế bằng ID người dùng thực tế
      try {
        const response = await fetch(
          `https://fakestoreapi.com/users/${userId}`
        );
        const userData = await response.json();

        // Kiểm tra phản hồi từ API
        console.log("Dữ liệu người dùng:", userData);

        // Cập nhật thông tin tài khoản với dữ liệu từ API
        setAccountInfo({
          name: `${userData.name.firstname} ${userData.name.lastname}`,
          email: userData.email,
          avatar:
            userData.avatar ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8C1AnfxSXksAVJBxbD1rjG_1SpHF6YrkH-Q&s",
        });
      } catch (error) {
        console.error("Lỗi khi tải thông tin tài khoản:", error);
        Alert.alert("Lỗi", "Không thể tải thông tin tài khoản.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleEditProfile = () => {
    navigation.navigate("EditProfileScreen");
  };

  const handleLogout = () => {
    Alert.alert("Thông báo", "Bạn đã đăng xuất thành công!", [
      {
        text: "OK",
        onPress: () => {
          navigation.navigate("Login"); // Điều hướng đến màn hình Đăng nhập
        },
      },
    ]);
  };

  const handleSupport = () => {
    Alert.alert("Hỗ trợ", "Bạn có thể liên hệ với chúng tôi qua email: support@example.com");
    navigation.navigate("SupportScreen");
  };

  const handleShippingAddress = () => {
    navigation.navigate("ShippingAddressScreen");
  };

  const handleAccountSettings = () => {
    navigation.navigate("SettingsScreen"); // Điều hướng đến màn hình Cài đặt
  };

  const handleGoBack = () => {
    navigation.navigate("Home"); // Điều hướng về màn hình Trang chính
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4caf50" />
        <Text>Đang tải dữ liệu...</Text>
      </View>
    );
  }

  // Xử lý trường hợp accountInfo là null
  if (!accountInfo) {
    return (
      <View style={styles.container}>
        <Text>Lỗi khi tải thông tin tài khoản.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Icon name="arrow-back" size={24} color="#4caf50" />
          <Text style={styles.backButtonText}>Quay lại</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.card}>
          <Image source={{ uri: accountInfo.avatar }} style={styles.avatar} />
          <Text style={styles.name}>{accountInfo.name}</Text>
          <Text style={styles.email}>{accountInfo.email}</Text>
        </View>
        <Text style={styles.sectionTitle}>Quản lý tài khoản</Text>

        <TouchableOpacity style={styles.button} onPress={handleEditProfile}>
          <Text style={styles.buttonText}>Chỉnh sửa hồ sơ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleShippingAddress}>
          <Text style={styles.buttonText}>Địa chỉ giao hàng</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSupport}>
          <Text style={styles.buttonText}>Hỗ trợ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleAccountSettings}>
          <Text style={styles.buttonText}>Cài đặt</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
  },
  header: {
    padding: 20,
    backgroundColor: "#fff",
    elevation: 4,
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    color: "#4caf50",
    fontSize: 16,
    fontWeight: "bold",
  },
  scrollContainer: {
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "100%",
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  email: {
    fontSize: 16,
    color: "#777",
    marginBottom: 20,
  },
  button: {
    width: "100%",
    backgroundColor: "#4caf50",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    color: "#333",
  },
});

export default AccountScreen;
