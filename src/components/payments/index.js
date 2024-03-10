import { FlatList, View } from "react-native";
import React, { useEffect, useState } from "react";
import { MyText, } from "@components";
import { ScrollView } from "react-native-gesture-handler";



export const Payments = ({ payments, show , getPaymentsData, pPage, setPPage}) => {
  // console.log("payments page data : ",payments);
  if (!show) {
    return null
  }
  const renderItem = ({ item }) => (
    <View  style={{ borderWidth: 1, borderColor: 'lightgray', borderRadius: 10, margin: '2%', padding: '2%' }}>

              {/* <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                <MyText style={{ fontSize: 16, fontWeight: 'bold', flex: 1 }}>{'Coin'}</MyText>
                <MyText style={{ fontSize: 16, fontWeight: 'bold', flex: 2 }}>{payment?.coin}</MyText>
              </View> */}
              <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                <MyText style={{ fontSize: 16, fontWeight: 'bold', flex: 1 }}>{'Ticker'}</MyText>
                <MyText style={{ fontSize: 16, fontWeight: 'bold', flex: 2 }}>{item?.ticker}</MyText>
              </View>
              <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                <MyText style={{ fontSize: 16, fontWeight: 'bold', flex: 1 }}>{'Value'}</MyText>
                <MyText style={{ fontSize: 16, fontWeight: 'bold', flex: 2 }}>{(item?.value || 0).toFixed(8)}</MyText>
              </View>
              <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                <MyText style={{ fontSize: 16, fontWeight: 'bold', flex: 1 }}>{'Date'}</MyText>
                {/* <MyText style={{ fontSize: 16, fontWeight: 'bold', flex: 2 }}>{new Date(payment?.timestamp).toLocaleDateString()}</MyText> */}
                <MyText style={{ fontSize: 16, fontWeight: 'bold', flex: 2 }}>
                  {new Date(Math.round(item?.timestamp * 1000)).toLocaleDateString()}-
                  {new Date(Math.round(item?.timestamp * 1000)).toLocaleTimeString()}
                </MyText>
              </View>


              <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                <MyText style={{ fontSize: 16, fontWeight: 'bold', flex: 1 }}>{'Address: '}</MyText>
                <MyText style={{ fontSize: 12, fontWeight: 'bold', flex: 2, }}>{item?.address}</MyText>
              </View>

              <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                <MyText style={{ fontSize: 16, fontWeight: 'bold', flex: 1 }}>{'TxID: '}</MyText>
                <MyText style={{ fontSize: 12, fontWeight: 'bold', flex: 2, }}>{item?.txID}</MyText>
              </View>
            </View>
  );
  const handleLoadMore = () => {
    const nextPage = pPage + 1;
    getPaymentsData(nextPage);
    setPPage(nextPage);
  };
  useEffect(()=>{
    getPaymentsData(0)
  },[])
 
  return (
    <View>
      <FlatList
        data={payments}
        renderItem={renderItem}
        keyExtractor={item => item.timestamp}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
      />
      {/* <ScrollView>
        {(payments || []).map((payment, index) => {
          return (
            <View key={index} style={{ borderWidth: 1, borderColor: 'lightgray', borderRadius: 10, margin: '2%', padding: '2%' }}>

              <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                <MyText style={{ fontSize: 16, fontWeight: 'bold', flex: 1 }}>{'Coin'}</MyText>
                <MyText style={{ fontSize: 16, fontWeight: 'bold', flex: 2 }}>{payment?.coin}</MyText>
              </View>
              <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                <MyText style={{ fontSize: 16, fontWeight: 'bold', flex: 1 }}>{'Ticker'}</MyText>
                <MyText style={{ fontSize: 16, fontWeight: 'bold', flex: 2 }}>{payment?.ticker}</MyText>
              </View>
              <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                <MyText style={{ fontSize: 16, fontWeight: 'bold', flex: 1 }}>{'Value'}</MyText>
                <MyText style={{ fontSize: 16, fontWeight: 'bold', flex: 2 }}>{(payment?.value || 0).toFixed(8)}</MyText>
              </View>
              <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                <MyText style={{ fontSize: 16, fontWeight: 'bold', flex: 1 }}>{'Date'}</MyText>
                <MyText style={{ fontSize: 16, fontWeight: 'bold', flex: 2 }}>{new Date(payment?.timestamp).toLocaleDateString()}</MyText>
                <MyText style={{ fontSize: 16, fontWeight: 'bold', flex: 2 }}>
                  {new Date(Math.round(payment?.timestamp * 1000)).toLocaleDateString()}-
                  {new Date(Math.round(payment?.timestamp * 1000)).toLocaleTimeString()}
                </MyText>
              </View>


              <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                <MyText style={{ fontSize: 16, fontWeight: 'bold', flex: 1 }}>{'Address: '}</MyText>
                <MyText style={{ fontSize: 12, fontWeight: 'bold', flex: 2, }}>{payment?.address}</MyText>
              </View>

              <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                <MyText style={{ fontSize: 16, fontWeight: 'bold', flex: 1 }}>{'TxID: '}</MyText>
                <MyText style={{ fontSize: 12, fontWeight: 'bold', flex: 2, }}>{payment?.txID}</MyText>
              </View>
            </View>
          )
        })}
      </ScrollView> */}
    </View>
  )
}