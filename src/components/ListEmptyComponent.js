import React, { useState } from "react";
import { Text, StyleSheet, View } from 'react-native';

const ListEmptyComponent = () => {

    return(
        <>
        <View style={[styles.container]}>
            <View style={[styles.row]}>
                <View style={[styles.details]}>
                    <Text style={{ fontWeight:'bold', fontSize:14,}}>No Records</Text>
                </View>
            </View>
        </View>
        </>
    )
}

export default ListEmptyComponent;

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#E5E5E5'
   
    },
    row: {
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        width:"95%",
        marginTop: 10,
        alignSelf: 'center',
        flexDirection:"row",
        display:"flex",
        position: 'relative',
        
    },
    details:{ margin:"5%", width:"100%", textAlign: "center" }
})