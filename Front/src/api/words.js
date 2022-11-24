import { api } from '.';

export const addUserFavoriteWord = (payload) =>
  api.post('/api/v1/words', payload);

export const getUserFavoriteWords = (userId) =>
  api.get(`/api/v1/words?user-id=${userId}`);

export const playWordAudio = (word) => api.get(`/api/v1/words/${word}/en-US`);
