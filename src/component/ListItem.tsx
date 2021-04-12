import * as React from 'react';
import { StyleSheet, View } from 'react-native';

interface Props {
  accessoryLeft?: JSX.Element;
  accessoryRight?: JSX.Element;
  children: JSX.Element | JSX.Element[];
}

export default function ListItem(props: Props) {
  const { accessoryLeft, accessoryRight, children } = props;

  return (
    <View style={styles.listItem}>
      <View style={styles.listeItemLeft}>
        <View style={styles.accessoryLeft}>{accessoryLeft}</View>
        <View>{children}</View>
      </View>
      <View style={styles.accessoryRight}>{accessoryRight}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  accessoryLeft: {
    paddingRight: 10,
  },
  accessoryRight: {
    paddingLeft: 10,
  },
  listItem: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 10,
    height: 60,
  },
  listeItemLeft: {
    display: 'flex',
    flexDirection: 'row',
  },
});
