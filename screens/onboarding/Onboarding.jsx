import React from 'react';
import { FlatList, StyleSheet, Dimensions } from 'react-native';
import Slides from '../../components/Onboard/Slides';

const { width, height } = Dimensions.get('window'); // Ekran genişliği ve yüksekliği

const Onboarding = () => {
  const slides = [
    {
      id: 1,
      Image: require('../../assets/images/111.jpg'),
      title: "Konumundaki etkinlikleri gör",
    },
    {
      id: 2,
      Image: require('../../assets/images/5.webp'),
      title: "Şehrini Keşfet",
    },
    {
      id: 3,
      Image: require('../../assets/images/3.jpeg'),
      title: "Katılmak için en iyi konseri bul",
    },
  ];

  return (
    <FlatList
      horizontal
      pagingEnabled // Tam ekran geçişi için
      showsHorizontalScrollIndicator={false} // Kaydırma çubuğunu gizler
      data={slides}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <Slides item={item} />}
    />
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  slide: {
    width: width, // Ekran genişliğini kapla
    height: height, // Ekran yüksekliğini kapla
  },
});
