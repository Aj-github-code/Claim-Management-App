import { Container } from 'native-base';
import * as React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, BackHandler } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { PRIMARY, WHITE } from '../../assets/config/colors';
import { API_CONSTANTS } from '../../assets/config/constants';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Api from '../../services/api';
import StorageController from '../../services/storage';
import AuthStyles from './AuthStyle';
import * as GLOBAL from '../../assets/config/constants';
// import Toast from 'react-native-simple-toast';

export default class Login extends React.Component {
  
  constructor(props) {
    super(props);   
    this.apiCtrl = new Api(); 
    this.storageCtrl = new StorageController;
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
  }
  /**
   * Merchant login {"email":"testmerchant@glocalsavings.in","password":"test@123"}
   * Customer login {"email":"pp@gmail.com","password":"test1234"} 
   */
  state={
    username:'',
    password:'',
    hidePassword:true
  }

  handleBackButton = () => {
		BackHandler.exitApp();
		return true;
	} 

  handleLogin(){
    if(this.state.username && this.state.password){
      GLOBAL.loadingVisible.setState({loading:true});
      const request={email:this.state.username,password:this.state.password}
      this.apiCtrl.callAxios(API_CONSTANTS.login,request,false).then(response=>{
        console.log('Response',response);
        if(response.success){
         this.storageCtrl.setItem('token',response.data.data.token)
         // this.storageCtrl.setItem('id',response.data.id);
         // this.storageCtrl.setItem('name',response.data.name);
         // this.storageCtrl.setItem('role',response.data.roles);
          this.storageCtrl.setItem('user_details',JSON.stringify(response.data.data));
          // @ts-ignore
          GLOBAL.userDetails = response.data.data;
          GLOBAL.loadingVisible.setState({loading:false});
          // Toast.show('Successfully LoggedIn!');
            this.props.navigation.push('HomeTabs');
        }else{
         // Toast.show(''+response.data.data['error']);
          GLOBAL.loadingVisible.setState({loading:false});

        }
      })
    }else{
      // Toast.show('Please enter Username & Password.');
    }
  }
  render() {
    return (
      <Container>
         {/**['#0D754E', '#007E67', '#008785','#008EA4','#0094C2'] */}
         {/* <LinearGradient start={{x: 0, y: 0.75}} end={{x: 1, y: 0.25}} colors={['#0D754E','#5E9C5C','#A3C26C','#EDE683']} style={{height:'50%'}}>  */}
         <View style={{height:'50%',backgroundColor:PRIMARY}}>
          <Image resizeMode="contain" style={{marginTop:40,width:200,height:200,alignSelf:'center',justifyContent:'center'}} source={require(
// @ts-ignore
          '../../assets/images/logo.png')} />
         </View>
          {/* </LinearGradient> */}
         <View style={{backgroundColor:WHITE,elevation:2,padding:20,marginTop:'-20%',borderTopLeftRadius: 20,borderTopRightRadius:20,height:'100%'}}> 
            <Input 
            lblName="Username"
            value={this.state.username}
            style={AuthStyles.inputBox}
            keyboardType={'email-address'}
            onChange={(text)=>this.setState({username:text})}
            />
            <Input 
            lblName="Password"
            value={this.state.password}
            style={AuthStyles.inputBox}
            secureTextEntry={this.state.hidePassword}
            showEyeIcon={true}
            onChange={(text)=>this.setState({password:text})}
            onShowPassword={()=>{this.setState({hidePassword:!this.state.hidePassword})}}
            />
            <Button lblName="Login" onChange={()=>{this.handleLogin()}} />
            {/* <LinearGradient colors={['#0D754E','#5E9C5C','#A3C26C','#EDE683']} style={{paddingVertical:10,borderRadius:10,marginTop:20}}>
              <TouchableOpacity onPress={()=>{this.props.navigation.push('HomeTabs')}} style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
              <Text style={{fontSize:18}}>Login</Text>  
              </TouchableOpacity>  
            </LinearGradient> */}
            <Text onPress={()=>{this.props.navigation.push('Registration')}} style={{textAlign:'center',padding:10,fontSize:15}}>Don't have an account? <Text style={{fontWeight:'700'}}>Sign Up</Text></Text>
         </View>
      </Container>
    );
  }
}
