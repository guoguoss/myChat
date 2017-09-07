/**
 * Created by JetBrains WebStorm.
 * Author: yin
 * Date: 17-9-6
 * Time: 下午9:24
 * Desc:
 */
import {AsyncStorage} from 'react-native';

export default class StorageUtil {
    /**
     * 获取
     * @param key
     * @returns {Promise<T>|*|Promise.<TResult>}
     */
    static get(key, callback) {
        AsyncStorage.getItem(key, (error, object) => {
            callback(error, JSON.parse(object));
        })
    }


    /**
     * 保存
     * @param key
     * @param value
     * @returns {*}
     */
    static set(key, value) {
        return AsyncStorage.setItem(key, JSON.stringify(value));
    }


    /**
     * 更新
     * @param key
     * @param value
     * @returns {Promise<T>|Promise.<TResult>}
     */
    static update(key, value) {
        StorageUtil.set(key, value);
    }


    /**
     * 删除
     * @param key
     * @returns {*}
     */
    static delete(key) {
        return AsyncStorage.removeItem(key);
    }
}
