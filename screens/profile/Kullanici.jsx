import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // React Navigation'dan hook
import Icon from 'react-native-vector-icons/AntDesign'; // İkonlar için AntDesign kütüphanesi

const Kullanici = () => {
  const navigation = useNavigation(); // Navigation hook'u

  return (
    <View style={styles.container}>
      {/* Geri Butonu */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()} // Geri gitmek için goBack fonksiyonu
      >
        <Icon name="arrowleft" size={30} color="#fff" />
      </TouchableOpacity>

      {/* Profil Fotoğrafı */}
      <View style={styles.profile}>
        <Image
          source={{
            uri: "https://yt3.googleusercontent.com/ytc/AIdro_mh11Qc2DMnVg95l9dFUsLsImxQqT8WACZiJr9WsFWleA=s900-c-k-c0x00ffffff-no-rj",
          }}
          style={styles.image}
        />
      </View>

      {/* Kullanıcı İsmi */}
      <Text style={styles.name}>Ahmet Şimşek</Text>

      {/* Kullanıcı Email */}
      <Text style={styles.email}>E-posta: ahmtsmsek7@gmail.com</Text>


      {/* Konum */}
      <Text style={styles.location}>Konum: Erzurum</Text>

      {/* Harita Resmi */}
      <Image
        source={require('../../assets/images/map.png')} // `map.png` dosyasının doğru konumda olduğundan emin olun
        style={styles.map}
      />

        {/* Hesap Açma Tarihi */}
        <Text style={styles.date}>Hesap Açma Tarihi: 21 Aralık 2024</Text>
    </View>
  );
};

export default Kullanici;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#007bff', // Arka plan rengi mavi
    justifyContent: 'center', // İçeriği dikeyde ortala
    alignItems: 'center', // İçeriği yatayda ortala
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    padding: 10,
    backgroundColor: '#004c8c', // Geri butonunun koyu mavi arka planı
    borderRadius: 30,
  },
  profile: {
    marginBottom: 20, // Profil fotoğrafı ile yazılar arasında boşluk
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60, // Yuvarlak profil fotoğrafı
    borderWidth: 4,
    borderColor: '#fff', // Fotoğraf çevresi beyaz kenar
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10, // İsim ile e-posta arasında boşluk
  },
  email: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 30, // E-posta ile tarih arasında boşluk
  },
  date: {
    fontSize: 14,
    color: '#fff',
    marginBottom: -50, // Tarih ile konum arasında boşluk
  },
  location: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 20, // Konum ile harita resmi arasında boşluk
  },
  map: {
    width: 400,
    height: 200, // Harita resmi boyutları
    resizeMode: 'contain', // Resmi boyutlara sığdır
  },
  
});
