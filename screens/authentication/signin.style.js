import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants/theme";
import { ErrorMessage } from "formik";

const styles = StyleSheet.create({  
    container: {
        flex:1,
        padding: 20,
        backgroundColor: COLORS.lightWhite
    },
    inputWrapper: (borderColor) => ({
        borderColor: borderColor,
        backgroundColor: COLORS.lightWhite,
        borderWidth: 1,
        height: 50,
        borderRadius: 12,
        flexDirection: "row",
        paddingHorizontal: 15,
        alignItems: "center"
    }),
    wrapper:{
        marginBottom: 20
    },
    label: {
        fontFamily: 'regular',
        fontSize: SIZES.small,
        marginBottom: 5,
        marginEnd: 5,
        textAlign: "right"
    },
    ErrorMessage: {
        color: COLORS.red,
        fontSize: SIZES.small,
        fontFamily: 'regular',
        marginTop: 5,
        marginLeft: 5,
    }


})

export default styles;