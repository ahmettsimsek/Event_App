import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { COLORS, SIZES, TEXT } from "../../../constants/theme";
import { NetworkImage, Rating, ReusableText } from "../../../components";

const HotelCard2 = ({ item, margin, onPress }) => {
  return (
    <TouchableOpacity style={styles.card(margin)} onPress={onPress}>
      {/* Görsel */}
      <View style={styles.imageContainer}>
        <NetworkImage
          source={item.imageUrl}
          width="100%"
          height="100%"
          radius={10} // Görsel köşelerini yuvarlama
        />
      </View>

      {/* İçerik */}
      <View style={styles.contentContainer}>
        <ReusableText
          text={item.title}
          family="medium"
          size={TEXT.medium}
          color={COLORS.black}
          numberOfLines={1} // Tek satırda göster
        />

        <ReusableText
          text={item.location}
          family="regular"
          size={TEXT.small}
          color={COLORS.green}
          numberOfLines={1} // Tek satırda göster
        />

<ReusableText
                text={item.time}
                family={"medium"}
                size = {SIZES.medium}
                color = {COLORS.lightGreen}
                
                />

                

        <View style={styles.bottomRow}>
          {/* Derecelendirme */}
          <Rating rating={item.rating} />
          <Text style={styles.dateText}>{item.date}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default HotelCard2;

const styles = StyleSheet.create({
  card: (margin) => ({
    flexDirection: "row", // Yatay düzen
    alignItems: "center",
    backgroundColor: COLORS.lightWhite,
    borderRadius: 15,
    marginRight: margin,
    padding: 10,
    width: SIZES.width - 30, // Kart genişliği
    height: 120, // Kart yüksekliği
    overflow: "hidden",
    borderWidth: 2, // Çerçeve kalınlığı
  borderColor: COLORS.green
  }),
  imageContainer: {
    width: 90, // Görsel genişliği
    height: 90, // Görsel yüksekliği
    borderRadius: 13,
    overflow: "hidden",
    marginRight: 10, // Görsel ve içerik arası boşluk
    borderWidth: 2, // Çerçeve kalınlığı
  borderColor: COLORS.black, 
  },
  contentContainer: {
    flex: 1, // İçerik alanı genişliği
    justifyContent: "space-between",
  },
  bottomRow: {
    flexDirection: "row", // Yatay düzen
    alignItems: "center",
    justifyContent: "space-between", // Yıldız ve tarih arası boşluk
  },
  dateText: {
    fontSize: TEXT.small,
      color: '#4682b4'
  },
});
