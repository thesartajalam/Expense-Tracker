import { Text, FlatList } from "react-native";
import ExpenseItem from "./ExpenseItem";

function renderExpenseItem(itemData){
    return <ExpenseItem {...itemData.item}/>
    // <Text>{itemData.item.description}</Text>
}

function ExpensesList({expenses}) {
  return (
      <FlatList data={expenses} renderItem={renderExpenseItem} keyExtractor={(item) => item.id}/>
  );
}

export default ExpensesList;
