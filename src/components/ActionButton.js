import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { BallIndicator } from "react-native-indicators";
import Icon from "react-native-vector-icons/Feather";

const ActionButton = ({ buttonStyle, iconName, isLoading, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      {isLoading ? (
        <BallIndicator color="#FEFAE0" size={24} />
      ) : (
        <Icon name={iconName} style={styles.iconStyle} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconStyle: {
    color: "#FEFAE0",
    fontSize: 24,
    textAlign: "center",
  },
});

export default ActionButton;
