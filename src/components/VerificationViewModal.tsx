import React, { Component } from 'react'
import { Text, View, Dimensions } from 'react-native'
import { SlideModal, Tip } from 'beeshell';
import VerificationView from './VerificationView';
import NetApi from '../NetApi';

const screenHeight = Dimensions.get('screen').height;

type Props={
    phone:string,
    onVerificationSuccess:()=>void
    verificationType? : 'login'|'reg'|'bind';
}

export default class VerificationViewModal extends Component<Props> {

    _slideModel:any

    open = ()=>{
        this._slideModel.open();
    }
    
    render() {

        const {phone,onVerificationSuccess,verificationType = 'login'} = this.props;

        return (
            <SlideModal
                   ref={(ref)=>this._slideModel=ref}
                    cancelable={true}
                    screenHeight={screenHeight}
                    styles={{
                        backdrop: [{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }],
                        content: { width: '100%',height:'100%',alignItems:'center',justifyContent:'center',marginBottom:100},
                    }}
                  >
                <VerificationView  
                    phone={phone}
                    onPressCancel={()=>{
                        this._slideModel.close();
                    }}  
                    onPressConfirm={(code)=>{

                        NetApi.getPhoneCode(phone,code,verificationType).then(data=>{

                            const result = data as any;

                            if(result.code === 200){//验证成功

                                this._slideModel.close(); //关闭弹窗
                                onVerificationSuccess && onVerificationSuccess();

                            }else{

                                Tip.show(result.msg);

                            }

                        })

                    }}
                />

               </SlideModal>
        )
    }
}
