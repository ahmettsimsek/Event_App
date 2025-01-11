import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import React from 'react';
import { ProfileTile } from '../../components';

const TopInfo = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../../assets/images/festival-of-colors-spanish-2622.webp')} // Arka plan resmi
      style={styles.backgroundImage}
    >
      <View style={styles.overlay}>
        <View style={{ margin: 20 }}>
          <ProfileTile title="Kullanıcı Bilgisi" icon="user" onPress={() => navigation.navigate('Kullanici')} />
          <ProfileTile title="Ödemeler" icon="creditcard" onPress={() => navigation.navigate('Payments')} />
          <ProfileTile title="Ayarlar" icon="setting" onPress={() => navigation.navigate('Settings')} />
        </View>
      </View>
    </ImageBackground>
  );
};

export default TopInfo;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // Resmi sığdırır
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // %50 opak siyah bir katman
    justifyContent: 'center', // İçeriği dikeyde ortalar
    alignItems: 'center', // İçeriği yatayda ortalar
  },
});
