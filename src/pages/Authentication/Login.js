
import * as React from 'react';
import { View, Image, BackHandler, Linking, Text, Alert  } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { API_CONSTANTS } from '../../assets/config/constants';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Api from '../../services/api';
import StorageController from '../../services/storage';
import AuthStyles from './AuthStyle';
import * as GLOBAL from '../../assets/config/constants';

import AppText from '../../components/AppText';
import { colors } from '../../assets/config/colors';
import { getFontStyles } from '../../services/utils';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Toast from 'react-native-toast-message';
export default class Login extends React.Component {

  constructor(props) {
    super(props);
    this.apiCtrl = new Api();
    this.storageCtrl = new StorageController();
    this.handleBackButton = this.handleBackButton.bind(this)

    const didFocusSubscription = this.props.navigation.addListener(
      'focus',
      payload => {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
      }
    )
    const didBlurSubscription = this.props.navigation.addListener(
      'blur',
      payload => {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
      }
    );
    this.getContactUs();
  }
  /**
   * Merchant login {"email":"testmerchant@glocalsavings.in","password":"user1"}
   * Customer login {"email":"Test@glocalsavings.in","password":"user1"} 
   */
  state = {
    username: '',
    password: '',
    hidePassword: true,
    contactUs: {}
  }

  handleBackButton = () => {
    BackHandler.exitApp();
    return true;
  }


  getContactUs() {
    GLOBAL.loadingVisible.setState({ loading: true });
    this.apiCtrl.callAxiosGetWithoutSession(API_CONSTANTS.contactUs).then(response => {
      // console.log('CONTACTS IS',response);
      if (response.success && response.data.data) {
        this.setState({ contactUs: response.data.data }, () => {
          // console.log('CONTACTS IS', this.state.contactUs)
        });
      }
      GLOBAL.loadingVisible.setState({ loading: false });
    })
  }

  handleLogin() {

  
    if (this.state.username && this.state.password) {
      GLOBAL.loadingVisible.setState({ loading: true });
      const request = { email: this.state.username, password: this.state.password }
      console.log(request);
      this.apiCtrl.callAxios(API_CONSTANTS.login, request, false).then(response => {
        

        if (response.success) {
          this.storageCtrl.setItem('token', response.data.access_token)
          // this.storageCtrl.setItem('id',response.data.id);
          // this.storageCtrl.setItem('name',response.data.name);
          // this.storageCtrl.setItem('role',response.data.roles);
          Alert.alert('Login Success',response.message)
          this.storageCtrl.setItem('user_details', JSON.stringify(response.data));
          GLOBAL.userDetails = response.data.data;
          GLOBAL.loadingVisible.setState({ loading: false });
          this.props.navigation.push('HomeTabs');
        } else {
         Alert.alert('Login Error',response.message)
          GLOBAL.loadingVisible.setState({ loading: false });

        }
      })
    } else {
      Toast.show('Please enter Username & Password.');
    }
  }
  // makeCall(phoneNumber) {
  //   Linking.openURL(`tel:${phoneNumber}`)
  // }
  render() {
 

    return (
 
        <View style={[{flex:1, justifyContent:"center",height:"100%"}]}>
        {/* </LinearGradient> */}
        <View style={AuthStyles.bottomContainer}>
           <View style={{ height: '25%', backgroundColor: colors.WHITE }}>
            <Image resizeMode="contain" style={AuthStyles.logo} source={require(
              // @ts-ignore
              '../../assets/images/ezclick.png')} />
          </View>
          <Text style={{fontSize:20, fontWeight:'bold',}}>Login Now</Text>
          <Text style={{marginBottom:10}}>Enter your credential to login your account</Text>
          <Input
            lblName="Agent ID"
            value={this.state.username}
            style={AuthStyles.inputBox}
            // keyboardType={'numeric'}
            onChange={(text) => this.setState({ username: text })}
          />
          <Input
            lblName="Password"
            value={this.state.password}
            style={AuthStyles.inputBox}
     
            secureTextEntry={this.state.hidePassword}
            showEyeIcon={true}
            onChange={(text) => this.setState({ password: text })}
            onShowPassword={() => { this.setState({ hidePassword: !this.state.hidePassword }) }}
          />
          <View style={{ alignItems: "flex-end", marginTop: 5, marginBottom: 5,}}>
            <TouchableOpacity onPress={ ()=> this.props.navigation.push('ForgotPassword') }>
              <Text style={[{ textDecorationLine: 'underline', color:"blue", fontWeight:"bold"}]}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
          <Button lblName="Login" style={{backgroundColor: colors.THEME}} onChange={() => { this.handleLogin() }} />
          {/* <LinearGradient colors={['#0D754E','#5E9C5C','#A3C26C','#EDE683']} style={{paddingVertical:10,borderRadius:10,marginTop:20}}>
              <TouchableOpacity onPress={()=>{this.props.navigation.push('HomeTabs')}} style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
              <Text style={{fontSize:18}}>Login</Text>  
              </TouchableOpacity>  
            </LinearGradient> */}
          {/* <Text onPress={() => { this.props.navigation.push('Registration') }} style={AuthStyles.signUpText}>Don't have an account? <Text style={{ fontWeight: '700' }}>Sign Up</Text></Text> */}
          {/* <AppText onPress={() => { this.props.navigation.push('Registration') }} style={AuthStyles.signUpText}>Don't have an account? <AppText style={AuthStyles.bold} >Sign Up</AppText></AppText> */}



        </View>
        {/* {Object.keys(this.state.contactUs).length ? <AppText style={{ position: 'absolute', bottom: 10, textAlign: 'center', width: '100%', ...getFontStyles({ weight: 'Bold' }) }}>For any enquiry please contact us on <AppText style={{ ...getFontStyles({ weight: 'Bold' }), textDecorationLine: 'underline', color: colors.SECONDARY }} onPress={() => this.makeCall(this.state.contactUs.mobile_1)}>+91-{this.state.contactUs.mobile_1}</AppText>
          {this.state.contactUs.mobile_2 ? <AppText onPress={() => this.makeCall(this.state.contactUs.mobile_2)} style={{ ...getFontStyles({ weight: 'Bold' }), textDecorationLine: 'underline', color: colors.SECONDARY }}>{' / ' + this.state.contactUs.mobile_2}</AppText> : null}
        </AppText> : null} */}
            </View>
 
    );
  }
}
