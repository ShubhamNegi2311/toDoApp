import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import SpaceView from '../../components/space_view';
import {ToDoContext} from '../../context/to_do_context';
import {MainAppScreensType} from '../../navigation/types';
import {ToDo} from '../../types/app_types';
import {SCREEN_WIDTH} from '../../utilities/constants';
import {showAlert} from '../../utilities/utils';

type CreateToDoScreenProps = NativeStackScreenProps<
  MainAppScreensType,
  'CreateToDoScreen'
>;

const CreateToDoScreen: React.FC<CreateToDoScreenProps> = props => {
  const [heading, setHeading] = React.useState<string>('');
  const [description, setDescription] = React.useState<string>('');
  const {addNewToDo, toDoList} = React.useContext(ToDoContext);

  const createNewToDo = React.useCallback(() => {
    if (!heading.trim()) {
      return showAlert('Heading Cannot be Empty!');
    }
    if (!description.trim()) {
      return showAlert('Description Cannot be Empty!');
    }
    const toDo: ToDo = {
      heading: heading,
      description: description,
      createdAt: new Date().toString(),
      id: (100000 * Math.random()).toString(),
      isChecked: false,
    };
    addNewToDo(toDo);
    props.navigation.goBack();
  }, [toDoList, heading, description]);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <KeyboardAvoidingView
        style={styles.mainContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView style={{flex: 1}}>
          <SpaceView height={30} />
          <TextInput
            value={heading}
            onChangeText={setHeading}
            style={styles.headingTextInput}
            placeholder={'Heading'}
            placeholderTextColor={'#333'}
            numberOfLines={1}
          />
          <SpaceView height={30} />
          <TextInput
            value={description}
            onChangeText={setDescription}
            style={[styles.headingTextInput, {maxHeight: 250, minHeight: 100}]}
            placeholder={'Description'}
            placeholderTextColor={'#333'}
            multiline
          />
        </ScrollView>
        <TouchableOpacity
          style={{
            paddingVertical: 20,
            paddingHorizontal: 15,
            width: SCREEN_WIDTH * 0.8,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'teal',
            borderRadius: 10,
          }}
          onPress={createNewToDo}>
          <Text>{'Create To Do'}</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CreateToDoScreen;

const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  headingTextInput: {
    fontSize: 16,
    width: SCREEN_WIDTH - 40,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
});
