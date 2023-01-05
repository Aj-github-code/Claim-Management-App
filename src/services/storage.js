import AsyncStorage from "@react-native-async-storage/async-storage";

class StorageController {
    constructor() {

    }

    async setItem(key, value) {
        if (value && value != null && value != undefined && value.toString().trim() != "") {
            return await AsyncStorage.setItem(key, value.toString());
        } else {
            return await AsyncStorage.setItem(key, "");
        }
    }

    async getItem(key) {
        return await AsyncStorage.getItem(key);
    }
    async getAllKeys() {
        return await AsyncStorage.getAllKeys();
    }

    async clearAll(){
        await AsyncStorage.getAllKeys().then(async keys => {
            await AsyncStorage.multiRemove(keys);
            return true;
        });
    }
}

export default StorageController;