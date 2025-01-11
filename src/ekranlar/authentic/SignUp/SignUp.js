import { View, Text, TouchableOpacity, ScrollView, TextInput, Alert} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import COLOURS from '../../../constens/COLOURS';
import Ionic from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../../../constants/theme';
import { auth } from "../../../../firebase"; // Firebase yapılandırmanızın doğru olduğundan emin olun.
import { createUserWithEmailAndPassword } from "firebase/auth";


const SignUp = ({navigation}) => {

    const [email, setEmail] = useState('')
    const [password, setPasswod] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [showErrors, setShowErrors] = useState(false);
    const [errors, setErrors] = useState({});

    const getErrors = (email, password, confirmPassword) => {
        const errors = {};
        if(!email) {
            errors.email = 'Lütfen E-posta adresinizi giriniz';
        }else if (!email.includes('@') || !email.includes('.com')){
            errors.email = 'Lütfen Geçerli E-posta giriniz';
        }

        if(!password){
            errors.password = 'Şifreyi giriniz';
        }else if(password.length < 8){
            errors.password = '8 karakterden oluşan şifreyi giriniz'
        }
        if(!confirmPassword){
            errors.confirmPassword = 'Şifreyi giriniz';
        }else if(confirmPassword.length < 8){
            errors.confirmPassword = 'Doğru şifreyi giriniz'
        }else if ( password !== confirmPassword){
            errors.confirmPassword = 'Şifreler eşleşmedi'   
        }

        return errors;
    }
    const handleSignUp = async () => {
        try {
          if (!email || !password || !confirmPassword) {
            Alert.alert("Hata", "Tüm alanları doldurun.");
            return;
          }
    
          if (password !== confirmPassword) {
            Alert.alert("Hata", "Şifreler eşleşmiyor.");
            return;
          }
    
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;
          console.log("Kullanıcı oluşturuldu:", user);
          Alert.alert("Başarılı", "Kayıt başarılı! Şimdi giriş yapabilirsiniz.");
          navigation.navigate("SignIn"); // SignIn ekranına yönlendirin
        } catch (error) {
          console.error("Kayıt Hatası:", error);
          Alert.alert("Hata", error.message);
        }
      };
    
    const LoginWithIcon = ({iconName, onPress, buttonTitle}) => {
        return(
           <TouchableOpacity 
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
                name= "chevron-back"
                style={{fontsize: 20, Color: COLOURS.black}}
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
                marginVertical: 30,
                fontsize: 40,
                marginBottom: 80,
                color: COLOURS.black,
                letterSpacing: 4,
                fontWeight: 'bold',             
            }}>
            Hoşgeldiniz
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
                <TextInput
                    placeholder="Şifre giriniz"
                    placeholderTextColor={COLOURS.lightText}
                    keyboardType="visible-password"
                    value={password}
                    onChangeText={e => setPasswod(e)}
                    style={{
                        paddingVertical: 10,
                        paddingHorizontal: 20,
                        fontsize: 14,
                        color: COLOURS.black,
                        borderRadius: 10,
                        backgroundColor: COLOURS.white,
                    }}
                ></TextInput>
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
              <View 
              style={{
                width: '100%',
                marginBottom: 20,
              }}>
                <TextInput
                    placeholder="Şifre onayla"
                    placeholderTextColor={COLOURS.lightText}
                    keyboardType="visible-password"
                    value={confirmPassword}
                    onChangeText={e => setConfirmPassword(e)}
                    style={{
                        paddingVertical: 10,
                        paddingHorizontal: 20,
                        fontsize: 14,
                        color: COLOURS.black,
                        borderRadius: 10,
                        backgroundColor: COLOURS.white,
                    }}
                ></TextInput>
                 {errors.confirmPassword && (
                <Text
                style={{
                    fontsize: 14,
                    color: COLOURS.warning,
                    marginTop: 4
                }}>
                {errors.confirmPassword}
                </Text>
                 )}
              </View>
              <TouchableOpacity
              onPress={handleSignUp}
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
                    Kaydolmak
                </Text>
              </TouchableOpacity>
            </View>
              
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
                <LoginWithIcon iconName="logo-google" onPress={()=> console.log("google")} buttonTitle="Google"/>
                <LoginWithIcon iconName="person" onPress={()=> console.log("Anonymous")} buttonTitle="Hesapsız"/>
            </View>
            <TouchableOpacity 
            activeOpacity={0.8}
            onPress={()=> navigation.navigate('SignIn')}
            style={{
                width: '100%',
                alignItems: 'center'
            }}>
                <Text style={{
                    fontSize: 14,
                    fontWeight: '400',
                    color: COLOURS.black,
                }}>
                    Zaten üye misin?
                    <Text 
                    style={{
                        color: COLOURS.accent,
                    }}>
                    Şimdi Oturum Aç
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

export default SignUp