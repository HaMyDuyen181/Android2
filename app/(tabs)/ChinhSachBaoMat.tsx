import React from "react";
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const PrivacyPolicyScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.headerContainer}>
          <Icon name="security" size={40} color="#4b9be0" />
          <Text style={styles.header}>Chính Sách Bảo Mật</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>1. Giới thiệu</Text>
          <Text style={styles.text}>
            Chúng tôi cam kết bảo vệ quyền riêng tư của bạn khi sử dụng ứng dụng này.
            Chính sách này mô tả cách chúng tôi thu thập, sử dụng và bảo vệ thông tin cá nhân của bạn.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>2. Thông tin Chúng tôi Thu thập</Text>
          <Text style={styles.text}>
            Chúng tôi có thể thu thập thông tin như tên, địa chỉ email, và số điện thoại của bạn
            khi bạn đăng ký tài khoản hoặc sử dụng các tính năng của ứng dụng.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>3. Cách Chúng tôi Sử dụng Thông tin</Text>
          <Text style={styles.text}>
            Thông tin cá nhân của bạn có thể được sử dụng để cung cấp dịch vụ, hỗ trợ khách hàng,
            và cải thiện trải nghiệm người dùng.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>4. Bảo mật Thông tin</Text>
          <Text style={styles.text}>
            Chúng tôi sử dụng các biện pháp bảo mật tiêu chuẩn để bảo vệ thông tin của bạn
            khỏi truy cập trái phép, tiết lộ hoặc thay đổi.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>5. Liên hệ</Text>
          <Text style={styles.text}>
            Nếu bạn có bất kỳ câu hỏi nào về chính sách bảo mật này, vui lòng liên hệ với chúng tôi qua email: 
            <Text style={styles.contactEmail}> hamyduyen@gmail.com</Text>.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f4f6",
  },
  scrollContainer: {
    padding: 20,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 10,
  },
  section: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: "600",
    color: "#4b9be0",
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: "#666",
  },
  contactEmail: {
    fontWeight: "600",
    color: "#4b9be0",
  },
});

export default PrivacyPolicyScreen;
