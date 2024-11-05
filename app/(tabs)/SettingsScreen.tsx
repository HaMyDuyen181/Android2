import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Switch,
  StyleSheet,
} from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const SettingPage = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const navigation = useNavigation();

  const handleNotificationsToggle = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  const handleDarkModeToggle = () => {
    setDarkModeEnabled(!darkModeEnabled);
  };

  const handleLoginPress = () => {
    navigation.navigate("Login");
  };

  const handleGoBack = () => {
    navigation.navigate("AccountScreen"); // Điều hướng đến AccountScreen
  };

  const handleNavigateToLanguage = () => {
    // Điều hướng đến màn hình ngôn ngữ và khu vực
    navigation.navigate("LanguageSettings");
  };

  const handleNavigateToAccount = () => {
    // Điều hướng đến màn hình tài khoản
    navigation.navigate("AccountSettings");
  };

  const handleNavigateToSecurity = () => {
    // Điều hướng đến màn hình bảo mật
    navigation.navigate("SecuritySettings");
  };


  const handleNavigateToAbout = () => {
    // Điều hướng đến màn hình về chúng tôi
    navigation.navigate("IntroScreen");
  };

  return (
    <ScrollView
      style={darkModeEnabled ? styles.darkContainer : styles.container}
    >
      <View style={styles.backButtonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Text style={styles.backButtonText}>Quay lại</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Thông báo</Text>
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Cho phép thông báo</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={handleNotificationsToggle}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Giao diện</Text>
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Chế độ tối</Text>
          <Switch
            value={darkModeEnabled}
            onValueChange={handleDarkModeToggle}
          />
        </View>
      </View>

      <View style={styles.section}>
        <TouchableOpacity style={styles.settingItem} onPress={handleNavigateToLanguage}>
          <Text style={styles.settingLabel}>Ngôn ngữ và khu vực</Text>
          <FontAwesome name="chevron-right" size={20} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem} onPress={handleNavigateToAccount}>
          <Text style={styles.settingLabel}>Tài khoản</Text>
          <FontAwesome name="chevron-right" size={20} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem} onPress={handleNavigateToSecurity}>
          <Text style={styles.settingLabel}>Bảo mật</Text>
          <FontAwesome name="chevron-right" size={20} />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
       
        <TouchableOpacity style={styles.settingItem} onPress={handleNavigateToAbout}>
          <Text style={styles.settingLabel}>Về chúng tôi</Text>
          <FontAwesome name="chevron-right" size={20} />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <TouchableOpacity style={styles.settingItem} onPress={handleLoginPress}>
          <Text style={styles.settingLabel}>Đăng xuất</Text>
          <MaterialIcons name="logout" size={20} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F8F8F8",
  },
  darkContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: "#333", // Màu nền tối
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
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#000", // Màu chữ tiêu đề sáng
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  settingLabel: {
    fontSize: 16,
    color: "#000", // Màu chữ sáng
  },
});

export default SettingPage;
