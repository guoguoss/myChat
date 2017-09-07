/**
 * Created by JetBrains WebStorm.
 * Author: yin
 * Date: 17-9-6
 * Time: 下午6:27
 * Desc: 安卓toast
 */
import {ToastAndroid} from "react-native";

export default class ToastUtils {
    static show(content) {
        ToastAndroid.showWithGravity(content, ToastAndroid.SHORT, ToastAndroid.CENTER);
    }
}