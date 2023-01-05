import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Component } from 'react';
import { API_CONSTANTS } from '../assets/config/constants';
import StorageController from './storage';
// import Toast from 'react-native-simple-toast';
import { Alert } from 'react-native';

const axiosRequestConfig = {
  headers: { 'Content-Type': 'application/json' }
}
export default class Api extends Component {
    constructor(props) {
        super(props);
        this.storageCtrl = new StorageController;
      }
      


    //   callService(endPoint, reqData){
    //     return new Promise(resolve => {
    //       console.log('CHECK');
    //       if (NETWORK_STATE_isConnected) {
    //         resolve(this.callAxios(endPoint, reqData));
    //       } else {
    //         this.eventCtrl.publishEvent(APP_EVENTS.disableLoader);
    //         this.utils.popUpConfirm(new AlertBuilderModel(this.languageCtrl.instant('error_network_title'),
    //           this.languageCtrl.instant('error_network_message'),
    //           this.languageCtrl.instant('retryButtonKey'),
    //           this.languageCtrl.instant('okButtonKey')
    //         ), (_action: alertAction) => {
    //           console.log(_action)
    //         }
    
    //         );
    //       }
    //     });
    //     //return axios.post(BASE_URL+url)
    //   }

      getBaseUrl(){
        return API_CONSTANTS.BASE_URL;
      }
    
      getToken(){
        return new Promise((resolve,reject)=>{
          this.storageCtrl.getItem('token').then(token=>{
          //  console.log(token)
            resolve(token)
          })
        })
        
      }


      callAxios(endPoint, reqData, auth=true){
        return new Promise((resolve, reject) => {
          Promise.all([this.getBaseUrl(),this.getToken()])
            .then(data => {
              
              // console.log('================================>');
              // console.log('URL: ' + data[0] + endPoint);
            //  console.log('TOKEN: ' + data[1]);
              const reqDataHeader = {
                ...reqData,
              };
              // console.log('Request Body : ' + JSON.stringify(reqDataHeader));
              // console.log('================================>');
              const authtoken = auth ?  'Bearer '+ data[1] : "";
              
              if ( data[0] != null) {
                
                axios
                  .post(
                    data[0] + endPoint,
                    { ...reqData},                    
                    {
                      headers: { 'Content-Type': 'application/json',
                      'Authorization': authtoken
                    }
                  }
                  )
                  .then((response) => {
                    //  console.log('Request Response', response.data);
                    if(response.data.access_token){
                      resolve({success: true, data: response.data, message: response.data.message});
                    } if(response.data.aaData){
                      resolve({success: true, data: response.data});
                    }else if(response.data.status === "success"){
                      resolve({success: true, data: response.data, message: response.data.message});
                    }else{
                      // Alert.alert(''+response.data.message);
                      resolve({success: false, data: response.data, message: response.data.message});
                    }                   
                  
                  })
                  .catch((err) => {
                    //resolve({success: false, data: err.message});
                    resolve({success: false, data:'Some Error occured!'});
                  });
              } else {
                resolve({success: false, data: 'Some Error occured!'});
              }
            })
            .catch(err => {
              console.log(err);
              // console.log(err);
            });
        });
      }
      callAxiosGet(endPoint, auth=true){
        return new Promise((resolve, reject) => {
          Promise.all([this.getBaseUrl(),this.getToken()])
            .then(data => {
              // console.log(data);
              // console.log('================================>');
              // console.log('URL: ' + data[0] + endPoint);
             // console.log('TOKEN: ' + data[1]);
              // const reqDataHeader = {
              //   ...reqData,
              // };
             //console.log('Request Body : ' + JSON.stringify(reqDataHeader));
              // console.log('================================>');
              const authtoken = auth ?  'Bearer '+data[1] : "";
              if (data[0] && data[0] != null) {
                axios
                  .get(
                    data[0] + endPoint,                                     
                    {
                      headers: { 'Content-Type': 'application/json',
                      'Authorization':authtoken
                    }
                  }
                  )
                  .then((response) => {
                    //  console.log('Request Respomse', response);
                     if(response.data.success){
                      resolve({success: true, data: response.data});
                     }else{
                      resolve({success: false, data: response.data});
                     }                   
                    
                  })
                  .catch((err) => {
                    //resolve({success: false, data: err.message});
                    resolve({success: false, data:'Some Error occured!'});
                  });
              } else {
                resolve({success: false, data: 'Some Error occured!'});
              }
            })
            .catch(err => {
              // console.log(err);
              // console.log(err);
            });
        });
      }
      callAxiosWithoutSession(endPoint, reqData){
        console.log(endPoint,' ',reqData)
        return new Promise((resolve, reject) => {
          Promise.all([this.getBaseUrl()])
            .then(data => {
              console.log(data);
              console.log('================================>');
              console.log('URL: ' + data[0] + endPoint);
              const reqDataHeader = {
                ...reqData,
              };
              console.log('Request Body : ' + JSON.stringify(reqDataHeader));
              console.log('================================>');
              
              if (data[0] && data[0] != null) {
                axios
                  .post(
                    data[0] + endPoint,
                    { ...reqData},                    
                    axiosRequestConfig
                  )
                  .then((response) => {
                     console.log('Request Respomse', response);
                     if(response.data.success){
                      resolve({success: true, data: response.data});
                     }else{
                      resolve({success: false, data: response.data});
                     }                   
                    
                  })
                  .catch(err => {
                   // console.log('Request Respomse', err);
                   // resolve({success: false, data: err.message});
                    resolve({success: false, data:'Some Error occured!'});
                  });
              } else {
                resolve({success: false, data: 'Some Error occured!'});
              }
            })
            .catch(err => {
              console.log(err);
              console.log(err);
            });
        });
      }

      callAxiosGetWithoutSession(endPoint){
        console.log(endPoint)
        return new Promise((resolve, reject) => {
          Promise.all([this.getBaseUrl()])
            .then(data => {
              console.log(data);
              console.log('================================>');
              console.log('URL: ' + data[0] + endPoint);            
              
              if (data[0] && data[0] != null) {
                axios
                  .get(
                    data[0] + endPoint,                            
                  )
                  .then((response) => {
                     console.log('Request Respose', response.data);
                     if(response.data.status === "success"){
                      resolve({success: true, data: response.data});
                     }else{
                      resolve({success: false, data: response.data});
                     }                   
                    
                  })
                  .catch(err => {
                   console.log('Requests Respomse', err);
                   // resolve({success: false, data: err.message});
                    resolve({success: false, data:'Some Error occured!'});
                  });
              } else {
                resolve({success: false, data: 'Some Error occured!'});
              }
            })
            .catch(err => {
              console.log(err);
              console.log(err);
            });
        });
      }
//   callAxios = (url,requestParams) => {
//     return new Promise((resolve) => {
//       this.strCtrl.getItem("CID").then(res=>{
//         let response = {status:false,data:""}
//         const api_url = API_CONSTANTS.BASE_URL+url + url
//         axios.get(api_url)
//           .then((resJson) => {
//             const res = resJson.data;
//             console.log("REQUEST URL ====>",api_url)
//             //console.log("REQUEST RESPONSE ====>",res)
//             if(res.code==1){
//               response = {status:true,data:res.data,totalcount:res.totalcount,loadmore:res.loadmore,totalproducts:res.totalproducts}
//               resolve(response)
//             } else {
//               //this.utils.popupAlert1(res.message)
//               Toast.show(res.message+" 🍺",Toast.LONG)
//               response = {status:false,data:res.message}
//               resolve(response)
//             }
//           })
//           .catch(e => {
//             response = {status:false,data:e}
//             resolve(response)
//           })
//       })      
//     })
    
//   }
// }
    }