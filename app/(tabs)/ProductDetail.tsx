import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const ProductDetailScreen = ({ route, navigation }) => {
  const { product } = route.params;
  const [cartItems, setCartItems] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]); // Thêm trạng thái cho sản phẩm liên quan

  useEffect(() => {
    fetchRelatedProducts();
  }, []);

  const fetchRelatedProducts = async () => {
    try {
      // Giả sử bạn có API lấy sản phẩm liên quan
      const response = await fetch(
        `https://fakestoreapi.com/products/category/${product.category}`
      );
      const data = await response.json();
      const filteredData = data.filter((item) => item.id !== product.id); // Lọc bỏ sản phẩm hiện tại
      setRelatedProducts(filteredData);
    } catch (error) {
      console.error("Error fetching related products:", error);
    }
  };

  const handleAddToCart = () => {
    if (!product) {
      console.error("Product is undefined");
      return;
    }

    const existingProductIndex = cartItems.findIndex(
      (item) => item.id === product.id
    );
    if (existingProductIndex !== -1) {
      Alert.alert("Thông báo", "Sản phẩm đã có trong giỏ hàng!");
      return;
    }

    setCartItems((prevItems) => {
      const updatedCartItems = [...prevItems, product];
      Alert.alert("Thành công", "Sản phẩm đã được thêm vào giỏ hàng!", [
        {
          text: "OK",
          onPress: () =>
            navigation.navigate("CartScreen", { cartItems: updatedCartItems }),
        },
      ]);
      return updatedCartItems;
    });
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Image source={{ uri: product.image }} style={styles.productImage} />
      <Text style={styles.productName}>{product.title}</Text>
      <Text style={styles.productPrice}>${product.price}</Text>
      <Text style={styles.productDescription}>{product.description}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buyNowButton}
          onPress={() => navigation.navigate("PaymentScreen", { product })}
        >
          <Text style={styles.buttonText}>Mua ngay</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={handleAddToCart}
        >
          <Text style={styles.buttonText}>Thêm vào giỏ hàng</Text>
        </TouchableOpacity>
      </View>

      {/* Hiển thị sản phẩm liên quan */}
      <View style={styles.relatedProductsContainer}>
        <Text style={styles.relatedTitle}>Sản phẩm liên quan</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {relatedProducts.map((relatedProduct) => (
            <TouchableOpacity
              key={relatedProduct.id}
              style={styles.relatedProduct}
              onPress={() =>
                navigation.push("ProductDetail", {
                  product: relatedProduct,
                })
              }
            >
              <Image
                source={{ uri: relatedProduct.image }}
                style={styles.relatedImage}
              />
              <Text style={styles.relatedProductName}>
                {relatedProduct.title}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  contentContainer: {
    alignItems: "center",
  },
  productImage: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
    marginBottom: 20,
  },
  productName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 18,
    color: "#888",
    marginBottom: 20,
  },
  productDescription: {
    fontSize: 16,
    color: "#444",
    textAlign: "center",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
  buyNowButton: {
    backgroundColor: "#ff6347",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
  },
  addToCartButton: {
    backgroundColor: "#4682b4",
    padding: 10,
    borderRadius: 5,
    flex: 1,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  relatedProductsContainer: {
    marginTop: 20,
    width: "100%",
  },
  relatedTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  relatedProduct: {
    width: 120,
    marginRight: 10,
  },
  relatedImage: {
    width: "100%",
    height: 100,
    resizeMode: "cover",
    borderRadius: 5,
  },
  relatedProductName: {
    fontSize: 14,
    textAlign: "center",
  },
});

export default ProductDetailScreen;
