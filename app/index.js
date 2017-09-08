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
import Profile from "./screen/Profile";
import ChatRoom from "./screen/ChatRoom";
import AddFriend from "./screen/AddFriend";

const RootStack = StackNavigator({
    Login: {
        screen: LoginScreen
    },
    Regist: {
        screen: RegistScreen
    },
    Home: {
        screen: HomeScreen
    },
    Profile: {
        screen: Profile
    },
    ChatRoom: {
        screen: ChatRoom
    },
    AddFriend: {
        screen: AddFriend
    }
}, {
    headerMode: 'none',
    initialRouteName: 'Login'
});

AppRegistry.registerComponent('myChat', () => RootStack);