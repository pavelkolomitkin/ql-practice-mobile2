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


    const pageMeta = await page.getMeta();

    let title = meta[WebPage.PROPERTY_META_TITLE];
    const description = meta[WebPage.PROPERTY_META_DESCRIPTION];
    const image = meta[WebPage.PROPERTY_META_IMAGE];

    if (!title)
    {
      const baseUrlRegEx = new RegExp("(http|https)\:\/\/[^\/]*\/",'i');
      const groups = baseUrlRegEx.exec(link);

      title = groups[0];
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
                />
          }

        </View>
    );
  }
}

RegularLink.propTypes = {

};

export default RegularLink;