import { StyleSheet } from "react-native";
import { Text, SafeAreaView, View, useThemeColor } from "../components/Themed";
import JokeQuery from "../components/JokeQuery";
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view";
import { EvilIcons } from "@expo/vector-icons";
import { useAppSelector } from "../store/hooks";
import {
  useGetJokesByCategoryQuery,
  useGetRandomJokesQuery,
  useLazyGetCategoriesQuery,
} from "../services/chuck";
import LoadingProgressBar from "../components/LoadingProgressBar";
import AnimatedButton from "../components/AnimatedButton";
import Selector from "../components/CustomSelector";
import { useEffect, useState } from "react";

export default function Home() {
  const [category, setCategory] = useState("");
  const color = useThemeColor({}, "text");
  const { loading, jokes } = useAppSelector((states) => states.chuck);
  const { refetch, isFetching } = useGetRandomJokesQuery();

  const [getCategories, { data }] = useLazyGetCategoriesQuery();

  useGetJokesByCategoryQuery(category, {
    skip: !category,
  });

  useEffect(() => {
    getCategories();
  }, []);

  function _renderItem() {
    return ({ item }: { item: (typeof jokes)[0] }) => (
      <View style={styles.box}>
        <Text style={styles.content}>{item.value}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} lightColor="#fff">
      <KeyboardAwareFlatList
        data={jokes}
        style={styles.scrollview}
        contentContainerStyle={styles.contents}
        ListEmptyComponent={() => <Text>No Content</Text>}
        ListHeaderComponent={() => {
          return (
            <>
              <Text style={styles.title}>Welcome to Chuck Jokes</Text>

              <JokeQuery />
              <View style={styles.pickerContainer}>
                <Text style={styles.text}>
                  Get a random Chuck joke by category
                </Text>
                <Selector
                  options={[
                    { value: "", label: "Any" },
                    ...(data?.map((d) => ({
                      label: d,
                      value: d,
                    })) || []),
                  ]}
                  title="Select Category"
                  value={category}
                  onChangeValue={(opt) => setCategory(opt.value)}
                />
              </View>
              <AnimatedButton
                onPress={refetch}
                style={{ container: styles.refreshBtn }}
                loading={isFetching}
              >
                <EvilIcons name="refresh" size={40} color={color} />
              </AnimatedButton>
              <LoadingProgressBar loading={loading} style={styles.bar} />
              <View style={styles.nb}>
                <Text style={styles.nbText}>
                  Tap on <EvilIcons name="refresh" size={20} color={color} /> to
                  generate a random joke
                </Text>
              </View>
            </>
          );
        }}
        renderItem={_renderItem()}
        keyExtractor={({ id }) => id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollview: { flex: 1, backgroundColor: "transparent" },
  container: {
    flex: 1,
  },
  contents: {
    paddingVertical: 20,
    paddingHorizontal: 15,
  },

  title: {
    fontSize: 34,
    fontWeight: "600",
    marginBottom: 10,
  },
  nb: {
    paddingVertical: 20,
    marginTop: 5,
    width: "100%",
    height: "auto",
  },
  nbText: {
    alignItems: "center",
    fontSize: 14,
  },
  bar: {
    marginBottom: 5,
  },
  refreshBtn: {
    marginLeft: "auto",
    marginTop: "auto",
    marginBottom: 20,
  },
  box: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 15,
    borderColor: "#fa0",
    borderWidth: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: "rgba(0,0,0,0.45)",
    shadowRadius: 10,
    shadowOpacity: 0.5,
    marginBottom: 10,
  },
  content: {
    fontSize: 20,
  },
  pickerContainer: {
    marginVertical: 30,
    width: "100%",
  },
  text: {
    fontSize: 18,
    fontWeight: "300",
    marginBottom: 10,
  },
});
