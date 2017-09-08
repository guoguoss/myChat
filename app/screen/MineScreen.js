/**
 * Created by JetBrains WebStorm.
 * Author: yin
 * Date: 17-9-7
 * Time: 下午8:07
 * Desc:
 */
import React, {Component} from "react";
import {StyleSheet, Image, ScrollView, Text, TouchableHighlight, View} from "react-native";
import commonStyles from "../utils/CommonStyles";
import {TitleBar, Color, FontSize, ListItem} from "../UiLibrary";
import StorageUtil from "../utils/StorageUtil";
import {NavigationActions} from "react-navigation";
import WebIM from "../Lib/WebIM";

export default class MineScreen extends Component {
    static navigationOptions = {
        tabBarLabel: '我的',
        tabBarIcon: ({focused, tintColor}) => {
            if (focused) {
                return (
                    <Image style={commonStyles.tabBarIconSize} source={require('../images/setting-reverse.png')}/>
                );
            }
            return (
                <Image style={commonStyles.tabBarIconSize} source={require('../images/setting.png')}/>
            );
        }
    };

    constructor(props) {
        super(props);
        const conn = WebIM.conn;
        this.state = {
            userId: conn.context.userId
        };
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <TitleBar title="我的"/>
                <TouchableHighlight onPress={() => this.props.navigation.navigate('Profile')}>
                    <View style={[styles.cell]}>
                        <View style={styles.leftBox}>
                            <Image source={{uri: 'http://image-2.plusman.cn/app/im-client/empty-message.png'}}
                                   style={styles.avatar}/>
                            <View style={styles.userInfo}>
                                <Text style={styles.name}> {this.state.userId} </Text>
                                <Text style={styles.info}> 手机号: 123123 </Text>
                            </View>
                        </View>

                        <ListItem.Arrow/>
                    </View>
                </TouchableHighlight>
                <ListItem.Header/>

                <ListItem.Label
                    onPress={() => { }}
                    icon="http://image-2.plusman.cn/app/im-client/blue-settings.png!icon3x"
                    labelText="设置"
                />
                <ListItem.Separator/>
            </ScrollView>
        );
    }

    componentDidMount() {
        //TODO 渲染完成
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.BackgroundGrey
    },
    cell: {
        backgroundColor: Color.White,
        borderWidth: 1,
        borderColor: Color.LittleGrey,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 15
    },
    avatar: {
        borderWidth: 1,
        borderColor: Color.LightGrey,
        borderRadius: 6,
        marginRight: 15,
        height: 60,
        width: 60
    },
    leftBox: {
        flexDirection: 'row',
        alignItems: 'stretch'
    },
    userInfo: {
        justifyContent: 'space-between',
        marginVertical: 3
    },
    name: {
        fontSize: FontSize.Content,
        fontWeight: '500'
    },
    info: {
        fontSize: FontSize.Annotation
    }
});