import { StyleSheet, View, Text, Alert } from "react-native";
import Input from "./Input";
import { useState } from "react";
import Button from "../UI/Button";
import { getFormattedDate } from "../../util/date";
import { GlobalStyles } from "../../constants/styles";

function ExpenseForm({submitButtonLabel ,onCancel, onSubmit, defaultValues}) {
  // can traditionally be done like this, means using individual states for each data field like for amount, date and description
  // but we can also handle multiple states at one useState() defination
  // const [amountValue, setAmountValue] = useState('');
  // function aumountChangedHandler(enteredAmount){
  //     setAmountValue(enteredAmount);
  // }

  // Now below we have one state object that manages all the input values
  // This technique of using one state for many entities changes allows us to avoid redundant code
  // const [inputs, setinputs] = useState({
  const [inputs, setInputs] = useState({
    amount: { 
      value: defaultValues ? defaultValues.amount.toString() : '',
      // isValid: defaultValues ? true : false
      // isValid: !!defaultValues
      isValid: true
  },
    // date: defaultValues ? defaultValues.date.toISOString().slice(0, 10) : '',
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : '',
      // isValid: !!defaultValues
      isValid: true
    },
    description: {
      value: defaultValues ? defaultValues.description : '',
      // isValid: !!defaultValues
      isValid: true
    }
  });

  // And this is the reusable generic function for input change handling task
  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputs((currentInputs) => {
      return {
        ...currentInputs,
        [inputIdentifier]:{value: enteredValue, isValid: true},
      };
    });
  }

  function submitHandler(){
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if(!amountIsValid || !dateIsValid || !descriptionIsValid){
      // Alert.alert('Invalid input', 'Please check your input values');
      setInputs((currentInputs) => {
        return {
          amount: {value: currentInputs.amount.value, isValid: amountIsValid},
          date: {value: currentInputs.date.value, isValid: dateIsValid},
          description: {value: currentInputs.description.value, isValid: descriptionIsValid},
        };
      });
      return;
    }

    onSubmit(expenseData);
  }

  const formIsInValid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          style={styles.rowInput}
          label="Amount"
          invalid={!inputs.amount.isValid}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangedHandler.bind(this, "amount"),
            value: inputs.amount.value,
            // value: inputs['amount']
          }}
        />
        <Input
          style={styles.rowInput}
          label="Date"
          invalid={!inputs.date.isValid}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangedHandler.bind(this, "date"),
            value: inputs.date.value,
          }}
        />
      </View>
      <Input
        label="Description"
        invalid={!inputs.description.isValid}
        textInputConfig={{
          multiLine: true,
          // autoCapitalize: 'none',
          // autoCorrect: false // default is true
          onChangeText: inputChangedHandler.bind(this, "description"),
          value: inputs.description.value,
        }}
      />
      {formIsInValid && <Text style={styles.errorText}>Invalid input values - please check your entered data!!</Text>}
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
}

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
},
button: {
    minWidth: 120,
    marginHorizontal: 8
},
});
