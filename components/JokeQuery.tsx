import { StyleSheet, TextInput } from "react-native";
import { View, Text } from "./Themed";
import { useState } from "react";
import { useLazyGetSearchJokesQuery } from "../services/chuck";

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    width: "100%",
  },
  input: {
    backgroundColor: "#f4f4f4",
    paddingVertical: 15,
    paddingHorizontal: 18,
    borderRadius: 15,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: "rgba(0,0,0,0.45)",
    shadowRadius: 10,
    shadowOpacity: 0.5,
  },
  focus: {
    borderWidth: 2,
    borderColor: "blue",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 18,
    fontWeight: "300",
    marginBottom: 10,
  },
});

const JokeQuery = () => {
  const [query, setQuery] = useState("");
  const [focus, setFocus] = useState(false);

  const [getJokeByQuery] = useLazyGetSearchJokesQuery()

  const onSubmitEditing = () => {
    getJokeByQuery(query);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Remember a joke? Search for it here</Text>
      <TextInput
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={[styles.input, focus && styles.focus]}
        value={query}
        onChangeText={(text) => setQuery(text)}
        placeholder="Search for a joke"
        onSubmitEditing={onSubmitEditing}
        returnKeyLabel="Search"
        returnKeyType="search"
        placeholderTextColor="#090909"
        cursorColor="gray"
      />
    </View>
  );
};

export default JokeQuery;
