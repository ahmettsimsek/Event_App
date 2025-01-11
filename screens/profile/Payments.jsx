import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { AssetImage } from '../../components';
import { useNavigation } from '@react-navigation/native'; // useNavigation hook'u ile navigation nesnesini alıyoruz
import Icon from 'react-native-vector-icons/AntDesign'; // Icon import ediyoruz

const Payments = () => {
  const navigation = useNavigation(); // useNavigation hook'u ile navigation nesnesini alıyoruz

  return (
    <View style={styles.container}>
      {/* Geri Butonu */}
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => navigation.goBack()} // Geri gitmek için goBack() fonksiyonunu kullanıyoruz
      >
        <Icon name="arrowleft" size={30} color="white" /> {/* Geri ok simgesi */}
      </TouchableOpacity>

      {/* Başlık */}
      <Text style={styles.title}>Kayıtlı Kartlarım</Text>

      {/* Görseller */}
      <AssetImage
        data={require('../../assets/images/visacard.png')}
        width={'100%'}
        height={250}  // Resmi biraz daha büyütüyoruz
        mode={'contain'}
        style={styles.image} // Resmin stilini ayarlıyoruz
      />

      <AssetImage
        data={require('../../assets/images/Mastercard.png')}
        width={'100%'}
        height={250}  // Resmi biraz daha büyütüyoruz
        mode={'contain'}
        style={styles.image} // Resmin stilini ayarlıyoruz
      />
    </View>
  );
};

export default Payments;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',  // İçeriği dikeyde ortalar
    alignItems: 'center',      // İçeriği yatayda ortalar
    padding: 20,               // Kenar boşluğu ekleyerek içerikleri daha düzgün hizalar
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'red',
    marginBottom: 20,           // Yazı ile resim arasına boşluk ekler
    textAlign: 'center',        // Yazıyı ortalar
  },
  image: {
    marginTop: 40,              // Resmi biraz aşağı kaydırmak için marginTop kullanıyoruz
  },
  backButton: {
    position: 'absolute',      // Geri butonunu ekranın sol üst kısmına yerleştiriyoruz
    top: 40,                   // Üstten 40px boşluk bırakıyoruz
    left: 20,                  // Soldan 20px boşluk bırakıyoruz
    padding: 10,
    backgroundColor: 'gray',   // Geri butonunun arka plan rengini ayarlıyoruz
    borderRadius: 50,          // Yuvarlak buton için borderRadius kullanıyoruz
  },
});
