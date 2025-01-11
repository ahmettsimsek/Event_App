import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { COLORS, SIZES } from '../../constants/theme';
import { AppBar, HeightSpacer, ReusableText, SettingTile } from '../../components';

const Settings = ({ navigation }) => {
  return (
    <View style={{ backgroundColor: COLORS.lightWhite, flex: 1 }}>
      {/* Üst Bar */}
      <View style={{ height: 120 }}>
        <AppBar
          top={50}
          left={20}
          right={20}
          color={COLORS.white}
          onPress={() => navigation.goBack()}
        />
      </View>

      {/* Kaydırılabilir İçerik */}
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}>
        {/* Hesap Ayarları */}
        <ReusableText
          text={'Hesap Ayarları'}
          family={"regular"}
          size={SIZES.xLarge}
          color={COLORS.black}
        />
        <HeightSpacer height={5} />
        <SettingTile title={'Dil'} />
        <HeightSpacer height={3} />
        <SettingTile title={'Ülke'} title1={'Türkiye'} />
        <HeightSpacer height={3} />
        <SettingTile title={'Para Birimi'} title1={'TL'} />
        <HeightSpacer height={40} />

        {/* Destek */}
        <ReusableText
          text={'Destek'}
          family={"regular"}
          size={SIZES.xLarge}
          color={COLORS.black}
        />
        <HeightSpacer height={5} />
        <SettingTile title={'Yardım Alın'} title1={''} />
        <HeightSpacer height={3} />
        <SettingTile title={'Geri bildirim verin'} title1={''} />
        <HeightSpacer height={40} />

        {/* Yasalar */}
        <ReusableText
          text={'Yasalar'}
          family={"regular"}
          size={SIZES.xLarge}
          color={COLORS.black}
        />
        <HeightSpacer height={5} />
        <SettingTile title={'Hizmet şartları'} title1={''} />
        <HeightSpacer height={3} />
        <SettingTile title={'Gizlilik politikası'} title1={''} />
        <HeightSpacer height={40} />

        {/* Çıkış Yap Butonu */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => navigation.navigate('SignIn')} // SignUp sayfasına yönlendirme
        >
          <Text style={styles.logoutButtonText}>Çıkış Yap</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  logoutButton: {
    backgroundColor: COLORS.red, // Buton rengi
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: COLORS.white, // Yazı rengi
    fontSize: 16,
    fontWeight: 'bold',
  },
});
