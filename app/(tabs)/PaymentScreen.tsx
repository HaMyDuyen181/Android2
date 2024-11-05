import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PaymentScreen = () => {
    const navigation = useNavigation();
    const [selectedMethod, setSelectedMethod] = useState(null);
    const [qrCodeUrl, setQrCodeUrl] = useState(null);
    const [address, setAddress] = useState(''); // Địa chỉ được lấy từ AsyncStorage

    useEffect(() => {
        const fetchAddress = async () => {
            try {
                const savedAddress = await AsyncStorage.getItem('shippingAddress'); // Lấy địa chỉ đã lưu
                if (savedAddress) {
                    setAddress(savedAddress); // Cập nhật địa chỉ vào state
                }
            } catch (error) {
                console.error('Lỗi lấy địa chỉ:', error);
            }
        };

        fetchAddress();
    }, []);

    const handlePaymentComplete = () => {
        console.log('Chúc mừng bạn đã mua hàng thành công với phương thức:', selectedMethod);
        clearAsyncStorage();
        navigation.navigate('PaymentSuccess');
    };

    const clearAsyncStorage = async () => {
        try {
            await AsyncStorage.clear();
            console.log('Dữ liệu trong AsyncStorage đã được xóa thành công');
        } catch (error) {
            console.error('Lỗi xóa dữ liệu trong AsyncStorage:', error);
        }
    };

    const handleMethodSelect = (method) => {
        setSelectedMethod(method);
        if (method === 'Bank') {
            setQrCodeUrl('https://apinganhang.com/wp-content/uploads/sites/10/2021/06/4128Nh_2021-06-15_Lu.jpeg');
        } else {
            setQrCodeUrl(null);
        }
    };

    const navigateToShippingAddress = () => {
        navigation.navigate('ShippingAddressScreen', { onAddressSelect: setAddress });
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Thanh toán</Text>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={styles.backButtonText}>Quay lại</Text>
                </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Thông tin thanh toán</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Họ và tên"
                        placeholderTextColor="#888"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Số điện thoại"
                        keyboardType="phone-pad"
                        placeholderTextColor="#888"
                    />
                    <TouchableOpacity onPress={navigateToShippingAddress} style={styles.addressInput}>
                        <Text style={styles.addressInputText}>{address || 'Chọn địa chỉ giao hàng'}</Text> {/* Hiển thị địa chỉ */}
                    </TouchableOpacity>
                </View>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Phương thức thanh toán</Text>
                    <TouchableOpacity
                        style={[styles.paymentMethod, selectedMethod === 'Bank' && styles.selectedMethod]}
                        onPress={() => handleMethodSelect('Bank')}
                    >
                        <Text style={styles.paymentMethodText}>Thanh toán bằng thẻ ngân hàng</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.paymentMethod, selectedMethod === 'COD' && styles.selectedMethod]}
                        onPress={() => handleMethodSelect('COD')}
                    >
                        <Text style={styles.paymentMethodText}>Thanh toán khi nhận hàng</Text>
                    </TouchableOpacity>
                </View>

                {selectedMethod === 'Bank' && qrCodeUrl && (
                    <View style={styles.qrContainer}>
                        <Text style={styles.qrTitle}>Mã QR thanh toán:</Text>
                        <Image source={{ uri: qrCodeUrl }} style={styles.qrImage} />
                        <Text style={styles.qrText}>Vui lòng quét mã QR để hoàn tất thanh toán.</Text>
                    </View>
                )}

                <TouchableOpacity
                    style={styles.button}
                    onPress={handlePaymentComplete}
                    disabled={!selectedMethod}
                >
                    <Text style={styles.buttonText}>Hoàn tất thanh toán</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f4f8',
    },
    header: {
        paddingVertical: 20,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        backgroundColor: '#4a90e2',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    backButton: {
        padding: 10,
    },
    backButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    content: {
        paddingHorizontal: 16,
        paddingTop: 20,
        paddingBottom: 40,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 10,
        fontSize: 16,
    },
    addressInput: {
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        paddingHorizontal: 15,
        justifyContent: 'center',
        marginBottom: 10,
    },
    addressInputText: {
        fontSize: 16,
        color: '#888',
    },
    paymentMethod: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        padding: 12,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#f9f9f9',
    },
    selectedMethod: {
        backgroundColor: '#d1f0d1',
        borderColor: '#4caf50',
    },
    paymentMethodText: {
        marginLeft: 10,
        fontSize: 16,
        color: '#333',
    },
    qrContainer: {
        marginVertical: 20,
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        padding: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    qrTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    qrImage: {
        width: 200,
        height: 200,
        marginBottom: 10,
    },
    qrText: {
        textAlign: 'center',
        color: '#555',
    },
    button: {
        backgroundColor: '#4caf50',
        borderRadius: 10,
        paddingVertical: 15,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    modalItem: {
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    modalItemText: {
        fontSize: 16,
        color: '#333',
    },
    closeButton: {
        marginTop: 20,
        backgroundColor: '#4caf50',
        borderRadius: 10,
        paddingVertical: 10,
        alignItems: 'center',
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default PaymentScreen;
