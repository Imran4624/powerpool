import { View, Text, Pressable, ActivityIndicator, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "./styles";
import { MyText } from "@components";
import { useSelector } from "react-redux";
import { apiKey } from "../../redux/apiKeySlice";
import {
  GetEarningData,
  GetPaymentsDate,
  GetPrivateDate,
  GetWorkerData,
} from "../../api/apiCall";
import { MyTheme } from "../../utils";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Earning } from "../earnings";
import { Worker } from "../workers";
import { Payments } from "../payments";
import { Info } from "../info";

export const PrivateData = () => {
  const apiKeyRedux = useSelector(apiKey);
  const [selected, setSelected] = useState("info");
  const [data, setData] = useState(null);
  const [workerData, setWorkerData] = useState([]);
  const [earningData, setEarningData] = useState([]);
  const [paymentsData, setPaymentsData] = useState([]);
  const [wPage, setWPage] = useState(0);
  const [pPage, setPPage] = useState(0);
  const [ePage, setEPage] = useState(0);
  const [reachedEEnd, setReachedEEnd] = useState(false)
  const [reachedWEnd, setReachedWEnd] = useState(false)
  const [reachedPEnd, setReachedPEnd] = useState(false)
  const [online, setOnline] = useState(0)
  const [offline, setOffline] = useState(0)
  const [loading, setLoading] = useState(false);

  const getPrivateData = async () => {
    setLoading(true);
    GetPrivateDate(`${apiKeyRedux.apiKey}`)
      .then((res) => {
        if (res.status) {
          setData(res.data);
          // console.log("info data : ",res.data)
        } else {
          Alert.alert("Api Error");
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  const getEarningData = async (page) => {
    if (loading || reachedEEnd) {
      setEarningData(earningData)
      return;
    }
    setLoading(true);
    GetEarningData(`${apiKeyRedux.apiKey}`, page)
      .then((res) => {
        if (res.status) {
          const newData = res?.data?.earnings;
          if (newData.length === 0) {
            setReachedEEnd(true)
          }
          const filteredNewData = newData.filter(
            (newItem) =>
              !earningData.some(
                (existingItem) => existingItem?.timestamp === newItem?.timestamp
              )
          );
          if (page === 0) {
            setEarningData(newData);
          } else {
            
            setEarningData((prevData) => [...prevData, ...filteredNewData]);
          }
        } else {
          Alert.alert("Api Error");
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  const getPaymentsData = async (page) => {
    if (loading || reachedPEnd) {
      setPaymentsData(paymentsData)
      return;
    }
    setLoading(true);
    GetPaymentsDate(`${apiKeyRedux.apiKey}`, page)
      .then((res) => {
        if (res.status) {
          // setPaymentsData(res?.data?.payments)
          const newData = res?.data?.payments;
          if (newData.length === 0) {
            setReachedPEnd(true)
          }
          const filteredNewData = newData.filter(
            (newItem) =>
              !paymentsData.some(
                (existingItem) => existingItem?.timestamp === newItem?.timestamp
              )
          );
          if (page === 0) {
            setPaymentsData(newData);
          } else {
            
            setPaymentsData((prevData) => [...prevData, ...filteredNewData]);
          }
        } else {
          Alert.alert("Api Error");
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  const getWorkerData = async (page) => {
    if (loading || reachedWEnd) {
      // setWorkerData(workerData)
      return;
    }
    setLoading(true);
    GetWorkerData(`${apiKeyRedux.apiKey}`, page)
      .then((res) => {
        if (res.status) {
          // setWorkerData(res?.data.workers)
          const newData = res?.data;
          setOnline(newData?.online)
          setOffline(newData?.offline)
          // console.log("newData : ",newData);
          if (newData?.workers.length === 0) {
            setReachedWEnd(true)
          }
          const filteredNewData = newData?.workers.filter(
            (newItem) =>
              !workerData.some(
                (existingItem) => existingItem?.accepted === newItem?.accepted
              )
          );
          if (page === 0) {
            setWorkerData(newData?.workers);
          } else {
            
            setWorkerData((prevData) => [...prevData, ...filteredNewData]);
          }
        } else {
          Alert.alert("Api Error");
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const onRefresh = () => {
    setEPage(0);
    setWPage(0);
    setPPage(0);
    setReachedEEnd(false)
    setReachedWEnd(false)
    setReachedPEnd(false)
    getPrivateData();
    getWorkerData(0);
    getEarningData(0);
    getPaymentsData(0);
  };

  useEffect(() => {}, []);

  useEffect(() => {
    getPrivateData(1);
    const interval = setInterval(() => {
      getPrivateData();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "space-between" }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: "4%",
        }}
      >
        <MyText style={{ fontSize: 22, fontWeight: "bold" }}>
          {selected === "info"
            ? "Private Data"
            : selected === "worker"
            ? "Worker Data"
            : selected === "payment"
            ? "Past Payments"
            : "Earnings"}
        </MyText>
        <Pressable style={styles.btnPress} onPress={onRefresh}>
          <FontAwesome name="refresh" size={30} color={MyTheme.primary} />
        </Pressable>
      </View>
      {loading && (
        <View>
          <ActivityIndicator size={"large"} color={MyTheme.primary} />
        </View>
      )}

      {data && (
        <View style={{ flex: 1, paddingTop: "4%" }}>
          <Earning
            ePage={ePage}
            setEPage={setEPage}
            getEarningData={getEarningData}
            earnings={earningData ? earningData : []}
            show={selected === "earning"}
          />
          <Worker
            wPage={wPage}
            setWPage={setWPage}
            getWorkerData={getWorkerData}
            workers={workerData ? workerData : []}
            show={selected === "worker"}
            offline={offline}
            online={online}
          />
          <Payments
            pPage={pPage}
            setPPage={setPPage}
            getPaymentsData={getPaymentsData}
            payments={paymentsData ? paymentsData : []}
            show={selected === "payment"}
          />
          <Info
            hashRate={data?.hashrate}
            balances={data?.balances}
            customField={data?.customField}
            show={selected === "info"}
          />
        </View>
      )}

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
          backgroundColor: MyTheme.primary,
        }}
      >
        <BottomIcon
          title={"Info"}
          onPress={() => setSelected("info")}
          icon={"info-circle"}
          selected={selected === "info"}
        />
        <BottomIcon
          title={"Workers"}
          onPress={() => setSelected("worker")}
          icon={"sitemap"}
          selected={selected === "worker"}
        />
        <BottomIcon
          title={"Payments"}
          onPress={() => setSelected("payment")}
          icon={"money"}
          selected={selected === "payment"}
        />
        <BottomIcon
          title={"Earnings"}
          onPress={() => setSelected("earning")}
          icon={"dollar"}
          selected={selected === "earning"}
        />
      </View>
    </View>
  );
};

const BottomIcon = ({ title, icon, selected, onPress }) => {
  return (
    <View style={{ flex: 1 }}>
      <Pressable onPress={onPress}>
        <View
          style={{
            padding: "6%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FontAwesome
            name={icon}
            size={25}
            color={selected ? "#7aaad6" : MyTheme.secondary}
          />
          <MyText
            style={{
              fontSize: 16,
              color: selected ? "#7aaad6" : MyTheme.secondary,
            }}
          >
            {title}
          </MyText>
        </View>
      </Pressable>
    </View>
  );
};
