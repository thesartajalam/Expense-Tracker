import { FlatList, View, Text, StyleSheet } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { GlobalStyles } from "../../constants/styles";

const DUMMY_EXPENSES = [
    {
        id: 'e1',
        description: 'A pair of shoes',
        amount: 59.99,
        date: new Date('2024-12-25')
    },
    {
        id: 'e2',
        description: 'A pair of trousers',
        amount: 89.99,
        date: new Date('2024-01-05')
    },
    {
        id: 'e3',
        description: 'Some Bananas',
        amount: 5.99,
        date: new Date('2024-12-01')
    },
    {
        id: 'e4',
        description: 'A Book',
        amount: 14.99,
        date: new Date('2024-12-19')
    },
    {
        id: 'e5',
        description: 'Another Book',
        amount: 18.59,
        date: new Date('2024-02-18')
    },
    {
        id: 'e6',
        description: 'A pair of trousers',
        amount: 89.99,
        date: new Date('2024-01-05')
    },
    {
        id: 'e7',
        description: 'Some Bananas',
        amount: 5.99,
        date: new Date('2024-12-01')
    },
    {
        id: 'e8',
        description: 'A Book',
        amount: 14.99,
        date: new Date('2024-12-19')
    },
    {
        id: 'e9',
        description: 'Another Book',
        amount: 18.59,
        date: new Date('2024-02-18')
    },
    {
        id: 'e10',
        description: 'Another Book',
        amount: 18.59,
        date: new Date('2024-02-18')
    }
]

function ExpensesOutput({expenses, expensesPeriod}) {
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={expensesPeriod}/>
      <ExpensesList expenses={DUMMY_EXPENSES}/>
    </View>
  );
}

export default ExpensesOutput;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 0,
        backgroundColor: GlobalStyles.colors.primary700
    }
});
