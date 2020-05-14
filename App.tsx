import React from 'react';
import { StyleSheet,View} from 'react-native';
import SignInScreen from './src/SignInScreen';

export default function App() {
  return (
    <View style={styles.container}>
     <SignInScreen 
        onPressQuit={()=>{

        }}
        onSignInSuccess={(userInfo)=>{

          var url:string = window.location.href;
        

          if(url.includes('redirect_uri')){

            const redirect_uri = url.split('?')[1].split('=')[1]

            if(redirect_uri){
  
                const url = `${redirect_uri}?token=${userInfo.token}`;
                console.log(url);
                window.location.href=url;
  
            }

          }else{

            alert('请提供登录成功回调地址');

          }


        }}
        onPressUserAgreement={()=>{


        }}
     />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
