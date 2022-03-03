import React, { useEffect, useRef, useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Task } from "./TasksList";
import {EditTaskArgs} from '../pages/Home'
import editIcon from '../assets/icons/editing/edit.png'
import trashIcon from '../assets/icons/trash/trash.png'
import { Icon } from "react-native-vector-icons/Icon";

interface TaskItemProps {
    task: Task;
    toggleTaskDone: (id: number) => void;
    removeTask: (id: number) => void;
    editTask: ({taskId, taskNewTitle}: EditTaskArgs) => void;
}

export function TaskItem ({task, editTask, removeTask,toggleTaskDone}: TaskItemProps ) {
const [isEditing, setIsEditing] = useState(false) 
const [taskNewTitleValue, setTaskNewTitleValue] = useState(task.title)
const textInputRef = useRef<TextInput>(null)

function handleStartEditing() {
    setIsEditing(true);
}

function handleCancelEditing() {
    setTaskNewTitleValue(task.title);
    setIsEditing(false);
}

function handleSubmitEditing() {
    editTask({taskId: task.id, taskNewTitle: taskNewTitleValue})
    setIsEditing(false)
}


useEffect(() => {
    if(textInputRef.current) {
        if(isEditing) {
        textInputRef.current.focus();
    }else{
        textInputRef.current.blur();
    }  

    }

}, [isEditing])


return (
    <>
    <View>
    <TouchableOpacity
      //testID={`button-${index}`}
      activeOpacity={0.7}
      style={styles.taskButton}
      onPress={() => toggleTaskDone(task.id)}
    >
      <View 
        //testID={`marker-${index}`}
        style={task.done ? styles.taskMarkerDone : styles.taskMarker } 
      >
        {/* { task.done && (
        //   <Icon 
        //     name="check"
        //     size={12}
        //     color="#FFF"
        //   />
        )} */}
      </View>

      <Text 
        style={task.done ? styles.taskTextDone : styles.taskText } 
      >
        {/* {task.title} */}
      </Text>

      <TextInput 
        value={taskNewTitleValue}
        onChangeText={setTaskNewTitleValue}
        editable={isEditing}
        onSubmitEditing={handleSubmitEditing}
        style={task.done ? styles.taskTextDone : styles.taskText }
        ref={textInputRef}
      />
    </TouchableOpacity>

  </View>

  <View>

  <TouchableOpacity
            //   testID={`trash-${index}`}
            //   style={{ paddingHorizontal: 24 }}
              onPress={() => removeTask(task.id)}
            >
              <Image source={trashIcon} />
            </TouchableOpacity>

            {isEditing ? (
                <TouchableOpacity
                onPress={handleCancelEditing}
                >
                    
                </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                            onPress={handleStartEditing}
                            >
                                <Image source={editIcon} />  
                            </TouchableOpacity>

                        )}         

  </View>
  
  
  
  </>
)
}




const styles = StyleSheet.create({
    taskButton: {
      flex: 1,
      paddingHorizontal: 24,
      paddingVertical: 15,
      marginBottom: 4,
      borderRadius: 4,
      flexDirection: 'row',
      alignItems: 'center'
    },
    taskMarker: {
      height: 16,
      width: 16,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: '#B2B2B2',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskText: {
      color: '#666',
      fontFamily: 'Inter-Medium'
    },
    taskMarkerDone: {
      height: 16,
      width: 16,
      borderRadius: 4,
      backgroundColor: '#1DB863',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskTextDone: {
      color: '#1DB863',
      textDecorationLine: 'line-through',
      fontFamily: 'Inter-Medium'
    }
  })

//   function useEffect(arg0: () => void , arg1: boolean[]) {
//       throw new Error('Function not implemented')
//   }