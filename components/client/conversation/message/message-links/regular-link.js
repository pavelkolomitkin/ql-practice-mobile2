import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import MessageLink from './message-link';
import WebPageService from '../../../../../services/external/web-page-service';
import WebPage from '../../../../../services/model/message/web-page';

class RegularLink extends MessageLink {

  service = new WebPageService();


  async componentDidMount(): void {

    const { link } = this.props;

    const page = await this.service.getPage(link);
    if (!page)
    {
      this.setState({
        status: RegularLink.STATUS_ERROR
      });

      return;
    }


    const pageMeta = page.getMeta();

    //debugger
    let title = pageMeta[WebPage.PROPERTY_META_TITLE];
    const description = pageMeta[WebPage.PROPERTY_META_DESCRIPTION];
    const image = pageMeta[WebPage.PROPERTY_META_IMAGE];

    if (!title)
    {
      title = page.getBaseUrl();
    }

    this.setState({
      status: RegularLink.STATUS_COMPLETE,
      meta: pageMeta,

      title,
      description,
      image
    });
  }

  getPreparedContent() {

    const { title, description, image } = this.state;

    debugger
    if (!title)
    {
      return null
    }

    return (
        <View style={{
          flex: 1,
          flexDirection: 'column',
        }}>
          <Text>{ title }</Text>
          { description &&
            <Text>{ description }</Text>
          }
          {
            image &&
                <Image
                  source={ {
                    uri: image
                  }}
                  style={{
                    width: 200,
                    height: 200
                  }}
                />
          }

        </View>
    );
  }
}

RegularLink.propTypes = {

};

export default RegularLink;