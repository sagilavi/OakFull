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

type ScheduleDayScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ScheduleDay'>;

interface Event {
  id: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  type: 'health' | 'social' | 'legal';
  location?: string;
  notes?: string;
}

const HOURS = Array.from({ length: 12 }, (_, i) => i + 8); // 8 AM to 7 PM

const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Doctor Appointment',
    date: '2024-03-15',
    startTime: '10:00',
    endTime: '11:00',
    type: 'health',
    location: 'City Medical Center',
    notes: 'Bring medical history and current medications list',
  },
  {
    id: '2',
    title: 'Family Meeting',
    date: '2024-03-15',
    startTime: '14:00',
    endTime: '15:30',
    type: 'social',
    location: 'Home',
    notes: 'Discuss care arrangements with siblings',
  },
  {
    id: '3',
    title: 'Legal Consultation',
    date: '2024-03-15',
    startTime: '11:30',
    endTime: '12:30',
    type: 'legal',
    location: 'Law Office Downtown',
    notes: 'Review power of attorney documents',
  },
];

export default function ScheduleDayScreen() {
  const navigation = useNavigation<ScheduleDayScreenNavigationProp>();
  const [selectedDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const formatHour = (hour: number) => {
    return `${hour % 12 || 12}:00 ${hour >= 12 ? 'PM' : 'AM'}`;
  };

  const getEventsForHour = (hour: number) => {
    return mockEvents.filter(event => {
      const eventHour = parseInt(event.startTime.split(':')[0]);
      return eventHour === hour;
    });
  };

  const handleEventPress = (event: Event) => {
    setSelectedEvent(event);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {selectedDate.toLocaleDateString(undefined, {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </Text>
      </View>

      <ScrollView style={styles.scrollView}>
        {HOURS.map(hour => {
          const events = getEventsForHour(hour);
          return (
            <View key={hour} style={styles.timeBlock}>
              <View style={styles.timeCell}>
                <Text style={styles.timeText}>{formatHour(hour)}</Text>
              </View>
              <View style={styles.eventsContainer}>
                {events.map(event => (
                  <TouchableOpacity
                    key={event.id}
                    style={[
                      styles.eventBlock,
                      event.type === 'health' && styles.healthEvent,
                      event.type === 'social' && styles.socialEvent,
                      event.type === 'legal' && styles.legalEvent,
                    ]}
                    onPress={() => handleEventPress(event)}
                  >
                    <Text style={styles.eventTitle}>{event.title}</Text>
                    <Text style={styles.eventTime}>
                      {event.startTime} - {event.endTime}
                    </Text>
                    {event.location && (
                      <Text style={styles.eventLocation}>{event.location}</Text>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          );
        })}
      </ScrollView>

      {selectedEvent && (
        <View style={styles.eventDetails}>
          <View style={styles.eventDetailsHeader}>
            <Text style={styles.eventDetailsTitle}>{selectedEvent.title}</Text>
            <TouchableOpacity
              onPress={() => setSelectedEvent(null)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.eventDetailsTime}>
            {selectedEvent.startTime} - {selectedEvent.endTime}
          </Text>
          {selectedEvent.location && (
            <Text style={styles.eventDetailsLocation}>
              📍 {selectedEvent.location}
            </Text>
          )}
          {selectedEvent.notes && (
            <Text style={styles.eventDetailsNotes}>{selectedEvent.notes}</Text>
          )}
        </View>
      )}

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
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#414336',
  },
  scrollView: {
    flex: 1,
  },
  timeBlock: {
    flexDirection: 'row',
    minHeight: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  timeCell: {
    width: 80,
    justifyContent: 'center',
    paddingLeft: 16,
    borderRightWidth: 1,
    borderRightColor: '#ddd',
  },
  timeText: {
    fontSize: 14,
    color: '#666',
  },
  eventsContainer: {
    flex: 1,
    padding: 8,
  },
  eventBlock: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
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
    fontSize: 16,
    fontWeight: 'bold',
    color: '#414336',
    marginBottom: 4,
  },
  eventTime: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  eventLocation: {
    fontSize: 14,
    color: '#666',
  },
  eventDetails: {
    position: 'absolute',
    bottom: 80,
    left: 16,
    right: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  eventDetailsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  eventDetailsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#414336',
  },
  closeButton: {
    padding: 4,
  },
  closeButtonText: {
    fontSize: 24,
    color: '#666',
  },
  eventDetailsTime: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  eventDetailsLocation: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  eventDetailsNotes: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
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