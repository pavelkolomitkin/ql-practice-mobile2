import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import MessageLink from './message-link';

class PictureLink extends MessageLink {

  componentDidMount(): void {
    this.setState({
      status: PictureLink.STATUS_COMPLETE
    });
  }

  getPreparedContent() {

    const { link } = this.props;

    return <Image
      source={{
        uri: link
      }}
      style={{
        width: 200,
        height: 200
      }}
    />
  }
}

PictureLink.propTypes = {

};

export default PictureLink;