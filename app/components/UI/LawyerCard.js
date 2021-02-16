import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import Card from './Card';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
export const LawyerCard = ({ user, style, onIconClick }) => {
  const uri =
    'https://www.t-nation.com/system/publishing/articles/10005529/original/6-Reasons-You-Should-Never-Open-a-Gym.png';

  return (
    <View style={styles.container}>
      <Card style={{ ...styles.card, backgroundColor: style.backgroundColor }}>
        <View style={styles.marginHorizontal}>
          <View style={styles.inner_container}>
            <View style={styles.inner}>
              <View style={styles.image_container}>
                <Image source={{ uri }} style={styles.image} />
              </View>
              <View style={styles.inner_right}>
                <View style={styles.marginLeft}>
                  <Text style={styles.card_inner_right_greeting_text}>
                    Greetings
                  </Text>
                  <Text style={styles.inner_right_name_text}>
                    {user.firstname + ' ' + user.lastname}
                  </Text>
                </View>
                <View style={styles.inner_edit_icon_container}>
                  {onIconClick && (
                    <TouchableOpacity onPress={onIconClick}>
                      <MaterialCommunityIcons
                        name="circle-edit-outline"
                        size={24}
                        color={Colors.white}
                      />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          </View>
        </View>
      </Card>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
    marginHorizontal: 5,
  },
  card: {
    width: '100%',
    elevation: 0,
  },
  marginHorizontal: {
    marginHorizontal: 10,
  },
  inner_container: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
  inner: {
    flex: 1,
    flexDirection: 'row',
  },
  image_container: { width: 40, height: 40 },
  image: {
    height: '100%',
    width: '100%',
    borderRadius: 40,
  },
  inner_right: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  inner_right_greeting_text: { fontSize: 10, color: Colors.deepGray },
  inner_right_name_text: { marginBottom: 5, color: Colors.white },

  marginLeft: { marginLeft: 15 },
  inner_edit_icon_container: {
    alignItems: 'flex-end',
    flex: 1,
    justifyContent: 'center',
  },
});
export default LawyerCard;
