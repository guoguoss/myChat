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
        screen: LoginScreen
    },
    Regist: {
        screen: RegistScreen
    },
    Home: {
        screen: HomeScreen
    }
}, {
    headerMode: 'none'
});

AppRegistry.registerComponent('myChat', () => RootStack);