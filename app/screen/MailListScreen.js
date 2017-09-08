/**
 * Created by JetBrains WebStorm.
 * Author: yin
 * Date: 17-9-7
 * Time: 下午8:07
 * Desc:
 */
import React, {Component} from "react";
import {FlatList, Image, Text, View} from "react-native";
import commonStyles from "../utils/CommonStyles";
import {TitleBar, ListItem} from "../UiLibrary";
import WebIM from "../Lib/WebIM";
import ToastUtils from "../utils/ToastUtils";

export default class MailListScreen extends Component {
    static navigationOptions = {
        tabBarLabel: '通讯录',
        tabBarIcon: ({focused, tintColor}) => {
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
        this.state = {
            refreshing: false,
            data: []
        };
    }

    componentWillMount() {
        WebIM.conn.getRoster({
            success: roster => {
                console.log('好友列表:', roster);
                const stateData = [];
                roster.forEach(item => {
                    stateData.push({
                        key: item.name,
                        avatar: 'http://image-2.plusman.cn/app/im-client/empty-message.png',
                        name: item.name
                    });
                });
                this.setState({data: stateData});
            },
            error: err => {
                console.log('获取好友列表失败:', err);
                ToastUtils.show('获取好友列表失败')
            }
        });
    }

    renderItem = (row) => {
        return (
            <ListItem.Label
                icon={row.item.avatar}
                labelText={row.item.name}
                onPress={() => this.props.navigation.navigate('ChatRoom', {toUser: row.item.name})}
            />
        );
    };

    renderSeparator(sectionID: number, rowID: number, adjacentRowHighlighted: bool) {
        return (
            <ListItem.Separator
                paddingLeft={10}
                key={`${sectionID}-${rowID}`}
            />
        );
    }

    render() {
        return (
            <View>
                <TitleBar title="通讯录"
                          rightButtonIcon="plus-square-o"
                          onRightButtonPress={() => {
                              this.props.navigation.navigate('AddFriend');
                          }}/>
                <FlatList
                    data={this.state.data}
                    renderItem={this.renderItem}
                    ItemSeparatorComponent={this.renderSeparator}
                    onRefresh={() => {
                    }}
                    refreshing={this.state.refreshing}
                />
            </View>
        );
    }
}