// StudySpotFinderApp.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, Button, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { firebaseConfig } from './firebaseConfig'; // Create this file with your Firebase credentials

initializeApp(firebaseConfig);
const db = getFirestore();

export default function StudySpotFinderApp() {
  const [spots, setSpots] = useState([]);
  const [filteredSpots, setFilteredSpots] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'studyspots'));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSpots(data);
      setFilteredSpots(data);
    };
    fetchData();
  }, []);

  const handleSearch = () => {
    const lowerText = searchText.toLowerCase();
    const filtered = spots.filter(spot =>
      spot.name.toLowerCase().includes(lowerText) ||
      spot.tags.some(tag => tag.toLowerCase().includes(lowerText))
    );
    setFilteredSpots(filtered);
  };

  return (
    <View style={{ flex: 1 }}>
      <TextInput
        placeholder="Search by tag or name"
        onChangeText={setSearchText}
        style={{ padding: 10, backgroundColor: '#eee' }}
      />
      <Button title="Search" onPress={handleSearch} />
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 40.7128,
          longitude: -74.0060,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        {filteredSpots.map(spot => (
          <Marker
            key={spot.id}
            coordinate={{ latitude: spot.lat, longitude: spot.lng }}
            title={spot.name}
            description={spot.tags.join(', ')}
          />
        ))}
      </MapView>
    </View>
  );
}
