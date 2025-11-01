import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CircleCard({ circle, onPress, detailed = false }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return { bg: '#DCFCE7', text: '#059669' };
      case 'voting':
        return { bg: '#FEF3C7', text: '#D97706' };
      case 'completed':
        return { bg: '#E5E7EB', text: '#6B7280' };
      default:
        return { bg: '#E5E7EB', text: '#6B7280' };
    }
  };

  const statusColor = getStatusColor(circle.status);

  return (
    <TouchableOpacity
      style={[
        styles.card,
        circle.status === 'voting' && styles.cardVoting,
      ]}
      onPress={onPress}
    >
      <View style={styles.header}>
        <Text style={styles.name}>{circle.name}</Text>
        <View style={[styles.badge, { backgroundColor: statusColor.bg }]}>
          <Text style={[styles.badgeText, { color: statusColor.text }]}>
            {circle.status}
          </Text>
        </View>
      </View>

      {detailed ? (
        <View style={styles.detailedInfo}>
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Your Contribution</Text>
              <Text style={styles.infoValue}>
                ₹{circle.yourContribution || 0}
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Next Payment</Text>
              <Text style={styles.infoValue}>{circle.nextPayment}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Your Turn</Text>
              <Text style={styles.infoValue}>{circle.yourTurn}th</Text>
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.info}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Members</Text>
            <Text style={styles.infoValue}>
              {circle.members}/{circle.totalMembers || circle.members}
            </Text>
          </View>
          <View style={styles.infoItem}>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Total</Text>
            <Text style={styles.infoValue}>₹{circle.totalAmount}</Text>
          </View>
        </View>
      )}

      {circle.progress !== undefined && (
        <View style={styles.progressBar}>
          <View
            style={[styles.progressFill, { width: `${circle.progress}%` }]}
          />
        </View>
      )}

      {circle.status === 'voting' && (
        <View style={styles.votingAlert}>
          <Ionicons name="alert-circle" size={16} color="#D97706" />
          <Text style={styles.votingAlertText}>
            Voting ends in {circle.votingEnds}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardVoting: {
    borderWidth: 2,
    borderColor: '#FEF3C7',
    backgroundColor: '#FFFBEB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    flex: 1,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailedInfo: {
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoItem: {
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 11,
    color: '#6B7280',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1F2937',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#10B981',
    borderRadius: 3,
  },
  votingAlert: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    padding: 8,
    backgroundColor: 'white',
    borderRadius: 8,
    gap: 6,
  },
  votingAlertText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#D97706',
  },
});