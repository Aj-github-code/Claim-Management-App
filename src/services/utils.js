import { Alert } from "react-native";

export class Utils {
    constructor() {
    }
    isStringEmpty(text) {
        if (text && text != null && (text).trim() != '') {
          return false;
        } else {
          return true;
        }
      }

      getInitials(name){
        if(!this.isStringEmpty(name)){
          let names = name.split(' ');
        //  console.log(names);
              let initials = names[0].substring(0, 1).toUpperCase();
          
          if (names.length > 1) {
              initials += names[names.length - 1].substring(0, 1).toUpperCase();
          }
          return initials; 
        }else{
          return ''
        }
               
      };
      addCommaSepetator(addcomma, message) {
        return addcomma ? message + ", " : message;
      }
      getRandomColor() {
        let letters = 'BCDEF'.split('');
                    let color = '#';
                    for (let i = 0; i < 6; i++ ) {
                        color += letters[Math.floor(Math.random() * letters.length)];
                    }
                    return color;
                   // return "hsl(" + Math.random() * 360 + ", 100%, 75%)";
       // return ('hsla(' + (Math.floor(Math.random()*360)) + ', 100%, 60%, 1)');
      }
      alertBuilder(title,message = "",okayText= "",cancelText="",askMeLater="") {
        return {
          title: title,
          message: message,
          okayText: okayText,
          cancelText: cancelText,
          askMeLater: askMeLater,
        };
      }
      popUpConfirm(alertBuilder,_action) {
        //EventRegister.emitEvent(APP_EVENTS.disableLoader);
        // if (Platform.OS === APP_PLATFORM.IOS) {
        //   setTimeout(() => {
        //     Alert.alert(this.languageCtrl.instant(alertBuilderObj.title), this.languageCtrl.instant(alertBuilderObj.message), [
        //       {
        //             text: this.languageCtrl.instant(alertBuilderObj.cancelText),
        //         onPress: () => _action(APP_ALERT_ACTION_RESULT.ACTION_NEGATIVE),
        //       },
        //       {
        //             text: this.languageCtrl.instant(alertBuilderObj.okayText),
        //         onPress: () => _action(APP_ALERT_ACTION_RESULT.ACTION_POSITIVE),
        //       },
        //     ]);
        //   }, APP_SYS_PROPS.iOS_AlertTimeout);
        // } else {
          Alert.alert(alertBuilder.title, alertBuilder.message, [
            {
              text: alertBuilder.cancelText,
              onPress: () => _action(0),
            },
            {
              text: alertBuilder.okayText,
              onPress: () => _action(1),
            },
          ]);
        }
    //  }


   
}
export const getFontStyles = (params)=>{
  //console.log('Params',params);
  const {  weight , style = 'normal' } = params ? params : '';
  const fontWeight =  weight ? weight  : 'Regular';
  const fontStyle =  style ? style : 'normal';
  //console.log('Weight',weight);

  const suffix = `${fontWeight}${fontStyle === 'italic' ? 'Italic' : ''}`;
  // console.log('SUFFIXXX',`${family}-${suffix}`)
  return { fontFamily: `` };
};