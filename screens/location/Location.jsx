import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import * as Location from "expo-location";
const Locations = () => {
  const [mapReady, setMapReady] = useState(false); // Haritanın hazır olup olmadığını kontrol edin.
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(true);




  useEffect(() => {
    (async () => {
      try {
        // Kullanıcıdan konum izni iste
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Konum izni reddedildi.");
          setLoading(false);
          return;
        }

        // Konum bilgilerini al
        let currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);
      } catch (error) {
        setErrorMsg("Konum alınırken bir hata oluştu.");
        console.error("Konum Hatası:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []); // Boş bir bağımlılık dizisi sayfanın sadece bir kez çalışmasını sağlar.




console.log(location?.coords.latitude , location?.coords.longitude)





  const coordinates = {
    latitude: 39.900867,
    longitude: 41.243557,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
    title: 'Konumum',
  };

  const handleMapReady = () => {
    setMapReady(true); // Haritanın hazır olduğunu belirleyin.
  };

  return (
    <View style={styles.container}>
      <MapView
        initialRegion={coordinates}
        style={styles.mapStyle}
        onMapReady={handleMapReady} // Harita hazır olduğunda tetiklenir.
        showsUserLocation={true} // Kullanıcının konumunu göster.
      >
        {mapReady && (
          <Marker
            coordinate={coordinates}
            title={coordinates.title}
            description="Bu benim konumum"
          />
        )}
      </MapView>
    </View>
  );
};

export default Locations;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapStyle: {
    flex: 1, // Harita ekranın tamamını kaplayacak şekilde düzenlenir.
  },
});
