import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import reusable from "../Reusable/reusable.style";
import ReusableText from "../Reusable/ReusableText";
import { TEXT, COLORS } from "../../constants/theme";
import { Feather } from "@expo/vector-icons";
import HotelCard2 from "../Tiles/Hotels/HotelCardd2";

const Recommendations = ({ data, location }) => {
  const navigation = useNavigation();

  const getRandomTime = () => {
    const hour = Math.floor(Math.random() * (22 - 17 + 1)) + 17; // 17 ile 22 arasında rastgele bir saat
    const minute = Math.random() < 0.5 ? "00" : "30"; // Dakika 00 veya 30 olabilir
    return `${hour}:${minute}`;
  };
useEffect(() => {
    (async () => {
      try {
        // Konum izni al
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Konum izni reddedildi.");
          setLoading(false);
          return;
        }

        // Cihazın mevcut konumunu al
        let currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);
      } catch (error) {
        setErrorMsg("Konum alınırken bir hata oluştu.");
        console.error("Konum Hatası:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  // Rastgele öğeler almak için fonksiyon

  // Rastgele veriler almak için `getRandomItems` fonksiyonu
  const getRandomItems = (array, count) => {
    const result = [];
    const taken = new Set(); // Tekrarları önlemek için bir Set kullanıyoruz

    while (result.length < count && result.length < array.length) {
      const randomIndex = Math.floor(Math.random() * array.length);
      if (!taken.has(randomIndex)) {
        result.push(array[randomIndex]);
        taken.add(randomIndex); // Aynı index'i bir daha eklememek için işaretle
      }
    }

    return result;
  };

  // Rastgele 3 öğe seç
  const randomData = getRandomItems(data, 3);

  return (
    <View style={styles.container}>
      <View style={[reusable.rowWithSpace("space-between"), { paddingBottom: 10 }]}>
        <ReusableText
          text={"Öneriler"}
          family={"medium"}
          size={TEXT.large}
          color={COLORS.green}
        />

        <TouchableOpacity onPress={() => navigation.navigate("Recommended")}>
          <Feather name="list" size={23} color={"red"} />
        </TouchableOpacity>
      </View>

      <FlatList
        horizontal
        data={randomData} // Rastgele seçilen etkinlikleri kullan
        keyExtractor={(item) => item.id} // Her öğe için benzersiz bir anahtar
        renderItem={({ item }) => (
          <HotelCard2
            item={{
              date: item.dates?.start?.localDate,
              time: `Saat: ${getRandomTime()}`, // Rastgele saat,
              title: item.name, // Etkinlik adı
              description: item.info || "Açıklama bulunamadı.", // Açıklama (opsiyonel)
              imageUrl: item.images[0]?.url || "", // İlk görsel
              location: item._embedded?.venues[0]?.name.substring(0, 18) || "Lokasyon belirtilmemiş", // Lokasyonu kısa al
              rating: (Math.random() * (5 - 3.5) + 3.5).toFixed(1),
              review: Math.floor(Math.random() * (100 - 50) + 50), // Rastgele bir rating (opsiyonel)
            }}
            margin={10}
            onPress={() =>
              
              navigation.navigate("SayfaDetay", {
                event: item,
                location:location
                
              })
            }
          />
        )}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default Recommendations;

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
  },
});
