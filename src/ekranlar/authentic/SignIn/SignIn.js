import { View, Text, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import COLOURS from '../../../constens/COLOURS';
import Ionic from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../../../constants/theme';
import { auth } from '../../../../firebase'; // Ensure this matches your path and exports.

import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";


const SignIn = ({ navigation }) => {

  const [email, setEmail] = useState('')
  const [password, setPasswod] = useState('')
  const [hidePassword, setHidePassword] = useState(true)

  const [showErrors, setShowErrors] = useState(false);
  const [errors, setErrors] = useState({});


  const handleLogin = async () => {
    try {
      // Validate user input
      const errors = getErrors(email, password);
      if (Object.keys(errors).length > 0) {
        setShowErrors(true);
        setErrors(errors);
        console.log("Validation Errors:", errors);
        return;
      }
  
      // Attempt Firebase login
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert(
        "Başarılı Giriş",
        "Hoş geldiniz! En iyi etkinlikleri bulmak hiç bu kadar basit olmamıştı. Uygulamaya yorum atmayı unutmayın.", // Mesaj içeriği
        [{ text: "Kapat" }] // Buton metni
      );
      navigation.navigate("Onboard");
      setErrors({});
      setShowErrors(false);
    } catch (error) {
      console.error("Firebase Error:", error);
      if (error.code === "auth/invalid-credential") {
        Alert.alert("Giriş Yapılamadı", "Geçersiz kimlik bilgileri, lütfen tekrar deneyin.", [{ text: "Tamam", onPress: () => {} }]);
      } else {
        Alert.alert("Giriş Yapılamadı", error.message);
      }
    }
  };
  


  const getErrors = (email, password) => {
    const errors = {};
    if (!email) {
      errors.email = 'Lütfen E-posta adresinizi giriniz';
    } else if (!email.includes('@') || !email.includes('.com')) {
      errors.email = 'Lütfen Geçerli E-posta giriniz';
    }

    if (!password) {
      errors.password = 'Şifreyi giriniz';
    } else if (password.length < 8) {
      errors.password = '8 karakterden oluşan şifreyi giriniz'
    }

    return errors;
  }

  const handleRegister = () => {
    const errors = getErrors(email, password);

    if (Object.keys(errors).length > 0) {
      setShowErrors(true)
      setErrors(showErrors && errors)
      console.log(errors);
    } else {
      setErrors({})
      setShowErrors(false);
      console.log('Signed In');
    }
  }

  const LoginWithIcon = ({ iconName, onPress, buttonTitle }) => {
    return (
      <TouchableOpacity
        onPress={handleLogin}
        activeOpacity={0.3}
        style={{
          width: '40%',
          paddingVertical: 12,
          paddingHorizontal: 24,
          backgroundColor: COLOURS.transparent,
          borderWidth: 2,
          borderColor: COLOURS.white,
          borderRadius: 10,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
        <Ionic
          name={iconName}
          style={{
            fontSize: 26,
            color: COLOURS.black,
            marginBottom: 4,
          }}
        />
        <Text style={{
          fontsize: 14,
          color: COLORS.black,
          opacity: 0.4
        }}>
          {buttonTitle}
        </Text>
      </TouchableOpacity>
    )
  }


  const handleForgotPassword = async (email) => {
    try {
      if (!email) {
        Alert.alert("Uyarı", "Lütfen e-posta adresinizi giriniz.");
        return;
      }

      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      Alert.alert(
        "Şifre Sıfırlama E-postası Gönderildi",
        "E-posta adresinize bir şifre sıfırlama bağlantısı gönderdik. Lütfen e-posta kutunuzu kontrol edin.",
        [{ text: "Tamam" }]
      );
    } catch (error) {
      Alert.alert("Hata", error.message);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView
        colors={[
          COLOURS.bgLineGradOne,
          COLOURS.bgLineGradTwo,
          COLOURS.bgLineGradThree,
          COLOURS.bgLineGradFour,
          COLOURS.bgLineGradFive,
          COLOURS.bgLineGradSix
        ]}
        style={{
          width: '100%',
          height: '100%',
          paddingVertical: 10,
          paddingHorizontal: 20,
        }}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
          style={{
            backgroundColor: COLOURS.white,
            width: 40,
            aspectRatio: 1 / 1,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 100,
            elevation: 4,
            position: 'absolute',
            top: 20,
            left: 20,
            zIndex: 100,
          }}>
          <Ionic
            name="chevron-back"
            style={{ fontsize: 20, Color: COLOURS.black }}
          />

        </TouchableOpacity>

        <ScrollView
          showsHorizontalScrollIndicator={false}
          style={{
            paddingTop: 60,
          }}>
          <Text
            style={{
              textAlign: 'center',
              marginTop: 20,
              marginBottom: 10,
              fontsize: 40,
              color: COLOURS.black,
              letterSpacing: 4,
              fontWeight: 'bold',
            }}>
            Merhaba
          </Text>
          <Text
            style={{
              textAlign: 'center',
              marginVertical: 30,
              fontsize: 18,
              marginBottom: 80,
              color: COLOURS.black,
              letterSpacing: 4,
              fontWeight: '500',
              opacity: 0.5
            }}>
            Tekrardan hoş geldiniz, özlendiniz.
          </Text>
          <View
            style={{
              width: '100%'
            }}>
            <View
              style={{
                width: '100%',
                marginBottom: 20,
              }}>
              <TextInput
                placeholder="Email giriniz"
                placeholderTextColor={COLOURS.lightText}
                keyboardType="email-address"
                value={email}
                onChangeText={e => setEmail(e)}
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  fontsize: 14,
                  color: COLOURS.black,
                  borderRadius: 10,
                  backgroundColor: COLOURS.white,
                }}
              ></TextInput>
              {errors.email && (<Text
                style={{
                  fontsize: 14,
                  color: COLOURS.warning,
                  marginTop: 4
                }}>
                {errors.email}
              </Text>
              )}
            </View>
            <View
              style={{
                width: '100%',
                marginBottom: 20,
              }}>
              <View
                style={{
                  width: '100%',
                  borderRadius: 10,
                  backgroundColor: COLOURS.white,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                <TextInput
                  placeholder="Şifre giriniz"
                  placeholderTextColor={COLOURS.lightText}
                  secureTextEntry={hidePassword ? true : false}
                  value={password}
                  onChangeText={e => setPasswod(e)}
                  style={{
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    fontsize: 14,
                    color: COLOURS.black,
                    flex: 1
                  }}></TextInput>
                {password.length > 0 && (
                  <TouchableOpacity
                    onPress={() => setHidePassword(!hidePassword)}
                    activeOpacity={0.9}
                    style={{
                      paddingHorizontal: 10,
                      paddingRight: 5
                    }}>
                    <View style={{ padding: 10 }}>
                      <Ionic
                        name={hidePassword ? 'eye-sharp' : 'eye-off-sharp'}
                        style={{
                          fontSize: 24,
                          color: COLOURS.black,
                        }}
                      />
                    </View>

                  </TouchableOpacity>
                )}
              </View>
              {errors.password && (
                <Text
                  style={{
                    fontsize: 14,
                    color: COLOURS.warning,
                    marginTop: 4
                  }}>
                  {errors.password}
                </Text>
              )}
            </View>

            <TouchableOpacity
              onPress={handleLogin}
              activeOpacity={0.8}
              style={{
                width: '100%',
                paddingVertical: 14,
                paddingHorizontal: 20,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: COLOURS.accent,
                borderRadius: 10,
                elevation: 8,
                shadowColor: COLOURS.accent,
              }}>
              <Text style={{
                color: COLOURS.white,
                fontsize: 16
              }}>
                Giriş Yap
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
              onPress={() => handleForgotPassword(email)}
              activeOpacity={0.8}
              style={{
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <Text
                style={{
                  color: COLOURS.accent,
                  fontSize: 14,
                  fontWeight: "600",
                }}
              >
                Şifremi Unuttum
              </Text>
            </TouchableOpacity>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: 60
            }}>
            <View
              colors={['#00000090', '#00000090', '#ffffff00']}
              style={{
                flex: 1,
                paddingVertical: 1.4,
                borderRadius: 100,
              }}
            >
            </View>
            <Text style={{
              fontSize: 14,
              color: COLOURS.black,
              opacity: 0.4,
              marginHorizontal: 18,
            }}>Veya Devam Edin</Text>
            <View
              colors={['#00000090', '#00000090', '#ffffff00']}
              style={{
                flex: 1,
                paddingVertical: 1.4,
                borderRadius: 100,
              }}
            >
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              marginTop: 10,
              marginBottom: 40,
            }}>
            <LoginWithIcon iconName="logo-google" onPress={() => console.log("google")} buttonTitle="Google" />
            <LoginWithIcon iconName="person" onPress={() => console.log("Anonymous")} buttonTitle="Hesapsız" />
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('SignUp')}
            style={{
              width: '100%',
              alignItems: 'center'
            }}>
            <Text style={{
              fontSize: 14,
              fontWeight: '400',
              color: COLOURS.black,
            }}>
              Üye değil misin?
              <Text
                style={{
                  color: COLOURS.accent,
                }}>
                Şimdi Kaydolun
              </Text>
            </Text>
          </TouchableOpacity>
          <View
            style={{
              height: 60,
              width: '100%',
              backgroundColor: COLOURS.transparent,
            }}></View>
        </ScrollView>
      </SafeAreaView>
    </View>
  )
}

export default SignIn