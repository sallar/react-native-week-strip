import type { DateTime } from 'luxon';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface DayProps {
  date: DateTime;
  selected: boolean;
  disabled: boolean;
  onPress: (date: DateTime) => void;
}

const Day: React.FunctionComponent<DayProps> = ({
  date,
  selected,
  disabled,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={StyleSheet.flatten([styles.root, disabled && { opacity: 0.5 }])}
      onPress={disabled ? undefined : () => onPress(date)}
    >
      <Text style={styles.dayTitle}>{date.toFormat('ccc')}</Text>
      <View
        style={StyleSheet.flatten([styles.day, selected && styles.daySelected])}
      >
        <Text
          style={StyleSheet.flatten([
            styles.dayText,
            selected && styles.dayTextSelected,
          ])}
          allowFontScaling={false}
        >
          {date.toFormat('dd')}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    flex: 1,
  },
  dayTitle: {
    fontSize: 10,
    textTransform: 'uppercase',
  },
  day: {
    width: 36,
    height: 36,
    marginTop: 5,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  daySelected: {
    backgroundColor: '#000000',
  },
  dayText: {},
  dayTextSelected: {
    color: '#ffffff',
  },
});

export default Day;
