import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

const TopicTagItem = ({ tag, onDelete }) => {
 return (
  <TouchableOpacity onPress={() => onDelete(tag)}>
      <Text>{ tag.title }</Text>
  </TouchableOpacity>
 );
};

export default TopicTagItem;