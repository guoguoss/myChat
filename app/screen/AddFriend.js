/**
 * Created by JetBrains WebStorm.
 * Author: yin
 * Date: 17-9-8
 * Time: 下午6:37
 * Desc:
 */
import React, {Component} from "react";
import {StyleSheet, View} from "react-native";
import {TextInput, TitleBar} from "../UiLibrary/index";
import WebIM from "../Lib/WebIM";
import ToastUtils from "../utils/ToastUtils";

export default class AddFriend extends Component {
    constructor(props) {
        super(props);
        this.state = {
            to: '',
            message: '加个好友呗!'
        };
    }

    componentDidMount() {
        //TODO 渲染完成
    }

    /**
     * 确认添加
     */
    confirmAdd() {
        if (!this.state.to) {
            ToastUtils.show('请输入对方用户名');
            return;
        }
        WebIM.conn.subscribe(this.state);
        ToastUtils.show('已发送添加请求');
        this.props.navigation.goBack()
    }

    render() {
        return (
            <View>
                <TitleBar title="添加好友"
                          backButton
                          onBackPress={() => this.props.navigation.goBack()}
                          rightButtonText="添加"
                          onRightButtonPress={this.confirmAdd.bind(this)}/>
                <TextInput.Line
                    onChangeText={text => this.setState({to: text})}
                    placeholder="请输入对方用户名..."
                />
                <TextInput.Line
                    onChangeText={text => this.setState({message: text})}
                    value={this.state.message}
                    placeholder="说点什么..."
                />
            </View>
        );
    }
}

const styles = StyleSheet.create();