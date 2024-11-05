import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  FlatList,
  Modal,
  CheckBox, // Thêm CheckBox
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Nhập AsyncStorage
import { useNavigation } from "@react-navigation/native";

interface Address {
  id: number;
  name: string;
  address: string;
  phone: string;
  isDefault: boolean; // Thêm trường isDefault
}

const SHIPPING_ADDRESSES_KEY = "shipping_addresses"; // Khóa lưu địa chỉ

const ShippingAddressScreen = () => {
  const navigation = useNavigation();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState<number | null>(null);
  const [isDefault, setIsDefault] = useState(false); // Trạng thái cho checkbox

  // Hàm để lưu địa chỉ vào AsyncStorage
  const saveAddressesToStorage = async (addresses: Address[]) => {
    try {
      const jsonValue = JSON.stringify(addresses);
      await AsyncStorage.setItem(SHIPPING_ADDRESSES_KEY, jsonValue);
    } catch (e) {
      console.error("Failed to save addresses:", e);
    }
  };

  // Hàm để lấy địa chỉ từ AsyncStorage
  const loadAddressesFromStorage = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(SHIPPING_ADDRESSES_KEY);
      if (jsonValue != null) {
        setAddresses(JSON.parse(jsonValue));
      }
    } catch (e) {
      console.error("Failed to load addresses:", e);
    }
  };

  useEffect(() => {
    loadAddressesFromStorage(); // Tải địa chỉ khi component được khởi động
  }, []);

  const handleAddAddress = () => {
    if (!name || !address || !phone) {
      Alert.alert("Thông báo", "Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    const newAddress: Address = {
      id:
        editingIndex !== null
          ? addresses[editingIndex].id
          : addresses.length + 1,
      name,
      address,
      phone,
      isDefault,
    };

    // Cập nhật địa chỉ mặc định
    let updatedAddresses;

    if (editingIndex !== null) {
      updatedAddresses = addresses.map((addr, index) =>
        index === editingIndex ? newAddress : { ...addr, isDefault: false }
      );
      setEditingIndex(null);
    } else {
      // Đánh dấu địa chỉ mới là mặc định nếu được chọn
      updatedAddresses = addresses.map((addr) => ({
        ...addr,
        isDefault: false,
      }));
      updatedAddresses.push(newAddress);
    }

    setAddresses(updatedAddresses);
    saveAddressesToStorage(updatedAddresses); // Lưu địa chỉ sau khi thêm hoặc cập nhật
    clearForm();
  };

  const handleEditAddress = (index: number) => {
    const addressToEdit = addresses[index];
    setName(addressToEdit.name);
    setAddress(addressToEdit.address);
    setPhone(addressToEdit.phone);
    setIsDefault(addressToEdit.isDefault); // Lấy trạng thái mặc định
    setEditingIndex(index);
  };

  const openDeleteModal = (index: number) => {
    setAddressToDelete(index);
    setModalVisible(true);
  };

  const handleDeleteAddress = () => {
    if (addressToDelete !== null) {
      const updatedAddresses = addresses.filter(
        (_, i) => i !== addressToDelete
      );
      setAddresses(updatedAddresses);
      saveAddressesToStorage(updatedAddresses); // Lưu địa chỉ sau khi xóa
      setModalVisible(false);
      Alert.alert("Thông báo", "Địa chỉ đã được xóa thành công!"); // Thêm thông báo
    }
  };

  const clearForm = () => {
    setName("");
    setAddress("");
    setPhone("");
    setIsDefault(false); // Reset trạng thái mặc định
  };

  const handleSelectAddress = (item: Address) => {
    navigation.navigate("PaymentScreen", { selectedAddress: item });
  };

  const renderAddressItem = ({
    item,
    index,
  }: {
    item: Address;
    index: number;
  }) => (
    <View style={styles.addressItem}>
      <Text style={styles.addressText}>{item.name}</Text>
      <Text style={styles.addressText}>{item.address}</Text>
      <Text style={styles.addressText}>{item.phone}</Text>
      <View style={styles.addressActions}>
        <TouchableOpacity onPress={() => handleEditAddress(index)}>
          <Text style={styles.actionText}>Chỉnh sửa</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openDeleteModal(index)}>
          <Text style={styles.actionText}>Xóa</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSelectAddress(item)}>
          <Text style={styles.actionText}>Chọn địa chỉ</Text>{" "}
          {/* Nút chọn địa chỉ */}
        </TouchableOpacity>
      </View>
      {item.isDefault && (
        <Text style={styles.defaultText}>Địa chỉ mặc định</Text>
      )}
    </View>
  );

  const handleGoBack = () => {
    navigation.navigate("AccountScreen");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
        <Text style={styles.backButtonText}>Quay lại</Text>
      </TouchableOpacity>
      <Text style={styles.header}>Địa Chỉ Giao Hàng</Text>
      <TextInput
        style={styles.input}
        placeholder="Tên người nhận"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Địa chỉ"
        value={address}
        onChangeText={setAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="Số điện thoại"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <View style={styles.checkboxContainer}>
        <CheckBox value={isDefault} onValueChange={setIsDefault} />
        <Text style={styles.checkboxLabel}>Đặt làm địa chỉ mặc định</Text>
      </View>
      <TouchableOpacity style={styles.addButton} onPress={handleAddAddress}>
        <Text style={styles.addButtonText}>
          {editingIndex !== null ? "Cập nhật" : "Thêm địa chỉ"}
        </Text>
      </TouchableOpacity>
      <FlatList
        data={addresses}
        renderItem={renderAddressItem}
        keyExtractor={(item) => item.id.toString()}
      />

      {/* Modal xác nhận xóa địa chỉ */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Bạn có chắc chắn muốn xóa địa chỉ này?
            </Text>
            <View style={styles.modalActions}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelButton}>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleDeleteAddress}>
                <Text style={styles.deleteButton}>Xóa</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f7f7f7",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  addButton: {
    backgroundColor: "#4caf50",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  addressItem: {
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    marginBottom: 10,
    elevation: 1,
  },
  addressText: {
    fontSize: 16,
  },
  addressActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  actionText: {
    color: "#2196f3",
  },
  defaultText: {
    color: "green",
    fontWeight: "bold",
  },
  backButton: {
    marginBottom: 20,
  },
  backButtonText: {
    color: "#2196f3",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    marginBottom: 20,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  cancelButton: {
    color: "red",
  },
  deleteButton: {
    color: "green",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 16,
  },
});

export default ShippingAddressScreen;
