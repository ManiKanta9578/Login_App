import { ActivityIndicator, Modal, StyleSheet, View } from "react-native";

const LoadingPopup = () => {
    return (
      <Modal transparent={true} animationType="fade" visible={true}>
        <View style={styles.loadingContainer}>
          <View style={styles.loadingContent}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        </View>
      </Modal>
    );
  };

  export default LoadingPopup;

  const styles = StyleSheet.create({
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    loadingContent: {
      backgroundColor: "transparent",
      borderRadius: 10,
      padding: 20,
      alignItems: "center",
      justifyContent: "center",
    },
  });