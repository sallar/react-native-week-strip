import type { DateTime } from 'luxon';
import React from 'react';
import {
  ColorValue,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface DayProps {
  date: DateTime;
  selected: boolean;
  disabled: boolean;
  scheme: 'dark' | 'light';
  onPress: (date: DateTime) => void;
}

const colors: Record<'light' | 'dark', Record<string, ColorValue>> = {
  dark: {
    text: 'rgba(255,255,255,1)',
    mutedText: 'rgba(255,255,255,.5)',
    background: 'transparent',
    selectedText: 'rgba(0,0,0,1)',
    selectedBackground: 'rgba(255,255,255,1)',
  },
  light: {
    text: 'rgba(0,0,0,1)',
    mutedText: 'rgba(0,0,0,.5)',
    background: 'transparent',
    selectedText: 'rgba(255,255,255,1)',
    selectedBackground: 'rgba(0,0,0,1)',
  },
};

const Day: React.FunctionComponent<DayProps> = ({
  date,
  selected,
  disabled,
  onPress,
  scheme,
}) => {
  const theme = colors[scheme ?? 'light'];

  return (
    <TouchableOpacity
      style={styles.root}
      onPress={() => onPress(date)}
      disabled={disabled}
    >
      <Text
        style={[
          styles.dayTitle,
          {
            color: disabled ? theme.mutedText : theme.text,
          },
        ]}
      >
        {date.toFormat('ccc')}
      </Text>
      <View
        style={[
          styles.day,
          {
            backgroundColor: selected
              ? theme.selectedBackground
              : theme.background,
          },
        ]}
      >
        <Text
          style={{
            color: selected
              ? theme.selectedText
              : disabled
              ? theme.mutedText
              : theme.text,
          }}
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
});

export default Day;
