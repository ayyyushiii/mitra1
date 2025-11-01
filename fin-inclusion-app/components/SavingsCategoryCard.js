import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function SavingsCategoryCard({ category, onPress }) {
  const progress =
    category.targetAmount > 0
      ? (category.currentAmount / category.targetAmount) * 100
      : 0;

  return (
    <TouchableOpacity
      style={[styles.card, { borderColor: category.color }]}
      onPress={onPress}
    >
      <View style={styles.header}>
        <View style={styles.nameContainer}>
          <Text style={styles.icon}>{category.icon}</Text>
          <View>
            <Text style={styles.name}>{category.name}</Text>
            <Text style={styles.percentage}>{progress.toFixed(1)}% of goal</Text>
          </View>
        </View>
        <View style={styles.amountContainer}>
          <Text style={[styles.amount, { color: category.color }]}>
            ₹{category.currentAmount.toLocaleString('en-IN')}
          </Text>
          {category.targetAmount > 0 && (
            <Text style={styles.target}>
              / ₹{category.targetAmount.toLocaleString('en-IN')}
            </Text>
          )}
        </View>
      </View>

      {category.targetAmount > 0 && (
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${Math.min(progress, 100)}%`, backgroundColor: category.color },
            ]}
          />
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
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  icon: {
    fontSize: 32,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  percentage: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 20,
    fontWeight: '700',
  },
  target: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
});