// @ts-nocheck
// import { Container, DatePicker, Icon } from 'native-base';
import * as React from 'react';
import { BackHandler, FlatList, StyleSheet, TouchableOpacity, View, Text, Pressable, Modal } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Dialog } from 'react-native-simple-dialogs';
import { API_CONSTANTS } from '../../assets/config/constants';
import Header from '../../components/Header';
import Api from '../../services/api';
import StorageController from '../../services/storage';
import * as GLOBAL from '../../assets/config/constants';
import moment from 'moment';
import { getFontStyles, Utils } from '../../services/utils';
// import Toast from 'react-native-simple-toast';
import AppText from '../../components/AppText';
import { colors } from '../../assets/config/colors';
import { Image } from 'react-native';
import TransactionCard from '../../components/TransactionCard';
import { Calendar } from 'react-native-calendars';


export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.storageCtrl = new StorageController;
    this.apiCtrl = new Api;
    this.utils = new Utils;
    this.handleBackButton = this.handleBackButton.bind(this)
    const didFocusSubscription = this.props.navigation?.addListener(
      'focus',
      payload => {
        this.getStorageDate();
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
      }
    )
    const didBlurSubscription = this.props.navigation?.addListener(
      'blur',
      payload => {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
      }
    );
    this.getStorageDate();
    //console.log('Role',value);
  }

  state = {
    showFilter: false,
    name: '',
    orderList: [],
    pendingOrderList: [],
    userSavings: [
      {
        amount: '',
        company_discount: ''
      }
    ],
    startdate: '',
    enddate: '',
    filterBy: '',
    currentDate: moment().format("YYYY-MM-DD"),
    showStartDateModal: false,
    showEndDateModal: false,
  }




  // handleBackButtonClick() {
  //     this.props.navigation.goBack(null);
  //     return true;
  // }


  getStorageDate() {
    this.storageCtrl.getItem('user_details').then(res => {
      // console.log('RESSS', res);
      if (res) {
        GLOBAL.userDetails = JSON.parse(res);
        this.setState({ name: GLOBAL.userDetails.name }, () => {
          this.getDashboardDetails(-1);
        });
      }
    })
  }

  getDashboardDetails(filterBy) {
    this.setState({ filterBy: filterBy });
    GLOBAL.loadingVisible.setState({ loading: true });
    this.apiCtrl.callAxios(API_CONSTANTS.dashboardData, { role: GLOBAL.userDetails.roles, filter: filterBy, start_date: this.state.startdate, end_date: this.state.enddate  }).then(response => {
      if (response.success) {
        console.log("CHECKING THIS ONE");
        console.log(response.data);
        this.setState({ userSavings: response.data.data }, () => {

        });
        GLOBAL.loadingVisible.setState({ loading: false });
      } else {
        console.log("CHECKING THIS ONE");
        console.log(response);
        GLOBAL.loadingVisible.setState({ loading: false });
        //show popup
      }
    });
    this.getOrderList(filterBy, this.state.startdate, this.state.enddate);
    this.getPendingOrderList(this.state.startdate, this.state.enddate);
  }

  getOrderList(filterBy, startDate, endDate) {
    GLOBAL.loadingVisible.setState({ loading: true });
    this.apiCtrl.callAxios(API_CONSTANTS.getOrderList, { role: GLOBAL.userDetails.roles, filter: filterBy, start_date: startDate, end_date: endDate }).then(response => {
      if (response.success && response.data.data.aaData) {
        let finalOrderList = [];
        response.data.data.aaData.map(item => {
          item.bgColor = this.utils.getRandomColor();
          finalOrderList.push(item)
        })
        this.setState({ orderList: finalOrderList.reverse() });
        GLOBAL.loadingVisible.setState({ loading: false });
      } else {
        GLOBAL.loadingVisible.setState({ loading: false });
        //show popup
      }
    })
  }

  getPendingOrderList(startDate, endDate) {
    this.apiCtrl.callAxios(API_CONSTANTS.pendingOrderList, { role: GLOBAL.userDetails.roles, start_date: startDate, end_date: endDate, is_active: 2, length: 1, start: 0, 'order[0][dir]': 'desc', 'order[0][column]': 'id' }).then(response => {
      if (response.success && response.data.data.aaData) {
        this.setState({ pendingOrderList: response.data.data.aaData }, () => {
        });
      }
    });
  }

  handleBackButton = () => {
    BackHandler.exitApp();
    return true;
  }

  //  _renderOrderList = (data) => {
  //    return (
  //     <TransactionCard data={data.item} roles={GLOBAL.userDetails.roles} />
  //     // <View style={styles.dataListContainer}>
  //     //   <View style={{ flexDirection: 'row' }}>
  //     //     <View style={[styles.roundContainer, { backgroundColor: data.item.bgColor }]}>
  //     //       <AppText style={styles.text}>{this.utils.getInitials(GLOBAL.userDetails.roles == 'customer' ? data.item.organisation : data.item.customer)}</AppText>
  //     //     </View>
  //     //     <View style={{ width: '70%' }}>
  //     //       <AppText style={{ ...getFontStyles({ weight: 'Bold' }), fontSize: 16 }}>{GLOBAL.userDetails.roles == 'customer' ? data.item.organisation : data.item.customer}</AppText>
  //     //       <AppText style={{ color: colors.TEXTCOLOR,fontSize:12 }}>{moment(data.item.transaction_date, 'DD-MM-YYYY hh:mm a').format('DD MMM YYYY, hh:mm a')}</AppText>
  //     //       <AppText style={{ marginTop: 5,fontSize:13 }}>Amount: &#8377;{parseInt(data.item.amount) + parseInt(data.item.customer_discount)} | {GLOBAL.userDetails.roles == 'customer' ? 'Saved: ': 'Discount: '}<AppText style={{ color: colors.SECONDARY, ...getFontStyles({ weight: 'Bold' }) }}>{GLOBAL.userDetails.roles == 'customer' ? '\u20B9'+data.item.customer_discount : '\u20B9'+data.item.company_discount}</AppText>
  //     //       </AppText>
  //     //     </View>
  //     //   </View>
  //     //   <AppText style={{ fontWeight: '700', textAlign: 'right' }}>&#8377;{this.getAmount(data.item)}</AppText>
  //     // </View>
  //   )
  // }



  getAmount(data) {
    if (GLOBAL.userDetails.roles == 'customer')
      return (data.amount);
    else
      return ((parseInt(data.amount) + parseInt(data.customer_discount)) - parseInt(data.company_discount));
  }

  _listEmptyComponent = () => {
    return (
      <AppText style={styles.noDataText}>No Data</AppText>
    )
  }

  _listFooterComponent = () => {
    return (
      <>
        {this.state.orderList.length >= 5 ? <AppText onPress={() => { this.props.navigation.push('OrderList', { filterBy: this.state.filterBy, startDate: this.state.startdate, endDate: this.state.enddate }) }} style={[{ color: '#2C62FF', textAlign: 'center', marginBottom: 5 }, styles.boldText]}>View All</AppText> : null}
      </>
    )
  }

  confirmOrder(order, action) {
    if (action == 1) {
      this.utils.popUpConfirm(this.utils.alertBuilder('Accept Order', 'Are you sure you want to accept this order?', 'Accept', 'Cancel'), (alertRes) => {
        if (alertRes == 1) {
          this.performAction(order, action);
        }
      })
    } else {
      this.utils.popUpConfirm(this.utils.alertBuilder('Reject Order', 'Are you sure you want to reject this order?', 'Reject', 'Cancel'), (alertRes) => {
        if (alertRes == 1) {
          this.performAction(order, action);
        }
      })
    }
  }

  performAction(order, action) {
    GLOBAL.loadingVisible.setState({ loading: true });
    this.apiCtrl.callAxios(API_CONSTANTS.confirmOrder, { order_id: order.id, status: action, role: GLOBAL.userDetails.roles }).then(response => {
      GLOBAL.loadingVisible.setState({ loading: false });
      if (response.data.success) {
        Toast.show(response.data.data);
        this.getDashboardDetails('daily')
      }
      // console.log('Response', response.data);    
    })
  }

  openStartDateCalenderDates(value) {
    this.setState({ showStartDateModal: value });
  }

  openEndDateCalenderDates(value) {
    this.setState({ showEndDateModal: value });
  }

  filterDataWithStartDateEndDate() {
    this.getDashboardDetails("-1");
    this.setState({ showFilter: false });
  }

  render() {
    return (
      <Container style={{ backgroundColor: colors.CONTAINER }}>
        <Header rightImage={true} text={"Hello, " + this.state.name} bckBtn={false}
        // rightBtnPress={() => { this.setState({ showFilter: true }) }} 
        // rightBtnIcon="filter" 
        // iconType="FontAwesome" 
        // rightBtnIcon2="search" 
        // rightBtnPress2={() => { this.props.navigation.push('Search') }} 
        />
        
        <View style={styles.topContainer}>
          {this.state.showFilter ? <Dialog
            overlayStyle={{ backgroundColor: 'transparent' }}
            animationType={'fade'}
            visible={this.state.showFilter}
            dialogStyle={styles.dialogStyles}
            contentStyle={{ padding: 0, paddingTop: 0 }}
            onTouchOutside={() => { this.setState({ showFilter: false }) }}>
            <View style={styles.container}>
             
              <TouchableOpacity onPress={() => { this.setState({ showFilter: false }); this.getDashboardDetails('daily') }} activeOpacity={.9} style={styles.menuContent}>
                <AppText style={styles.menuText}>Daily</AppText>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { this.setState({ showFilter: false }); this.getDashboardDetails('weekly') }} activeOpacity={.9} style={styles.menuContent}>
                <AppText style={styles.menuText}>Weekly</AppText>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { this.setState({ showFilter: false }); this.getDashboardDetails('monthly') }} activeOpacity={.9} style={styles.menuContent}>
                <AppText style={styles.menuText}>Monthly</AppText>
              </TouchableOpacity>

              
              {/* <View style={{ flexDirection: "column", margin: 5, alignItems: "center", justifyContent: "center" }}>
                  <Text style={{ marginTop: 5, fontWeight: "700" }}>Date Range</Text>

                  <TouchableOpacity onPress={()=> this.openStartDateCalenderDates(true)} style={{ marginLeft: 15, marginRight: 15, borderWidth: 1, borderColor: "light-gray", borderRadius: 3, height: 34, marginTop: 8, width: "100%", justifyContent: "center", alignItems: "flex-start", paddingLeft: 10, paddingRight: 10 }}>
                     <Text>{this.state.startdate == "" ? "Start Date" : this.state.startdate}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={()=> this.openEndDateCalenderDates(true)} style={{ marginLeft: 15, marginRight: 15, borderWidth: 1, borderColor: "light-gray", borderRadius: 3, height: 34, marginTop: 8, width: "100%", justifyContent: "center", alignItems: "flex-start", paddingLeft: 10, paddingRight: 10 }}>
                     <Text>{this.state.enddate == "" ? "End Date" : this.state.enddate}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={()=> this.filterDataWithStartDateEndDate()} style={{ width: 120, height: 34, alignItems: "center", justifyContent: "center", backgroundColor: colors.TERTIARY, borderRadius: 2, marginTop: 10 }}>
                     <Text style={{ fontWeight: "600", color: "#ffffff" }}>APPLY</Text> 
                  </TouchableOpacity>
              </View> */}
              
            </View>
          </Dialog> : null}



          {GLOBAL.userDetails && GLOBAL.userDetails.roles == 'customer' ?
            <View style={{
              backgroundColor: colors.TERTIARY,
              borderRadius: 10, flex: 6, margin: 9,//5,
              justifyContent: 'space-between', padding: 10, elevation: 2
            }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image style={{ width: 40, height: 40, marginRight: 10 }} source={require('../../assets/images/potli2.png')} />
                <View>

                  <AppText style={{ color: colors.WHITE, fontSize: 20, ...getFontStyles({ weight: 'Bold' }) }}>&#8377;{this.state.userSavings.amount ? this.state.userSavings.amount : 0}</AppText>
                  <AppText style={{ textAlign: 'left', color: colors.WHITE }}>Total Savings</AppText>

                </View>
              </View>

            </View> : <>
              <View style={styles.saleContainer}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Icon style={styles.icon} name="trending-up" type="MaterialCommunityIcons" />
                  <View>
                    <AppText style={{ color: colors.WHITE, fontSize: 20, ...getFontStyles({ weight: 'Bold' }) }}>
                      &#8377; {this.state.userSavings.amount ? this.state.userSavings.amount : 0}
                    </AppText>
                    <AppText style={{ textAlign: 'left', color: colors.WHITE }}>Sale</AppText>
                  </View>
                </View>

              </View>

              <View style={{
                backgroundColor: colors.SECONDARY,
                borderRadius: 10, flex: 3, margin: 9, justifyContent: 'space-between', padding: 10,//elevation: 2
              }}>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Icon style={styles.icon} name="person" type="MaterialIcons" />
                  <View>
                    <AppText style={[{ color: colors.WHITE, fontSize: 20 }, styles.boldText]}>
                      {this.state.userSavings.company_discount ? this.state.userSavings.company_discount : 0}
                    </AppText>
                    <AppText style={{ textAlign: 'left', color: colors.WHITE }}>Total Discount</AppText>
                  </View>
                </View>
              </View></>
          }
        </View>


        {this.state.pendingOrderList.length > 0 ? <View style={styles.middleContainer}>
          <AppText style={styles.boldText}>PENDING ORDERS</AppText>
          <Pressable onPress={() => this.props.navigation.push('PendingOrderList', { startDate: this.state.startdate, endDate: this.state.enddate })}>
            <Text style={{ color: '#2C62FF', textDecorationLine: "underline" }}>View All</Text>
          </Pressable>
        </View> : null}

        {this.state.pendingOrderList.map((item, index) => {
          return (
            <View key={index} style={styles.orderListContainer}>
              <View style={{ flexDirection: 'row' }}>
                <View style={[styles.roundContainer, { backgroundColor: this.utils.getRandomColor() }]}>
                  <AppText style={styles.text}>{this.utils.getInitials(GLOBAL.userDetails.roles == 'customer' ? item.organisation : item.customer)}</AppText>
                </View>
                <View>
                  <AppText style={[styles.boldText, { fontSize: 16 }]}>{GLOBAL.userDetails.roles == 'customer' ? item.organisation : item.customer}</AppText>

                  <AppText style={[styles.boldText, { fontSize: 16 }]}>&#8377; {item.amount}</AppText>
                  <AppText style={{ color: colors.TEXTCOLOR }}>{moment(item.transaction_date, 'DD-MM-YYYY hh:mm a').format('DD MMM YYYY, hh:mm a')}</AppText>
                </View>
              </View>
              <View>
                <Icon onPress={() => { this.confirmOrder(item, 1) }} name="md-checkmark-circle-outline" style={{ color: '#55B44A', fontSize: 30 }} type="Ionicons" />
                <Icon onPress={() => { this.confirmOrder(item, 0) }} name="close-circle-outline" style={{ color: '#E1323A', fontSize: 30 }} type="Ionicons" />
              </View>

            </View>
          )
        })}



        <View style={styles.middleContainer}>
          <AppText style={{ ...getFontStyles({ weight: 'Bold' }) }}>RECENT {GLOBAL.userDetails && GLOBAL.userDetails.roles == 'customer' ? 'TRANSACTIONS' : 'EARNINGS'}</AppText>

          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={{ paddingRight: 10 }} onPress={() => this.getDashboardDetails('-1') }>
              <Icon type={'FontAwesome'} name={'refresh'} style={{ color: colors.TERTIARY, fontSize: 20 }} />
            </TouchableOpacity>

            <TouchableOpacity style={{ paddingRight: 10 }} onPress={() => this.props.navigation.push('Search')}>
              <Icon type={'FontAwesome'} name={'search'} style={{ color: colors.TERTIARY, fontSize: 20 }} />

            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({ showFilter: true })} style={{ paddingRight: 10 }}>
              <Icon type={'FontAwesome'} name={'filter'} style={{ color: colors.TERTIARY, fontSize: 20 }} />
            </TouchableOpacity>
          </View>
          {/* {this.state.orderList.length >= 5 ? <AppText onPress={() => { this.props.navigation.push('OrderList', { data: this.state.orderList }) }} style={{ color: '#2C62FF' }}>View All</AppText> : null} */}
        </View>

        <FlatList
          style={{ flex: 1, marginBottom: 60 }}
          data={this.state.orderList.slice(0, 5)}
          //renderItem={item => this._renderOrderList(item)}
          renderItem={(item) => { return (<TransactionCard data={item.item} roles={GLOBAL.userDetails.roles} />) }}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={this._listEmptyComponent}
          ListFooterComponent={this._listFooterComponent}
        />

        {/* {this.state.orderList.length >= 5 ? <AppText onPress={() => { this.props.navigation.push('OrderList', { data: this.state.orderList }) }} style={{ color: '#2C62FF', textAlign: 'center' }}>View All</AppText> : null} */}

        <Modal visible={this.state.showStartDateModal} animationType="fade">
          <Calendar 
            style={{ borderRadius: 10, elevation: 4, margin: 40 }}
            onDayPress={ date => {
              this.setState({ startdate: date.dateString })
              this.openStartDateCalenderDates(false);
            }}
            maxDate={this.state.enddate == "" ? this.state.currentDate : this.state.enddate}
          />
        </Modal>

        <Modal visible={this.state.showEndDateModal} animationType="none">
          <Calendar 
            style={{ borderRadius: 10, elevation: 4, margin: 40 }}
            onDayPress={ date => {
              this.setState({ enddate: date.dateString })
              this.openEndDateCalenderDates(false);
            }}
            minDate={this.state.startdate == "" ? "1999-01-01" : this.state.startdate}
            maxDate={this.state.currentDate}
          />
        </Modal>

      </Container>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
    borderRadius: 8
  },
  dialogStyles: {
    paddingLeft: 10,
    paddingRight: 10,
    top: 170,
    position: 'absolute',
    width: 220,
    right: 20,
    backgroundColor: colors.WHITE,
  },
  menuText: {
    
    fontSize: 16,
    paddingLeft: 5,
    color: 'black',

    //  textAlign: 'left'
  },
  menuContent: {
    zIndex: 1,
    borderRadius: 8,
    paddingLeft: 0,
    padding: 10,
    paddingBottom: 10,
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderBottomWidth: 0.5,
    borderColor: '#cacaca',
  },
  noDataText: {
    textAlign: 'center',
    marginTop: '20%',
    fontSize: 16,
    ...getFontStyles({ weight: 'Bold' })
  },
  topContainer: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  middleContainer: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: 10 },
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

