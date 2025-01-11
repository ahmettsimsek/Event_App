import { View, Text, StatusBar, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import COLOURS from '../../../constens/COLOURS';
import { SafeAreaView } from 'react-native-safe-area-context';

const OnBoard = ({navigation}) => {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor={COLOURS.bgLineGradOne} 
      />
      <SafeAreaView
        colors={[
          COLOURS.bgLineGradOne,
          COLOURS.bgLineGradTwo,
          COLOURS.bgLineGradThree,
          COLOURS.bgLineGradFour,
          COLOURS.bgLineGradFive,
          COLOURS.bgLineGradSix
        ]}
        style={{ width: '100%', height: '100%' }}
      >
        <View style={{ width: '100%', height: '52%', padding: 16 }}>
          <View
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: COLOURS.onBoardCardBG,
              borderRadius: 20,
            }}
          >
            <Image
              source={require('../../../../src/resimler/Authentication/unnamed.png')}
              style={{ height: '100%', aspectRatio: 1 / 1 }} // Correct aspectRatio
            />
          </View>
        </View>

        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 40,
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              fontSize: 24,
              color: COLOURS.black,
              fontWeight: '800',
              letterSpacing: 1,
            }}
          >
            Uygulamaya ücretiz üye olun,
          </Text>
          <Text
            style={{
              fontSize: 24,
              color: COLOURS.black,
              fontWeight: '800',
              letterSpacing: 1,
            }}
          >
            Yüzlerce etkinliğe erişin
          </Text>
        </View>

        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 40,
          }}
        >
          <Text style={{ color: COLOURS.black }}>
            Eğer sende eğlenceye doyamayanlardansan,
          </Text>
          <Text style={{ color: COLOURS.black }}>
           Hazırsan eğlencenin kapılarını aralamaya ne dersin?
          </Text>
        </View>

        <View style={{ paddingHorizontal: 40, marginTop: 60 }}>
          <View style={{ width: '100%', flexDirection: 'row' }}>
            <TouchableOpacity
            onPress={() => navigation.navigate("SignUp")}
             activeOpacity = {0.3}
              style={{
                width: '50%',
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: 16,
                backgroundColor: COLOURS.white,
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
              }}
            >
              <Text style={{
                fontSize: 14,
                color: COLOURS.black,
                fontWeight: '600'
                }}>
                Kaydol</Text>
            </TouchableOpacity>

            <TouchableOpacity
            onPress={() => navigation.navigate("SignIn")}
             activeOpacity = {0.3}
              style={{
                width: '50%',
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: 16,
                backgroundColor: COLOURS.transparent,
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
                borderWidth: 2,
                borderColor: COLOURS.white,
              }}
            >
              <Text style={{
                fontSize: 14,
                color: COLOURS.black,
                fontWeight: '600'
              }}>Giriş Yap</Text>

            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default OnBoard;

