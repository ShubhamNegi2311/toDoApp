import React from 'react';
import {ToDoContextProvider} from './source/context/to_do_context';
import AppNavigator from './source/navigation/app_navigator';

const App = () => {
  return (
    <ToDoContextProvider>
      <AppNavigator />
    </ToDoContextProvider>
  );
};

export default App;
