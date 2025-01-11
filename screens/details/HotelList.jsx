import React, { useState, useEffect } from "react";
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppBar from "../../components/Reusable/AppBar";
import { COLORS } from "../../constants/theme";
import axios from "axios";
import * as Location from "expo-location";
import Icon from "react-native-vector-icons/AntDesign";


const HotelList = ({ navigation }) => {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchLocationAndEvents = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Konum izni verilmedi.");
          setLoading(false);
          return;
        }

        const userLocation = await Location.getCurrentPositionAsync({});
        setLocation(userLocation);

        const response = await axios.get(
          "https://app.ticketmaster.com/discovery/v2/events.json",
          {
            params: {
              apikey: "J826mWiIVCSLNBUC8WoQEq0o98KECmCf",
              latlong: `${userLocation.coords.latitude},${userLocation.coords.longitude}`,
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
          console.log("No events found!");
        }
      } catch (error) {
        console.error("Error fetching events:", error);
        setErrorMsg("Etkinlikler alınırken bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    };

    fetchLocationAndEvents();
  }, []);

  const toggleFavorite = (eventId) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(eventId)) {
        return prevFavorites.filter((id) => id !== eventId);
      } else {
        return [...prevFavorites, eventId];
      }
    });
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

  if (!data || data.length === 0) {
    return (
      <SafeAreaView style={styles.center}>
        <Text>Hiçbir etkinlik bulunamadı.</Text>
      </SafeAreaView>
    );
  }

  return (
    
    <SafeAreaView style={styles.container}>
      <AppBar
        title="Yakındaki Etkinlikler"
        onPress={() => navigation.goBack()}
        onPress1={() => navigation.navigate("HotelSearch")}
      />

      <FlatList
        data={data}
        keyExtractor={(item) => item.id || `event-${Math.random()}`}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.cardContainer}
            onPress={() =>
              navigation.navigate("HotelDetails", {
                event: item,
                location:location // Detay sayfasına etkinlik verisini gönderir
              })
            }
          >
            <Image
              source={{ uri: item.images?.[0]?.url || "" }}
              style={styles.image}
              resizeMode="cover"
            />
            <Text style={styles.title} numberOfLines={1}>
              {item.name || "Etkinlik Adı Yok"}
            </Text>
            <Text style={styles.location} numberOfLines={1}>
              {item._embedded?.venues?.[0]?.name || "Bilinmeyen Lokasyon"}
            </Text>
            <Text style={styles.date}>{item.dates?.start?.localDate || "Tarih Yok"}</Text>
            <TouchableOpacity
              style={styles.favoriteButton}
              onPress={() => toggleFavorite(item.id)}
            >
              <Icon
                name={favorites.includes(item.id) ? "heart" : "hearto"}
                size={25}
                color={favorites.includes(item.id) ? "red" : "white"}
              />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listContainer: {
    paddingBottom: 20,
  },
  cardContainer: {
    backgroundColor: COLORS.lightWhite,
    borderRadius: 10,
    marginBottom: 20,
    overflow: "hidden",
    alignItems: "center",
    padding: 10,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.black,
    marginVertical: 5,
  },
  location: {
    fontSize: 14,
    color: COLORS.gray,
    marginBottom: 5,
  },
  date: {
    fontSize: 14,
    color: COLORS.primary,
  },
  favoriteButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});

export default HotelList;
