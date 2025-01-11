import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '../../constants/theme';
import axios from 'axios';
import * as Location from 'expo-location';

const Search = ({ navigation }) => {
  const [searchKey, setSearchKey] = useState('');
  const [searchResult, setSearchResults] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState(null);

  // Kullanıcı konumunu alma
  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          alert('Konum izni verilmedi. Varsayılan konum kullanılacak.');
          return;
        }
        const currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);
      } catch (error) {
        console.error('Konum alınırken bir hata oluştu:', error);
      }
    })();
  }, []);

  // Etkinlikleri API'den alma
  useEffect(() => {
    const fetchEvents = async () => {
      if (!location) return;

      try {
        const response = await axios.get(
          'https://app.ticketmaster.com/discovery/v2/events.json',
          {
            params: {
              apikey: 'J826mWiIVCSLNBUC8WoQEq0o98KECmCf',
              latlong: `${location.coords.latitude},${location.coords.longitude}`,
              radius: 300,
              unit: 'km',
              sort: 'date,asc',
            },
          }
        );

        if (response.data?._embedded?.events) {
          setData(response.data._embedded.events);
          setSearchResults(response.data._embedded.events);
        } else {
          console.log('No events found!');
          setData([]);
          setSearchResults([]);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [location]);

  // Arama sonuçlarını filtreleme
  useEffect(() => {
    if (searchKey.trim() === '') {
      setSearchResults(data);
    } else {
      const filteredData = data.filter((item) =>
        item.name?.toLowerCase().includes(searchKey.toLowerCase())
      );
      setSearchResults(filteredData);
    }
  }, [searchKey, data]);

  // Yükleniyor ekranı
  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text>Yükleniyor...</Text>
      </SafeAreaView>
    );
  }

  // FlatList öğesi
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.eventCard}
      onPress={() =>
        navigation.navigate('SayfaDetay', {
          event: item,
          location,
        })
      }
    >
      <Image
        source={{ uri: item.images?.[0]?.url || 'https://via.placeholder.com/100' }}
        style={styles.eventImage}
      />
      <View style={styles.eventInfo}>
        <Text style={styles.eventTitle}>{item.name || 'Etkinlik Adı Yok'}</Text>
        <Text style={styles.eventLocation}>
          {item._embedded?.venues?.[0]?.name || 'Bilinmeyen Lokasyon'}
        </Text>
        <Text style={styles.eventRating}>⭐ 4.5 (100 Reviews)</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Arama Çubuğu */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          value={searchKey}
          onChangeText={setSearchKey}
          placeholder="Hangi Eğlenceyi İstersin?"
        />
        <TouchableOpacity style={styles.searchBtn}>
          <Feather name="search" size={24} color={COLORS.black} />
        </TouchableOpacity>
      </View>

      {/* Arama Sonuçları */}
      {searchResult.length === 0 ? (
        <View style={styles.noResults}>
          <Image
            source={require('../../assets/images/search.png')}
            style={styles.searchImage}
          />
          <Text style={styles.noResultsText}>Sonuç bulunamadı!</Text>
          <Text style={styles.yesResultsText}>Aramak istediğiniz etkinlik listede bulunmayabilir veya etkinlik ismini eksik veya yanlış girdiniz.</Text>
          <Text style={styles.mesResultsText}> Lütfen tekrar giriniz.</Text>
        </View>
      ) : (
        <FlatList
          data={searchResult}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      )}
    </SafeAreaView>
  );
};

// Stil Tanımları
const styles = {
  container: {
    flex: 1,
    padding: 15,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.blue,
    borderRadius: 10,
    padding: 10,
    marginRight: -50,
  },
  searchBtn: {
    marginLeft: 10, // Giriş alanı ile buton arasında boşluk
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResults: {
    alignItems: 'center',
  },
  searchImage: {
    width: 400,
    height: 400,
    marginBottom: 30,
  },
  noResultsText: {
    color: COLORS.red,
    fontSize: 25,
      fontWeight:'bold',
      marginBottom: 10,
  },
  yesResultsText: {
    color: COLORS.gray,
    fontSize: 16,
    fontWeight:'bold',
    marginBottom: 3
  
  },
  mesResultsText: {
    color: COLORS.red,
    fontSize: 16,
      fontWeight:'bold'
  },
  eventCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.lightWhite,
    marginBottom: 10,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  eventImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  eventLocation: {
    fontSize: 12,
    color: COLORS.gray,
    marginTop: 5,
  },
  eventRating: {
    fontSize: 12,
    color: COLORS.primary,
    marginTop: 5,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default Search;
