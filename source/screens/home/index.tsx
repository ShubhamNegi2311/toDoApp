import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {
  Alert,
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import SpaceView from '../../components/space_view';
import {ToDoContext} from '../../context/to_do_context';
import {MainAppScreensType} from '../../navigation/types';
import {ToDo} from '../../types/app_types';
import {SCREEN_WIDTH} from '../../utilities/constants';

type HomeScreenProps = NativeStackScreenProps<MainAppScreensType, 'HomeScreen'>;

const HomeScreen: React.FC<HomeScreenProps> = props => {
  const {toDoList, deleteToDo, checkToDo} = React.useContext(ToDoContext);

  const deleteToDoFromList = React.useCallback(
    (data: ToDo) => {
      Alert.alert('ToDoApp', 'Do you want to delete this To Do?', [
        {
          text: 'Yes',
          onPress: () => {
            deleteToDo(data);
          },
        },
        {text: 'No'},
      ]);
    },
    [toDoList],
  );

  const markToDoChecked = React.useCallback(
    (data: ToDo) => {
      if (!data.isChecked) {
        Alert.alert('ToDoApp', 'Do you want to mark this To Do as Completed?', [
          {
            text: 'Yes',
            onPress: () => {
              checkToDo(data);
            },
          },
          {text: 'No'},
        ]);
      }
    },
    [toDoList],
  );

  return (
    <SafeAreaView style={styles.mainContainer}>
      <SpaceView height={30} />
      <FlatList
        data={toDoList}
        renderItem={({item, index}) => {
          return (
            <Pressable
              style={{
                flexDirection: 'row',
                width: SCREEN_WIDTH * 0.9,
                padding: 15,
                backgroundColor: item.isChecked ? '#AAA' : '#FFF',
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                markToDoChecked(item);
              }}>
              <Text style={{flexGrow: 1, flexShrink: 1}}>{item.heading}</Text>
              <TouchableOpacity
                style={styles.deleteIcon}
                onPress={() => {
                  deleteToDoFromList(item);
                }}>
                <Text style={styles.deleteIconText}>{'-'}</Text>
              </TouchableOpacity>
            </Pressable>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={() => {
          return <SpaceView height={20} />;
        }}
        ListEmptyComponent={
          <View style={{paddingVertical: 30}}>
            <Text>{'No ToDos Found!'}</Text>
          </View>
        }
      />
      <TouchableOpacity
        style={styles.fab}
        onPress={() => {
          props.navigation.navigate('CreateToDoScreen');
        }}>
        <Text style={styles.fabAddText}>{'+'}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 40,
    backgroundColor: 'blue',
    height: 75,
    width: 75,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fabAddText: {fontSize: 40, fontWeight: 'bold'},
  deleteIcon: {
    backgroundColor: 'red',
    height: 40,
    width: 40,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteIconText: {
    fontSize: 26,
  },
});
