import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppBar, ReusableBtn } from "../../components";
import { COLORS, SIZES } from "../../constants/theme";
import axios from "axios";
import * as Location from "expo-location"; // Location Modülü Eklendi
import Icon from "react-native-vector-icons/AntDesign"; // Kalp İkonu İçin

const SelectRoom = ({ navigation }) => {
  const [data, setData] = useState(null);
  const [favorites, setFavorites] = useState([]); // Favoriler için state
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const fetchLocationAndEvents = async () => {
      try {
        // Konum İzni Al
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Konum izni verilmedi.");
          setLoading(false);
          return;
        }

        // Kullanıcının Mevcut Konumunu Al
        const userLocation = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
        const { latitude, longitude } = userLocation.coords;

        // Etkinlikleri Çek
        const response = await axios.get(
          "https://app.ticketmaster.com/discovery/v2/events.json",
          {
            params: {
              apikey: "J826mWiIVCSLNBUC8WoQEq0o98KECmCf",
              latlong: `${latitude},${longitude}`,
              radius: 300,
              unit: "km",
              sort: "date,asc",
            },
          }
        );

        if (response.data?._embedded?.events) {
          setData(response.data._embedded.events);
        } else {
          setData([]);
          setErrorMsg("Hiçbir etkinlik bulunamadı.");
        }
      } catch (error) {
        setErrorMsg("Etkinlikler alınırken bir hata oluştu.");
        console.error("Error:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLocationAndEvents();
  }, []);

  const toggleFavorite = (eventId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(eventId)
        ? prevFavorites.filter((id) => id !== eventId)
        : [...prevFavorites, eventId]
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text>Yükleniyor...</Text>
      </SafeAreaView>
    );
  }

  if (errorMsg) {
    return (
      <SafeAreaView style={styles.center}>
        <Text>{errorMsg}</Text>
      </SafeAreaView>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: 100 }}>
        <AppBar
          top={50}
          left={20}
          right={20}
          title={"Etkinliğinizi Seçiniz"}
          color={COLORS.white}
          onPress={() => navigation.goBack()}
        />
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("HotelDetails", {
                  event: item,
                })
              }
            >
              <Image
                source={{ uri: item.images?.[0]?.url || "https://via.placeholder.com/150" }}
                style={styles.image}
                resizeMode="cover"
              />
              <View style={styles.textContainer}>
                <Text style={styles.title} numberOfLines={1}>
                  {item.name || "Etkinlik Adı Yok"}
                </Text>
                <Text style={styles.location} numberOfLines={1}>
                  {item._embedded?.venues?.[0]?.name || "Bilinmeyen Lokasyon"}
                </Text>
                <Text style={styles.date}>{item.dates?.start?.localDate || "Tarih Yok"}</Text>
              </View>
              <TouchableOpacity
                style={styles.favoriteButton}
                onPress={() => toggleFavorite(item.id)}
              >
                <Icon
                  name={favorites.includes(item.id) ? "heart" : "hearto"}
                  size={24}
                  color={favorites.includes(item.id) ? "red" : "gray"}
                />
              </TouchableOpacity>
            </TouchableOpacity>

            <View style={styles.btnStyle}>
              <ReusableBtn
                onPress={() => navigation.navigate("SelectedRoom", { item })}
                btnText={"Etkinliği Seçiniz"}
                width={SIZES.width - 50}
                backgroundColor={COLORS.green}
                borderColor={COLORS.green}
                borderWidth={0}
                textcolor={COLORS.white}
              />
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default SelectRoom;

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  listContainer: { paddingBottom: 20 },
  cardContainer: {
    margin: 10,
    padding: 10,
    backgroundColor: COLORS.lightWhite,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  image: { width: "100%", height: 150, borderRadius: 12 },
  textContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  title: { fontSize: 16, fontWeight: "bold", color: COLORS.black, marginVertical: 5 },
  location: { fontSize: 14, color: COLORS.gray, marginBottom: 3 },
  date: { fontSize: 12, color: COLORS.lightGreen },
  favoriteButton: { position: "absolute", top: 10, left: 10 }, // Kalbi sola kaydırdık
  btnStyle: { marginTop: 10, alignItems: "center" },
});
