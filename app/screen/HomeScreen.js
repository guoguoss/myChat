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
import {NavigationActions} from "react-navigation";

export default class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            content: '',
            target: ''
        };
        StorageUtil.get('username', (err, data) => {
            this.setState({username: data});
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>用户名: {this.state.username}</Text>
                <TextInput value={this.state.target}
                           onChangeText={text => this.setState({target: text})}
                           placeholder="目标用户名"/>
                <Button title="添加好友" onPress={() => this.addFriend()}/>
                <TextInput value={this.state.content}
                           onChangeText={text => this.setState({content: text})}
                           placeholder="发送内容"/>
                <Button title="发送" onPress={() => this.send()}/>
                <Button title="退出" onPress={() => this.quit()}/>
            </View>
        );
    }

    componentDidMount() {
        WebIM.conn.getRoster({
            success: function ( roster ) {
                //获取好友列表，并进行好友列表渲染，roster格式为：
                console.log('-------------------好友列表-------------------');
                roster.forEach(friend => console.log(friend.name + ' '));
            },
        });
    }

    /**
     * 添加好友
     */
    addFriend() {
        WebIM.conn.subscribe({
            to: this.state.target,
            // Demo里面接收方没有展现出来这个message，在status字段里面
            message: '加个好友呗!'
        });
    }

    /**
     * 发送单聊文本消息
     */
    send() {
        const id = WebIM.conn.getUniqueId();                 // 生成本地消息id
        const msg = new WebIM.message('txt', id);      // 创建文本消息
        msg.set({
            msg: this.state.content,                  // 消息内容
            to: this.state.target,                          // 接收消息对象（用户id）
            roomType: false,
            success: function (id, serverMsgId) {
                console.log('send private text Success');
            },
            fail: function (e) {
                console.log("Send private text error");
            }
        });
        msg.body.chatType = 'singleChat';
        WebIM.conn.send(msg.body);
    }

    /**
     * 退出登录
     */
    quit() {
        WebIM.conn.close();
        StorageUtil.delete('token');
        // 清除所有路由状态,并跳转至actions中路由
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({routeName: 'Login'})
            ]
        });
        this.props.navigation.dispatch(resetAction);
    }

}

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
