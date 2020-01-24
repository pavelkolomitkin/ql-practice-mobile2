import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Paragraph, Caption } from 'react-native-paper';

const PublicConversationItem = ({ conversation, onContextMenu }) => {
 return (
     <TouchableOpacity onLongPress={(event) => onContextMenu(conversation, event)}>
       <Paragraph>{ conversation.title }</Paragraph>
       <Caption>{ conversation.language.title }</Caption>
     </TouchableOpacity>
 );
};

export default PublicConversationItem;