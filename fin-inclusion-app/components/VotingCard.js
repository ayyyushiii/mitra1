import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function VotingCard({ voting, onVote }) {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const diff = voting.votingEnds - now;

      if (diff <= 0) {
        setTimeLeft('Ended');
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      if (days > 0) {
        setTimeLeft(`${days}d ${hours}h`);
      } else if (hours > 0) {
        setTimeLeft(`${hours}h ${minutes}m`);
      } else {
        setTimeLeft(`${minutes}m`);
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 60000);

    return () => clearInterval(interval);
  }, [voting.votingEnds]);

  const sortedCandidates = [...voting.candidates].sort(
    (a, b) => b.votes - a.votes
  );

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.groupName}>{voting.groupName}</Text>
        <View style={styles.timerBadge}>
          <Ionicons name="time" size={16} color="#D97706" />
          <Text style={styles.timerText}>{timeLeft}</Text>
        </View>
      </View>

      {/* Pot Amount */}
      <View style={styles.potCard}>
        <Text style={styles.potLabel}>Total Pot</Text>
        <Text style={styles.potAmount}>
          ₹{voting.totalPot.toLocaleString('en-IN')}
        </Text>
      </View>

      {/* Candidates */}
      <View style={styles.candidates}>
        <Text style={styles.candidatesTitle}>Vote for a Member</Text>
        {sortedCandidates.map((candidate, index) => (
          <View
            key={candidate.id}
            style={[
              styles.candidateCard,
              index === 0 && styles.topCandidate,
            ]}
          >
            <View style={styles.candidateInfo}>
              <View style={styles.avatarContainer}>
                <Text style={styles.avatar}>{candidate.avatar}</Text>
                {index === 0 && (
                  <View style={styles.topBadge}>
                    <Text style={styles.topBadgeText}>🏆</Text>
                  </View>
                )}
              </View>
              <View style={styles.candidateDetails}>
                <Text style={styles.candidateName}>{candidate.name}</Text>
                <View style={styles.statusRow}>
                  <View
                    style={[
                      styles.paymentStatus,
                      candidate.hasPaid ? styles.paid : styles.pending,
                    ]}
                  >
                    <Text
                      style={[
                        styles.statusText,
                        candidate.hasPaid ? styles.paidText : styles.pendingText,
                      ]}
                    >
                      {candidate.hasPaid ? '✓ Paid' : '✗ Pending'}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.voteSection}>
              <View style={styles.voteCount}>
                <Ionicons name="thumbs-up" size={18} color="#1E40AF" />
                <Text style={styles.voteNumber}>{candidate.votes}</Text>
              </View>
              {!voting.hasVoted && candidate.hasPaid && (
                <TouchableOpacity
                  style={styles.voteBtn}
                  onPress={() => onVote(voting.groupId, candidate.id)}
                >
                  <Text style={styles.voteBtnText}>Vote</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}
      </View>

      {voting.hasVoted && (
        <View style={styles.votedBanner}>
          <Ionicons name="checkmark-circle" size={20} color="#059669" />
          <Text style={styles.votedText}>You have voted!</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  groupName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    flex: 1,
  },
  timerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 4,
  },
  timerText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#D97706',
  },
  potCard: {
    backgroundColor: '#EFF6FF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  potLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  potAmount: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1E40AF',
  },
  candidates: {
    marginBottom: 12,
  },
  candidatesTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  candidateCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    marginBottom: 8,
  },
  topCandidate: {
    backgroundColor: '#FEF3C7',
    borderWidth: 2,
    borderColor: '#F59E0B',
  },
  candidateInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    fontSize: 32,
  },
  topBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: 'white',
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topBadgeText: {
    fontSize: 12,
  },
  candidateDetails: {
    flex: 1,
  },
  candidateName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  statusRow: {
    flexDirection: 'row',
    gap: 6,
  },
  paymentStatus: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  paid: {
    backgroundColor: '#D1FAE5',
  },
  pending: {
    backgroundColor: '#FEE2E2',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  paidText: {
    color: '#059669',
  },
  pendingText: {
    color: '#DC2626',
  },
  voteSection: {
    alignItems: 'center',
    gap: 8,
  },
  voteCount: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  voteNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E40AF',
  },
  voteBtn: {
    backgroundColor: '#1E40AF',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 8,
  },
  voteBtnText: {
    color: 'white',
    fontSize: 13,
    fontWeight: '600',
  },
  votedBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D1FAE5',
    padding: 12,
    borderRadius: 12,
    gap: 8,
  },
  votedText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#059669',
  },
});