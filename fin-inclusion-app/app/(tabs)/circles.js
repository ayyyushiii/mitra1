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
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../../context/LanguageContext';
import { chitFundService } from '../../services/chitFundService';
import CircleCard from '../../components/CircleCard';
import { circleService } from "../../services/circleService";
import { useAuth } from "../../context/AuthContext";

export default function CirclesScreen() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('active');
  const [circles, setCircles] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);

  useEffect(() => {
    fetchCircles();
  }, []);

  const { user } = useAuth();

  const fetchCircles = async () => {
    if (!user?.uid) return;
    try {
      const data = await circleService.getMyCircles(user.uid);
      setCircles(data);
    } catch (e) {
    console.log("Circle fetch error:", e);
  }
};

  const mockCircles = [
    {
      id: '1',
      name: 'दोस्तों का चक्र #234',
      status: 'active',
      members: 15,
      monthlyContribution: 1000,
      currentMonth: 3,
      totalMonths: 10,
      yourContribution: 450,
      nextPayment: 'कल',
      yourTurn: 5,
    },
    {
      id: '2',
      name: 'रिक्शा चालक संघ #189',
      status: 'voting',
      members: 20,
      monthlyContribution: 1000,
      currentMonth: 4,
      totalMonths: 12,
      votingEnds: '2 days',
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>{t('myCircles')}</Text>
        <Text style={styles.subtitle}>3 {t('active')}, 1 {t('completed')}</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'active' && styles.tabActive]}
          onPress={() => setActiveTab('active')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'active' && styles.tabTextActive,
            ]}
          >
            {t('active')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'completed' && styles.tabActive]}
          onPress={() => setActiveTab('completed')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'completed' && styles.tabTextActive,
            ]}
          >
            {t('completed')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'invited' && styles.tabActive]}
          onPress={() => setActiveTab('invited')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'invited' && styles.tabTextActive,
            ]}
          >
            {t('invited')}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Circles List */}
      <ScrollView style={styles.list}>
        {mockCircles
          .filter((c) => c.status === activeTab || activeTab === 'active')
          .map((circle) => (
            <CircleCard key={circle.id} circle={circle} detailed />
          ))}
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.createBtn}
          onPress={() => setShowCreateModal(true)}
        >
          <Ionicons name="add" size={24} color="white" />
          <Text style={styles.createBtnText}>{t('createGroup')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.joinBtn}
          onPress={() => setShowJoinModal(true)}
        >
          <Ionicons name="enter" size={24} color="#1E40AF" />
          <Text style={styles.joinBtnText}>{t('joinGroup')}</Text>
        </TouchableOpacity>
      </View>

      {/* Create Group Modal */}
      <Modal visible={showCreateModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Create New Circle</Text>
            <TextInput
              style={styles.input}
              placeholder="Group Name"
              placeholderTextColor="#9CA3AF"
            />
            <TextInput
              style={styles.input}
              placeholder="Monthly Contribution (₹)"
              keyboardType="numeric"
              placeholderTextColor="#9CA3AF"
            />
            <TextInput
              style={styles.input}
              placeholder="Total Months"
              keyboardType="numeric"
              placeholderTextColor="#9CA3AF"
            />
            <TextInput
              style={styles.input}
              placeholder="Total Members"
              keyboardType="numeric"
              placeholderTextColor="#9CA3AF"
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalCancelBtn}
                onPress={() => setShowCreateModal(false)}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalCreateBtn}>
                <Text style={styles.modalCreateText}>Create</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Join Group Modal */}
      <Modal visible={showJoinModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Join Circle</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Invite Code"
              autoCapitalize="characters"
              placeholderTextColor="#9CA3AF"
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalCancelBtn}
                onPress={() => setShowJoinModal(false)}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalCreateBtn}>
                <Text style={styles.modalCreateText}>Join</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: 'white',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
  },
  tabActive: {
    backgroundColor: '#1E40AF',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  tabTextActive: {
    color: 'white',
  },
  list: {
    flex: 1,
    padding: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  createBtn: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#1E40AF',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  createBtnText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 15,
  },
  joinBtn: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#EFF6FF',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  joinBtnText: {
    color: '#1E40AF',
    fontWeight: '600',
    fontSize: 15,
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