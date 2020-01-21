import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import TopicTagService from '../../../../services/client/topic-tag-service';
import Autocomplete from 'react-native-autocomplete-input';
import TopicTagItem from './topic-tag-item';

class TopicTagSelector extends Component {

  state = {
      tags: [],
      queryString: ''
  };

  service = new TopicTagService();

  onChangeTextHandler = async (text) => {

      // make request
      this.setState({
          queryString: text
      });
  };

  onSuggestionPressHandler = (item) => {

      const { tags } = this.state;

      const index = tags.findIndex(tag => tag.title === item.title.trim());
      if (index === -1)
      {
          tags.push(item);
          this.setState({
              tags: [...tags]
          });
      }
  };

    onAddButtonPressHandler = () => {

        const { queryString, tags } = this.state;

        tags.push({
            title: queryString.trim()
        });

        this.setState({
            queryString: '',
            tags: [...tags]
        });
    };

    isButtonDisabled = () => {

        const { queryString, tags } = this.state;
        if (queryString.trim() === '')
        {
            return true;
        }

        if (tags.findIndex(tag => tag.title === queryString.trim()) !== -1)
        {
            return true;
        }

        return false;
    };

    onDeleteTagHandler = (tag) => {

        const { tags } = this.state;

        const index = tags.findIndex(item => item === tag);
        tags.splice(index, 1);

        this.setState({
            tags: [...tags]
        });
    };

  render() {

      const { tags, queryString } = this.state;

    return (
      <View>
          <View>
              {
                  tags.map(tag => <TopicTagItem key={tag.title} tag={tag} onDelete={this.onDeleteTagHandler} />)
              }
          </View>
          <View>
              <View style={styles.autocompleteContainer}>
                  <Autocomplete
                      data={tags}
                      defaultValue={queryString}
                      onChangeText={this.onChangeTextHandler}
                      renderItem={({ item, i }) => (
                          <TouchableOpacity key={item.title} onPress={() => this.onSuggestionPressHandler(item)}>
                              <Text>{item.title}</Text>
                          </TouchableOpacity>
                      )}
                  ></Autocomplete>
                  <Button
                      onPress={this.onAddButtonPressHandler}
                    disabled={this.isButtonDisabled()}
                  >Add</Button>
              </View>
          </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    autocompleteContainer: {
        flex: 1,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 1
    }
});

TopicTagSelector.propTypes = {

};

export default TopicTagSelector;