import { Container } from 'native-base';
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, Image, Pressable, Linking } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { API_CONSTANTS } from '../../assets/config/constants';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Api from '../../services/api';
import StorageController from '../../services/storage';
import { Utils } from '../../services/utils';
import AuthStyles from './AuthStyle';
import * as GLOBAL from '../../assets/config/constants';
// import Toast from 'react-native-simple-toast';
import AppText from '../../components/AppText';
import { colors } from '../../assets/config/colors';

export default class Registration extends Component {
    constructor(props) {
        super(props);
        this.utils = new Utils;
        this.apiCtrl = new Api;
        this.storageCtrl = new StorageController;
    }
    state = {
        typeOfAccount: 1, //0:Business,1:Customer
        name: '',
        mobile: '',
        email: '',
        address: '',
        pin_code: '',
        password: '',
        role: 'customer',
        c_password: '',
        discount: '',
        hideCPassword: true,
        hidePassword: true,
        agreeCheck: false,
    }

    handleType = (type) => {
        this.setState({ typeOfAccount: type })
    }
    //     handleInputs=(text,type)=>{
    // switch (type) {
    //     case 'name':
    //         this.setState({name:text});
    //         break;
    //         case 'mobile':
    //         this.setState({mobile:text});
    //         break;
    //         case 'email':
    //         this.setState({email:text});
    //         break;
    //         case 'address':
    //         this.setState({address:text});
    //         break;
    //         case 'password':
    //         this.setState({password:text});
    //         break;
    //     default:
    //         break;
    // }
    //  }

    handleSignUp() {
        const request = { name: this.state.name, email: this.state.email, password: this.state.password, c_password: this.state.c_password, mobile: this.state.mobile, role: this.state.role, address: this.state.address, profile_pic: '', pincode: this.state.pin_code }
        if (this.validateForm(request)) {
            GLOBAL.loadingVisible.setState({ loading: true });
            this.apiCtrl.callAxiosWithoutSession(API_CONSTANTS.register, request).then(response => {
                console.log('Register Response', response.success, response.data.data);
                if (response.success) {
                    this.storageCtrl.setItem('username', this.state.email);
                    this.storageCtrl.setItem('password', this.state.password);
                    this.storageCtrl.setItem('token', response.data.data.token)
                    this.storageCtrl.setItem('user_details', JSON.stringify(response.data.data));
                    GLOBAL.loadingVisible.setState({ loading: false });
                    // Toast.show('Successfully Registered!');
                    this.props.navigation.push('HomeTabs');
                } else {
                    let msg = '';
                    for (var key in response.data.data) {
                        msg += response.data.data[key];
                    }
                    console.log('Msg', msg);
                    // Toast.show(msg);
                    GLOBAL.loadingVisible.setState({ loading: false });
                    //     //show popuppp
                }
            })
        } else {

            ///showpopup
        }

    }

    validateForm(formData) {
        console.log(formData);
        let errorCount = 0;
        let msg = '';
        if (this.utils.isStringEmpty(formData.name)) {
            errorCount++;
            msg += this.utils.addCommaSepetator(true, 'Name')
        }
        if (this.utils.isStringEmpty(formData.mobile)) {
            errorCount++;
            msg += this.utils.addCommaSepetator(true, 'Mobile')
        }
        if (this.utils.isStringEmpty(formData.email)) {
            errorCount++;
            msg += this.utils.addCommaSepetator(true, 'Email')
        }
        if (this.utils.isStringEmpty(formData.address)) {
            errorCount++;
            msg += this.utils.addCommaSepetator(true, 'Address')
        }
        if (this.utils.isStringEmpty(formData.pincode)) {
            errorCount++
            msg += this.utils.addCommaSepetator(true, 'Pin Code')
        }
        if (this.utils.isStringEmpty(formData.password)) {
            errorCount++;
            msg += this.utils.addCommaSepetator(true, 'Password')
        }
        if (this.utils.isStringEmpty(formData.c_password)) {
            errorCount++;
            msg += this.utils.addCommaSepetator(true, 'Confirm Password')
        }
        if (formData.password != formData.c_password) {
            // Toast.show('Password & Confirm Password does not match');
            return false;
        }
        if (errorCount == 0) {
            return true;
        } else {
            // Toast.show('Please enter ' + msg);
            return false;
        }

    }

    openTermsUrl = async () => {
        await Linking.openURL("https://bachatpotli.com/terms.html");
    }

    render() {
        return (
            <Container>
                {/* <LinearGradient colors={['#0D754E', '#5E9C5C', '#A3C26C', '#EDE683']} style={{ height: '30%' }}> */}
                {/* <View style={{height: '30%',backgroundColor: colors.WHITE, }}>
                    <AppText style={AuthStyles.header}>Sign Up</AppText>
                    <AppText style={{ textAlign: 'center',color:colors.BLACK }}>Create an account</AppText>
                </View> */}
                {/* </LinearGradient> */}
                <ScrollView style={AuthStyles.regContainer}>
                    <View>
                        <AppText style={AuthStyles.header}>Sign Up</AppText>
                        <AppText style={AuthStyles.regText}>Create an account</AppText>
                        {/* <Text style={{ alignSelf: 'flex-start', fontSize: 16, paddingBottom: 5 }}>Type</Text>
                        <View style={{ flexDirection: 'row', display: 'flex', marginBottom: 10, }}>
                            <TouchableOpacity
                                onPress={() => { this.handleType(0) }}
                                style={{ flexDirection: 'row', alignItems: 'center', width: '50%' }}>
                                <View style={AuthStyles.circle}>
                                    {this.state.typeOfAccount == 0 && <View style={AuthStyles.checkedCircle} />}
                                </View>
                                <Text>Business</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => { this.handleType(1) }}
                                style={{ flexDirection: 'row', alignItems: 'center', width: '50%' }}>
                                <View style={AuthStyles.circle}>
                                    {this.state.typeOfAccount == 1 && <View style={AuthStyles.checkedCircle} />}
                                </View>
                                <Text>Customer</Text>
                            </TouchableOpacity>
                        </View> */}

                        <Input
                            lblName="Name"
                            value={this.state.name}
                            style={AuthStyles.inputBox}
                            onChange={(text) => this.setState({ name: text })}
                        />
                        {this.state.typeOfAccount == 0 ? <Input
                            lblName="Organisation"
                            value={''}
                            style={AuthStyles.inputBox}
                            onChange={(text) => this.setState({ role: text })}
                        /> : null}
                        <Input
                            lblName="Mobile No"
                            value={this.state.mobile}
                            style={AuthStyles.inputBox}
                            maxLength={10}
                            keyboardType={'numeric'}
                            onChange={(text) => this.setState({ mobile: text })}
                        />
                        <Input
                            lblName="Email"
                            value={this.state.email}
                            style={AuthStyles.inputBox}
                            keyboardType={'email-address'}
                            onChange={(text) => this.setState({ email: text })}
                        />
                        <Input
                            lblName="Address"
                            value={this.state.address}
                            style={AuthStyles.inputBox}
                            numberOfLines={2}
                            multiline={true}
                            onChange={(text) => this.setState({ address: text })}
                        />
                        <Input
                            lblName="Pin Code"
                            value={this.state.pin_code}
                            style={AuthStyles.inputBox}
                            keyboardType="numeric"
                            onChange={(text) => this.setState({ pin_code: text })}
                        />
                        <Input
                            lblName="Password"
                            value={this.state.password}
                            style={AuthStyles.inputBox}
                            onChange={(text) => this.setState({ password: text })}
                            secureTextEntry={this.state.hidePassword}
                            showEyeIcon={true}
                            onShowPassword={() => { this.setState({ hidePassword: !this.state.hidePassword }) }}
                        />
                        <Input
                            lblName="Confirm Password"
                            value={this.state.c_password}
                            style={AuthStyles.inputBox}
                            onChange={(text) => this.setState({ c_password: text })}
                            secureTextEntry={this.state.hideCPassword}
                            showEyeIcon={true}
                            onShowPassword={() => { this.setState({ hideCPassword: !this.state.hideCPassword }) }}
                        />
                        {this.state.typeOfAccount == 0 ? <Input
                            lblName="Discount Provide"
                            value={''}
                            style={AuthStyles.inputBox}
                            onChange={(text) => this.setState({ discount: text })}
                        /> : null}
                        {/* <LinearGradient colors={['#0D754E', '#5E9C5C', '#A3C26C', '#EDE683']} style={{ paddingVertical: 10, borderRadius: 10, marginTop: 20 }}>
                            <TouchableOpacity onPress={() => { this.props.navigation.push('HomeTabs') }} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 18 }}>Sign Up</Text>
                            </TouchableOpacity>
                        </LinearGradient> */}

                        {/* colors.TERTIARY */}
                        <View style={{ flexDirection: "row", alignItems: "flex-start", marginTop: 10, justifyContent: "flex-start" }}>
                            <TouchableOpacity
                                style={{ height: 34, width: 34, marginRight: 0 }}
                                onPress={() => this.setState({ agreeCheck: !this.state.agreeCheck })}
                            >
                                <Image style={{ height: 20, width: 20 }} resizeMode="cover"
                                    source={this.state.agreeCheck == true ? require('../../assets/images/check.png') : require('../../assets/images/uncheck.png')}
                                />
                            </TouchableOpacity>

                            <View style={{ flexDirection: "row", justifyContent: 'flex-start', alignItems: 'center' }}>
                                <Text style={{ fontSize: 15 }}>I agree to the </Text>
                                <Pressable onPress={()=> this.openTermsUrl()}>
                                    <Text style={{ fontSize: 15, fontWeight: "700", textDecorationLine: 'underline' }}>Terms & Conditions.</Text>
                                </Pressable>
                            </View>
                        </View>


                        <Button lblName="Sign Up" onChange={() => { this.handleSignUp() }} />

                        <AppText onPress={() => { this.props.navigation.pop() }} style={AuthStyles.signUpText}>Already have an account? <AppText style={AuthStyles.bold} >Login</AppText></AppText>

                        {/* <Text onPress={() => { this.props.navigation.pop() }} style={{ textAlign: 'center', padding: 10, fontSize: 15, marginBottom: '20%' }}>Already have an account?<Text style={{ fontWeight: '700' }}> Login</Text> 
                        </Text>*/}
                    </View>
                </ScrollView>


            </Container>
        );
    }
}
