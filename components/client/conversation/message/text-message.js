import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import {Paragraph, withTheme, Caption, Badge} from 'react-native-paper';
import Message from './message';
import {bindActionCreators} from 'redux';
import * as securityActions from '../../../../redux/actions/security/security';
import * as conversationActions from '../../../../redux/actions/client/public-conversation';
import * as messageActions from '../../../../redux/actions/client/public-conversation-message';
import {connect} from 'react-redux';

import MessageParser from '../../../../utils/message-parser/message-parser';
import {LinkInfo} from '../../../../utils/message-parser/link-info';
import YoutubeVideoLink from './message-links/youtube-video-link';
import PictureLink from './message-links/picture-link';
import RegularLink from './message-links/regular-link';
import Hyperlink from 'react-native-hyperlink'

class TextMessage extends Message {

    constructor(props) {
        super(props);

        this.state.parsedLinks = [];
    }

    async componentDidMount(): void {

        const superDidMount = super.componentDidMount();
        const parsingLinks = this.parseLinks();

        await superDidMount;
        await parsingLinks;
    }

    async parseLinks()
    {
        const parser = new MessageParser();

        const { message } = this.props;

        const items = await parser.parse(message.text);
        this.setState({
            parsedLinks: items
        });
    }

    getParsedContentBlock()
    {
        const { parsedLinks } = this.state;
        if (parsedLinks.length === 0)
        {
            return null;
        }

        return (<>
            {
                parsedLinks.map(item => {

                    if (item.type === LinkInfo.YOUTUBE_TYPE)
                    {
                        return (<YoutubeVideoLink link={item.url} />);
                    }

                    if (item.type === LinkInfo.PICTURE_TYPE)
                    {
                        return (<PictureLink link={item.url}/>);
                    }

                    return (<RegularLink link={item.url} />);

                })
            }
        </>);
    }

    getContent() {

        const { status } = this.state;
        const { message } = this.props;

        const parsedContent = this.getParsedContentBlock();
        return (
            <View style={styles.container}>
                <View>
                    <Paragraph>{ message.user.fullName }</Paragraph>
                    <Hyperlink linkDefault={ true }>
                        <Caption>
                            { message.text }
                        </Caption>
                    </Hyperlink>
                </View>

                { parsedContent &&
                    <View style={styles.linksContainer}>
                        { parsedContent }
                    </View>
                }

                <View>
                    <Caption>{ this.getSentTime() }</Caption>
                    {
                        status &&
                        <>
                            <Text>{ status }</Text>
                        </>
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },

    linksContainer: {
        flex: 1,
        flexDirection: 'column'
    }
});

const mapStateToProps = (state) => {
    return {
        user: state.security.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        securityActions: bindActionCreators(securityActions, dispatch),
        conversationActions: bindActionCreators(conversationActions, dispatch),
        messageActions: bindActionCreators(messageActions, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(TextMessage));