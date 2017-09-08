/**
 * Created by JetBrains WebStorm.
 * Author: yin
 * Date: 17-9-8
 * Time: 下午3:01
 * Desc:
 */
import React, {Component, PropTypes} from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Color from "../Color/index";
import Icon from "react-native-vector-icons/FontAwesome";

export default class TitleBar extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        title: PropTypes.string,
        backButton: PropTypes.bool,
        onBackPress: PropTypes.func,
        rightButtonIcon: PropTypes.string,
        rightButtonText: PropTypes.string,
        onRightButtonPress: PropTypes.func
    };

    renderBackButton() {
        return (
            <TouchableOpacity onPress={this.props.onBackPress}>
                <Image style={styles.buttonStyle} source={require('../../images/go-back.png')}/>
            </TouchableOpacity>
        );
    }

    renderRightButton() {
        return (
            <TouchableOpacity onPress={this.props.onRightButtonPress}>
                <Image style={styles.buttonStyle} source={require('../../images/add.png')}/>
            </TouchableOpacity>
        );
    }

    renderRightTextBtn() {
        return (
            <TouchableOpacity onPress={this.props.onRightButtonPress}>
                <Text style={styles.textBtnStyle}>{this.props.rightButtonText}</Text>
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.leftComponent}>
                    {this.props.backButton ? this.renderBackButton() : null}
                </View>
                <View style={styles.centerComponent}>
                    <Text style={styles.titltText}>{this.props.title}</Text>
                </View>
                <View style={styles.rightComponent}>
                    {this.props.rightButtonIcon ? this.renderRightButton() : null}
                    {this.props.rightButtonText ? this.renderRightTextBtn() : null}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: Color.LittleGrey,
        top: 0,
        right: 0,
        left: 0,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    leftComponent: {
        flex: 1,
        alignItems: 'flex-start',
        marginLeft: 20
    },
    centerComponent: {
        flex: 1,
        alignItems: 'center'
    },
    rightComponent: {
        flex: 1,
        alignItems: 'flex-end',
        marginRight: 20
    },
    buttonStyle: {
        height: 20,
        width: 20
    },
    textBtnStyle: {
        color: Color.WechatGreen
    },
    titltText: {
        color: '#000',
        fontSize: 16,
        fontWeight: '500'
    }
});