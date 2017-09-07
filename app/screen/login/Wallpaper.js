/**
 * Created by JetBrains WebStorm.
 * Author: yin
 * Date: 17-9-7
 * Time: 下午3:32
 * Desc:
 */
import React, {Component} from "react";
import {Text} from "react-native";

export default class Wallpaper extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Text>Wallpaper</Text>
        );
    }

    componentDidMount() {
        //TODO 渲染完成
    }
}