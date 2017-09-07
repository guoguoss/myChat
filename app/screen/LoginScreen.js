/**
 * Created by JetBrains WebStorm.
 * Author: yin
 * Date: 17-9-6
 * Time: 下午4:41
 * Desc:
 */
import React, {Component} from "react";
import {StyleSheet, View, TextInput, Button} from "react-native";
import WebIM from "../Lib/WebIM";
import StorageUtil from "../utils/StorageUtil";
import {NavigationActions} from "react-navigation";
import ToastUtils from "../utils/ToastUtils";

export default class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
        StorageUtil.get('username', (err, data) => {
            if (data) this.setState({username: data})
        });
        this.imListen();
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    onChangeText={text => this.setState({username: text})}
                    value={this.state.username}
                    placeholder='用户名'
                ></TextInput>
                <TextInput
                    secureTextEntry={true}
                    onChangeText={text => this.setState({password: text})}
                    value={this.state.password}
                    placeholder='密码'
                ></TextInput>
                <View style={styles.buttonContainer}>
                    <Button
                        style={styles.btnColumn}
                        title='登录'
                        onPress={() => this.login()}
                    ></Button>
                    <Button
                        style={styles.btnColumn}
                        title='注册'
                        onPress={() => this.toRegist()}
                    ></Button>
                </View>
            </View>
        );
    }

    componentDidMount() {
        //注册完成后登录自动输入账号密码
        /*const {params} = this.props.navigation.state;
         if (params) {
         this.setState(params);
         }*/
    }

    toRegist() {
        this.props.navigation.navigate('Regist');
    }

    login() {
        if (!this.state.username || !this.state.password) {
            ToastUtils.show('用户名和密码不能为空.');
            return;
        }

        WebIM.conn.open({
            apiUrl: WebIM.config.apiURL,
            user: this.state.username,
            pwd: this.state.password,
            appKey: WebIM.config.appkey,
            success: function () {
                console.log('登陆成功');
            }
        });
    }

    imListen() {
        WebIM.conn.listen({
            //连接成功
            onOpened: (msg) => {
                StorageUtil.set('username', WebIM.conn.context.userId);
                StorageUtil.set('token', msg.accessToken);
                // 出席后才能接受推送消息
                WebIM.conn.setPresence();
                // 清除所有路由状态,并跳转至actions中路由
                const resetAction = NavigationActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({routeName: 'Home'})
                    ]
                });
                NavigationActions.navigate({routeName: 'Home'});
                this.props.navigation.dispatch(resetAction);
            },
            // 出席消息
            onPresence: (msg) => {
                console.log('出席消息, ', msg);
                //对方收到请求加为好友
                if (msg.type === 'subscribe') {
                    WebIM.conn.subscribe({//需要反向添加对方好友
                        to: msg.from,
                        message : '[resp:true]'
                    });
                }
            },
            // 各种异常
            onError: (error) => {
                switch (error.type) {
                    case WebIM.statusCode.WEBIM_CONNCTION_OPEN_ERROR: {
                        ToastUtils.show('用户名密码不匹配,请重试.');
                    }
                }
                console.log('各种异常', error);
            },
            // 连接断开
            onClosed: (msg) => {
                console.log('onClosed');
            },
            // 更新黑名单
            onBlacklistUpdate: (list) => {
            },
            // 文本信息
            onTextMessage: (message) => {
                console.log('onTextMessage', message);
            },
            onPictureMessage: (message) => {
                console.log('onPictureMessage', message);
            }
        });
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#F0F0F0',
        justifyContent: 'center',
        padding: 20
    },
    buttonContainer: {
        flexDirection: 'row',
        paddingLeft: 20,
        paddingRight: 20,
        justifyContent: 'space-around'
    },
    btnColumn: {
        width: 200,
        textAlign: 'center',
        margin: 15,
        borderRadius: 3
    }
});