import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  AppBar,
  DescriptionText,
  HeightSpacer,
  NetworkImage,
  ReusableBtn,
  ReusableText,
} from "../../components";
import { COLORS, SIZES } from "../../constants/theme";
import MapView, { Marker } from "react-native-maps";
import { Rating } from "react-native-stock-star-rating";
import { FlatList } from "react-native-gesture-handler";

const SayfaDetay = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { event, location } = route.params || {};

  const venue = event?._embedded?.venues?.[0];
  const latitude = venue?.location?.latitude
    ? parseFloat(venue.location.latitude)
    : null;
  const longitude = venue?.location?.longitude
    ? parseFloat(venue.location.longitude)
    : null;

  const [region, setRegion] = useState(null);

  useEffect(() => {
    if (latitude && longitude) {
      setRegion({
        latitude,
        longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    }
  }, [latitude, longitude]);

  const hotel = {
    reviews: [
      {
        _id: "1",
        review: "Yararlı bir uygulama olmuş",
        rating: 4.6,
        date: "2024-12-10",
        user: {
          username: "Kerem Toprak",
          profile:
            "https://cf.kizlarsoruyor.com/q3648972/fda2f29a-17c8-494d-8a30-9ac803dde3f6.jpg",
        },
      },
      {
        _id: "2",
        review: "Etkinliklere harita desteği ile ulaşmamız büyük kolaylık olmuş.",
        rating: 4.1,
        date: "2024-12-12",
        user: {
          username: "Elif Yağız",
          profile:
            "https://i.pinimg.com/originals/f7/33/3d/f7333d02ae2595bf7eb6d7686a024563.jpg",
        },
      },
      {
        _id: "3",
        review: "Bir etkinliğe ulaşabilmemiz için ihtiyacımız olan her şeyi uygulama koymuşlar. ",
        rating: 3.8,
        date: "2025-02-22",
        user: {
          username: "A*** K*****",
          profile: "https://avatars.mds.yandex.net/i?id=c17adc80e30ee71f93c903f591232edb6a7cde2f-8981283-images-thumbs&n=13",
        },
      },
      {
        _id: "4",
        review: "⭐⭐⭐⭐⭐  ",
        rating: 4.7,
        date: "2025-02-22",
        user: {
          username: "A*** K*****",
          profile: "https://i.pinimg.com/originals/eb/71/1e/eb711e79186b97a59bf77887e5579271.jpg",
        },
      },
      ],
  };

  if (!latitude || !longitude) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Konum bilgisi yükleniyor...</Text>
      </View>
    );
  }

  const averageRating =
    hotel.reviews.reduce((total, review) => total + review.rating, 0) /
    hotel.reviews.length;

  return (
    <ScrollView style={{ backgroundColor: COLORS.white }}>
      <AppBar
        top={50}
        left={20}
        right={20}
        title={event?.name || "Event Name"}
        color={COLORS.white}
        onPress={() => navigation.goBack()}
      />

      <View style={{ position: "relative" }}>
        <NetworkImage
          source={event?.images?.[0]?.url || ""}
          width={"100%"}
          height={200}
          radius={5}
        />
        <View style={styles.starOverlay}>
          <ReusableText
            text={averageRating.toFixed(1)}
            family="medium"
            size={SIZES.large}
            color={COLORS.white}
          />
          <Rating
            maxStars={5}
            stars={averageRating}
            size={18}
            color={COLORS.yellow}
          />
        </View>
      </View>

      <View style={{ marginHorizontal: 20 }}>
        <ReusableText
          text={event?.name || "Event Name"}
          family="medium"
          size={SIZES.xLarge}
          color={COLORS.black}
        />
        <HeightSpacer height={10} />
        <ReusableText
          text="Etkinlik Konumu"
          family="medium"
          size={SIZES.large}
          color={COLORS.lightBlue}
        />
        <HeightSpacer height={10} />
        <ReusableText
          text={venue?.name || "Venue Not Available"}
          family="medium"
          size={SIZES.medium}
          color={COLORS.black}
        />
        <HeightSpacer height={15} />
        <ReusableText
          text="Etkinlik Açıklaması"
          family="medium"
          size={SIZES.large}
          color={COLORS.lightBlue}
        />
        <HeightSpacer height={10} />
        <DescriptionText
          text={
            event?.info || "Etkinlik hakkında bilgi bulunamadı. İyi eğlenceler."
          }
        />
        <HeightSpacer height={20} />
      </View>

      <View style={{ marginHorizontal: 20 }}>
        <ReusableText
          text="Harita"
          family="medium"
          size={SIZES.xLarge}
          color={COLORS.green}
        />
      </View>
      <HeightSpacer height={10} />

      <TouchableOpacity
        onPress={() =>
          navigation.navigate("HotelDetails", {
            event: event,
            location: location,
          })
        }
      >
        <View
          style={{
            height: 200,
            borderRadius: 40,
            overflow: "hidden",
            marginTop: 5,
            borderWidth: 3,
            borderColor: COLORS.green,
          }}
        >
          {region ? (
            <MapView
              style={{ flex: 1 }}
              region={region}
              onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
            >
              <Marker
                coordinate={{
                  latitude: region.latitude,
                  longitude: region.longitude,
                }}
                title={venue?.name || "Konum"}
                description={venue?.city?.name || "Bilinmeyen Şehir"}
                zIndex={1000}
              />
            </MapView>
          ) : (
            <View
              style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
            >
              <Text>Konum bilgisi bulunamadı.</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
      <HeightSpacer height={10} />

      <View style={{ marginHorizontal: 20 }}>
        <ReusableText
          text="Yorumlar"
          family="medium"
          size={SIZES.xLarge}
          color={COLORS.red}
        />
        <HeightSpacer height={10} />

        <FlatList
          data={hotel.reviews}
          keyExtractor={(item) => item._id}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View
              style={{
                width: SIZES.width / 1.5,
                marginRight: 15,
                borderWidth: 2,
                borderColor: COLORS.red,
                borderRadius: 10,
                padding: 10,
                backgroundColor: "#fff5ee",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <NetworkImage
                  source={item.user.profile}
                  width={50}
                  height={50}
                  radius={25}
                />
                <View style={{ marginLeft: 10, flex: 1 }}>
                  <ReusableText
                    text={item.user.username}
                    family="medium"
                    size={SIZES.medium}
                    color={COLORS.black}
                  />
                  <ReusableText
                    text={`${item.date} - ${item.rating.toFixed(1)} ⭐`}
                    family="regular"
                    size={SIZES.small}
                    color="#8b0000"
                  />
                </View>
              </View>
              <HeightSpacer height={5} />
              <DescriptionText text={item.review} />
            </View>
          )}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 20,
          marginVertical: 20,
        }}
      >
        <ReusableText
          text={"400 TL"}
          family="regular"
          size={SIZES.medium}
          color={COLORS.black}
        />

        <ReusableBtn
          onPress={() => navigation.navigate("SelectRoom")}
          btnText="Bileti Seçiniz"
          width={SIZES.width / 2.2}
          backgroundColor={COLORS.green}
          textcolor={COLORS.white}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  starOverlay: {
    position: "absolute",
    bottom: 10,
    left: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export default SayfaDetay;
