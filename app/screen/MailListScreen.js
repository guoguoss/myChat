/**
 * Created by JetBrains WebStorm.
 * Author: yin
 * Date: 17-9-7
 * Time: 下午8:07
 * Desc:
 */
import React, {Component} from "react";
import {Image, Text} from "react-native";
import commonStyles from "../utils/CommonStyles";

export default class MailListScreen extends Component {
    static navigationOptions = {
        tabBarLabel: '通讯录',
        tabBarIcon: ({ focused, tintColor }) => {
            if (focused) {
                return (
                    <Image style={commonStyles.tabBarIconSize} source={require('../images/contact-reverse.png')}/>
                );
            }
            return (
                <Image style={commonStyles.tabBarIconSize} source={require('../images/contact.png')}/>
            );
        }
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Text>MailListScreen</Text>
        );
    }

    componentDidMount() {
        //TODO 渲染完成
    }
}