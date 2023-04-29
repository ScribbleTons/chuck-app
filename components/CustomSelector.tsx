import RBSheet from "react-native-raw-bottom-sheet";
import { useMemo, useRef, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  View,
} from "react-native";
import { Text } from "./Themed";
import { Ionicons, EvilIcons } from "@expo/vector-icons";

export type Option = { label: string; value: string };

interface Props {
  placeholder?: string;
  options?: Option[];
  title?: string;
  value: string;
  onChangeValue: (option: Option) => void;
  customStyle?: {
    container?: StyleProp<ViewStyle>;
    selector?: StyleProp<ViewStyle>;
  };
}

function Selector({
  placeholder = "Select",
  options = [],
  title,
  value,
  onChangeValue,
  customStyle,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const rbRef = useRef<RBSheet>(null);

  const openRBSheet = () => rbRef.current?.open();

  const onSelect = (option: Option) => {
    onChangeValue(option);
    rbRef.current?.close();
  };

  const selectedValue = useMemo(
    () => options.find((el) => el.value === value),
    [options, value]
  );

  return (
    <View style={[styles.container, customStyle?.container]}>
      {title && <Text style={styles.title}>{title}</Text>}
      <Pressable
        onPress={openRBSheet}
        style={[
          styles.selector,
          customStyle?.selector,
          isOpen && { borderColor: "blue" },
        ]}
      >
        <Text style={styles.selectText}>
          {selectedValue?.label || placeholder}
        </Text>
        {isOpen ? (
          <EvilIcons name="chevron-down" size={24} color="black" />
        ) : (
          <EvilIcons name="chevron-right" size={24} color="black" />
        )}
      </Pressable>

      <RBSheet
        onClose={() => setIsOpen((prev) => !prev)}
        onOpen={() => setIsOpen((prev) => !prev)}
        ref={rbRef}
        customStyles={{
          container: {
            backgroundColor: "#fff",
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            borderTopWidth: 1,
            paddingHorizontal: 20,
            borderColor: "blue",
            paddingBottom: 20,
          },
          wrapper: {
            backgroundColor: "transparent",
          },
          draggableIcon: {
            backgroundColor: "blue",
          },
        }}
        animationType="slide"
        closeOnDragDown={true}
      >
        <ScrollView style={styles.scrollView}>
          {!!options.length &&
            options.map((option, i) => (
              <TouchableOpacity
                style={styles.item}
                key={i}
                onPress={() => onSelect(option)}
              >
                <Text darkColor="#000" style={styles.itemText}>
                  {option.label}
                </Text>
                {selectedValue?.value === option.value && (
                  <Ionicons name="checkmark" size={24} color="green" />
                )}
              </TouchableOpacity>
            ))}
        </ScrollView>
      </RBSheet>
    </View>
  );
}

export default Selector

const styles = StyleSheet.create({
  scrollView: {},
  container: {},
  item: {
    flexDirection: "row",
    paddingVertical: 5,
    alignItems: "center",
    marginVertical: 5,
  },
  itemText: {
    fontSize: 20,
    marginRight: 20,
    textTransform: "capitalize",
  },
  selector: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 2,
    borderColor:"transparent",
    backgroundColor:"#f4f4f4",
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: "rgba(0,0,0,0.45)",
    shadowRadius: 10,
    shadowOpacity: 0.5,
  },
  selectText: {
    color: "#090909",
    textTransform: "capitalize",
  },
  title: {
    marginBottom: 5,
    fontSize: 16,
    fontWeight: "400",
  },
});
