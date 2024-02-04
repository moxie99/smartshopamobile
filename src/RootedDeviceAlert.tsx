import React, { useEffect, useState } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import DeviceStatus from "react-native-isrooted";

const styles = StyleSheet.create({
  alertText: {
    fontSize: 18,
    marginBottom: 10,
  },
  modalContainer: {
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    flex: 1,
    justifyContent: "center",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },
});
const RootedDeviceAlert = () => {
  const [isRooted, setIsRooted] = useState(false);

  useEffect(() => {
    const checkIfRooted = async () => {
      const rooted = await DeviceStatus.isRooted();
      setIsRooted(rooted);
    };

    checkIfRooted();
  }, []);

  return (
    <Modal
      animationType="slide"
      onRequestClose={() => {
        // Handle the modal close request
      }}
      transparent
      visible={isRooted}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.alertText}>
            Your device is rooted. Please uninstall any rooting software and
            restart the app.
          </Text>
          {/* You can customize the content of the modal as needed */}
        </View>
      </View>
    </Modal>
  );
};

export default RootedDeviceAlert;
