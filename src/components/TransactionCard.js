import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../assets/config/colors';
import { getFontStyles, Utils } from '../services/utils';
import AppText from './AppText';
import * as GLOBAL from '../assets/config/constants';
import moment from 'moment';

class TransactionCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.utils = new Utils;
  }
  getAmount(data) {
    if (this.props.roles == 'customer')
      return parseInt(data.amount);
    else
      return ((parseInt(data.amount) + parseInt(data.customer_discount)) - parseInt(data.company_discount));
  }
  render() {
    const { data, roles } = this.props;
    return (
      <View style={styles.dataListContainer}>
        <View style={{ flexDirection: 'row' }}>
          <View style={[styles.roundContainer, { backgroundColor: data.bgColor }]}>
            <AppText style={styles.text}>{this.utils.getInitials(roles == 'customer' ? data.organisation : data.customer)}</AppText>
          </View>
          <View style={{ width: '70%' }}>
            <AppText style={{ ...getFontStyles({ weight: 'Bold' }), fontSize: 16 }}>{roles == 'customer' ? data.organisation : data.customer}</AppText>
            <AppText style={{ color: colors.TEXTCOLOR, fontSize: 12 }}>{moment(data.transaction_date, 'DD-MM-YYYY hh:mm a').format('DD MMM YYYY, hh:mm a')}</AppText>
            <AppText style={{ marginTop: 5, fontSize: 13 }}>Amount: &#8377;{parseInt(data.amount) + parseInt(data.customer_discount)} | {roles == 'customer' ? 'Saved: ' : 'Discount: '}<AppText style={{ color: colors.SECONDARY, ...getFontStyles({ weight: 'Bold' }) }}>{roles == 'customer' ? '\u20B9' + parseInt(data.customer_discount) : '\u20B9' + parseInt(data.company_discount)}</AppText>
            </AppText>
            <AppText style={{ marginTop: 5, fontSize: 13 }}>TxId : {data.trans_no}</AppText>
          </View>
        </View>
        <AppText style={{ fontWeight: '700', textAlign: 'right' }}>&#8377;{this.getAmount(data)}</AppText>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
    borderRadius: 8
  },
  roundContainer: { height: 50, width: 50, borderRadius: 50 / 2, alignItems: 'center', justifyContent: 'center', marginRight: 10 },

  text: { textAlign: 'center', fontSize: 18 },
  boldText: { ...getFontStyles({ weight: 'Bold' }) },
  orderListContainer: { borderRadius: 10, padding: 10, elevation: 2, backgroundColor: colors.WHITE, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', margin: 10, marginTop: 1 },
  saleContainer: {
    backgroundColor: colors.TERTIARY,
    borderRadius: 10, flex: 3, margin: 9,//5,
    justifyContent: 'space-between', padding: 10, elevation: 2
  },
  icon: { color: colors.WHITE, fontSize: 35, marginRight: 10 },
  dataListContainer: { borderRadius: 10, padding: 10, elevation: 2, backgroundColor: colors.WHITE, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', margin: 10, marginTop: 1 }

})

export default TransactionCard;
