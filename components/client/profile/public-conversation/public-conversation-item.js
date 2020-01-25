import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Paragraph, Caption } from 'react-native-paper';

const PublicConversationItem = ({ conversation, onContextMenu, onPress }) => {
 return (
     <TouchableOpacity
         onLongPress={(event) => onContextMenu(conversation, event)}
         onPress={() => onPress(conversation)}
     >
       <Paragraph>{ conversation.title }</Paragraph>
       <Caption>{ conversation.language.title }</Caption>
         {conversation.isArchived &&
            <Caption>(Archived)</Caption>
         }
     </TouchableOpacity>
 );
};

export default PublicConversationItem;