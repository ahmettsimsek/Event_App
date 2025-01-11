import { TextInput, Text, TouchableOpacity, View } from 'react-native'
import React, {useState} from 'react'
import styles from './signin.style'
import {Formik} from 'formik'
import * as Yup from 'yup'
import { COLORS, SIZES } from '../../constants/theme'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import { HeightSpacer, ReusableBtn, WidthSpacer } from '../../components'


const validationSchema = Yup.object().shape({
    password: Yup.string()
    .min(8, "Şifreniz en az 8 karakter olmak zorundadır")
    .required('Bu alanı doldurmanız gerekli'),
    email: Yup.string()
    .email("geçerli bir e-posta giriniz")
    .required('Bu alanı doldurmanız gerekli')
})

const Signin = () => {
const [loader, setLoader] = useState(false)
const [responseData, setResponseData] = useState(null)
const [obsecureText, setobsecureText] = useState(false)

  return (
    <View style={styles.container}>
        <Formik
        initialValues={{email: "", password: ""}}
        validationSchema={validationSchema}
        onSubmit = {(value)=> {
            console.log(value);
           
        }}
        >
            {({
                handleChange,
                touched,
                handleSubmit,
                values,
                errors,
                isValid,
                setFieldTouched
            }) => (
                <View>
                    <View style={styles.wrapper}>
                        <Text style={styles.label}> Email</Text>
                        <View>
                            <View 
                                style= {styles.inputWrapper(
                                    touched.email ? COLORS.lightBlue : COLORS.lightGrey
                                    )}
                                >

                            <MaterialCommunityIcons
                            name = "email-outline"
                            size = {20}
                            color = {COLORS.gray}
                            />

                            <WidthSpacer width={10}/>


                            <TextInput
                            placeholder='E-mail giriniz'
                            onFocus={()=>{setFieldTouched('email')}}
                            onBlur={()=> {setFieldTouched('email',"")}}
                            value={values.email}
                            onChangeText={handleChange('email')}
                            autoCapitalize="none"
                            autoCorrect={false}
                            style={{flex:1}}
                            />
                            </View>
                            {touched.email && errors.email && (
                                <Text style = {styles.ErrorMessage}>{errors.email}</Text> 
                            )}
                         </View>
                    </View>

                    <View style={styles.wrapper}>
                        <Text style={styles.label}> Password</Text>
                        <View>
                            <View 
                                style= {styles.inputWrapper(
                                    touched.password ? COLORS.lightBlue : COLORS.lightGrey
                                    )}
                                >

                            <MaterialCommunityIcons
                            name = "lock-outline"
                            size = {20}
                            color = {COLORS.gray}
                            />

                            <WidthSpacer width={10}/>


                            <TextInput
                            secureTextEntry ={obsecureText}
                            placeholder='Şifre giriniz'
                            onFocus={()=>{setFieldTouched('password')}}
                            onBlur={()=> {setFieldTouched('password',"")}}
                            value={values.password}
                            onChangeText={handleChange('password')}
                            autoCapitalize="none"
                            autoCorrect={false}
                            style={{flex:1}}
                            />


                            <TouchableOpacity onPress={ () =>{
                                setobsecureText(!obsecureText)
                            }}>
                                <MaterialCommunityIcons
                                    name={obsecureText ? "eye-outline" : "eye-off-outline"}
                                    size={18}
                                />    
                            </TouchableOpacity>

                            </View>
                            {touched.password && errors.password && (
                                <Text style = {styles.ErrorMessage}>{errors.password}</Text> 
                            )}
                        </View>    
                    </View>

                    <HeightSpacer height={20}/>

                    <ReusableBtn
                        onPress={handleSubmit} // Ensure the correct navigation route
                        btnText={"Giriş Yap"}
                        width={SIZES.width - 40}
                        backgroundColor={COLORS.green}
                        borderColor={COLORS.green}
                        borderWidth={0}
                        textcolor={COLORS.white}
                    />
                </View>
            )}
        </Formik>
    </View>
  )
}

export default Signin
