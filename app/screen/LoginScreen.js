/**
 * Created by JetBrains WebStorm.
 * Author: yin
 * Date: 17-9-6
 * Time: 下午4:41
 * Desc:
 */
import React, {Component} from "react";
import {StyleSheet, View, Animated} from "react-native";
import WebIM from "../Lib/WebIM";
import StorageUtil from "../utils/StorageUtil";
import {NavigationActions} from "react-navigation";
import ToastUtils from "../utils/ToastUtils";
import {getPlatformValue} from "../utils/index";
import {BackgroundWrapper, AlertStatus, Heading, Logo, Input, Button} from "../components/index";
import Icon from 'react-native-vector-icons/FontAwesome';

export default class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            animation: {
                usernamePostionLeft: new Animated.Value(795),
                passwordPositionLeft: new Animated.Value(905),
                loginPositionTop: new Animated.Value(1402),
                statusPositionTop: new Animated.Value(1542)
            }
        };
        StorageUtil.get('username', (err, data) => {
            if (data) this.setState({username: data})
        });
        StorageUtil.get('token', (err, data) => {
           if (data) {
               WebIM.conn.open({
                   apiUrl: WebIM.config.apiURL,
                   user: this.state.username,
                   accessToken: data,
                   appKey: WebIM.config.appkey
               });
           }
        });
        this.imListen();
    }

    componentDidMount() {
        const timing = Animated.timing;
        Animated.parallel([
            timing(this.state.animation.usernamePostionLeft, {
                toValue: 0,
                duration: 700
            }),
            timing(this.state.animation.passwordPositionLeft, {
                toValue: 0,
                duration: 900
            }),
            timing(this.state.animation.loginPositionTop, {
                toValue: 0,
                duration: 700
            }),
            timing(this.state.animation.statusPositionTop, {
                toValue: 0,
                duration: 700
            })

        ]).start();
    }

    /**
     * IM事件监听
     */
    imListen() {
        WebIM.conn.listen({
            //连接成功
            onOpened: (msg) => {
                console.log('连接成功, ', msg);
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
                this.props.navigation.dispatch(resetAction);
            },
            // 出席消息
            onPresence: (msg) => {
                console.log('出席消息, ', msg);

                //对方收到请求加为好友
                if (msg.type === 'subscribe') {
                    WebIM.conn.getRoster({
                        success: roster => {
                            console.log('好友列表:', roster);
                            const userIds = [];
                            roster.forEach(item => {
                                userIds.push(item.name);
                            });
                            if (userIds.indexOf(msg.from) == -1) {
                                WebIM.conn.subscribe({//需要反向添加对方好友
                                    to: msg.from,
                                    message: '[resp:true]'
                                });
                                ToastUtils.show(`处理${msg.from}的好友申请成功`);
                            }
                        }
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
                console.log('连接断开, ', msg);
                StorageUtil.delete('token');
                // 清除所有路由状态,并跳转至actions中路由
                const resetAction = NavigationActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({routeName: 'Login'})
                    ]
                });
                this.props.navigation.dispatch(resetAction);
            },
            // 更新黑名单
            onBlacklistUpdate: (list) => {
            },
            // 文本信息
            onTextMessage: (message) => {
                console.log('onTextMessage', message);
                ToastUtils.show(`收到来自${message.from}的消息:${message.data}`);
            },
            onPictureMessage: (message) => {
                console.log('onPictureMessage', message);
            }
        });
    }

    /**
     * 注册
     */
    handlePressSignUp() {
        this.props.navigation.navigate('Regist');
    }

    /**
     * 输入变化
     */
    handleChangeInput(stateName, text) {
        this.setState({[stateName]: text});
    }

    /**
     * 登录
     */
    handePressSignIn() {
        if (!this.state.username || !this.state.password) {
            ToastUtils.show('用户名和密码不能为空.');
            return;
        }

        WebIM.conn.close();
        WebIM.conn.open({
            apiUrl: WebIM.config.apiURL,
            user: this.state.username,
            pwd: this.state.password,
            appKey: WebIM.config.appkey
        });
    }

    render() {
        return <BackgroundWrapper>
            <View style={styles.loginContainer}>
                <Logo/>
                <Heading marginTop={16} color="#ffffff" textAlign="center">
                    {'<RN myChat>'}
                </Heading>
                <View style={styles.formContainer}>
                    <Animated.View style={{position: 'relative', left: this.state.animation.usernamePostionLeft}}>
                        <Input label="用户名"
                               icon={<Icon name="user"/>}
                               value={this.state.username}
                               onChange={this.handleChangeInput.bind(this, 'username')}
                        />
                    </Animated.View>
                    <Animated.View style={{position: 'relative', left: this.state.animation.passwordPositionLeft}}>
                        <Input label="密码"
                               icon={<Icon name="key"/>}
                               value={this.state.password}
                               marginTop={23}
                               onChange={this.handleChangeInput.bind(this, 'password')}
                               secureTextEntry
                        />
                    </Animated.View>
                    <Animated.View style={{position: 'relative', top: this.state.animation.loginPositionTop}}>
                        <Button marginTop={60} onPress={this.handePressSignIn.bind(this)}>登录</Button>
                    </Animated.View>
                </View>
            </View>
            <Animated.View style={{position: 'relative', marginBottom: 25, top: this.state.animation.statusPositionTop}}>
                <AlertStatus textHelper="还没有账户" textAction="去注册"
                             onPressAction={this.handlePressSignUp.bind(this)}/>
            </Animated.View>
        </BackgroundWrapper>
    }

}

const styles = StyleSheet.create({
    loginContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        paddingTop: 49,
    },
    formContainer: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        marginTop: getPlatformValue('android', 25, 45)
    }
});