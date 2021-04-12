import { Text } from '@ui-kitten/components';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

interface Props {
  offset: number;
}

export default function DayLabel(props: Props) {
  const { offset } = props;
  const label =
    offset === 1
      ? 'Today'
      : offset === 2
      ? 'Yesterday'
      : new Date(Date.now() - 86400000 * offset)
          .toString()
          .split(' ')
          .slice(0, 4)
          .join(' ');

  return (
    <View style={styles.text}>
      <Text>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
