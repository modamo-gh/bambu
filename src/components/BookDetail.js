import React, { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ActionButton from "./ActionButton";

const BookDetails = ({ label, data }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [explanation, setExplanation] = useState("");

  const handlePress = () => {
    switch (label) {
      case "Average Rating":
        setExplanation(
          "Average Rating is calculated by taking the average of the Amazon and Goodreads ratings",
        );
        break;
      case "Time to Read":
        setExplanation(
          "Time to Read is calculated assuming one page has 275 words and a reading pace of 250 wpm",
        );
        break;
      case "Normalized Rating":
        setExplanation(
          "Normalized Rating is calculated by mapping the lowest average rating to 0, the highest to 100, and everything in between accordingly",
        );
        break;
      case "eph":
        setExplanation(
          "eph (Enjoyment per Hour) is calculated by dividing the Normalized Rating by the Time to Read",
        );
        break;
      default:
        setExplanation("");
        break;
    }

    setIsModalVisible(true);
  };

  return (
    <TouchableOpacity style={styles.detail} onPress={handlePress}>
      <Modal
        onRequestClose={() => setIsModalVisible(false)}
        visible={isModalVisible}
        transparent={true}
      >
        <View style={styles.modalStyle}>
          <View style={styles.buttonContainer}>
            <ActionButton
              buttonStyle={styles.deleteBooksButtonStyle}
              iconName="x"
              onPress={() => setIsModalVisible(false)}
            />
          </View>
          <View style={styles.modalText}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.text}>{data}</Text>
            {explanation.length ? (
              <Text style={styles.text}>{explanation}</Text>
            ) : null}
          </View>
        </View>
      </Modal>
      <Text style={styles.label}>{label}</Text>
      <Text ellipsizeMode="tail" numberOfLines={2} style={styles.text}>
        {data}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  deleteBooksButtonStyle: {
    alignItems: "center",
    backgroundColor: "#BC4749",
    borderRadius: 5,
    height: 48,
    justifyContent: "center",
    width: 48,
  },
  detail: {
    alignItems: "center",
    backgroundColor: "#DDA15E",
    borderColor: "black",
    borderRadius: 5,
    borderWidth: 1,
    flex: 1,
    justifyContent: "center",
    margin: 4,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  modalStyle: {
    backgroundColor: "#DDA15E",
    borderRadius: 5,
    flexDirection: "column",
    height: "25%",
    justifyContent: "flex-end",
    marginHorizontal: "12.5%",
    marginVertical: "50%",
    width: "75%",
  },
  modalText: {
    alignContent: "center",
    flex: 1,
    justifyContent: "center",
  },
  text: { textAlign: "center" },
});

export default BookDetails;
