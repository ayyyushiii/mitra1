import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../../context/LanguageContext';
import VotingCard from '../../components/VotingCard';

export default function VotingScreen() {
  const { t } = useLanguage();
  const [activeVotings, setActiveVotings] = useState([
    {
      groupId: '1',
      groupName: 'रिक्शा चालक संघ #189',
      month: 4,
      votingEnds: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      totalPot: 10000,
      candidates: [
        {
          id: 'user1',
          name: 'सुनीता देवी',
          votes: 8,
          hasPaid: true,
          avatar: '👩',
        },
              {
          id: 'user2',
          name: 'विकास यादव',
          votes: 6,
          hasPaid: true,
          avatar: '👨',
        },
        {
          id: 'user3',
          name: 'मीना गुप्ता',
          votes: 5,
          hasPaid: true,
          avatar: '👩',
        },
        {
          id: 'user4',
          name: 'राकेश सिंह',
          votes: 3,
          hasPaid: true,
          avatar: '👨',
        },

        {
          id: 'user5',
          name: 'अंजलि वर्मा',
          votes: 2,
          hasPaid: false,
          avatar: '👩',
        },
      ],
      hasVoted: false,
    },
]);

  const handleVote = (groupId, candidateId) => {
    Alert.alert(
      'Confirm Vote',
      'Are you sure you want to vote for this member?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Vote',
          onPress: () => {
            // Call API to submit vote
            setActiveVotings(
              activeVotings.map((voting) =>
                voting.groupId === groupId
                  ? { ...voting, hasVoted: true }
                  : voting
              )
            );
            Alert.alert('Success', 'Your vote has been recorded!');
          },
        },
      ]
    );
  };
 return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <LinearGradient colors={['#7C3AED', '#A78BFA']} style={styles.header}>
        <Text style={styles.title}>{t('voting')}</Text>
        <Text style={styles.subtitle}>
          Active Votings: {activeVotings.length}
        </Text>
      </LinearGradient>

      {/* Votings */}
      <View style={styles.content}>
        {activeVotings.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="checkmark-circle-outline" size={80} color="#D1D5DB" />
            <Text style={styles.emptyText}>No active votings</Text>
          </View>
        ) : (
          activeVotings.map((voting) => (
            <VotingCard
              key={voting.groupId}
              voting={voting}
              onVote={handleVote}
            />
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 30,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: 'white',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    opacity: 0.9,
  },
  content: {
    padding: 16,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 16,
  },
});
