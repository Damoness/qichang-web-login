import HttpUtils from "./HttpUtils";

export const baseURL = "http://api-app.qichangv.com";

//export const baseURL = "http://app-api.bxmauto.com";

export type SignInSuccess={ //登录成功
    summary:string,
    token:string,
    face: string,
    name: string,
    id:number,
    phone:string,
    is_bind_wx:boolean,
}


async  function  getPhoneCode(phone:string,code:string,cat:'login'|'reg'|'bind'){

    const query = {phone,code,cat};

    const url = baseURL + "/public/sms";

    return  await HttpUtils.post(url,query);
}


    /**
     * 登录 使用手机号,验证码
     * @param phone
     * @param code
     *
     */
  async function loginWithPhone(phone:string,code:string):Promise<{msg:string,code:number,data:SignInSuccess|null}>{

        const url = baseURL + "/login";

        return await HttpUtils.post(url,{phone,code});

  }


export default {
    getPhoneCode,
    loginWithPhone

};