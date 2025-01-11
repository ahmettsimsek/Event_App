import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import reusable from "../Reusable/reusable.style";
import ReusableText from "../Reusable/ReusableText";
import { COLORS, TEXT, SIZES } from "../../constants/theme";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import HotelCard from "../Tiles/Hotels/HotelCard";


const BestHotels = ({ data , location }) => {
  const navigation = useNavigation();

  const getRandomTime = () => {
    const hour = Math.floor(Math.random() * (22 - 17 + 1)) + 17; // 17 ile 22 arasında rastgele bir saat
    const minute = Math.random() < 0.5 ? "00" : "30"; // Dakika 00 veya 30 olabilir
    return `${hour}:${minute}`;
  };
  

  return (
    <View>
      {/* Header Section */}
      <View style={[reusable.rowWithSpace("space-between"), { paddingBottom: 10 }]}>
        <ReusableText
          text={"Yakın Etkinlikler"}
          family={"medium"}
          size={TEXT.large}
          color={COLORS.green}
        />

        <TouchableOpacity onPress={() => navigation.navigate("HotelList")}>
          <Feather name="list" size={25} color={"red"} />
        </TouchableOpacity>
      </View>
      
      {/* FlatList Rendering Events */}
      <FlatList
        data={data}
        horizontal
        keyExtractor={(item) => item.id} // Ticketmaster verisinde "id" alanı kullanılır
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ columnGap: SIZES.medium }}
        renderItem={({ item }) => (
          <HotelCard
          item={{
            date:item.dates?.start?.localDate,
            time: `Saat: ${getRandomTime()}`, // Rastgele saat,
            title: item.name, // Etkinlik adı
            description: item.info || "Açıklama bulunamadı.", // Açıklama (opsiyonel)
            imageUrl: item.images[0]?.url || "", // İlk görsel
            location: item._embedded?.venues[0]?.name.substring(0, 18) || "Lokasyon belirtilmemiş", // Lokasyonu kısa al
            rating: Math.random().toFixed(1) * (5 - 3.5) + 3.5,
            review: Math.random().toFixed(1) * (50 - 100) + 100, // Rastgele bir rating (opsiyonel)
          }}
            margin={10}
            onPress={() =>
              navigation.navigate("SayfaDetay", {
                event: item,
                location:location // Etkinlik detaylarını aktarma
              })
            }
          />
        )}
      />
    </View>
  );
};

export default BestHotels;

const styles = StyleSheet.create({});
