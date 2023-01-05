
// import Ionicons from 'react-native-vector-icons/Ionicons';
import * as React from 'react';
import { View, StyleSheet, Text, TextInput, Platform } from 'react-native';
import { colors } from '../assets/config/colors';
import AppText from './AppText';
import Icon from 'react-native-vector-icons/FontAwesome5';
// export interface InputProps {
//     onChange: (text: string) => void
//     value: string,
//     lblName: string,
//     childRef?: any,
//     style?:any
// }

// export interface InputState {
// }

export default class Input extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (this.props.childRef != null) {
            this.props.childRef(this);
        }
    }
    render() {
        return (
            <View style={{ width: '100%' }}>
                <View style={styles.txtContainer}>
                   <AppText style={styles.lbl}>{this.props.lblName}</AppText>
                </View>
                <View style={[styles.field, this.props.style, styles.input_style]}>
                    <TextInput
                        selectionColor = {colors.THEME}
                        autoCapitalize={'none'}
                        style={[styles.input_style, this.props.multiline ? { textAlignVertical: 'top', minHeight: (Platform.OS === 'ios' && this.props.numberOfLines) ? (20 * this.props.numberOfLines) : 20 } : null]}
                        onChangeText={this.props.onChange}
                        value={this.props.value}
                        placeholder={this.props.placeholder}
                        placeholderTextColor={'gray'}
                        numberOfLines={this.props.numberOfLines}
                        multiline={this.props.multiline}
                        maxLength={this.props.maxLength}
                        secureTextEntry={this.props.secureTextEntry}
                        keyboardType={this.props.keyboardType ? this.props.keyboardType : 'default'}
                    />
                    {/* type="MaterialCommunityIcons" */}
                    {this.props.showEyeIcon ? <Icon   name={this.props.secureTextEntry ? 'eye-slash' : 'eye'} onPress={this.props.onShowPassword} style={{ fontSize: 18 }} /> : null}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    input_style: {
        fontSize: 16,
        backgroundColor: colors.WHITE,//"#ffffff",
        borderRadius: 5,
        borderColor: colors.THEME,
        //paddingLeft: 8,
        paddingRight: 25,
        display: "flex",
        color: 'black',
        width: '100%',
    },
    lbl: {
        alignSelf: 'flex-start',
        fontSize: 16,
        paddingBottom: 5
    },
    field: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 5
    },
    txtContainer:{
        display: 'flex', justifyContent: 'flex-start', flexDirection: 'row'
    }
})
