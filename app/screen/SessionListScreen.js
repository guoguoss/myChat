/**
 * Created by JetBrains WebStorm.
 * Author: yin
 * Date: 17-9-7
 * Time: 下午8:06
 * Desc: 聊天会话窗口
 */
import React, {Component, PropTypes} from "react";
import {StyleSheet, FlatList, Image, Text, TouchableHighlight, View} from "react-native";
import commonStyles from "../utils/CommonStyles";
import {Badge, Swipeout, Color, FontSize, TitleBar, ListItem} from "../UiLibrary";

export default class SessionListScreen extends Component {
    static navigationOptions = {
        tabBarLabel: '会话',
        tabBarIcon: ({focused, tintColor}) => {
            if (focused) {
                return (
                    <Image style={commonStyles.tabBarIconSize} source={require('../images/message-reverse.png')}/>
                );
            }
            return (
                <Image style={commonStyles.tabBarIconSize} source={require('../images/message.png')}/>
            );
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            data: [{
                key: '1',
                avatar: 'http://image-2.plusman.cn/app/im-client/empty-message.png',
                name: '我的好友',
                unReadMessageCount: 3,
                latestTime: '3分钟前',
                latestMessage: '最后的消息'
            }, {
                key: '2',
                avatar: 'http://image-2.plusman.cn/app/im-client/empty-message.png',
                name: '我的好友',
                unReadMessageCount: 3,
                latestTime: '3分钟前',
                latestMessage: '最后的消息'
            }]
        };
    }

    renderItem = ({item}) => (
        <Swipeout key={item.key}
                  rightButtons={[{
                      title: '删除',
                      type: 'Delete',
                      onPress: () => {

                      }
                  }]}>
            <ConversationCell
                avatar={item.avatar}
                unReadMessageCount={item.unReadMessageCount}
                name={item.name}
                latestTime={item.latestTime}
                latestMessage={item.latestMessage}
                onPress={() => {

                }}/>
        </Swipeout>
    );

    renderEmpty = () => (
        <View style={styles.emptyMessage}>
            <Image source={require('../images/empty-message.png')} style={styles.emptyMessageImage}/>
            <Text style={styles.emptyMessageText}>暂无消息</Text>
        </View>
    );

    renderSeparator(sectionID: number, rowID: number, adjacentRowHighlighted: bool) {
        return (
            <ListItem.Separator
                key={`${sectionID}-${rowID}`}
            />
        );
    }

    render() {
        return (
            <View>
                <TitleBar title="会话"/>
                <FlatList
                    data={this.state.data}
                    renderItem={this.renderItem}
                    ListEmptyComponent={this.renderEmpty}
                    ItemSeparatorComponent={this.renderSeparator}
                />
            </View>
        );
    }

    componentDidMount() {
        //TODO 渲染完成
    }
}

class ConversationCell extends React.Component {
    static propTypes = {
        avatar: PropTypes.string.isRequired,
        name: PropTypes.any.isRequired,
        latestTime: PropTypes.string.isRequired,
        latestMessage: PropTypes.string.isRequired,
        onPress: PropTypes.func.isRequired,
        unReadMessageCount: PropTypes.number.isRequired
    };

    constructor(props) {
        super(props);
    }

    render() {
        let {avatar, unReadMessageCount, name, latestTime, latestMessage, onPress} = this.props;

        return (
            <TouchableHighlight onPress={onPress}>
                <View style={styles.ConversationCell}>
                    <View style={styles.leftBox}>
                        <Image source={{uri: avatar}} style={styles.avatar}/>
                        <Badge style={styles.cellBadge} unReadMessageCount={unReadMessageCount} height={18}/>
                    </View>
                    <View style={styles.boxRight}>
                        <View style={styles.boxCeil}>
                            <Text style={styles.sessionName} numberOfLines={1}>{name}</Text>
                            <Text style={styles.latestTime}>{latestTime}</Text>
                        </View>
                        <Text style={styles.boxFloor} numberOfLines={1}>{latestMessage}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        backgroundColor: Color.BackgroundGrey
    },
    ConversationCell: {
        flexDirection: 'row',
        backgroundColor: Color.White
    },
    leftBox: {
        padding: 6
    },
    avatar: {
        borderRadius: 4,
        width: 50,
        height: 50
    },
    cellBadge: {
        position: 'absolute',
        top: 2,
        right: 0
    },
    boxRight: {
        flex: 1,
        padding: 10
    },
    boxCeil: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    sessionName: {
        fontSize: FontSize.Content,
        color: Color.Black
    },
    boxFloor: {
        fontSize: FontSize.Annotation,
        color: '#9A9A9A'
    },
    latestTime: {
        fontSize: FontSize.Annotation,
        color: '#B3B3B3'
    },
    emptyMessage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptyMessageImage: {
        width: 90,
        height: 90,
        opacity: 0.6
    },
    emptyMessageText: {
        color: Color.LightBlack,
        fontSize: FontSize.Annotation
    }
});
