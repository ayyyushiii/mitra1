import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import CircleCard from '../../components/CircleCard';

export default function HomeScreen() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [stats, setStats] = useState({
    totalSavings: 4850,
    streak: 15,
  });
const [circles, setCircles] = useState([
    {
      id: '1',
      name: 'Friend Circle',
      members: 15,
      totalMembers: 15,
      totalAmount: 5250,
      progress: 65,
      status: 'active',
    },
    {
      id: '2',
      name: 'Auto Drivers Union',
      members: 20,
      totalMembers: 20,
      totalAmount: 7800,
      progress: 45,
      status: 'voting',
    },
  ]);

  const onRefresh = () => {
    setRefreshing(true);
    // Fetch data
    setTimeout(() => setRefreshing(false), 1000);
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Header */}
      <LinearGradient
        colors={['#1E40AF', '#3B82F6']}
        style={styles.header}
      >
        <Text style={styles.greeting}>{t('goodMorning')}</Text>
        <Text style={styles.userName}>{user?.name || 'Rajesh Kumar'}</Text>

        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>{t('totalSavings')}</Text>
          <Text style={styles.balanceAmount}>
            ₹{stats.totalSavings.toLocaleString('en-IN')}
          </Text>
          <View style={styles.streakBadge}>
            <Text style={styles.streakText}>
              🔥 {stats.streak} {t('dayStreak')}
            </Text>
          </View>
        </View>
      </LinearGradient>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity style={styles.actionBtn}>
          <View style={styles.actionIcon}>
            <Ionicons name="cash" size={24} color="#1E40AF" />
          </View>
          <Text style={styles.actionLabel}>{t('payToday')}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => router.push('/circles')}
        >
          <View style={styles.actionIcon}>
            <Ionicons name="add-circle" size={24} color="#1E40AF" />
          </View>
          <Text style={styles.actionLabel}>{t('newCircle')}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionBtn}>
          <View style={styles.actionIcon}>
            <Ionicons name="download" size={24} color="#1E40AF" />
          </View>
          <Text style={styles.actionLabel}>{t('withdraw')}</Text>
        </TouchableOpacity>
      </View>

      {/* Active Circles */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('activeCircles')}</Text>
        {circles.map((circle) => (
          <CircleCard
            key={circle.id}
            circle={circle}
            onPress={() => router.push(`/circle/${circle.id}`)}
          />
        ))}
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
  greeting: {
    fontSize: 16,
    color: 'white',
    opacity: 0.9,
    marginBottom: 4,
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white',
    marginBottom: 20,
  },
  balanceCard: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
  },
  balanceLabel: {
    fontSize: 14,
    color: 'white',
    opacity: 0.8,
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: '700',
    color: 'white',
    marginBottom: 12,
  },
  streakBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(251,191,36,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  streakText: {
    fontSize: 13,
    color: 'white',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginTop: -40,
    marginBottom: 20,
  },
  actionBtn: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    width: '30%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
  actionIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  actionLabel: {
    fontSize: 13,
    color: '#1F2937',
    fontWeight: '500',
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
  },
});