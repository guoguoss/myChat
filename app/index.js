/**
 * Created by JetBrains WebStorm.
 * Author: yin
 * Date: 17-9-6
 * Time: 下午4:35
 * Desc:
 */
import {AppRegistry} from "react-native";
import {StackNavigator} from "react-navigation";
import RegistScreen from "./screen/RegistScreen";
import LoginScreen from "./screen/LoginScreen";
import HomeScreen from "./screen/HomeScreen";

const RootStack = StackNavigator({
    Login: {
        screen: LoginScreen,
        navigationOptions: ({navigation}) => ({
            title: '登录'
        })
    },
    Regist: {
        screen: RegistScreen,
        navigationOptions: ({navigation}) => ({
            title: '注册'
        })
    },
    Home: {
        screen: HomeScreen,
        navigationOptions: ({navigation}) => ({
            title: '主页'
        })
    }
});

AppRegistry.registerComponent('myChat', () => RootStack);