/**
 * <plusmancn@gmail.com> created at 2017
 *
 * Copyright (c) 2017 plusmancn, all rights
 * reserved.
 *
 * @flow
 *
 * 个人资料页
 */

import React, {Component} from 'react';
import {StyleSheet, ScrollView, Image, View} from 'react-native';
import {ListItem, Button, Color, FontSize} from '../UiLibrary';
import ProfileItemEdit from './ProfileItemEdit.js';
import WebIM from "../Lib/WebIM";
import TitleBar from "../UiLibrary/TitleBar/index";

class Profile extends Component {
    constructor(props) {
        super(props);
        console.log(WebIM.conn);
        this.state = {
            nickname: WebIM.conn.context.userId,
            username: WebIM.conn.context.userId
        };
    }

    logout() {
        WebIM.conn.close();
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <TitleBar title="个人信息" backButton onBackPress={() => this.props.navigation.goBack()}/>
                <View style={styles.block}>
                    <ListItem.Label labelText="头像"
                                    rightComponent={() => (
                                        <Image style={styles.avatar} source={{uri: 'http://image-2.plusman.cn/app/im-client/empty-message.png'}}/>
                                    )}/>
                    <ListItem.Separator/>
                    <ListItem.Label
                        onPress={() => {
                            // this.props.navigator.push(ProfileItemEdit, '昵称');
                        }}
                        labelText="昵称"
                        rightComponent={this.state.nickname}/>
                    <ListItem.Separator/>
                    <ListItem.Label labelText="用户名" rightComponent={this.state.username}/>
                    <ListItem.Separator/>
                    <ListItem.Label labelText="socketId" rightComponent={'123123'}/>
                    <ListItem.Separator/>
                    <ListItem.Label labelText="用户ID" rightComponent={'123123'}/>
                </View>
                <ListItem.Header/>
                <Button onPress={this.logout.bind(this)}
                        isWithOutLine={false}
                        style={styles.logoutButton}
                        textStyle={styles.logoutTextStyle}>
                    退出登录
                </Button>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.BackgroundGrey
    },
    avatar: {
        borderWidth: 1,
        borderColor: Color.Grey,
        borderRadius: 6,
        height: 60,
        width: 60
    },
    logoutButton: {
        borderColor: Color.LittleGrey,
        backgroundColor: Color.White,
        borderWidth: 1,
        paddingVertical: 5
    },
    logoutTextStyle: {
        color: Color.Black,
        fontSize: FontSize.Main
    }
});

export default Profile;
