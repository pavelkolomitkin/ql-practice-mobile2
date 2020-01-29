import React, { Component } from 'react';
import { Text, View, ImageBackground } from 'react-native';
import { Avatar } from 'react-native-paper';
import MessageLink from './message-link';

import YoutubeService from '../../../../../services/external/youtube-service';

class YoutubeVideoLink extends MessageLink {

  service = new YoutubeService();

  constructor(props) {
    super(props);

    this.state.info = null;
  }


  async componentDidMount(): void {

    const { link } = this.props;

    try
    {
      const info = await this.service.getInfo(link);

      this.setState({
        status: YoutubeVideoLink.STATUS_COMPLETE,
        info
      });
    }
    catch (error) {
      this.setState({
        status: YoutubeVideoLink.STATUS_ERROR
      });
    }
  }

  getPreparedContent() {
    const { info } = this.state;

    return (
      <ImageBackground
          source={{
            uri: info.thumbnail_url
          }}
          resizeMode='contain'
          style={{
            width: 200,
            height: 200,
            backgroundColor: 'black',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
          }}
      >
        <Avatar.Icon icon="youtube" />
      </ImageBackground>
    );

  }
}

YoutubeVideoLink.propTypes = {

};

export default YoutubeVideoLink;