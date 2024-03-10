import { FlatList, View } from "react-native";
import React, { useEffect, useState } from "react";
import { MyText, PublicData, TopHeader } from "@components";
import { ScrollView } from "react-native-gesture-handler";

export const Worker = ({
  workers,
  show,
  getWorkerData,
  wPage,
  setWPage,
  online,
  offline,
}) => {

  if (!show) {
    return null;
  }
  const renderItem = ({ item }) => (
    <View
      style={{
        borderWidth: 1,
        borderColor: "lightgray",
        borderRadius: 10,
        margin: "2%",
        padding: "2%",
      }}
    >
      <MyText style={{ fontSize: 16, fontWeight: "bold" }}>{item?.name}</MyText>
      <MyText style={{ fontSize: 25, fontWeight: "bold" }}>
        {(item?.hashrate || 0).toFixed(2) + "  " + item?.speedUnits}
      </MyText>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <MyText style={{ fontSize: 15, fontWeight: "bold" }}>
          {"Algorithm: " + item?.algorithm}
        </MyText>
        <MyText style={{ fontSize: 15, fontWeight: "bold" }}>
          {"Accepted Shares: " + item?.accepted}
        </MyText>
      </View>

      <View>
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <MyText style={{ fontSize: 14, fontWeight: "bold", flex: 1 }}>
            {"Coin Ticker"}
          </MyText>
          <MyText style={{ fontSize: 14, fontWeight: "bold", flex: 1 }}>
            {"Coin"}
          </MyText>
          <MyText style={{ fontSize: 14, fontWeight: "bold", flex: 1 }}>
            {"Total Rewards"}
          </MyText>
        </View>
        {(item?.totalRewards || [])
          .filter((re) => re.totalRewards !== 0)
          .map((reward, index) => {
            return (
              <View
                key={index}
                style={{ flexDirection: "row", justifyContent: "space-evenly" }}
              >
                <MyText style={{ fontSize: 14, flex: 1 }}>
                  {reward.coinTicker}
                </MyText>
                <MyText style={{ fontSize: 14, flex: 1 }}>{reward.coin}</MyText>
                <MyText style={{ fontSize: 14, flex: 1 }}>
                  {(reward.totalRewards || 0).toFixed(8)}
                </MyText>
              </View>
            );
          })}
      </View>
    </View>
  );
  const handleLoadMore = () => {
    const nextPage = wPage + 1;
    getWorkerData(nextPage);
    setWPage(nextPage);
  };
  useEffect(() => {
    getWorkerData(0);
  }, []);
  return (
    <View>
     {(online=== 0 && offline === 0 )?<View></View>: <View
        style={{
          borderWidth: 1,
          borderColor: "lightgray",
          borderRadius: 10,
          margin: "2%",
          padding: "2%",
        }}
      >
       { online !==0 && <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <MyText style={{ fontSize: 12, fontWeight: "bold" }}>Online Workers</MyText>
          <MyText style={{ fontSize: 15, fontWeight: "bold" }}>{online}</MyText>
        </View>}
        {offline !== 0 &&<View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <MyText style={{ fontSize: 12, fontWeight: "bold" }}>Offline Workers</MyText>
          <MyText style={{ fontSize: 15, fontWeight: "bold" }}>{offline}</MyText>
        </View>}
        
      </View>}
      <FlatList
        data={workers}
        renderItem={renderItem}
        keyExtractor={(item) => item.accepted}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
      />
      {/* <ScrollView>
        {(workers || []).map((worker, index) => {

          return (
            <View key={index} style={{ borderWidth: 1, borderColor: 'lightgray', borderRadius: 10, margin: '2%', padding: '2%' }}>
              <MyText style={{ fontSize: 16, fontWeight: 'bold' }}>{worker?.name}</MyText>
              <MyText style={{ fontSize: 25, fontWeight: 'bold' }}>{(worker?.hashrate || 0).toFixed(2) + '  ' + worker?.speedUnits}</MyText>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <MyText style={{ fontSize: 15, fontWeight: 'bold' }}>{'Algorithm: ' + worker?.algorithm}</MyText>
                <MyText style={{ fontSize: 15, fontWeight: 'bold' }}>{'Accepted Shares: ' + worker?.accepted}</MyText>
              </View>

              <View>
                <View style={{ flexDirection: "row", justifyContent: 'space-evenly' }}>
                  <MyText style={{ fontSize: 14, fontWeight: 'bold', flex: 1 }}>{'Coin Ticker'}</MyText>
                  <MyText style={{ fontSize: 14, fontWeight: 'bold', flex: 1 }}>{'Coin'}</MyText>
                  <MyText style={{ fontSize: 14, fontWeight: 'bold', flex: 1 }}>{'Total Rewards'}</MyText>
                </View>
                {(worker?.totalRewards || []).filter(re => re.totalRewards !== 0).map((reward, index) => {
                  return (
                    <View key={index} style={{ flexDirection: "row", justifyContent: 'space-evenly' }}>
                      <MyText style={{ fontSize: 14, flex: 1 }}>{reward.coinTicker}</MyText>
                      <MyText style={{ fontSize: 14, flex: 1 }}>{reward.coin}</MyText>
                      <MyText style={{ fontSize: 14, flex: 1 }}>{(reward.totalRewards || 0).toFixed(8)}</MyText>
                    </View>
                  )
                })}
              </View>
            </View>
          )
        })}

      </ScrollView> */}
    </View>
  );
};
