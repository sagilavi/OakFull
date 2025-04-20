import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type ScheduleMonthScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ScheduleMonth'>;

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  type: 'health' | 'social' | 'legal';
}

const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Doctor Appointment',
    date: '2024-03-15',
    time: '10:00 AM',
    type: 'health',
  },
  {
    id: '2',
    title: 'Family Meeting',
    date: '2024-03-18',
    time: '2:00 PM',
    type: 'social',
  },
  {
    id: '3',
    title: 'Legal Consultation',
    date: '2024-03-22',
    time: '11:30 AM',
    type: 'legal',
  },
];

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export default function ScheduleMonthScreen() {
  const navigation = useNavigation<ScheduleMonthScreenNavigationProp>();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const days = [];
    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const getEventsForDate = (date: number) => {
    const dateString = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
    return mockEvents.filter(event => event.date === dateString);
  };

  const handlePrevMonth = () => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1));
  };

  const handleDayPress = (day: number) => {
    const events = getEventsForDate(day);
    if (events.length > 0) {
      navigation.navigate('ScheduleDay');
    }
  };

  const renderDayCell = (day: number | null, index: number) => {
    if (day === null) {
      return <View key={index} style={styles.dayCell} />;
    }

    const events = getEventsForDate(day);
    const hasEvents = events.length > 0;

    return (
      <TouchableOpacity
        key={index}
        style={[styles.dayCell, hasEvents && styles.dayCellWithEvents]}
        onPress={() => handleDayPress(day)}
      >
        <Text style={styles.dayText}>{day}</Text>
        {hasEvents && (
          <View style={styles.eventIndicatorContainer}>
            {events.map((event, i) => (
              <View
                key={i}
                style={[
                  styles.eventIndicator,
                  event.type === 'health' && styles.healthEvent,
                  event.type === 'social' && styles.socialEvent,
                  event.type === 'legal' && styles.legalEvent,
                ]}
              />
            ))}
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handlePrevMonth}>
          <Text style={styles.headerButton}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {MONTHS[selectedDate.getMonth()]} {selectedDate.getFullYear()}
        </Text>
        <TouchableOpacity onPress={handleNextMonth}>
          <Text style={styles.headerButton}>{'>'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.weekDays}>
        {DAYS.map((day, index) => (
          <Text key={index} style={styles.weekDayText}>
            {day}
          </Text>
        ))}
      </View>

      <ScrollView>
        <View style={styles.calendar}>
          {getDaysInMonth(selectedDate).map((day, index) => renderDayCell(day, index))}
        </View>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            // TODO: Implement add event functionality
          }}
        >
          <Text style={styles.addButtonText}>Add Event</Text>
        </TouchableOpacity>

        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, styles.healthEvent]} />
            <Text style={styles.legendText}>Health</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, styles.socialEvent]} />
            <Text style={styles.legendText}>Social</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, styles.legalEvent]} />
            <Text style={styles.legendText}>Legal</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFCF2',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  headerButton: {
    fontSize: 24,
    color: '#414336',
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#414336',
  },
  weekDays: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 8,
  },
  weekDayText: {
    flex: 1,
    textAlign: 'center',
    color: '#666',
    fontSize: 14,
  },
  calendar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
  },
  dayCell: {
    width: `${100 / 7}%`,
    aspectRatio: 1,
    padding: 4,
    borderWidth: 0.5,
    borderColor: '#ddd',
  },
  dayCellWithEvents: {
    backgroundColor: '#fff',
  },
  dayText: {
    fontSize: 16,
    color: '#414336',
  },
  eventIndicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 4,
  },
  eventIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 1,
  },
  healthEvent: {
    backgroundColor: '#FF6B6B',
  },
  socialEvent: {
    backgroundColor: '#4ECDC4',
  },
  legalEvent: {
    backgroundColor: '#45B7D1',
  },
  addButton: {
    backgroundColor: '#414336',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 4,
  },
  legendText: {
    fontSize: 12,
    color: '#666',
  },
}); 