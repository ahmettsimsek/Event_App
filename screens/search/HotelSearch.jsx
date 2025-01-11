import { View, Text, TouchableOpacity, Image, FlatList, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import reusable from '../../components/Reusable/reusable.style';
import styles from './search.style';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '../../constants/theme';
import { AppBar, HeightSpacer } from '../../components';
import axios from 'axios';
import HotelCard from '../../components/Tiles/Hotels/HotelCard';

const HotelSearch = ({ navigation }) => { // navigation prop'u burada tanımlanmış
  const [searchKey, setSearchKey] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(
          'https://app.ticketmaster.com/discovery/v2/events.json',
          {
            params: {
              apikey: 'J826mWiIVCSLNBUC8WoQEq0o98KECmCf',
              city: 'Erzurum',
              radius: 300,
              unit: 'km',
              sort: 'date,asc',
            },
          }
        );
        console.log('Response Data:', response.data);
        if (response.data?._embedded?.events) {
          setData(response.data._embedded.events);
        } else {
          console.log('No events found!');
          setData([]);
        }
      } catch (error) {
        console.log('Error fetching events:', error.message);
      }
    };
    fetchEvent();
  }, []);

  return (
    <SafeAreaView style={reusable.container}>
      {/* App Bar */}
      <View style={{ height: 50 }}>
        <AppBar
          top={40}
          left={20}
          right={20}
          title={'Konser için'}
          color={COLORS.white}
          icon={'filter'}
          color1={COLORS.white}
          onPress={() => navigation.goBack()}
          onPress1={() => {}}
        />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.input}
            value={searchKey}
            onChangeText={setSearchKey}
            placeholder="Hangi Eğlenceyi İstersin"
          />
        </View>

        <TouchableOpacity style={styles.searchBtn}>
          <Feather name="search" size={24} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      {/* Content */}
      {data.length === 0 ? (
        <View>
          <HeightSpacer height={'20%'} />
          <Image
            source={require('../../assets/images/search.png')}
            style={styles.searchImage}
          />
        </View>
      ) : (
        <View style={{ paddingLeft: 12 }}>
          <FlatList
            data={data}
            keyExtractor={(item, index) => item.id || index.toString()}
            numColumns={2}
            ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
            renderItem={({ item }) => (
              <View style={styles.tile}>
                <HotelCard
                  item={item}
                  margin={10}
                  onPress={() =>
                    navigation.navigate('HotelDetails', {
                      event: item,
                    })
                  }
                />
              </View>
            )}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default HotelSearch;
