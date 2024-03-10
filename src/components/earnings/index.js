import { FlatList, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { MyText, } from "@components";
import { ScrollView } from "react-native-gesture-handler";



export const Earning = ({ earnings, show,getEarningData ,ePage , setEPage}) => {
  // console.log("earnongs page data : ",earnings);

  if (!show) {
    return null
  }
  const renderItem = ({ item }) => (
    <View  style={{ borderWidth: 1, borderColor: 'lightgray', borderRadius: 10, margin: '2%', padding: '2%' }}>

          <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
            <MyText style={{ fontSize: 16, fontWeight: 'bold', flex: 1 }}>{'Time'}</MyText>
            <MyText style={{ fontSize: 16, fontWeight: 'bold', flex: 1 }}>
              {new Date(Math.round(item?.timestamp * 1000)).toLocaleDateString()}-
              {new Date(Math.round(item?.timestamp * 1000)).toLocaleTimeString()}
            </MyText>
          </View>

          <MyText style={{ fontSize: 16, fontWeight: 'bold', marginTop: '2%' }}>Average Speed</MyText>
          {(item && item.avgSpeeds) && (Object.keys(item.avgSpeeds) || []).map((aS, i) => {
            return (
              <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: '3%' }}>
                <MyText style={{ fontSize: 16, fontWeight: 'bold', flex: 1, }}>{(aS || '').toUpperCase()}</MyText>
                <MyText style={{ fontSize: 16, fontWeight: 'bold', flex: 1, }}>{(item.avgSpeeds[aS]?.hashrate || 0).toFixed(2) + " " + item.avgSpeeds[aS]?.speedUnits}</MyText>
              </View>
            )
          })
          }


          <MyText style={{ fontSize: 16, fontWeight: 'bold', marginTop: '2%' }}>Coins</MyText>
          {(item && item.coins) && (Object.keys(item.coins) || []).map((aS, i) => {
            return (
              <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: '3%' }}>
                <MyText style={{ fontSize: 16, fontWeight: 'bold', flex: 1, }}>{(aS || '').toUpperCase()}</MyText>
                <MyText style={{ fontSize: 16, fontWeight: 'bold', flex: 1, }}>{(item.coins[aS]?.value || 0).toFixed(8)}</MyText>
              </View>
            )
          })
          }



        </View>
  );
  const handleLoadMore = () => {
    const nextPage = ePage + 1;
    getEarningData(nextPage);
    setEPage(nextPage);
  };
  useEffect(() => {
   getEarningData(0)
  }, [])
  
 
  return (
    <View>
       <FlatList
        data={earnings}
        renderItem={renderItem}
        keyExtractor={item => item.timestamp}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
      />
      {/* <ScrollView>
        {(earnings || []).map((earning, index) => {

          return (
            <View key={index} style={{ borderWidth: 1, borderColor: 'lightgray', borderRadius: 10, margin: '2%', padding: '2%' }}>

              <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                <MyText style={{ fontSize: 16, fontWeight: 'bold', flex: 1 }}>{'Time'}</MyText>
                <MyText style={{ fontSize: 16, fontWeight: 'bold', flex: 1 }}>
                  {new Date(Math.round(earning?.timestamp * 1000)).toLocaleDateString()}-
                  {new Date(Math.round(earning?.timestamp * 1000)).toLocaleTimeString()}
                </MyText>
              </View>

              <MyText style={{ fontSize: 16, fontWeight: 'bold', marginTop: '2%' }}>Average Speed</MyText>
              {(earning && earning.avgSpeeds) && (Object.keys(earning.avgSpeeds) || []).map((aS, i) => {
                return (
                  <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: '3%' }}>
                    <MyText style={{ fontSize: 16, fontWeight: 'bold', flex: 1, }}>{(aS || '').toUpperCase()}</MyText>
                    <MyText style={{ fontSize: 16, fontWeight: 'bold', flex: 1, }}>{(earning.avgSpeeds[aS]?.hashrate || 0).toFixed(2) + " " + earning.avgSpeeds[aS]?.speedUnits}</MyText>
                  </View>
                )
              })
              }


              <MyText style={{ fontSize: 16, fontWeight: 'bold', marginTop: '2%' }}>Coins</MyText>
              {(earning && earning.coins) && (Object.keys(earning.coins) || []).map((aS, i) => {
                return (
                  <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: '3%' }}>
                    <MyText style={{ fontSize: 16, fontWeight: 'bold', flex: 1, }}>{(aS || '').toUpperCase()}</MyText>
                    <MyText style={{ fontSize: 16, fontWeight: 'bold', flex: 1, }}>{(earning.coins[aS]?.value || 0).toFixed(8)}</MyText>
                  </View>
                )
              })
              }



            </View>
          )
        })}

      </ScrollView> */}
    </View>
  )
}
