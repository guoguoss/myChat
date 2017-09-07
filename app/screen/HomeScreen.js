/**
 * Created by JetBrains WebStorm.
 * Author: yin
 * Date: 17-9-6
 * Time: 下午6:16
 * Desc:
 */
import React, {Component} from "react";
import {StyleSheet, Button, Text, View, TextInput} from "react-native";
import StorageUtil from "../utils/StorageUtil";
import WebIM from "../Lib/WebIM";
import {NavigationActions, TabNavigator} from "react-navigation";
import {SessionListScreen, MailListScreen, MineScreen} from "./index";

const HomeTab = TabNavigator({
    SessionList: {
        screen: SessionListScreen
    },
    MailList: {
        screen: MailListScreen
    },
    Mine: {
        screen: MineScreen
    }
}, {
    tabBarPosition: 'bottom',
    backBehavior: false, //后退按钮是否会使Tab键切换到初始选项卡
    swipeEnabled: false,
    animationEnabled: false,
    tabBarOptions: {
        activeTintColor: '#45C018',
        inactiveTintColor: '#999999',
        showIcon: true,
        labelStyle: {
            fontSize: 12,
            marginTop: 0,
            marginBottom: 0,
        },
        tabStyle: {
            // backgroundColor: '#ffffff'
        },
        style: {
            marginBottom: -2,
            backgroundColor: '#FCFCFC',
        }
    }
});

export default HomeTab;

// export default class HomeScreen extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             username: '',
//             content: '',
//             target: ''
//         };
//         StorageUtil.get('username', (err, data) => {
//             this.setState({username: data});
//         });
//     }
//
//     render() {
//         return HomeTab;
//     }
//
//     componentDidMount() {
//         WebIM.conn.getRoster({
//             success: function ( roster ) {
//                 //获取好友列表，并进行好友列表渲染，roster格式为：
//                 console.log('-------------------好友列表-------------------');
//                 roster.forEach(friend => console.log(friend.name + ' '));
//             },
//         });
//     }
//
//     /**
//      * 添加好友
//      */
//     addFriend() {
//         WebIM.conn.subscribe({
//             to: this.state.target,
//             // Demo里面接收方没有展现出来这个message，在status字段里面
//             message: '加个好友呗!'
//         });
//     }
//
//     /**
//      * 发送单聊文本消息
//      */
//     send() {
//         const id = WebIM.conn.getUniqueId();                 // 生成本地消息id
//         const msg = new WebIM.message('txt', id);      // 创建文本消息
//         msg.set({
//             msg: this.state.content,                  // 消息内容
//             to: this.state.target,                          // 接收消息对象（用户id）
//             roomType: false,
//             success: function (id, serverMsgId) {
//                 console.log('send private text Success');
//             },
//             fail: function (e) {
//                 console.log("Send private text error");
//             }
//         });
//         msg.body.chatType = 'singleChat';
//         WebIM.conn.send(msg.body);
//     }
//
//     /**
//      * 退出登录
//      */
//     quit() {
//         WebIM.conn.close();
//         StorageUtil.delete('token');
//         // 清除所有路由状态,并跳转至actions中路由
//         const resetAction = NavigationActions.reset({
//             index: 0,
//             actions: [
//                 NavigationActions.navigate({routeName: 'Login'})
//             ]
//         });
//         this.props.navigation.dispatch(resetAction);
//     }
//
// }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 3
    },
    bodyContent: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    sendBtn: {}
});
