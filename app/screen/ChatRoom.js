/**
 * <plusmancn@gmail.com> created at 2017
 *
 * Copyright (c) 2017 plusmancn, all rights
 * reserved.
 *
 * @flow
 * 聊天室
 *
 * TODO: 聊天室有两次渲染问题
 */
import React, {Component} from 'react';
import {
    KeyboardAvoidingView,
    RefreshControl,
    StyleSheet,
    ListView,
    Image,
    Text,
    TextInput,
    Platform,
    View
} from 'react-native';

import {FontSize, Color, Button} from '../UiLibrary';
import TitleBar from "../UiLibrary/TitleBar/index";
import WebIM from "../Lib/WebIM";
import ToastUtils from "../utils/ToastUtils";

class ChatRoom extends Component {
    // 接收者 ID
    toInfo: Object;
    firstEnter: number;
    ds: Object;
    rows: Object[];
    state: Object;
    currentMaxRowId: number = 0;
    chatListView: Object;

    // 判断用户是否输入过
    _userHasBeenInputed: boolean = false;
    _userAtPage = 0;
    _userReachEnd = true;

    constructor(props: Object) {
        super(props);
        this.toInfo = props.toInfo;
        this.firstEnter = 0;
        this.ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => {
                return r1.uuid !== r2.uuid;
            }
        });

        this.state = {
            toUser: props.navigation.state.params.toUser,
            textInputHeight: 40,
            inputValue: '',
            refreshing: false
        };
    }

    componentWillUnmount() {

    }

    // 不要和动画效果抢系统资源
    componentDidMount() {
    }

    _scrollToBottom() {
        let scrollProperties = this.chatListView.scrollProperties;

        // 如果组件没有挂载完全，则不进行内容偏移
        if (!scrollProperties.visibleLength) {
            return;
        }

        // 如果是刷新操作，则不进行滑动
        if (!this._userReachEnd) {
            return;
        }

        // 如果组件内元素还没渲染完全，则不进行底部偏移
        // if (socketStore.currentChatRoomHistory.length - this.currentMaxRowId > 11) {
        //     return;
        // }

        // 这里是一个大坑，在测试环境的时候，由于运行速度较慢，scrollProperties.contentLength 总能
        // 获取到正确的值，生产环境需要加个延时，用来保证 `renderRow` 执行完毕
        // 这里设置了 130ms 的延时
        setTimeout(() => {
            let offsetY = scrollProperties.contentLength - scrollProperties.visibleLength;
            this.chatListView.scrollTo({
                y: offsetY > 0 ? offsetY : 0,
                animated: this._userHasBeenInputed
            });
        }, this._userHasBeenInputed ? 0 : 130);
    }

    _onSubmitEditing = () => {
        const id = WebIM.conn.getUniqueId();                 // 生成本地消息id
        const msg = new WebIM.message('txt', id);      // 创建文本消息
        msg.set({
            msg: this.state.inputValue,                  // 消息内容
            to: this.state.toUser,                          // 接收消息对象（用户id）
            roomType: false,
            success: function (id, serverMsgId) {
                ToastUtils.show('发送成功');
            },
            fail: function(e){
                ToastUtils.show('发送失败');
            }
        });
        msg.body.chatType = 'singleChat';
        WebIM.conn.send(msg.body);

        /*this._userHasBeenInputed = true;
         // 数据组装
         let { userInfo } = profileStore;
         let payload = {
         from: userInfo.userId,
         to: this.toInfo.userId,
         uuid: uuid.v4(),
         msg: {
         type: 'txt',
         content: this.state.inputValue
         },
         ext: {
         avatar: userInfo.avatar,
         name: userInfo.name
         }
         };

         this.setState({ inputValue: '' });

         // 远程发送
         socketStore.socket.emit('message', [payload]);

         // 本地会话列表更新
         socketStore.pushLocalePayload(Object.assign({
         localeExt: {
         toInfo: this.toInfo
         }
         }, payload));*/
    }

    _renderRow = (row, sectionID, rowId) => {
        // this.currentMaxRowId = +rowId;
        // return (
        //     <MessageCell
        //         key={`cell-${rowId}`}
        //         currentUser={profileStore.userInfo.userId}
        //         message={row}
        //     />
        // );
    }

    _onPullMessage = async () => {
        this._userReachEnd = false;

        this.setState({
            refreshing: true
        });

        // 历史消息推入
        //await socketStore.fillCurrentChatRoomHistory(++this._userAtPage, 8);

        this.setState({
            refreshing: false
        });
    }

    render() {
        let content = (
            <View style={styles.container}>
                <TitleBar title={this.state.toUser} backButton onBackPress={() => this.props.navigation.goBack()}/>
                <ListView refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onPullMessage}
                    />
                }
                          onEndReached={() => {
                              this._userReachEnd = true;
                          }}
                          onEndReachedThreshold={10}
                          ref={(reference) => {
                              this.chatListView = reference;
                          }}
                          dataSource={this.ds.cloneWithRows([])}
                          enableEmptySections={true}
                          onLayout={
                              (event) => {
                                  this._scrollToBottom();
                              }
                          }
                          onContentSizeChange={
                              (event) => {
                                  this._scrollToBottom();
                              }
                          }
                          renderRow={this._renderRow}
                />

                <View style={styles.bottomToolBar}>
                    <TextInput
                        style={ [styles.input, {
                            height: Math.max(45, this.state.textInputHeight < 180 ? this.state.textInputHeight : 180)
                        }]}
                        multiline={true}
                        controlled={true}
                        underlineColorAndroid="transparent"
                        returnKeyType="default"
                        value={this.state.inputValue}
                        placeholder="Type here to send message"
                        // ios only
                        enablesReturnKeyAutomatically={true}
                        onContentSizeChange={
                            (event) => {
                                //this.setState({textInputHeight: event.nativeEvent.contentSize.height});
                            }
                        }
                        onChangeText={ (text) => {
                            this.setState({inputValue: text});
                        }}
                    />
                    <Button style={styles.sendButton}
                            textStyle={styles.sendButtonText}
                            disabled={!this.state.inputValue}
                            onPress={this._onSubmitEditing}>
                        发送
                    </Button>
                </View>
            </View>
        );

        if (Platform.OS === 'ios') {
            return (
                <KeyboardAvoidingView
                    behavior="padding"
                    style={styles.KeyboardAvoidingView}
                    keyboardVerticalOffset={this.props.keyboardVerticalOffset || 64}
                >
                    {content}
                </KeyboardAvoidingView>
            );
        } else {
            return content;
        }
    }
}

class MessageCell extends Component {
    render() {
        let {currentUser, message} = this.props;

        let differentStyle = {};
        if (message.from === currentUser) {
            differentStyle = {
                flexDirection: 'row-reverse',
                backgroundColor: '#92E649'
            };
        } else {
            differentStyle = {
                flexDirection: 'row',
                backgroundColor: '#FFFFFF'
            };
        }

        return (
            <View
                style={[styles.messageCell, {flexDirection: differentStyle.flexDirection}]}
            >
                <Image
                    source={{
                        uri: message.ext.avatar
                    }}
                    style={styles.avatar}
                />
                <View
                    style={[styles.contentView, {backgroundColor: differentStyle.backgroundColor}]}
                >
                    <Text style={styles.messageCellText}>{message.msg.content}</Text>
                </View>
                <View style={styles.endBlankBlock}/>
            </View>
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
    KeyboardAvoidingView: {
        flex: 1
    },
    bottomToolBar: {
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: Color.LittleGrey
    },
    sendButton: {
        marginHorizontal: 10,
        backgroundColor: Color.WechatGreen,
        borderColor: Color.WechatGreen
    },
    sendButtonText: {
        color: Color.White
    },
    input: {
        flex: 1,
        color: Color.Black,
        fontSize: FontSize.Main,
        padding: 10
    },
    messageCell: {
        marginTop: 5,
        marginBottom: 5,
    },
    messageCellText: {
        fontSize: FontSize.Content
    },
    avatar: {
        borderRadius: 4,
        margin: 5,
        width: 40,
        height: 40
    },
    contentView: {
        borderRadius: 4,
        padding: 4,
        paddingHorizontal: 8,
        overflow: 'hidden',
        flex: 1,
        margin: 5,
        justifyContent: 'center'
    },
    endBlankBlock: {
        margin: 5,
        width: 50,
        height: 40
    }
});


export default ChatRoom;
