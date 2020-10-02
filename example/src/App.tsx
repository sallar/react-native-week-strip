import * as React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import WeekStrip from 'react-native-week-strip';

export default function App() {
  const [date, setDate] = React.useState(new Date('October 10, 2020 03:24:00'));

  return (
    <SafeAreaView style={styles.container}>
      <Text>Selected: {date.toDateString()}</Text>
      <WeekStrip
        startDate={new Date('September 15, 2020 03:24:00')}
        endDate={new Date('October 15, 2020 03:24:00')}
        date={date}
        onDateChange={setDate}
        allowSelectingFuture
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
