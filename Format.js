import React, { useState } from 'react';
import {
  SafeAreaView,
  TextInput,
  Button,
  Text,
  View,
  Clipboard,
  Alert,
  StyleSheet,
} from 'react-native';

export default function App() {
  const [original, setOriginal] = useState('');
  const [rephrased, setRephrased] = useState('');

  const basicRephrase = (text) => {
    if (!text) return '';
    return text
      .replace(/\bvery\b/g, 'extremely')
      .replace(/\bhappy\b/g, 'joyful')
      .replace(/\bsad\b/g, 'unhappy')
      .replace(/\bgood\b/g, 'excellent');
  };

  const handleRephrase = () => {
    const output = basicRephrase(original);
    setRephrased(output || 'No changes found.');
  };

  const handleCopy = () => {
    Clipboard.setString(rephrased);
    Alert.alert('Copied!', 'Rephrased text copied to clipboard.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Sentence Rephraser</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your sentence here"
        value={original}
        onChangeText={setOriginal}
        multiline
      />

      <Button title="Rephrase" onPress={handleRephrase} />

      <Text style={styles.label}>Rephrased:</Text>
      <Text style={styles.output}>{rephrased}</Text>

      <Button title="Copy to Clipboard" onPress={handleCopy} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1,
    padding: 10,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 10,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  label: { marginTop: 20, fontWeight: 'bold' },
  output: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#f1f1f1',
    borderRadius: 6,
  },
});
