import api from './api';

export const chitFundService = {
  createGroup: async (data) => {
    return await api.post('/chitfund/create-group', data);
  },

  joinGroup: async (inviteCode) => {
    return await api.post('/chitfund/join-group', { inviteCode });
  },

  getMyGroups: async () => {
    return await api.get('/chitfund/my-groups');
  },

  getGroupDetails: async (groupId) => {
    return await api.get(`/chitfund/group/${groupId}`);
  },

  payContribution: async (groupId, amount, transactionId) => {
    return await api.post('/chitfund/pay-contribution', {
      groupId,
      amount,
      transactionId,
    });
  },

  vote: async (groupId, candidateId) => {
    return await api.post('/chitfund/vote', { groupId, candidateId });
  },

  getVotingStatus: async (groupId) => {
    return await api.get(`/chitfund/voting-status/${groupId}`);
  },
};