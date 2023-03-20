import React, { useLayoutEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Pressable,
  Alert,
  Platform,
  ScrollView,
} from "react-native";
import { useExpenses } from "../context/ExpensesContext";
import ButtonStyled from "../components/ui/ButtonStyled";
import IconButton from "../components/ui/IconButton";
import Colors from "../contants/colors";
import DateTimePicker from "@react-native-community/datetimepicker";
import uuid from "react-native-uuid";
import Input from "../components/ui/Input";
import CalendarInput from "../components/ui/CalendarInput";

const ManageExpense = ({ route, navigation }) => {
  const editExpenseId = route.params?.expenseId;

  const { addExpense, getExpenseById, deleteExpense, updateExpense } =
    useExpenses();

  const editExpense = getExpenseById(editExpenseId);

  const [description, setDescription] = useState(
    editExpense ? editExpense.description : ""
  );
  const [amount, setAmount] = useState(editExpense ? editExpense.amount : "");
  const [date, setDate] = useState(editExpense ? editExpense.date : new Date());
  const [show, setShow] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: editExpenseId ? " Edit Expense" : "Add expense",
    });
  }, [navigation]);

  const onPressCancelHandler = () => {
    navigation.goBack();
  };

  const onPressUpdateHandler = () => {
    updateExpense(description, amount, editExpenseId, date);
    navigation.goBack();
  };

  const onPressDeleteExpenseHandler = () => {
    deleteExpense(editExpenseId);
    navigation.goBack();
  };

  const onPressAddHandler = () => {
    if (!amount || !description) {
      Alert.alert(
        "Invalid fields",
        "To continue, create an expense with an amount and a description.",
        [{ text: "Got it" }]
      );
      return;
    }
    addExpense(description, amount, uuid.v4(), date);
    navigation.goBack();
  };

  const onChangeInputHandler = (e) => {
    const number = parseInt(e);
    if (isNaN(number)) {
      Alert.alert("Invalid Number", "Write a number", [
        { text: "Got It", style: "default", onPress: setAmount("") },
      ]);
    } else {
      setAmount(e);
    }
  };

  const onChange = (e, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showDatepicker = () => {
    if (Platform.OS === "android") {
      setShow(false);
      // for iOS, add a button that closes the picker
    }
    setShow(true);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Input
          label="Expense amount:"
          textInputConfig={{
            value: amount,
            onChangeText: onChangeInputHandler,
            placeholder: "0",
            keyboardType: "decimal-pad",
            autoComplete: "off",
            inputMode: "numeric",
          }}
        />
        <CalendarInput date={date} showDatepicker={showDatepicker} />
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            is24Hour={true}
            onChange={onChange}
          />
        )}
        <Input
          label="Description (100 characters max):"
          textInputConfig={{
            value: description,
            onChangeText: setDescription,
            placeholder: "",
            inputMode: "text",
            maxLength: 50,
            autoCorrect: false,
            autoCapitalize: "sentences",
            multiline: true,
          }}
        />
        <View style={styles.buttonsContainer}>
          <ButtonStyled
            onPress={onPressCancelHandler}
            text="Cancel"
            isFlat
            style={{ backgroundColor: Colors.neutral400, borderRadius: 4 }}
          />
          {editExpenseId ? (
            <ButtonStyled onPress={onPressUpdateHandler} text="Update" />
          ) : (
            <ButtonStyled onPress={onPressAddHandler} text="Add" />
          )}
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
    width: "100%",
    paddingVertical: 16,
    backgroundColor: Colors.tertiary500,
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 30,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  iconContainer: {
    paddingTop: 16,
    borderTopWidth: 2,
    marginTop: 30,
    alignItems: "center",
  },
  iconWrapper: {
    width: 50,
    height: 50,
    backgroundColor: Colors.primary700,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  iconPressed: { opacity: 0.6 },
});
