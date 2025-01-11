import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { COLORS, SIZES } from "../../constants/theme";
import reusable from "./reusable.style";
import { AntDesign } from "@expo/vector-icons";
import WidthSpacer from "./WidthSpacer";
import ReusableText from "./ReusableText";

const ProfileTile = ({ onPress, title, icon }) => {
  return (
    <TouchableOpacity style={styles.tile} onPress={onPress}>
      <View style={reusable.rowWithSpace("space-between")}>
        <View style={reusable.rowWithSpace("flex-start")}>
          <AntDesign name={icon} size={20} />
          <WidthSpacer width={15} />
          <ReusableText
            text={title}
            family={"regular"}
            size={SIZES.medium}
            color={COLORS.gray}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tile: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    shadowColor: COLORS.black,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 12,
  },
});

export default ProfileTile;
