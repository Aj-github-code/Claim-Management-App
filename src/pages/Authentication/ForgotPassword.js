import { Container } from 'native-base';
import * as React from 'react';
import { View, Image, BackHandler, Linking, Text } from 'react-native';
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
        mobile: '',
        role: 'customer',
    }

    handleForgotPassword() {
        if (this.utils.isStringEmpty(this.state.mobile)) {
            // Toast.show('Please enter Mobile Number');
        }
        else{
            const request = { mobile: this.state.mobile };
            GLOBAL.loadingVisible.setState({ loading: true });
            this.apiCtrl.callAxiosWithoutSession(API_CONSTANTS.forgotPassword, request).then(response => {
                console.log('Forgot Response', response.success, response.data.data);
                console.log(response.data.status);
                if (response.data.status == 'success') {
                    GLOBAL.loadingVisible.setState({ loading: false });
                    // Toast.show('Reset password link has been sent to your registered E-mail address! Please check and reset your Password.');
                    this.props.navigation.pop();
                } else {
                    // Toast.show(response.data.message);
                    GLOBAL.loadingVisible.setState({ loading: false });
                }
            })
        }
    }

    render() {
        return (
            <Container>
                <View style={{ height: '50%', backgroundColor: colors.WHITE }}>
                    <Image resizeMode="contain" style={AuthStyles.logo} source={require(
                        // @ts-ignore
                        '../../assets/images/logo1.png')} />
                </View>
                <View style={AuthStyles.bottomContainer}>
                    <Input
                        lblName="Mobile Number"
                        value={this.state.mobile}
                        style={AuthStyles.inputBox}
                        keyboardType={'numeric'}
                        onChange={(text) => this.setState({ mobile: text })}
                    />
                    <Button lblName="Submit" onChange={() => { this.handleForgotPassword() }} />
                </View>
            </Container>
        );
    }

}