import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { List, Chip, Text, IconButton, Caption } from 'react-native-paper';
import theme from '../../../../theme';

const LanguageSkillItem = ({ skill, onEdit, onRemove }) => {
 return (
     <View style={[styles.container, styles.column]}>
         <View>
             <Caption>{ skill.language.title }</Caption>
         </View>
         <View styles={[ styles.container ]}>
             <Chip
                 selected
                 style={[
                     styles.level,
                     {
                         backgroundColor: theme.colors.languageLevel[skill.level.code]
                     }
                 ]}
             >{ skill.level.title }</Chip>
         </View>
         <View styles={[ styles.container, styles.row ]}>
             <Text>Wants to discuss</Text>
             {
                 skill.tags.map(tag => <Chip
                     key={tag.id}
                     style={styles.tag}
                 >{ tag.title }</Chip>)
             }

         </View>
         <View>
             {
                 onEdit &&
                 <IconButton
                     icon="pencil"
                     onPress={() => onEdit(skill)}/>
             }
             {
                 onRemove &&
                 <IconButton
                     icon="delete"
                     onPress={() => onRemove(skill)}/>
             }
         </View>
     </View>
 );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    level: {
        color: '#fff'
    },
    tag: {
    },
    // image: {
    //     height: 40,
    //     width: 40,
    //     margin: 8,
    // },
    row: {
        flexDirection: 'row',
    },
    column: {
        flexDirection: 'column',
    },
});

export default LanguageSkillItem;