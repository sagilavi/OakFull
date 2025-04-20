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

type ScheduleWeekScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ScheduleWeek'>;

interface Event {
  id: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  type: 'health' | 'social' | 'legal';
}

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const HOURS = Array.from({ length: 12 }, (_, i) => i + 8); // 8 AM to 7 PM

const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Doctor Appointment',
    date: '2024-03-15',
    startTime: '10:00',
    endTime: '11:00',
    type: 'health',
  },
  {
    id: '2',
    title: 'Family Meeting',
    date: '2024-03-18',
    startTime: '14:00',
    endTime: '15:30',
    type: 'social',
  },
  {
    id: '3',
    title: 'Legal Consultation',
    date: '2024-03-22',
    startTime: '11:30',
    endTime: '12:30',
    type: 'legal',
  },
];

export default function ScheduleWeekScreen() {
  const navigation = useNavigation<ScheduleWeekScreenNavigationProp>();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const getWeekDates = (date: Date) => {
    const day = date.getDay();
    const diff = date.getDate() - day;
    return DAYS.map((_, index) => {
      const current = new Date(date);
      current.setDate(diff + index);
      return current;
    });
  };

  const weekDates = getWeekDates(selectedDate);

  const getEventsForDateAndHour = (date: Date, hour: number) => {
    const dateString = date.toISOString().split('T')[0];
    return mockEvents.filter(event => {
      const eventHour = parseInt(event.startTime.split(':')[0]);
      return event.date === dateString && eventHour === hour;
    });
  };

  const handlePrevWeek = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() - 7);
    setSelectedDate(newDate);
  };

  const handleNextWeek = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + 7);
    setSelectedDate(newDate);
  };

  const formatHour = (hour: number) => {
    return `${hour % 12 || 12}:00 ${hour >= 12 ? 'PM' : 'AM'}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handlePrevWeek}>
          <Text style={styles.headerButton}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          Week of {weekDates[0].toLocaleDateString()}
        </Text>
        <TouchableOpacity onPress={handleNextWeek}>
          <Text style={styles.headerButton}>{'>'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.weekDays}>
        {weekDates.map((date, index) => (
          <View key={index} style={styles.dayColumn}>
            <Text style={styles.dayText}>{DAYS[index]}</Text>
            <Text style={styles.dateText}>{date.getDate()}</Text>
          </View>
        ))}
      </View>

      <ScrollView>
        <View style={styles.timeGrid}>
          {HOURS.map(hour => (
            <View key={hour} style={styles.timeRow}>
              <View style={styles.timeCell}>
                <Text style={styles.timeText}>{formatHour(hour)}</Text>
              </View>
              {weekDates.map((date, dateIndex) => {
                const events = getEventsForDateAndHour(date, hour);
                return (
                  <View key={dateIndex} style={styles.eventCell}>
                    {events.map(event => (
                      <TouchableOpacity
                        key={event.id}
                        style={[
                          styles.eventBlock,
                          event.type === 'health' && styles.healthEvent,
                          event.type === 'social' && styles.socialEvent,
                          event.type === 'legal' && styles.legalEvent,
                        ]}
                        onPress={() => navigation.navigate('ScheduleDay')}
                      >
                        <Text style={styles.eventTitle} numberOfLines={1}>
                          {event.title}
                        </Text>
                        <Text style={styles.eventTime}>
                          {event.startTime} - {event.endTime}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                );
              })}
            </View>
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          // TODO: Implement add event functionality
        }}
      >
        <Text style={styles.addButtonText}>Add Event</Text>
      </TouchableOpacity>
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#414336',
  },
  weekDays: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 8,
  },
  dayColumn: {
    flex: 1,
    alignItems: 'center',
  },
  dayText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#414336',
  },
  timeGrid: {
    paddingBottom: 16,
  },
  timeRow: {
    flexDirection: 'row',
    height: 60,
  },
  timeCell: {
    width: 80,
    justifyContent: 'center',
    paddingLeft: 8,
    borderRightWidth: 1,
    borderRightColor: '#ddd',
  },
  timeText: {
    fontSize: 12,
    color: '#666',
  },
  eventCell: {
    flex: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    padding: 2,
  },
  eventBlock: {
    flex: 1,
    borderRadius: 4,
    padding: 4,
    justifyContent: 'center',
  },
  healthEvent: {
    backgroundColor: '#FFE5E5',
  },
  socialEvent: {
    backgroundColor: '#E5FFE5',
  },
  legalEvent: {
    backgroundColor: '#E5E5FF',
  },
  eventTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#414336',
  },
  eventTime: {
    fontSize: 10,
    color: '#666',
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
}); 