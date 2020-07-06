import React from 'react';
import {View, Button, Text} from 'react-native';

const Row = ({title, onPress, children}) => {
  const renderedTitle = title ? <Text style={styles.title}>{title}</Text> : undefined;
  return (
    <View style={styles.row}>
      {onPress
        ? <Button title={title} onPress={onPress} />
        : renderedTitle
      }
      {children}
    </View>
  );
}

const styles = {
  row: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    minHeight: 44,
    borderBottomWidth: 1,
    borderBottomColor: '#d3d3d3'
  },
  title: {
    marginRight: 8
  }
}

export default Row;