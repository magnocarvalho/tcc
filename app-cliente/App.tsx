import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { Appbar } from "react-native-paper";

export default function App() {
  const [goback, setgoback] = useState(false);

  return (
    <PaperProvider>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => setgoback(!goback)} />
        <Appbar.Content title="Gastando Pouco" subtitle="Subtitle" />
        <Appbar.Action icon="magnify" />
        <Appbar.Action icon="dots-vertical" />
      </Appbar.Header>
      <View style={styles.container}>
        <Text>Open up App.tsx to start working on your app!</Text>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff111",
    alignItems: "center",
    justifyContent: "center"
  }
});
