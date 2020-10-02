import * as React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import WeekStrip from 'react-native-week-strip';

export default function App() {
  const [date, setDate] = React.useState(new Date('October 10, 2020 03:24:00'));
  const scheme = useColorScheme();
  const color = scheme === 'dark' ? 'white' : 'black';
  const reversedColor = scheme === 'dark' ? 'black' : 'white';

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: reversedColor }]}
    >
      <Text style={{ color }}>Selected: {date.toDateString()}</Text>
      <View style={styles.stripContainer}>
        <WeekStrip
          startDate={new Date('September 15, 2020 03:24:00')}
          endDate={new Date('October 15, 2020 03:24:00')}
          date={date}
          onDateChange={setDate}
          allowSelectingFuture
        />
      </View>
      <Text style={{ color }}>Custom Renderer:</Text>
      <View style={styles.stripContainer}>
        <WeekStrip
          startDate={new Date('September 15, 2020 03:24:00')}
          endDate={new Date('October 15, 2020 03:24:00')}
          date={date}
          onDateChange={setDate}
          allowSelectingFuture
          renderDay={({ date, index, selected, disabled }) => (
            <View
              key={index}
              style={[
                styles.customDay,
                selected && { backgroundColor: 'blue' },
                disabled && { opacity: 0.5 },
              ]}
            >
              <Text
                style={[
                  styles.customText,
                  { color: selected ? '#fff' : color },
                ]}
              >
                {date.getDate()}
              </Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stripContainer: {
    marginVertical: 20,
  },
  customDay: {
    flex: 1,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  customText: {
    fontSize: 18,
  },
});
