import React, { useState, useEffect } from 'react'; // useState ve useEffect eklendi
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppBar from '../../components/Reusable/AppBar';
import { COLORS } from '../../constants/theme';
import ReusableTile from '../../components/Reusable/ReusableTile';
import axios from 'axios'; // axios eklendi
import Icon from 'react-native-vector-icons/AntDesign'; // AntDesign ikonu için
import * as Location from "expo-location";

const Recommended = ({ navigation }) => {
  const [data, setData] = useState(null); // Etkinlik verileri
  const [location, setLocation] = useState(null); // Kullanıcı konumu
  const [errorMsg, setErrorMsg] = useState(null); // Hata mesajları
  const [loading, setLoading] = useState(true); // Yüklenme durumu
  const [favorites, setFavorites] = useState([]); // Favoriler için state ekledik
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
  const getRandomItems = (array, count) => {
    const result = [];
    const taken = new Set();

    while (result.length < count && result.length < array.length) {
      const randomIndex = Math.floor(Math.random() * array.length);
      if (!taken.has(randomIndex)) {
        result.push(array[randomIndex]);
        taken.add(randomIndex);
      }
    }

    return result;
  };

  useEffect(() => {
    const fetchLocationAndEvents = async () => {
      try {
        // Konum izni al
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Konum izni verilmedi.");
          setLoading(false);
          return;
        }

        // Kullanıcının mevcut konumunu al
        const userLocation = await Location.getCurrentPositionAsync({});
        setLocation(userLocation);

        // Etkinlikleri al
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
          const randomData = getRandomItems(response.data._embedded.events, 5); // Rastgele 5 veri seç
          setData(randomData);
        } else {
          setData([]);
          console.log("No events found!");
        }
      } catch (error) {
        console.error("Error fetching events:", error);
        setErrorMsg("Etkinlikler alınırken bir hata oluştu.");
      } finally {
        setLoading(false); // Yüklenme durumu kapat
      }
    };

    fetchLocationAndEvents();
  }, []); // İlk yüklemede çalışır

  const toggleFavorite = (eventId) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(eventId)) {
        return prevFavorites.filter((id) => id !== eventId); // Favoriden çıkar
      } else {
        return [...prevFavorites, eventId]; // Favorilere ekle
      }
    });
  };

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text>Yükleniyor...</Text>
      </SafeAreaView>
    );
  }

  if (errorMsg) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>{errorMsg}</Text>
      </SafeAreaView>
    );
  }

  if (!data || data.length === 0) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Hiçbir etkinlik bulunamadı.</Text>
      </SafeAreaView>
    );
  }


  return (
    <SafeAreaView style={{ marginHorizontal: 20 }}>
      <View style={{ height: 50 }}>
        <AppBar
          top={10}
          left={0}
          right={0}
          title={'Öneri Listesi'}
          color={COLORS.white}
          icon={'search1'}
          color1={COLORS.white}
          onPress={() => navigation.goBack()}
          onPress1={() => navigation.navigate('Search')}
        />
      </View>

      <View style={{ paddingTop: 20 }}>
        <FlatList
          data={data} // Rastgele 5 veri
          keyExtractor={(item) => item.id || `event-${Math.random()}`}
          renderItem={({ item }) => (
            <View style={{ marginBottom: 10 }}>
              <ReusableTile
                item={{
                  title: item.name || "Etkinlik Adı Yok",
                  description: item.info || "Açıklama bulunamadı.",
                  imageUrl: item.images?.[0]?.url || "",
                  location: item._embedded?.venues?.[0]?.name || "Bilinmeyen Lokasyon",
                  rating: (Math.random() * (5 - 3.5) + 3.5).toFixed(1), // Rastgele 3.5-5 arası değer
                  review: Math.floor(Math.random() * (100 - 50) + 50), // Rastgele 50-100 arası yorum
                }}
                onPress={() =>
                  navigation.navigate("SayfaDetay", {
                    event: item,
                    location:location
                  })
                }
              />
               {/* Kalp Butonu */}
                            <TouchableOpacity
                              style={{ position: 'absolute', top: 10, right: 10 }}
                              onPress={() => toggleFavorite(item.id)}
                            >
                              <Icon
                                name={favorites.includes(item.id) ? 'heart' : 'hearto'}
                                size={24}
                                color={favorites.includes(item.id) ? 'red' : 'gray'}
                              />
                            </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default Recommended;
