import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  TextInput,
  Button,
  Text,
  View,
  Alert,
  StyleSheet,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';

export default function App() {
  const [templateChoice, setTemplateChoice] = useState('RSO Report');
  const [reportType, setReportType] = useState('Final');
  const [RankName, setRankName] = useState('');
  const [Reason, setReason] = useState('');
  const [name, setName] = useState('');
  const [batch, setbatch] = useState('');
  const [date, setdate] = useState('');
  const [ic, setic] = useState('');
  const [where, setwhere] = useState('');
  const [reason, setreason] = useState('');
  const [pes, setpes] = useState('');
  const [voc, setvoc] = useState('');
  const [Personneltime, setPersonneltime] = useState('');
  const [Personnel, setPersonnel] = useState('');
  const [Transport, setTransport] = useState('');
  const [Story, setStory] = useState('');
  const [Diagnosis, setDiagnosis] = useState('');
  const [MC, setMC] = useState('');
  const [timeline, setTimeline] = useState([{ time: '', action: '' }]);
  const [output, setOutput] = useState('');

  const formatSentence = () => {
    let sentence = '';
    let timelineText = `${date}\n`;
    timeline.forEach((entry) => {
      if (entry.time && entry.action) {
        timelineText += `${entry.time}: ${entry.action}\n`;
      }
    });

    if (templateChoice === 'RSO') {
      if (!RankName || !Reason) {
        Alert.alert('Please fill in all booking fields.');
        return;
      }
      sentence = `${RankName} requested to rso for ${Reason}, told him to update me after.`;
    } else if (templateChoice === 'RSO Report') {
      if (
        !name || !batch || !date || !ic || !where || !reason || !pes || !voc ||
        !Personneltime || !Personnel || !Transport || !Story || !Diagnosis || !MC
      ) {
        Alert.alert('Please fill in all the details');
        return;
      }

      sentence = `${reportType.toUpperCase()} REPORT:

BATCH: ${batch}
DATE: ${date}

WHO: ${name} ${ic}
WHAT: RSO at ${where}
WHEN: ${date}
WHERE: ${where}
WHY: ${reason}
HOW: -
PES: ${pes}
VOC: ${voc}

TIME INFORMED OPS ROOM: ${Personneltime}
NAME OF DUTY PERSONNEL INFORMED: ${Personnel}

Timeline:
${timelineText}

Doctor Notes: ${Story}
Diagnosis: ${Diagnosis}
Any Memo: NIL
Status: ${MC}
NOK informed: Y`;
    }

    setOutput(sentence);
  };

  const copyToClipboard = () => {
    Clipboard.setString(output);
    Alert.alert('Copied to clipboard!');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>RSO Sentence Formatter</Text>

        <View style={styles.buttonGroup}>
          <Button
            title="Normal RSO"
            onPress={() => setTemplateChoice('RSO')}
            color={templateChoice === 'RSO' ? '#007AFF' : '#999'}
          />
          <Button
            title="RSO Report"
            onPress={() => setTemplateChoice('RSO Report')}
            color={templateChoice === 'RSO Report' ? '#007AFF' : '#999'}
          />
        </View>

        {templateChoice === 'RSO' && (
          <>
            <TextInput
              placeholder="4D Rank Name"
              style={styles.input}
              value={RankName}
              onChangeText={setRankName}
            />
            <TextInput
              placeholder="Reason"
              style={styles.input}
              value={Reason}
              onChangeText={setReason}
            />
          </>
        )}

        {templateChoice === 'RSO Report' && (
          <>
            {/* Initial / Final Toggle */}
            <View style={styles.buttonGroup}>
              <Button
                title="Final Report"
                onPress={() => setReportType('Final')}
                color={reportType === 'Final' ? '#007AFF' : '#999'}
              />
              <Button
                title="Initial Report"
                onPress={() => setReportType('Initial')}
                color={reportType === 'Initial' ? '#007AFF' : '#999'}
              />
            </View>

            {/* Inputs */}
            <TextInput placeholder="Name" style={styles.input} value={name} onChangeText={setName} />
            <TextInput placeholder="IC" style={styles.input} value={ic} onChangeText={setic} />
            <TextInput placeholder="Batch" style={styles.input} value={batch} onChangeText={setbatch} />
            <TextInput placeholder="Date" style={styles.input} value={date} onChangeText={setdate} />
            <TextInput placeholder="Location" style={styles.input} value={where} onChangeText={setwhere} />
            <TextInput placeholder="Reason" style={styles.input} value={reason} onChangeText={setreason} />
            <TextInput placeholder="PES" style={styles.input} value={pes} onChangeText={setpes} />
            <TextInput placeholder="Vocation" style={styles.input} value={voc} onChangeText={setvoc} />
            <TextInput placeholder="Time informed ops room" style={styles.input} value={Personneltime} onChangeText={setPersonneltime} />
            <TextInput placeholder="Duty personnel" style={styles.input} value={Personnel} onChangeText={setPersonnel} />
            <TextInput placeholder="Transport used" style={styles.input} value={Transport} onChangeText={setTransport} />
            <TextInput placeholder="Doctor consultation details" style={styles.input} value={Story} onChangeText={setStory} />
            <TextInput placeholder="Diagnosis" style={styles.input} value={Diagnosis} onChangeText={setDiagnosis} />
            <TextInput placeholder="MC Status" style={styles.input} value={MC} onChangeText={setMC} />

            <Text style={styles.sectionTitle}>Timeline</Text>
            {timeline.map((entry, index) => (
              <View key={index}>
                <TextInput
                  placeholder="Time (e.g. 0900hrs)"
                  style={styles.input}
                  value={entry.time}
                  onChangeText={(text) => {
                    const updated = [...timeline];
                    updated[index].time = text;
                    setTimeline(updated);
                  }}
                />
                <TextInput
                  placeholder="Action"
                  style={styles.input}
                  value={entry.action}
                  onChangeText={(text) => {
                    const updated = [...timeline];
                    updated[index].action = text;
                    setTimeline(updated);
                  }}
                />
              </View>
            ))}
            <Button title="Add Timeline Entry" onPress={() => setTimeline([...timeline, { time: '', action: '' }])} />
          </>
        )}

        <Button title="Generate Sentence" onPress={formatSentence} />

        {output !== '' && (
          <>
            <Text style={styles.output}>{output}</Text>
            <Button title="Copy to Clipboard" onPress={copyToClipboard} />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  scrollContainer: { paddingBottom: 100 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
  sectionTitle: { fontWeight: 'bold', marginTop: 20, marginBottom: 5 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 6,
  },
  output: {
    marginTop: 20,
    backgroundColor: '#f1f1f1',
    padding: 10,
    borderRadius: 6,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
});