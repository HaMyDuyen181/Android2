import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation

const IntroScreen = () => {
  const navigation = useNavigation(); // Khởi tạo useNavigation

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{
          uri: "https://giakethoitrang.com/Images/trang-tri-shop-quan-ao.jpg",
        }} // Banner hoặc logo của ứng dụng
        style={styles.bannerImage}
      />
      <Text style={styles.title}>Chào mừng bạn đến với Cửa hàng Mỹ phẩm</Text>
      <Text style={styles.description}>
        Ứng dụng của chúng tôi mang đến cho bạn trải nghiệm mua sắm tuyệt vời
        với hàng loạt sản phẩm làm đẹp.
      </Text>
      <Text style={styles.subTitle}>Tính năng nổi bật:</Text>
      <View style={styles.featureList}>
        <Text style={styles.featureItem}>- Danh mục sản phẩm đa dạng</Text>
        <Text style={styles.featureItem}>- Chức năng tìm kiếm thông minh</Text>
        <Text style={styles.featureItem}>- Chi tiết sản phẩm rõ nét</Text>
        <Text style={styles.featureItem}>- Giỏ hàng tiện lợi</Text>
        <Text style={styles.featureItem}>- Thanh toán dễ dàng</Text>
        <Text style={styles.featureItem}>- Hỗ trợ người dùng tận tình</Text>
      </View>
      <Text style={styles.subTitle}>Giao diện thân thiện:</Text>
      <Text style={styles.description}>
        Với thiết kế đơn giản, màu sắc hài hòa và bố cục hợp lý, ứng dụng mang
        đến trải nghiệm người dùng tốt nhất.
      </Text>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("SettingsScreen")}
      >
        <Text style={styles.backButtonText}>Quay lại</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#e0f7fa", // Màu nền cho màn hình giới thiệu
  },
  bannerImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "justify",
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },
  featureList: {
    marginBottom: 10,
  },
  featureItem: {
    fontSize: 16,
    marginVertical: 2,
  },
  backButton: {
    marginTop: 20,
    backgroundColor: "#4caf50",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default IntroScreen;
