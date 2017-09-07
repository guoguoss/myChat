/**
 * Created by JetBrains WebStorm.
 * Author: yin
 * Date: 17-9-6
 * Time: 下午4:41
 * Desc:
 */
import React, {Component} from "react";
import {Button, StyleSheet, TextInput, View} from "react-native";
import ToastUtils from "../utils/ToastUtils";
import WebIM from "../Lib/WebIM";
import {NavigationActions} from "react-navigation";
import StorageUtil from "../utils/StorageUtil";

export default class RegistScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nickname: '',
            username: '',
            password: '',
            cPassword: ''
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    onChangeText={text => this.setState({nickname: text})}
                    placeholder='昵称'
                ></TextInput>
                <TextInput
                    onChangeText={text => this.setState({username: text})}
                    placeholder='用户名'
                ></TextInput>
                <TextInput
                    secureTextEntry={true}
                    onChangeText={text => this.setState({password: text})}
                    placeholder='密码'
                ></TextInput>
                <TextInput
                    secureTextEntry={true}
                    onChangeText={text => this.setState({cPassword: text})}
                    placeholder='确定密码'
                ></TextInput>
                <Button
                    style={styles.button}
                    title='注册'
                    onPress={() => this.regist()}
                ></Button>
            </View>
        );
    }

    componentDidMount() {
        //TODO 渲染完成
    }

    regist() {
        if (!this.state.nickname || !this.state.username || !this.state.password || !this.state.cPassword) {
            ToastUtils.show('昵称、用户名和密码不能为空.');
            return;
        }
        if (this.state.password != this.state.cPassword) {
            ToastUtils.show('两次密码输入不一致.');
            return;
        }
        var options = {
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
                this.props.navigation.dispatch(resetAction);
            },
            error: res => {
                console.log(res);
                if (typeof(res.data) == 'string' && res.data.indexOf('username be unique') != -1) {
                    ToastUtils.show('用户名已被占用,请重试.')
                } else {
                    ToastUtils.show('注册失败,请重试.');
                }
            }
        };
        WebIM.utils.registerUser(options);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#F0F0F0',
        justifyContent: 'center',
        padding: 20
    }
});