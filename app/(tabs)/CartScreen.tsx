import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";

const CartScreen = ({ route = {}, navigation }) => {
  const { cartItems = [] } = route.params || {};
  const [items, setItems] = useState(
    cartItems.map((item) => ({
      ...item,
      quantity: item.quantity ? item.quantity : 1,
    }))
  );

  useEffect(() => {
    if (route.params?.product) {
      const newItem = route.params.product;
      setItems((prevItems) => {
        const existingItem = prevItems.find((item) => item.id === newItem.id);
        if (existingItem) {
          return prevItems.map((item) =>
            item.id === newItem.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        return [...prevItems, { ...newItem, quantity: 1 }];
      });
    }
  }, [route.params?.product]);

  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const removeFromCart = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
  };

  const increaseQuantity = (id) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setItems(updatedItems);
  };

  const decreaseQuantity = (id) => {
    const updatedItems = items.map((item) =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setItems(updatedItems);
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem} key={item.id}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productDetails}>
        <Text style={styles.productName}>{item.title}</Text>
        <Text style={styles.productPrice}>Giá: {item.price} đ</Text>
        <View style={styles.quantityControls}>
          <TouchableOpacity
            onPress={() => decreaseQuantity(item.id)}
            style={styles.controlButton}
          >
            <Text style={styles.controlButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity
            onPress={() => increaseQuantity(item.id)}
            style={styles.controlButton}
          >
            <Text style={styles.controlButtonText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => removeFromCart(item.id)}
            style={styles.removeButton}
          >
            <Text style={styles.removeButtonText}>Xóa</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {items.length > 0 ? (
        <>
          <FlatList
            data={items}
            renderItem={renderCartItem}
            keyExtractor={(item) => item.id.toString()}
          />
          <Text style={styles.totalText}>
            Tổng cộng: {calculateTotal().toFixed(2)} đ
          </Text>
        </>
      ) : (
        <Text style={styles.emptyCartText}>Giỏ hàng của bạn đang trống</Text>
      )}
     <TouchableOpacity
    style={styles.checkoutButton}
    onPress={() => {
        if (items.length > 0) {
            navigation.navigate("PaymentScreen", { cartItems: items }); // Đảm bảo rằng bạn truyền cartItems
            setItems([]); // Xóa sản phẩm trong giỏ hàng
        } else {
            Alert.alert("Thông báo", "Giỏ hàng của bạn đang trống.");
        }
    }}
>
    <Text style={styles.checkoutButtonText}>Thanh toán</Text>
</TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  cartItem: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#f9f9f9",
    marginBottom: 10,
    borderRadius: 8,
  },
  productImage: {
    width: 60,
    height: 60,
    marginRight: 16,
  },
  productDetails: {
    flex: 1,
    justifyContent: "center",
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  productPrice: {
    fontSize: 16,
    color: "#888",
    marginVertical: 5,
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  controlButton: {
    backgroundColor: "#4a90e2",
    padding: 8,
    borderRadius: 5,
  },
  controlButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 10,
    color: "#333",
  },
  removeButton: {
    backgroundColor: "#4a90e2",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignSelf: "flex-start",
    marginLeft: 10,
  },
  removeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  emptyCartText: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 50,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "right",
    marginVertical: 10,
  },
  checkoutButton: {
    backgroundColor: "#4a90e2",
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    alignItems: "center",
  },
  checkoutButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default CartScreen;
