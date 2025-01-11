import { StyleSheet, Text, View, VirtualizedList } from 'react-native'
import React from 'react'
import HeightSpacer from "../Reusable/HeightSpacer"
import {SIZES} from "../../constants/theme"
import Country from '../Tiles/Country/Country'

const Places = () => {
  const countries =  [
    {
     _id: "64c62bfc65af9f8c969a8d04",
     country: "Konser",
     imageUrl:
       "https://www.strunki.ru/assets/images/Articles/2020/rockconcert1.jpg",
  
   },
   {
     _id: "64cf2c565d14628d0ac0a2b7",
     country: "Tiyatro",
     imageUrl:
       "https://www.artfulliving.com.tr/image_data/content_pane_image/0f0f018a22a44bc6c7990f0eeaa94b6b.jpg",

   },
   {
     _id: "64cf2c935d14628d0ac0a2b9",
     country: "Sergi",
     imageUrl:
       "https://cdn.sanity.io/images/cxgd3urn/production/80ceb653a7769793929dc5f6361338a049220bc7-3094x2210.jpg?rect=0,176,3094,1856&w=1200&h=720&q=85&fit=crop&auto=format",
     
   },
   {
     _id: "64cf2d095d14628d0ac0a2bd",
     country: "Festival",
     imageUrl:
       "https://sluttyravercostumes.com/wp-content/uploads/2019/04/Freaking-Festival-Fashion-Ultra-Music-Festival-Miami-2019.jpg",

   },
   {
     _id: "64cf2d4d5d14628d0ac0a2bf",
     country: "Talk Show",
     imageUrl:
       "https://i.insider.com/57ebfda6b0ef97011d8b8876",
     
   },
]


  return (
    <View>
    
      
      <VirtualizedList
      data = {countries}
      horizontal
      keyExtractor={(item) => item._id}
      showsHorizontalScrollIndicator = {false}
      getItemCount={(data) => data.length}
      getItem={(data, index) => data[index]}
      renderItem={({item, index}) =>  (
        <View style ={{marginRight: SIZES.medium}}>
          <Country item={item}/>
        </View>  
      )}
      />
    </View>
  )
}

export default Places

const styles = StyleSheet.create({})