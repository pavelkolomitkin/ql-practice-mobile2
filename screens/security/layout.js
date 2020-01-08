import React from 'react';
import CommonLayout from '../../components/common/layout';
import {Body, Container, Content, Header, Title} from 'native-base';


const Layout = ({ title, children }) => {
 return (
  <CommonLayout>
      <Container>
          <Header>
              <Body>
                  <Title>{ title }</Title>
              </Body>
          </Header>
          <Content style={{ padding: 10 }} contentContainerStyle={{ flex: 1 }}>
              { children }
          </Content>
      </Container>

  </CommonLayout>
 );
};


export default Layout;