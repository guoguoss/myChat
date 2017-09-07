/**
 * Created by JetBrains WebStorm.
 * Author: yin
 * Date: 17-9-6
 * Time: 下午4:41
 * Desc:
 */
import React, {Component} from "react";
import {StyleSheet, Animated, View} from "react-native";
import ToastUtils from "../utils/ToastUtils";
import WebIM from "../Lib/WebIM";
import {NavigationActions} from "react-navigation";
import StorageUtil from "../utils/StorageUtil";
import {BackgroundWrapper, Button, Heading, Input, Logo} from "../components/index";
import {getPlatformValue} from "../utils/index";
import Icon from "react-native-vector-icons/FontAwesome";

export default class RegistScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nickname: '',
            username: '',
            password: '',
            cPassword: '',
            animation: {
                headerPositionTop: new Animated.Value(-148),
                formPositionLeft: new Animated.Value(614),
                buttonPositionTop: new Animated.Value(1354)
            }
        };
    }

    componentDidMount() {
        Animated.timing(this.state.animation.headerPositionTop, {
            toValue: 0,
            duration: 725,
            delay: 100
        }).start();
        Animated.timing(this.state.animation.formPositionLeft, {
            toValue: 0,
            duration: 700,
            delay: 120
        }).start();
        Animated.timing(this.state.animation.buttonPositionTop, {
            toValue: 0,
            duration: 600,
            delay: 130
        }).start();
    }

    unmountComponent(callback) {
        const timing = Animated.timing;
        Animated.parallel([
            timing(this.state.animation.headerPositionTop, {
                toValue: -148,
                duration: 400,
                delay: 100
            }),
            timing(this.state.animation.formPositionLeft, {
                toValue: 614,
                duration: 500,
                delay: 120
            }),
            timing(this.state.animation.buttonPositionTop, {
                toValue: 1354,
                duration: 400,
                delay: 130
            })
        ]).start(callback);
    }

    handleBack() {
        this.props.navigation.goBack();
    }

    handleRegister() {
        if (!this.state.nickname || !this.state.username || !this.state.password || !this.state.cPassword) {
            ToastUtils.show('昵称、用户名和密码不能为空.');
            return;
        }
        if (this.state.password !== this.state.cPassword) {
            ToastUtils.show('两次密码输入不一致.');
            return;
        }
        const options = {
            apiUrl: WebIM.config.apiURL,
            appKey: WebIM.config.appkey,
            nickname: this.state.nickname,
            username: this.state.username,
            password: this.state.password,
            success: res => {
                //清除所有路由状态,并跳转至actions中路由
                const resetAction = NavigationActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({routeName: 'Login'})
                    ]
                });
                StorageUtil.set('username', this.state.username);
                ToastUtils.show('注册成功.');
                this.unmountComponent(() => this.props.navigation.dispatch(resetAction));
            },
            error: res => {
                console.log(res);
                if (typeof(res.data) === 'string' && res.data.indexOf('username be unique') !== -1) {
                    ToastUtils.show('用户名已被占用,请重试.')
                } else {
                    ToastUtils.show('注册失败,请重试.');
                }
            }
        };
        WebIM.utils.registerUser(options);
    }

    handleChangeInput(stateName, text) {
        this.setState({
            [stateName]: text
        });
    }

    render() {
        return <BackgroundWrapper iconLeft="arrow-circle-left" onPressIcon={this.handleBack.bind(this)}>
            <View style={loginStyle.loginContainer}>
                <Animated.View style={{position: 'relative', top: this.state.animation.headerPositionTop}}>
                    <Heading color="#ffffff" textAlign="center">
                        注册
                    </Heading>
                </Animated.View>
                <Logo marginTop={25}/>
                <View style={loginStyle.formContainer}>
                    <Animated.View style={{position: 'relative', left: this.state.animation.formPositionLeft}}>
                        <Input label="昵称"
                               icon={<Icon name="user-secret"/>}
                               value={this.state.nickname}
                               onChange={this.handleChangeInput.bind(this, 'nickname')}
                        />
                        <Input label="用户名"
                               icon={<Icon name="user"/>}
                               value={this.state.username}
                               onChange={this.handleChangeInput.bind(this, 'username')}
                        />
                        <Input label="密码"
                               icon={<Icon name="key"/>}
                               value={this.state.password}
                               onChange={this.handleChangeInput.bind(this, 'password')}
                               secureTextEntry
                        />
                        <Input label="确认密码"
                               icon={<Icon name="lock"/>}
                               value={this.state.cPassword}
                               onChange={this.handleChangeInput.bind(this, 'cPassword')}
                               secureTextEntry
                        />
                    </Animated.View>
                    <Animated.View style={{position: 'relative', top: this.state.animation.buttonPositionTop}}>
                        <Button marginTop={getPlatformValue('android', 25, 38)} width={200}
                                onPress={this.handleRegister.bind(this)}>
                            注册
                        </Button>
                    </Animated.View>
                </View>
            </View>
        </BackgroundWrapper>
    }
}

const loginStyle = StyleSheet.create({
    loginContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        paddingTop: getPlatformValue('android', 10, 30),
    },
    formContainer: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        marginTop: getPlatformValue('android', 5, 34)
    }
});