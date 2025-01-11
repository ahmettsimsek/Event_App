import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import React from 'react';

const TopTrips = () => {
  return (
    <ImageBackground
      source={require('../../assets/images/festival-of-colors-spanish-2622.webp')} // Festival resmini buraya ekliyoruz
      style={styles.backgroundImage}
    >
      {/* İçerik */}
      <View style={styles.overlay}>
        <Text style={styles.text}>
          Henüz Rezarvasyonunuz Bulunmamaktadır. Konumundaki etkinliklerden birinde yer ayırarak eğlencenin tadına varmaya hazır mısın?
        </Text>
      </View>
    </ImageBackground>
  );
};

export default TopTrips;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,                  // Arka plan resmini tam ekran yap
    resizeMode: 'cover',      // Resmi ekranı kaplayacak şekilde ölçekle
    justifyContent: 'center', // İçeriği dikeyde ortala
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Arka planı biraz karart
    justifyContent: 'center',              // İçeriği dikeyde ortala
    alignItems: 'center',                  // İçeriği yatayda ortala
    padding: 20,
  },
  text: {
    fontSize: 18,              // Yazı boyutu
    color: '#ADD8E6',             // Yazı rengi beyaz
    textAlign: 'center',       // Yazıyı ortala
    lineHeight: 24,            // Satır aralığı
    fontWeight: 'bold',        // Kalın yazı
  },
});
