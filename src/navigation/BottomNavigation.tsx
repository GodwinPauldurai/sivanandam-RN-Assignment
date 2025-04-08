import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/HomeScreen';
import { LocationScreen } from '../screens/LocationScreen';
import { ImageUploadScreen } from '../screens/ImageUploadScreen';
import { Image, Text, View } from 'react-native';

const Tab = createBottomTabNavigator();

export default function MyTabs() {
    return (
        <Tab.Navigator
            screenOptions={
                ({ route }) => ({
                    headerShown: false,
                    tabBarStyle: {
                        height: 80,
                        paddingBottom: 10,
                        paddingTop: 10,
                        backgroundColor: "#FFFFFF",
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                    },
                    tabBarLabelStyle: {
                        fontSize: 15,
                        marginTop: 8,
                    },
                    tabBarActiveTintColor: "#6200ee",
                    tabBarInactiveTintColor: "black",

                })}>
            <Tab.Screen
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            top: 10,
                        }}>
                            <Image source={require('/Users/sivanandamr/Rnprojects/MyApp/assets/icons/ic_home.png')}
                                resizeMode='contain'
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? '#6200ee' : '748c94'
                                }}
                            />
                        </View>
                    ),
                    tabBarLabel: ({ focused }) => (
                        <Text style={{
                            color: focused ? '#6200ee' : '748c94',
                            fontSize: 15,
                            fontWeight: 'bold',
                            marginTop: 8,
                        }}>
                            Home
                        </Text>
                    ),
                }}
                name="Home" component={HomeScreen} />
            <Tab.Screen
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            top: 10,
                            marginBottom: 10,
                        }}>
                            <Image source={require('/Users/sivanandamr/Rnprojects/MyApp/assets/icons/ic_location.png')}
                                resizeMode='contain'
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? '#6200ee' : '748c94',

                                }}
                            />
                        </View>
                    ),
                    tabBarLabel: ({ focused }) => (
                        <Text style={{
                            color: focused ? '#6200ee' : '748c94',
                            fontSize: 15,
                            fontWeight: 'bold',
                            marginTop: 8,
                        }}>
                            Location
                        </Text>
                    ),

                }}

                name="Location" component={LocationScreen} />
            <Tab.Screen
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            top: 10,
                        }}>
                            <Image source={require('/Users/sivanandamr/Rnprojects/MyApp/assets/icons/ic_image_upload.png')}
                                resizeMode='contain'
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? '#6200ee' : '748c94'
                                }}
                            />
                        </View>
                    ),
                    tabBarLabel: ({ focused }) => (
                        <Text style={{
                            color: focused ? '#6200ee' : '748c94',
                            fontSize: 15,
                            fontWeight: 'bold',
                            marginTop: 8,
                        }}>
                            ImageUpload
                        </Text>
                    ),

                }}
                name="ImageUpload" component={ImageUploadScreen} />
        </Tab.Navigator>
    );
}