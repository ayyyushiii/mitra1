import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
} from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../../context/LanguageContext';
import SavingsCategoryCard from '../../components/SavingsCategoryCard';

export default function SavingsScreen() {
  const { t } = useLanguage();
  const [totalSavings, setTotalSavings] = useState(15000);
  const [unallocated, setUnallocated] = useState(0);
  const [showAddModal, setShowAddModal] = useState(false);
  const [categories, setCategories] = useState([
    {
      id: '1',
      name: t('marriage'),
      icon: '💍',
      currentAmount: 4000,
      targetAmount: 100000,
      color: '#FF6B6B',
    },
    {
      id: '2',
      name: t('education'),
      icon: '📚',
      currentAmount: 3500,
      targetAmount: 50000,
      color: '#4ECDC4',
    },
    {
      id: '3',
      name: t('land'),
      icon: '🏡',
      currentAmount: 3000,
      targetAmount: 500000,
      color: '#45B7D1',
    },
    {
      id: '4',
      name: t('gold'),
      icon: '✨',
      currentAmount: 2500,
      targetAmount: 75000,
      color: '#F7DC6F',
    },
    {
      id: '5',
      name: t('loanRepay'),
      icon: '💳',
      currentAmount: 2000,
      targetAmount: 25000,
      color: '#95E1D3',
    },
  ]);

  const chartData = categories.map((cat) => ({
    name: cat.name.substring(0, 10),
    amount: cat.currentAmount,
    color: cat.color,
    legendFontColor: '#7F7F7F',
    legendFontSize: 12,
  }));

  const allocated = categories.reduce(
    (sum, cat) => sum + cat.currentAmount,
    0
  );

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>{t('savingsCategories')}</Text>
        <View style={styles.totalCard}>
          <Text style={styles.totalLabel}>{t('totalSavings')}</Text>
          <Text style={styles.totalAmount}>
            ₹{totalSavings.toLocaleString('en-IN')}
          </Text>
        </View>
      </View>

      {/* Unallocated Amount */}
      {unallocated > 0 && (
        <View style={styles.unallocatedCard}>
          <View>
            <Text style={styles.unallocatedLabel}>{t('unallocated')}</Text>
            <Text style={styles.unallocatedAmount}>
              ₹{unallocated.toLocaleString('en-IN')}
            </Text>
          </View>
          <TouchableOpacity style={styles.allocateBtn}>
            <Text style={styles.allocateBtnText}>{t('allocateSavings')}</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Pie Chart */}
      <View style={styles.chartContainer}>
        <PieChart
          data={chartData}
          width={340}
          height={200}
          chartConfig={{
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          accessor="amount"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      </View>

      {/* Categories */}
      <View style={styles.categoriesSection}>
        <Text style={styles.sectionTitle}>Your Goals</Text>
        {categories.map((category) => (
          <SavingsCategoryCard key={category.id} category={category} />
        ))}

        <TouchableOpacity
          style={styles.addCategoryBtn}
          onPress={() => setShowAddModal(true)}
        >
          <Ionicons name="add-circle-outline" size={24} color="#1E40AF" />
          <Text style={styles.addCategoryText}>{t('addCategory')}</Text>
        </TouchableOpacity>
      </View>

      {/* Add Category Modal */}
      <Modal visible={showAddModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Goal</Text>
            <TextInput
              style={styles.input}
              placeholder="Goal Name"
              placeholderTextColor="#9CA3AF"
            />
            <TextInput
              style={styles.input}
              placeholder="Target Amount (₹)"
              keyboardType="numeric"
              placeholderTextColor="#9CA3AF"
            />
            <Text style={styles.iconLabel}>Choose Icon</Text>
            <View style={styles.iconGrid}>
              {['💍', '📚', '🏡', '✨', '💳', '🚗', '✈️', '🏥'].map((icon) => (
                <TouchableOpacity key={icon} style={styles.iconOption}>
                  <Text style={styles.iconText}>{icon}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalCancelBtn}
                onPress={() => setShowAddModal(false)}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalCreateBtn}>
                <Text style={styles.modalCreateText}>Add Goal</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: '#10B981',
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
    marginBottom: 16,
  },
  totalCard: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 14,
    color: 'white',
    opacity: 0.9,
    marginBottom: 8,
  },
  totalAmount: {
    fontSize: 36,
    fontWeight: '700',
    color: 'white',
  },
  unallocatedCard: {
    margin: 16,
    marginTop: -30,
    padding: 16,
    backgroundColor: '#FEF3C7',
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  unallocatedLabel: {
    fontSize: 14,
    color: '#92400E',
    marginBottom: 4,
  },
  unallocatedAmount: {
    fontSize: 24,
    fontWeight: '700',
    color: '#92400E',
  },
  allocateBtn: {
    backgroundColor: '#F59E0B',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
  },
  allocateBtnText: {
    color: 'white',
    fontWeight: '600',
  },
  chartContainer: {
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginVertical: 16,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  categoriesSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
  },
  addCategoryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
    marginTop: 12,
    gap: 8,
  },
  addCategoryText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E40AF',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    width: '85%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 20,
  },
  input: {
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    marginBottom: 12,
    color: '#1F2937',
  },
  iconLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginTop: 8,
    marginBottom: 12,
  },
  iconGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  iconOption: {
    width: 50,
    height: 50,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  iconText: {
    fontSize: 24,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
  },
  modalCancelBtn: {
    flex: 1,
    padding: 14,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
  },
  modalCancelText: {
    color: '#6B7280',
    fontWeight: '600',
  },
  modalCreateBtn: {
    flex: 1,
    padding: 14,
    borderRadius: 12,
    backgroundColor: '#1E40AF',
    alignItems: 'center',
  },
  modalCreateText: {
    color: 'white',
    fontWeight: '600',
  },
});