import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withTheme, Headline} from 'react-native-paper';
import Layout from '../../../components/client/layout';


class Index extends Component {

  state = {

  };

  render() {
    return (
      <Layout>
        <Headline>Partner Search</Headline>
      </Layout>
    )
  }
}

Index.propTypes = {

};
const mapStateToProps = (state) => {
  return {

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    //actions: bindActionCreators(actions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(Index));