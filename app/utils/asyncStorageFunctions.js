import AsyncStorage from '@react-native-community/async-storage';

export const saveDataToStorage = async (token, userId, expirationDate) => {
  await AsyncStorage.setItem(
    'userInfo',
    JSON.stringify({
      token: token,
      userId: userId,
      expiryDate: expirationDate.toISOString(),
    })
  );
};
