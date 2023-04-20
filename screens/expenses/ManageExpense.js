import React, { useLayoutEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Alert,
  Platform,
  ScrollView,
} from 'react-native';
import { useExpenses } from '../../context/ExpensesContext';
import ButtonStyled from '../../components/ui/ButtonStyled';
import IconButton from '../../components/ui/IconButton';
import Colors from '../../contants/colors';
import DateTimePicker from '@react-native-community/datetimepicker';
import Input from '../../components/ui/Input';
import CalendarInput from '../../components/ui/CalendarInput';
import {
  addExpenseApi,
  deleteExpenseApi,
  updateExpenseApi,
} from '../../services/expensesApi';
import LoadingOverlay from '../../components/ui/LoadingOverlay';
import ErrorOverlay from '../../components/ui/ErrorOverlay';
import { useAuth } from '../../context/AuthContext';

const ManageExpense = ({ route, navigation }) => {
  const editExpenseId = route.params?.expenseId;

  const { token } = useAuth();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: editExpenseId ? ' Edit Expense' : 'Add expense',
    });
  }, [navigation]);

  const { addExpense, getExpenseById, deleteExpense, updateExpense } =
    useExpenses();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState('');

  const editExpense = getExpenseById(editExpenseId);

  const [show, setShow] = useState(false);

  const [inputValues, setInputValues] = useState(
    editExpense
      ? editExpense
      : { description: '', amount: '', date: new Date() }
  );

  const onChangeInputValuesHandler = (
    inputIdentifier,
    enteredValue,
    selectedDate
  ) => {
    if (inputIdentifier === 'amount' && isNaN(enteredValue)) {
      Alert.alert('Invalid Number', 'Write a number', [
        {
          text: 'Got It',
          style: 'default',
          onPress: () => setInputValues({ ...inputValues, amount: '' }),
        },
      ]);
    }
    if (inputIdentifier === 'date') {
      setShow(false);
    }
    setInputValues((prev) => {
      return {
        ...prev,
        [inputIdentifier]:
          inputIdentifier === 'date'
            ? new Date(selectedDate.nativeEvent.timestamp)
            : enteredValue,
      };
    });
  };

  const onPressCancelHandler = () => {
    navigation.goBack();
  };

  const onPressSubmitHandler = async () => {
    setIsSubmitting(true);
    try {
      if (editExpenseId) {
        const expenseDataToUpdate = {
          description: inputValues.description,
          amount: inputValues.amount,
          id: editExpenseId,
          date: inputValues.date,
        };
        updateExpense(
          inputValues.description,
          inputValues.amount,
          editExpenseId,
          inputValues.date
        );
        await updateExpenseApi(editExpenseId, expenseDataToUpdate, token);
      } else {
        if (!inputValues.amount || !inputValues.description) {
          Alert.alert(
            'Invalid fields',
            'To continue, create an expense with an amount and a description.',
            [{ text: 'Got it' }]
          );
          return;
        }
        const expenseDataToAdd = {
          description: inputValues.description,
          amount: inputValues.amount,
          date: inputValues.date,
        };
        const idFromFirebase = await addExpenseApi(expenseDataToAdd, token);
        addExpense(
          inputValues.description,
          inputValues.amount,
          idFromFirebase,
          inputValues.date
        );
        setIsSubmitting(true);
      }
      navigation.goBack();
    } catch (error) {
      setApiError('Could not save expense data, please try again later.');
      setIsSubmitting(false);
    }
  };

  const onPressDeleteExpenseHandler = async () => {
    setIsSubmitting(true);
    try {
      await deleteExpenseApi(editExpenseId, token);
      deleteExpense(editExpenseId);
      navigation.goBack();
    } catch (error) {
      setApiError(
        'Could not delete the selected expense. Please try again later.'
      );
      setIsSubmitting(false);
    }
  };

  const showDatepicker = () => {
    if (Platform.OS === 'android') {
      setShow(false);
      // for iOS, add a button that closes the picker
    }
    setShow(true);
  };

  if (apiError && !isSubmitting) {
    return <ErrorOverlay message={apiError} />;
  }

  if (isSubmitting) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.containerTwoInputs}>
          <Input
            label="Amount:"
            textInputConfig={{
              value: inputValues.amount,
              onChangeText: onChangeInputValuesHandler.bind(this, 'amount'),
              placeholder: '0',
              keyboardType: 'decimal-pad',
              autoComplete: 'off',
              inputMode: 'numeric',
            }}
          />
          <CalendarInput
            date={inputValues.date}
            showDatepicker={showDatepicker}
          />
        </View>

        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={new Date(inputValues.date)}
            mode="date"
            is24Hour={true}
            onChange={onChangeInputValuesHandler.bind(
              this,
              'date',
              'timestamp'
            )}
          />
        )}
        <Input
          label="Description (100 characters max):"
          textInputConfig={{
            value: inputValues.description,
            onChangeText: onChangeInputValuesHandler.bind(this, 'description'),
            placeholder: '',
            inputMode: 'text',
            maxLength: 50,
            autoCorrect: false,
            autoCapitalize: 'sentences',
            multiline: true,
          }}
        />
        <View style={styles.buttonsContainer}>
          <ButtonStyled onPress={onPressCancelHandler} text="Cancel" isFlat />

          <ButtonStyled
            onPress={onPressSubmitHandler}
            text={editExpenseId ? 'Update' : 'Add'}
          />
        </View>
        {editExpenseId && (
          <View style={styles.iconContainer}>
            <Pressable
              onPress={onPressDeleteExpenseHandler}
              style={({ pressed }) => [
                styles.iconWrapper,
                pressed && styles.iconPressed,
              ]}
            >
              <IconButton
                iconName="trash"
                iconSize={24}
                onPress={onPressDeleteExpenseHandler}
                iconColor={Colors.primary300}
              />
            </Pressable>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 16,
    backgroundColor: Colors.tertiary500,
    flex: 1,
    paddingTop: 60,
  },
  containerTwoInputs: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    width: '100%',
    justifyContent: 'space-around',
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 30,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  iconContainer: {
    paddingTop: 16,
    borderTopWidth: 2,
    marginTop: 30,
    alignItems: 'center',
  },
  iconWrapper: {
    width: 50,
    height: 50,
    backgroundColor: Colors.primary700,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconPressed: { opacity: 0.6 },
});
