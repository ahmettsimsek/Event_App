import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useCallback } from 'react';
import { useFonts } from 'expo-font';
import { GestureHandlerRootView } from 'react-native-gesture-handler';  // GestureHandlerRootView'ı import edin
import { Onboarding, Search, CountryDetails, Recommended, PlaceDetails, HotelDetails, HotelList, HotelSearch, SelectRoom, SelectedRoom, Successful, Failed, Kullanici, SayfaDetay, EventDetails} from './screens';
import BottomTabNavigation from './navigation/BottomTabNavigation';
import Payments from './screens/profile/Payments';  // Payments bileşeni
import Settings from './screens/settings/Settings';
import Homeee from './src/ekranlar/appScrenns/Homee/Homeee';
import OnBoard from './src/ekranlar/authentic/OnBoard/OnBoard';
import SignIn from './src/ekranlar/authentic/SignIn/SignIn';
import SignUp from './src/ekranlar/authentic/SignUp/SignUp';



const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts ({
    // Yüklenmesini beklediğiniz özel fontları buraya ekleyebilirsiniz.
  });

  const onLayoutRootView = useCallback(async () => {
    // Burada fontlar yüklendikten sonra yapılacak işlemler yer alabilir.
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;  // Fontlar yüklenene kadar boş bir ekran gösterilir.
  }

  return (

    <GestureHandlerRootView style={{ flex: 1 }}>  {/* GestureHandlerRootView ile sarın */}
      <NavigationContainer>
        <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'simple_push',
        }}
        >      

          <Stack.Screen 
            name='OnBoard' 
            component={OnBoard} 
            options={{ headerShown: false }} 
          />
           <Stack.Screen 
            name='SignIn' 
            component={SignIn} 
            options={{ headerShown: false }} 
          />
           <Stack.Screen 
            name='SignUp' 
            component={SignUp} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name='Home' 
            component={Homeee} 
            options={{ headerShown: false }} 
          />
         
          <Stack.Screen 
            name='Onboard' 
            component={Onboarding} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name='Bottom' 
            component={BottomTabNavigation} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name='Search' 
            component={Search} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name='CountryDetails' 
            component={CountryDetails} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name='Recommended' 
            component={Recommended} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name='PlaceDetails' 
            component={PlaceDetails} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name='HotelDetails' 
            component={EventDetails} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name='HotelList' 
            component={HotelList} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name='HotelSearch' 
            component={HotelSearch} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name='SelectRoom' 
            component={SelectRoom} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name='Payments' 
            component={Payments} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name='Settings' 
            component={Settings} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name='SelectedRoom' 
            component={SelectedRoom} 
            options={{ headerShown: false }} 
          />
           <Stack.Screen 
            name='Success' 
            component={Successful} 
            options={{ headerShown: false }} 
          />
           <Stack.Screen 
            name='Fail' 
            component={Failed} 
            options={{ headerShown: false }} 
          />
           <Stack.Screen 
            name='Kullanici' 
            component={Kullanici} 
            options={{ headerShown: false }} 
          />
           <Stack.Screen 
            name='SayfaDetay' 
            component={SayfaDetay} 
            options={{ headerShown: false }} 
          />
          
        
         
        
        
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView> 
 
  );
}
