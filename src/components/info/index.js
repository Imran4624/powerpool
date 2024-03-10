import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { MyText } from "@components";
import { ScrollView } from "react-native-gesture-handler";

export const Info = ({ hashRate, balances, customField, show }) => {
  if (!show) {
    return null;
  }

  return (
    <View>
      <ScrollView>
        {customField.length !== 0 && (
          <View
            style={{
              borderWidth: 1,
              borderColor: "lightgray",
              borderRadius: 10,
              margin: "2%",
              padding: "2%",
            }}
          >
            {/* <MyText style={{ fontSize: 14, fontWeight: 'bold' }}>Current Hash Rate</MyText> */}
            {customField.map((field, index) => {
              return (
                <View key={index} style={{ marginBottom: "4%" }}>
                  {field.fieldType === "title" && (
                    <MyText style={{ fontSize: 18, fontWeight: "bold" }}>
                      {field.value.toUpperCase()}
                    </MyText>
                  )}
                  {field.fieldType === "paragraph" && (
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <MyText style={{ fontSize: 12, fontWeight: "bold" }}>
                        {field.value}
                      </MyText>
                      {/* <MyText style={{ fontSize: 15, fontWeight: 'bold' }}>{'Conversion: ' + hashRate[rate].speedConversion}</MyText> */}
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        )}
        <View
          style={{
            borderWidth: 1,
            borderColor: "lightgray",
            borderRadius: 10,
            margin: "2%",
            padding: "2%",
          }}
        >
          <MyText style={{ fontSize: 14, fontWeight: "bold" }}>
            Current Hash Rate
          </MyText>
          {hashRate &&
            (Object.keys(hashRate) || []).map((rate, index) => {
              return (
                <View
                  key={index}
                  style={{
                    borderBottomColor: "lightgray",
                    borderBottomWidth: 1,
                    marginBottom: "4%",
                  }}
                >
                  <MyText style={{ fontSize: 18, fontWeight: "bold" }}>
                    {(rate || "").toUpperCase()}
                  </MyText>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <MyText style={{ fontSize: 32, fontWeight: "bold" }}>
                      {(hashRate[rate].hashrate || 0).toFixed(2) +
                        "  " +
                        hashRate[rate].speedUnits}
                    </MyText>
                    {/* <MyText style={{ fontSize: 15, fontWeight: 'bold' }}>{'Conversion: ' + hashRate[rate].speedConversion}</MyText> */}
                  </View>
                </View>
              );
            })}
        </View>

        <View
          style={{
            padding: "4%",
            borderWidth: 1,
            borderColor: "lightgray",
            borderRadius: 10,
            margin: "2%",
            padding: "2%",
          }}
        >
          <MyText
            style={{
              fontSize: 22,
              fontWeight: "bold",
              flex: 1,
              marginBottom: "2%",
            }}
          >
            {"Balances"}
          </MyText>
          <View
            style={{ flexDirection: "row", justifyContent: "space-evenly" }}
          >
            <MyText style={{ fontSize: 14, fontWeight: "bold", flex: 1 }}>
              {"Coin Ticker"}
            </MyText>
            {/* <MyText style={{ fontSize: 14, fontWeight: 'bold', flex: 1 }}>{'Coin'}</MyText> */}
            <MyText style={{ fontSize: 14, fontWeight: "bold", flex: 1 }}>
              {"Balance"}
            </MyText>
            <MyText style={{ fontSize: 14, fontWeight: "bold", flex: 1 }}>
              {"Balance USD"}
            </MyText>
          </View>
          {(balances || []).map((balance, index) => {
            return (
              <View
                key={index}
                style={{ flexDirection: "row", justifyContent: "space-evenly" }}
              >
                <MyText style={{ fontSize: 14, flex: 1 }}>
                  {balance.coinTicker}
                </MyText>
                {/* <MyText style={{ fontSize: 14, flex: 1 }}>{balance.coin}</MyText> */}
                <MyText style={{ fontSize: 14, flex: 1 }}>
                  {balance.balance}
                </MyText>
                <MyText style={{ fontSize: 14, flex: 1 }}>
                  {balance.balanceUSD}
                </MyText>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};
