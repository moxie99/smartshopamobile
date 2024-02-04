/* eslint-disable import/export */
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface ToastProps {
  content: string;
}

const styles = StyleSheet.create({
  closeButton: {
    marginLeft: 10,
  },
  closeButtonText: {
    color: "white",
  },
  container: {
    alignItems: "center",
    position: "absolute",
    top: 20,
    width: "100%",
    zIndex: 999,
  },
  toast: {
    alignItems: "center",
    backgroundColor: "red",
    borderRadius: 10,
    flexDirection: "row",
    padding: 10,
  },
  toastText: {
    color: "white",
    flex: 1,
  },
});

interface ToastProps {
  content: string;
  onClose: () => void;
}

export default function Toast(
  content: string,
  onClose: ((event: GestureResponderEvent) => void) | undefined,
) {
  return (
    <View style={styles.container}>
      <View style={styles.toast}>
        <Text style={styles.toastText}>{content}</Text>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
