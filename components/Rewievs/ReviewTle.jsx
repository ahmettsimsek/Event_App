import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import NetworkImage from '../Reusable/NetworkImage'
import styles from './review.style'
import reusable from '../Reusable/reusable.style'
import WidthSpacer from '../Reusable/WidthSpacer'
import ReusableText from '../Reusable/ReusableText'
import { COLORS, SIZES } from '../../constants/theme'
import Rating from '../Reusable/Rating'
import DescriptionText from '../Reusable/DescriptionText'

const ReviewTle = ({review}) => {
  return (
    <View style={styles.reviewBorder}>
        <View style = { reusable.rowWithSpace('space-between')}>
        <View style = { reusable.rowWithSpace('flex-start')}>
                <NetworkImage
                source={review.user.profile}
                width={54}
                height={54}
                radius={10}
                />

                <WidthSpacer width = {20}/>

                <View style={{width: "78%"}}>
                    <View style = { reusable.rowWithSpace('space-between')}>
                        <ReusableText
                            text={review.user.username}
                            family={"medium"}
                            size={SIZES.small+2}
                            color={COLORS.black}
                        />

                <WidthSpacer width = {"17%"}/>
                
                         <View style = { reusable.rowWithSpace('space-between')}>
                            <Rating rating={review.rating}/>
                            <WidthSpacer width={10}/>
                            <ReusableText
                            text={review.updatedAt}
                            family={"medium"}
                            size={SIZES.small+2}
                            color={COLORS.black}
                        />
                        </View>
                    </View>

                    <DescriptionText text={review.review} lines={2}/>
                </View>
            </View>
        </View>    
    </View>
  )
}

export default ReviewTle

