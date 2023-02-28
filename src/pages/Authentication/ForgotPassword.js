
import * as React from 'react';
import { View, Image, BackHandler, Linking, Text, ToastAndroid } from 'react-native';
import { API_CONSTANTS } from '../../assets/config/constants';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Api from '../../services/api';
import StorageController from '../../services/storage';
import AuthStyles from './AuthStyle';
import * as GLOBAL from '../../assets/config/constants';
// import Toast from 'react-native-simple-toast';
import AppText from '../../components/AppText';
import { colors } from '../../assets/config/colors';
import { getFontStyles } from '../../services/utils';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Utils } from '../../services/utils';

export default class ForgotPassword extends React.Component {

    constructor(props) {
        super(props);
        this.utils = new Utils;
        this.apiCtrl = new Api;
        this.storageCtrl = new StorageController;
    }

    state = {
        username: '',
        role: 'customer',
    }

    handleForgotPassword() {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if(this.utils.isStringEmpty(this.state.username)){
          ToastAndroid.show('PLease Enter Regsitered Email Address.', ToastAndroid.SHORT);
        } else if (reg.test(this.state.username) === false) {
            console.log('Invalid Email Address!')
            ToastAndroid.show('Invalid Email Address!', ToastAndroid.SHORT);
            return false;
        
        } else{
            const request = { email: this.state.username };
            GLOBAL.loadingVisible.setState({ loading: true });
            this.apiCtrl.callAxios(API_CONSTANTS.forgotPassword, request, false).then(response => {
                console.log('Forgot Response', response.success, response.data.data);
                console.log(response.data.status);
                if (response.success == true) {
                    GLOBAL.loadingVisible.setState({ loading: false });
                    ToastAndroid.show('Reset password link has been sent to your registered E-mail address! Please check and reset your Password.', ToastAndroid.LONG);

                    // ToastAndroid.show('');
                    // this.props.navigation.pop();
                    setTimeout(()=>{
                        this.props.navigation.navigate("Login") 
                    }, 1500)

                } else {
                    // Toast.show(response.data.message);
                    GLOBAL.loadingVisible.setState({ loading: false });
                }
            })
        }
    }

    render() {
        
     
        return (
            <View style={{height: '100%'}}>
                <View style={{ height: '30%', backgroundColor: colors.WHITE }}>
                    <Image resizeMode="contain" style={AuthStyles.logo} source={require(
                        // @ts-ignore
                        '../../assets/images/ezclick.png')} />
                </View>
                <View style={AuthStyles.bottomContainer}>
                <Input
                    lblName="Registered Email Address"
                    value={this.state.username}
                    style={AuthStyles.inputBox}
                    // keyboardType={'numeric'}
                    placeholder={'E.g. example@mail.com'}
                    onChange={(text) => this.setState({ username: text })}
          
                    />
                    <Button lblName="Submit" onChange={() => { this.handleForgotPassword() }} />
                </View>
            </View>
        );
    }

}