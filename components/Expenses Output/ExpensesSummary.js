import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function ExpensesSummary({expenses, periodName}) {
    // reduce automatically receives {sum, expense} as prop
    // Sum is the current value which will change for every function execution
    // Expense is the current Item of the array we are looking at
    // Sum will carry the total value which is get calculated over the process and will then 
    // get returned to expensesSum variable
    const expensesSum = expenses.reduce((sum, expense) => {
        return sum + expense.amount
    },0); 
    // 0 is the second argument for the reduce function and it will be the starting value of the sum for the very first item
    // and then sum will store all the sum of the each object's amount in the array
    
  return (
    <View style={styles.container}>
      <Text style={styles.period}>{periodName}</Text>
      {/* tofixed() is a Js object that will help to output the number with 2 decimal places 
      if number is a perfect number then it will show 2 zeros at the decimal places */}
      <Text style={styles.sum}>Rs{expensesSum.toFixed(2)}</Text>
    </View>
  );
}

export default ExpensesSummary;

const styles = StyleSheet.create({
    container: {
        padding: 8,
        backgroundColor: GlobalStyles.colors.primary50,
        borderRadius: 6,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    period: {
        fontSize: 12,
        color: GlobalStyles.colors.primary400
    },
    sum: {
        fontSize: 16,
        fontWeight: "bold",
        color: GlobalStyles.colors.primary500
    }
});
