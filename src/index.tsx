import { DateTime } from 'luxon';
import React from 'react';
import {
  FlatList,
  StyleProp,
  StyleSheet,
  useColorScheme,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native';
import Day from './Day';

interface RenderDayProps {
  date: Date;
  index: number;
  selected: boolean;
  disabled: boolean;
}

interface WeekStripProps {
  startDate: Date;
  endDate: Date;
  date?: Date;
  onDateChange: (date: Date) => void;
  allowSelectingFuture?: boolean;
  weekRowStyle?: StyleProp<ViewStyle>;
  renderDay?: (props: RenderDayProps) => React.ReactNode;
}

const WeekStrip: React.FunctionComponent<WeekStripProps> = ({
  startDate,
  endDate,
  date,
  onDateChange,
  allowSelectingFuture,
  weekRowStyle,
  renderDay,
}) => {
  const { width } = useWindowDimensions();
  const scheme = useColorScheme() ?? 'light';

  const today = DateTime.local().endOf('day');
  const start = DateTime.fromJSDate(startDate).startOf('day');
  const startWeek = start.startOf('week');
  const end = DateTime.fromJSDate(endDate).endOf('day');
  const endWeek = end.endOf('week');
  const numberOfWeeks = Math.ceil(endWeek.diff(startWeek).as('weeks'));
  const pages = new Array(numberOfWeeks).fill(null).map((_, i) => ({
    title: i,
    key: `${i}`,
    dates: new Array(7)
      .fill(null)
      .map((__, dayIndex) =>
        startWeek.plus({ weeks: i, days: dayIndex }).startOf('day')
      ),
  }));

  const currentDate = date ? DateTime.fromJSDate(date) : DateTime.local();
  const currentWeekIndex = Math.floor(currentDate.diff(startWeek).as('weeks'));

  return (
    <FlatList
      style={[styles.list, { width }]}
      data={pages}
      pagingEnabled
      horizontal
      showsHorizontalScrollIndicator={false}
      initialScrollIndex={currentWeekIndex}
      getItemLayout={(_, index) => ({
        length: width,
        offset: width * index,
        index,
      })}
      renderItem={({ item }) => (
        <View
          style={StyleSheet.flatten([styles.weekRow, { width }, weekRowStyle])}
        >
          {item.dates.map((day, dayIndex) => {
            const selected = day.hasSame(currentDate, 'day');
            const disabled =
              day < start || (allowSelectingFuture ? day > end : day > today);

            if (renderDay) {
              return renderDay({
                date: day.toJSDate(),
                index: dayIndex,
                selected,
                disabled,
              });
            }
            return (
              <Day
                scheme={scheme}
                onPress={(newDate) => onDateChange(newDate.toJSDate())}
                key={dayIndex}
                date={day}
                selected={selected}
                disabled={disabled}
              />
            );
          })}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  weekRow: {
    flexDirection: 'row',
  },
  list: {
    flexGrow: 0,
  },
});

export default WeekStrip;
