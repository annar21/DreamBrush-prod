import { router } from "expo-router";
import { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Image, ActivityIndicator, Alert } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { useAuth } from '@/hooks/useAuth';

const API_URL = 'https://api.shopper.am/api';

export default function EditProfile() {
  const { user, token } = useAuth(); // Removed setUser since it's not available
  const [name, setName] = useState<string>(user?.username?.split(" ")[0] || "");
  const [surname, setSurname] = useState<string>(user?.username?.split(" ").slice(1).join(" ") || "");
  const [nickname, setNickname] = useState<string>(user?.username || "");
  const [avatar, setAvatar] = useState<string | null>(user?.avatar ? `https://api.shopper.am/storage/${user.avatar}` : null);
  const [avatarFile, setAvatarFile] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Pick image using expo-image-picker
  const pickImage = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert("Permission denied", "Permission to access gallery is required!");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled && result.assets) {
        setAvatar(result.assets[0].uri);
        setAvatarFile(result.assets[0]);
      }
    } catch (err) {
      setError("Failed to pick image");
      Alert.alert("Error", "Failed to pick image");
    }
  };

  // Handle profile update
  const saveChanges = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("username", nickname);
      if (name || surname) {
        formData.append("username", `${name} ${surname}`.trim());
      }
      if (avatarFile) {
        formData.append("avatar", {
          uri: avatarFile.uri,
          type: "image/jpeg",
          name: "avatar.jpg",
        } as any);
      }

      const response = await axios.put(`${API_URL}/profile`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      // Update local state with new user data
      const updatedUser = response.data.user ?? {};
      const updatedUsername = updatedUser.username ?? nickname;
      const [fName, ...sName] = (updatedUsername || "").split(" ");
      setName(fName ?? "");
      setSurname(sName.join(" ") ?? "");
      setNickname(updatedUsername);
      setAvatar(updatedUser.avatar ? `${API_URL}/storage/${updatedUser.avatar}` : null);
      setAvatarFile(null);

      Alert.alert("Success", "Profile updated successfully");
      router.back();

    } catch (err: any) {
      console.log("Error updating profile:", err);
      setError(err.response?.data?.message || "Failed to update profile");
      Alert.alert("Error", err.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text style={{ color: "red", fontSize: 16 }}>Error: {error}</Text>
          <TouchableOpacity
              onPress={() => setError(null)}
              style={{ marginTop: 20, padding: 10, backgroundColor: "#6F61EF", borderRadius: 10 }}
          >
            <Text style={{ color: "#fff" }}>Retry</Text>
          </TouchableOpacity>
        </View>
    );
  }

  return (
      <View style={{ backgroundColor: "#fff", flex: 1 }}>
        <View
            style={{
              paddingHorizontal: 20,
              paddingTop: 40,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingVertical: 15,
              backgroundColor: "#fff",
              borderRadius: 10,
              marginBottom: 10,
            }}
        >
          <TouchableOpacity onPress={() => router.back()}>
            <Icon name="arrow-left" size={20} color="#000" />
          </TouchableOpacity>
          <View>
            <Text style={{ fontSize: 22, fontWeight: "500" }}>Edit Profile</Text>
          </View>
          <View />
        </View>

        <View style={{ paddingHorizontal: 20 }}>
          {loading ? (
              <ActivityIndicator size="large" color="#6F61EF" />
          ) : (
              <>
                <View
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingTop: 15,
                    }}
                >
                  <TouchableOpacity onPress={pickImage}>
                    <View
                        style={{
                          width: 120,
                          height: 120,
                          borderRadius: 60,
                          backgroundColor: "#000",
                          overflow: "hidden",
                        }}
                    >
                      {avatar && (
                          <Image
                              source={{ uri: avatar }}
                              style={{ width: "100%", height: "100%" }}
                          />
                      )}
                    </View>
                  </TouchableOpacity>
                  <View>
                    <Text
                        style={{
                          fontSize: 10,
                          color: "#8D90A7",
                          fontWeight: "500",
                          marginBottom: 10,
                        }}
                    >
                      PICTURE IDEAS
                    </Text>
                    <View style={{ flexDirection: "row", gap: 10, paddingBottom: 10 }}>
                      {[...Array(4)].map((_, i) => (
                          <TouchableOpacity
                              key={i}
                              style={{
                                width: 40,
                                height: 40,
                                borderRadius: 20,
                                backgroundColor: "red",
                              }}
                          />
                      ))}
                    </View>
                    <View style={{ flexDirection: "row", gap: 10, paddingBottom: 10 }}>
                      {[...Array(4)].map((_, i) => (
                          <TouchableOpacity
                              key={i}
                              style={{
                                width: 40,
                                height: 40,
                                borderRadius: 20,
                                backgroundColor: "red",
                              }}
                          />
                      ))}
                    </View>
                  </View>
                </View>

                <View style={{ gap: 15, marginTop: 30 }}>
                  <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <TextInput
                        placeholder="Name..."
                        value={user?.name}
                        onChangeText={setName}
                        style={{
                          backgroundColor: "#F1F4F9",
                          paddingLeft: 10,
                          borderRadius: 15,
                          paddingVertical: 15,
                          width: "48%",
                        }}
                    />
                    <TextInput
                        placeholder="Surname..."
                        value={user?.surname}
                        onChangeText={setSurname}
                        style={{
                          backgroundColor: "#F1F4F9",
                          paddingLeft: 10,
                          borderRadius: 15,
                          paddingVertical: 15,
                          width: "48%",
                        }}
                    />
                  </View>
                  <TextInput
                      placeholder="Nickname..."
                      value={user?.username}
                      onChangeText={setNickname}
                      style={{
                        backgroundColor: "#F1F4F9",
                        paddingLeft: 10,
                        borderRadius: 15,
                        paddingVertical: 15,
                      }}
                  />
                </View>

                <TouchableOpacity
                    style={{
                      backgroundColor: "#6F61EF",
                      paddingVertical: 15,
                      borderRadius: 30,
                      marginTop: 45,
                    }}
                    onPress={saveChanges}
                    disabled={loading}
                >
                  <Text
                      style={{
                        textAlign: "center",
                        color: "#fff",
                        fontSize: 16,
                        fontWeight: "600",
                      }}
                  >
                    Save Changes
                  </Text>
                </TouchableOpacity>
              </>
          )}
        </View>
      </View>
  );
}
