import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { List, Chip, Text } from 'react-native-paper';
import theme from '../../theme/index';

const LanguageSkillItem = ({ skill }) => {
 return (
  <List.Item
      title={skill.language.title}
      description={({
                        ellipsizeMode,
                        color: descriptionColor,
                        fontSize,
                    }) => (
          <View style={[styles.container, styles.column]}>
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
                  <Text
                      numberOfLines={2}
                      ellipsizeMode={ellipsizeMode}
                      style={{ color: descriptionColor, fontSize }}
                    >Wants to discuss</Text>
                  {
                      skill.tags.map(tag => <Chip
                          key={tag.id}
                          style={styles.tag}
                      >{ tag.title }</Chip>)
                  }
              </View>

              {/*<Text*/}
              {/*    numberOfLines={2}*/}
              {/*    ellipsizeMode={ellipsizeMode}*/}
              {/*    style={{ color: descriptionColor, fontSize }}*/}
              {/*>*/}
              {/*    React Native Paper is a high-quality, standard-compliant*/}
              {/*    Material Design library that has you covered in all major*/}
              {/*    use-cases.*/}
              {/*</Text>*/}
              {/*<View style={[styles.container, styles.row, { paddingTop: 8 }]}>*/}
              {/*    <Chip icon="file-pdf" onPress={() => {}}>*/}
              {/*        DOCS.pdf*/}
              {/*    </Chip>*/}
              {/*</View>*/}
          </View>
      )}
  >

  </List.Item>
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