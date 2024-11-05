import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TextInput,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/MaterialIcons";
import ProductDetailScreen from "./ProductDetail";
import CartScreen from "./CartScreen";
import PaymentScreen from "./PaymentScreen";
import PaymentSuccess from "./PaymentSuccess";
import IntroScreen from "./IntroScreen";
import ContactScreen from "./ContactScreen";
import PrivacyPolicyScreen from "./ChinhSachBaoMat";
import SecuritySettings from "./SecuritySettings";
import SupportScreen from "./SupportScreen";
import ShippingAddressScreen from "./ShippingAddressScreen";

const BANNER_IMAGE =
  "https://giakethoitrang.com/Images/trang-tri-shop-quan-ao.jpg";
const CATEGORIES = ["TẤT CẢ", "NỔI BẬT", "KHUYẾN MÃI", "BÁN CHẠY"];

const ProductListScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);
  const getTotalItemsInCart = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };
  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = query
      ? products.filter((product) =>
          product.title.toLowerCase().includes(query.toLowerCase())
        )
      : products;
    setFilteredProducts(filtered);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);

    let filtered;
    if (category === "TẤT CẢ") {
      filtered = products;
    } else if (category === "NỔI BẬT") {
      filtered = products.filter((product) => product.rating.rate > 3);
    } else if (category === "KHUYẾN MÃI") {
      filtered = products.filter((product) => product.price < 500);
    } else if (category === "BÁN CHẠY") {
      filtered = products.filter((product) => product.rating.count > 400);
    } else if (category === "Quần áo - Balo") {
      filtered = products.filter((product) =>
        product.category.toLowerCase().includes("clothing")
      );
    } else if (category === "Thiết bị điện tử") {
      filtered = products.filter((product) =>
        product.category.toLowerCase().includes("electronics")
      );
    } else if (category === "Trang sức") {
      filtered = products.filter((product) =>
        product.category.toLowerCase().includes("jewelery")
      );
    } else {
      filtered = products;
    }

    const uniqueProducts = Array.from(
      new Map(filtered.map((product) => [product.id, product])).values()
    );
    setFilteredProducts(uniqueProducts);
  };

  const handleProductPress = (item) => {
    navigation.navigate("ProductDetail", { product: item });
  };

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (cartItem) => cartItem.id === item.id
      );

      if (existingItemIndex >= 0) {
        // Nếu sản phẩm đã có trong giỏ, tăng số lượng
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += 1; // Tăng số lượng
        return updatedItems; // Trả về giỏ hàng đã được cập nhật
      }

      // Nếu sản phẩm chưa có, thêm vào giỏ hàng với số lượng 1
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const renderProduct = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleProductPress(item)}
      style={styles.productWrapper}
    >
      <View style={styles.productItem}>
        <Image source={{ uri: item.image }} style={styles.productImage} />
        <Text style={styles.productText}>{item.title}</Text>
        <Text style={styles.productPrice}>${item.price}</Text>
        <View style={styles.buttonContainer}>
          {" "}
          {/* Chứa cả hai nút */}
          <TouchableOpacity
            onPress={() => addToCart(item)}
            style={styles.addToCartButton}
          >
            <Text style={styles.addToCartText}>Thêm vào giỏ</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Payment", {
                cartItems: [...cartItems, { ...item, quantity: 1 }],
              })
            } // Thêm sản phẩm vào giỏ khi nhấn nút "Mua ngay"
            style={styles.buyNowButton}
          >
            <Text style={styles.buyNowText}>Mua ngay</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderCategory = ({ item }) => (
    <TouchableOpacity onPress={() => handleCategorySelect(item)}>
      <View
        style={[
          styles.categoryItem,
          selectedCategory === item && styles.selectedCategory,
        ]}
      >
        <Text style={styles.categoryText}>{item}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Tìm kiếm sản phẩm"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => handleSearch(searchQuery)}
        >
          <Icon name="search" size={30} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => navigation.navigate("Cart", { cartItems })}
        >
          <Icon name="shopping-cart" size={30} color="#000" />
          {getTotalItemsInCart() > 0 && (
            <View style={styles.cartCount}>
              <Text style={styles.cartCountText}>{getTotalItemsInCart()}</Text>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.accountButton}
          onPress={() => navigation.navigate("AccountScreen")}
        >
          <Icon name="account-circle" size={30} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Banner */}
      <View style={styles.bannerContainer}>
        <Image source={{ uri: BANNER_IMAGE }} style={styles.bannerImage} />
      </View>

      {/* Danh mục sản phẩm */}
      <FlatList
        data={CATEGORIES}
        renderItem={renderCategory}
        keyExtractor={(item) => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryList}
      />

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProduct}
        numColumns={2}
        columnWrapperStyle={styles.row}
        style={styles.productList}
      />
      <View style={styles.footer}>
        <View style={styles.footerColumn}>
          <Text style={styles.footerTitle}>Danh mục</Text>
          <TouchableOpacity
            onPress={() => handleCategorySelect("Quần áo - Balo")}
          >
            <Text style={styles.footerText}>Quần áo - Balo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleCategorySelect("Thiết bị điện tử")}
          >
            <Text style={styles.footerText}>Thiết bị điện tử</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleCategorySelect("Trang sức")}>
            <Text style={styles.footerText}>Trang sức</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footerColumn}>
          <Text style={styles.footerTitle}>Thông tin</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Intro")}>
            <Text style={styles.footerText}>Giới thiệu</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Support")}>
            <Text style={styles.footerText}>Hỗ trợ</Text>{" "}
            {/* Thay đổi từ Contact thành Support */}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("PrivacyPolicy")}
          >
            <Text style={styles.footerText}>Chính sách bảo mật</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

// Stack Navigator cho điều hướng
const Stack = createStackNavigator();

const App = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProductList"
        component={ProductListScreen}
        options={{
          title: "CỬA HÀNG MỸ PHẨM",
          headerTitleAlign: "center", // Căn giữa tiêu đề
          headerStyle: { backgroundColor: "#3b5998" }, // Màu nền của header
          headerTintColor: "#fff", // Màu chữ của tiêu đề
        }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{ title: "Chi tiết sản phẩm" }}
      />
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{ title: "Giỏ hàng" }}
      />
      <Stack.Screen
        name="Payment"
        component={PaymentScreen}
        options={{ title: "Thanh toán" }} // Tiêu đề cho màn hình thanh toán
      />
      <Stack.Screen
        name="PaymentSuccess" // Thêm màn hình PaymentSuccess
        component={PaymentSuccess}
        options={{ title: "Thanh toán thành công" }} // Tiêu đề cho màn hình thanh toán thành công
      />
      <Stack.Screen
        name="Intro"
        component={IntroScreen}
        options={{ title: "Giới thiệu" }}
      />
      <Stack.Screen
        name="Support"
        component={SupportScreen}
        options={{ title: "Hỗ trợ" }}
      />
      <Stack.Screen
        name="ShippingAddressScreen"
        component={ShippingAddressScreen}
      />
      <Stack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicyScreen}
        options={{ title: "Chính sách bảo mật" }}
      />
      <Stack.Screen
        name="Security"
        component={SecuritySettings}
        options={{ title: "Bảo mật" }}
      />
    </Stack.Navigator>
  );
};

// Các style cho ứng dụng
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 16,
    backgroundColor: "#e0f7fa", // Màu nền xanh cho toàn bộ ứng dụng
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  searchBar: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    flex: 1,
    paddingHorizontal: 10,
  },
  searchButton: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  cartCount: {
    position: "absolute",
    right: 0,
    top: -5,
    backgroundColor: "red",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  cartCountText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  cartButton: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  bannerContainer: {
    alignItems: "center",
    marginVertical: 10,
  },
  bannerImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },

  productList: {
    marginTop: 50,
    flex: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  productWrapper: {
    flex: 1,
    margin: 5,
  },
  productItem: {
    backgroundColor: "#f9f9f9",
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    height: 230,
  },
  productText: {
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
  },
  productPrice: {
    fontSize: 14,
    color: "#888",
    marginTop: 5,
  },
  productImage: {
    width: "100%",
    height: 120,
    resizeMode: "contain",
  },
  categoryList: {
    marginBottom: -200,
  },
  categoryItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: "#e0e0e0",
    marginRight: 10,
  },
  selectedCategory: {
    backgroundColor: "#ff6347",
  },
  categoryText: {
    fontSize: 16,
    color: "#000",
  },
  addToCartButton: {
    backgroundColor: "#4682b4",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  addToCartText: {
    color: "#fff",
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "#3b5998",
  },
  footerColumn: {
    flex: 1,
    marginHorizontal: 10,
  },
  footerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  footerText: {
    fontSize: 14,
  },
  buyNowButton: {
    backgroundColor: "#ff6347", // Màu nền cho nút mua ngay
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  buyNowText: {
    color: "#fff",
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around", // Căn giữa các nút
    width: "100%", // Để nút chiếm toàn bộ chiều rộng
    marginTop: 10, // Khoảng cách trên giữa các nút và thông tin sản phẩm
  },
});

export default App;
