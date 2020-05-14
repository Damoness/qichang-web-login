import { Dimensions, InteractionManager } from "react-native";

export default class Utils {
  static colorWithAlpha(hex: string, alpha: number): string {
    let r = parseInt("0x" + hex.slice(1, 3));
    let g = parseInt("0x" + hex.slice(3, 5));
    let b = parseInt("0x" + hex.slice(5, 7));

    return `rgba(${r},${g},${b},${alpha})`;
  }

  static getRandomPhone() {
    let prefixArray = [
      "130",
      "131",
      "132",
      "133",
      "135",
      "137",
      "138",
      "170",
      "187",
      "189",
    ];
    let i = 10 * Math.random();
    let phone = prefixArray[i];

    for (let j = 0; j < 8; j++) {
      phone = phone + Math.floor(Math.random() * 10);
    }

    return phone;
  }

  static removeShadow() {
    return {
      shadowOffset: { height: 0, width: 0 },
      shadowColor: "transparent",
      shadowOpacity: 0,
      elevation: 0,
    };
  }

  static phoneIsValid = (phone: string): boolean => {
    let phoneReg = /^(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;

    return phoneReg.test(phone);
  };

  /**
   * 检查是否是合法的url
   * @param url
   * @returns {boolean}
   */
  static checkURL(url: string) {
    // var str = url;
    // //判断URL地址的正则表达式为:http(s)?://([\w-]+\.)+[\w-]+(/[\w- ./?%&=]*)?
    // //下面的代码中应用了转义字符"\"输出一个字符"/"
    // var Expression = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
    // var objExp = new RegExp(Expression);
    // if(objExp.test(str) == true){
    //     return true;
    // }else{
    //     return false;
    // }

    return url.startsWith("http");
  }

  static immediate(func: Function, wait: number) {
    var flag = true;
    var timeout: any = null;

    return function () {
      if (flag) {
        flag = false;
        return func.apply(this, arguments);
      }

      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(function () {
        flag = true;
      }, wait);
    };
  }

  static debounce(func: Function, wait: number) {
    let timeout: any;
    //console.log('timeout',timeout,arguments);
    return function () {
      let context = this;
      console.log(arguments, timeout);
      let args = arguments;

      if (timeout) clearTimeout(timeout);

      timeout = setTimeout(() => {
        func.apply(context, args);
      }, wait);
    };
  }

  static handleTime(time: string) {
    //time = "2019-11-27 16:29:15";
    const date = new Date(time.replace(/-/g, "/"));
    const seconds = date.getTime() / 1000;

    let nowDate = new Date();
    let nowSeconds = nowDate.getTime() / 1000;

    let difference = nowSeconds - seconds;

    let year = date.getFullYear();

    let month =
      date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1;
    let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    let hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    let minutes =
      date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();

    // let month =  date.getMonth() + 1;
    // let day =  date.getDate();
    // let hours = date.getHours();
    // let minutes = date.getMinutes();

    if (nowDate.getFullYear() != date.getFullYear()) {
      //前天及之前&非今年
      return `${year}-${month}-${day}`;
    } else if (nowDate.getMonth() != date.getMonth()) {
      //前天及之前&今年
      return `${month}-${day} ${hours}:${minutes}`;
    } else if (nowDate.getDate() != date.getDate()) {
      if (nowDate.getDate() == date.getDate() + 1) {
        //昨天
        return `昨天 ${hours}:${minutes}`;
      } else {
        //前天及之前&今年
        return `${month}-${day} ${hours}:${minutes}`;
      }
    } else if (difference > 5 * 60) {
      //5分钟外&当天内
      return `${hours}:${minutes}`;
    } else {
      //5分钟内
      return "刚刚";
    }
  }

  static runAfterInteractions(label: any, task: any) {
    const test = true;

    if (test) {
      //console.time(label);

      InteractionManager.runAfterInteractions(() => {
        //console.timeEnd(label);

        task && task();
      });
    } else {
      task && task();
    }
  }
}
