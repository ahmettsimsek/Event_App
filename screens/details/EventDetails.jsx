import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Button, Linking } from "react-native";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { AppBar } from "../../components";
import { COLORS } from "../../constants/theme";


const GOOGLE_MAPS_APIKEY = "AIzaSyAr9ydvKs600KhH61zcbU6huG3MdMPRQTQ"; // Replace with your actual Google Maps API Key

const MapScreen = ({ route, navigation }) => {
  const { event, location } = route.params; // Konum bilgisi başka bir sayfadan geliyor

  // Konum bilgilerini event'ten ve prop'tan alıyoruz
  const venue = event?._embedded?.venues?.[0];
  const eventLatitude = parseFloat(venue?.location?.latitude);
  const eventLongitude = parseFloat(venue?.location?.longitude);

  const [region, setRegion] = useState(null);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const [showRoute, setShowRoute] = useState(false);

  useEffect(() => {
    if (location && location.coords) {
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.05, // Daha yakın bir zoom için daha küçük değer
        longitudeDelta: 0.05,
      });
    }
  }, [location]);

  const handleDirectionsReady = (result) => {
    setDistance(result.distance);
    setDuration(result.duration);
  };

  const toggleRoute = () => setShowRoute((prev) => !prev);

  const startNavigation = () => {
    if (location && eventLatitude && eventLongitude) {
      const url = `https://www.google.com/maps/dir/?api=1&origin=${location.coords.latitude},${location.coords.longitude}&destination=${eventLatitude},${eventLongitude}`;
      Linking.openURL(url).catch((err) => console.error("An error occurred", err));
    }
  };

  if (!location || !location.coords || !eventLatitude || !eventLongitude) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Konum bilgileri yükleniyor...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <AppBar
        top={50}
        left={20}
        right={20}
        title={event.name || "Event Name"}
        color={COLORS.white}
        onPress={() => navigation.goBack()}
      />

      {region && (
        <MapView
          style={styles.map}
          region={region}
          onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
        >
          {location?.coords && (
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              title="Konumunuz"
            />
          )}

          {eventLatitude && eventLongitude && (
            <Marker
              coordinate={{
                latitude: eventLatitude,
                longitude: eventLongitude,
              }}
              title={event.name || "Etkinlik"}
              description={venue?.name || "Etkinlik Yeri"}
            />
          )}

          {showRoute && (
            <MapViewDirections
              origin={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              destination={{
                latitude: eventLatitude,
                longitude: eventLongitude,
              }}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={3}
              strokeColor="red"
              onReady={handleDirectionsReady}
            />
          )}
        </MapView>
      )}

      {distance && duration && (
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>Mesafe: {distance.toFixed(2)} km</Text>
          <Text style={styles.infoText}>Tahmini Süre: {Math.round(duration)} dk</Text>
        </View>
      )}

      <View style={styles.buttonContainer}>
        <Button title={showRoute ? "Rotayı İptal Et" : "Rotayı Oluştur"} onPress={toggleRoute} />
      </View>

      <View style={styles.navigationButtonContainer}>
        <Button title="Goggle Haritalarda Aç" onPress={startNavigation} />
      </View>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  errorText: {
    flex: 1,
    color: "red",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
  infoContainer: {
    position: "absolute",
    top: 50,
    left: 10,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    padding: 10,
    borderRadius: 5,
    zIndex: 10,
  },
  infoText: {
    fontSize: 16,
    color: "red",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 70,
    borderRadius: 5,
    left: 10,
    right: 10,
   
  },
  navigationButtonContainer: {
    position: "absolute",
    bottom: 20,
    left: 10,
    right: 10,
  },
});