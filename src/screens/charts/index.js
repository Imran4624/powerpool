import { View, Text, Pressable, ActivityIndicator, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "./styles";
import { MyText, PublicData, TopHeader, PrivateData } from "@components";
import { useSelector } from "react-redux";
import { apiKey } from "../../redux/apiKeySlice";
import { GetPrivateDate, GetPublicData, GetToken, } from "../../api/apiCall";
import { MyTheme } from "../../utils";
import { ScrollView } from "react-native-gesture-handler";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { NotificationListener, requestUserPermission } from "../../utils/pushNotificationHelper";
import AsyncStorage from "@react-native-community/async-storage";




export const Charts = ({ navigation }) => {
  const apiKeyRedux = useSelector(apiKey)
  const [selected, setSelected] = useState('public')
  const [loading, setLoading] = useState(false)


  const privateDataPress = () => {
    // console.log('apiKeyRedux', apiKeyRedux)
    if (apiKeyRedux && apiKeyRedux.apiKey) {
      setSelected('private')
    } else {
      Alert.alert('Alert', 'Please add your api key', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'Continue', onPress: () => navigation.navigate('Settings') },
      ]);

    }
  }
  const publicDataPress = () => {
    setSelected('public')
  }
  const updateToken = async () => {
    setLoading(true)
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
      console.log("FCM Token not exist");
    } else {
      if (apiKeyRedux.apiKey === "") {
        console.log("apiKey not exist");
      } else {
        try {
          GetToken(fcmToken,`${apiKeyRedux.apiKey}`).then(res => {
            if (res.status) {
              console.log("with token response :",res)
              // console.log(res.data)
            } else {
              Alert.alert('Api Error')
            }
            setLoading(false)
          }).catch(err => {
            setLoading(false)
          })
        } catch (error) {
          console.log(error);
        }
       
      }
    }
    
  }

  useEffect(() => {
    requestUserPermission();
    NotificationListener();
    updateToken()
  }, []);


  return (
    <View style={styles.chartsContainer}>
      <TopHeader settingPress={() => navigation.navigate("Settings")} />
      <View style={{ padding: '4%', alignItems: 'flex-end' }}>
        {selected === 'private' &&
          <View style={{ backgroundColor: MyTheme.primary, padding: '1%', paddingHorizontal: '4%', borderRadius: 30, overflow: 'hidden' }}>
            <Pressable onPress={publicDataPress}>
              <MyText style={{ fontSize: 18, fontWeight: 'bold', color: MyTheme.secondary }}>Public Data</MyText>
            </Pressable>
          </View>
        }


        {selected === 'public' &&
          <View style={{ backgroundColor: MyTheme.primary, padding: '1%', paddingHorizontal: '4%', borderRadius: 30, overflow: 'hidden' }}>
            <Pressable onPress={privateDataPress}>
              <MyText style={{ fontSize: 18, fontWeight: 'bold', color: MyTheme.secondary }}>Private Data</MyText>
            </Pressable>
          </View>
        }
      </View>


      {selected === 'public' &&
        <PublicData />}

      {selected === 'private' &&
        <PrivateData />}

    </View>
  );
};

const PrivateDataL = () => {
  const apiKeyRedux = useSelector(apiKey)
  const [selected, setSelected] = useState('info')
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)


  const getPrivateData = async () => {
    setLoading(true)
    GetPrivateDate(`${apiKeyRedux.apiKey}`).then(res => {
      if (res.status) {
        setData(res.data)
        // console.log(res.data)
      } else {
        Alert.alert('Api Error')
      }
      setLoading(false)
    }).catch(err => {
      setLoading(false)
    })
  }



  useEffect(() => {
    getPrivateData()
    const interval = setInterval(() => {
      getPrivateData()
    }, 30000);

    return () => clearInterval(interval);

  }, [])

  return (
    <View style={{ flex: 1,justifyContent:'space-between' }}>
      {/* <MyText style={{ fontSize: 22, fontWeight: 'bold', padding: '4%' }}>Private Data</MyText> */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: '4%' }}>
        <MyText style={{ fontSize: 22, fontWeight: 'bold' }}>{selected === 'info' ? 'Private Data' : selected === 'worker' ? 'Worker Data' : selected === 'payment' ? 'Past Payments' : 'Earnings'}</MyText>
        <Pressable style={styles.btnPress} onPress={getPrivateData}>
          <FontAwesome name="refresh" size={30} color={MyTheme.primary} />
        </Pressable>
      </View>
      {loading && <View>
        <ActivityIndicator size={'large'} color={MyTheme.primary} />
      </View>}


      {data && <View style={{ flex: 1, paddingTop: '4%', }}>
        <Earning earnings={(data?.earnings)} show={selected === 'earning'} />
        <Worker workers={data?.workers} show={selected === 'worker'} />
        <Payments payments={data?.payments} show={selected === 'payment'} />
        <Info hashRate={data?.hashrate} balances={data?.balances} show={selected === 'info'} />
      </View>}


      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', backgroundColor: MyTheme.primary }}>
        <BottomIcon title={'Info'} onPress={() => setSelected('info')} icon={'info-circle'} selected={selected === 'info'} />
        <BottomIcon title={'Workers'} onPress={() => setSelected('worker')} icon={'sitemap'} selected={selected === 'worker'} />
        <BottomIcon title={'Payments'} onPress={() => setSelected('payment')} icon={'money'} selected={selected === 'payment'} />
        <BottomIcon title={'Earnings'} onPress={() => setSelected('earning')} icon={'dollar'} selected={selected === 'earning'} />
      </View>
    </View>
  )
}

const BottomIcon = ({ title, icon, selected, onPress }) => {
  return (

    <View style={{ flex: 1 }}>
      <Pressable onPress={onPress}>
        <View style={{ padding: '6%', justifyContent: 'center', alignItems: 'center', }}>
          {/* <Feather name="bar-chart-2" size={30} color={MyTheme.secondary} /> */}
          <FontAwesome name={icon} size={25} color={selected ? '#7aaad6' : MyTheme.secondary} />
          <MyText style={{ fontSize: 16, color: selected ? '#7aaad6' : MyTheme.secondary, }}>{title}</MyText>
        </View>
      </Pressable>
    </View >

  )
}



const Earning = ({ earnings, show }) => {
  if (!show) {
    return null
  }
  return (
    <View>
      <ScrollView>
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

      </ScrollView>
    </View>
  )
}

const Worker = ({ workers, show }) => {
  if (!show) {
    return null
  }
  return (
    <View>
      <ScrollView>
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

      </ScrollView>
    </View>
  )
}

const Payments = ({ payments, show }) => {
  if (!show) {
    return null
  }
  return (
    <View>
      <ScrollView>
        {(payments || []).map((payment, index) => {
          return (
            <View key={index} style={{ borderWidth: 1, borderColor: 'lightgray', borderRadius: 10, margin: '2%', padding: '2%' }}>

              {/* <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                <MyText style={{ fontSize: 16, fontWeight: 'bold', flex: 1 }}>{'Coin'}</MyText>
                <MyText style={{ fontSize: 16, fontWeight: 'bold', flex: 2 }}>{payment?.coin}</MyText>
              </View> */}
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
                {/* <MyText style={{ fontSize: 16, fontWeight: 'bold', flex: 2 }}>{new Date(payment?.timestamp).toLocaleDateString()}</MyText> */}
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
      </ScrollView>
    </View>
  )
}
const Info = ({ hashRate, balances, show }) => {
  if (!show) {
    return null
  }

  return (
    <View>
      <ScrollView>
        <View style={{ borderWidth: 1, borderColor: 'lightgray', borderRadius: 10, margin: '2%', padding: '2%' }}>
          <MyText style={{ fontSize: 14, fontWeight: 'bold' }}>Current Hash Rate</MyText>
          {hashRate && (Object.keys(hashRate) || []).map((rate, index) => {
            return (
              <View key={index} style={{ borderBottomColor: 'lightgray', borderBottomWidth: 1, marginBottom: '4%' }}>
                <MyText style={{ fontSize: 18, fontWeight: 'bold' }}>{(rate || '').toUpperCase()}</MyText>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <MyText style={{ fontSize: 32, fontWeight: 'bold' }}>{(hashRate[rate].hashrate || 0).toFixed(2) + "  " + hashRate[rate].speedUnits}</MyText>
                  {/* <MyText style={{ fontSize: 15, fontWeight: 'bold' }}>{'Conversion: ' + hashRate[rate].speedConversion}</MyText> */}
                </View>
              </View>
            )
          })}
        </View>


        <View style={{ padding: '4%', borderWidth: 1, borderColor: 'lightgray', borderRadius: 10, margin: '2%', padding: '2%' }}>
          <MyText style={{ fontSize: 22, fontWeight: 'bold', flex: 1, marginBottom: '2%' }}>{'Balances'}</MyText>
          <View style={{ flexDirection: "row", justifyContent: 'space-evenly' }}>
            <MyText style={{ fontSize: 14, fontWeight: 'bold', flex: 1 }}>{'Coin Ticker'}</MyText>
            {/* <MyText style={{ fontSize: 14, fontWeight: 'bold', flex: 1 }}>{'Coin'}</MyText> */}
            <MyText style={{ fontSize: 14, fontWeight: 'bold', flex: 1 }}>{'Balance'}</MyText>
            <MyText style={{ fontSize: 14, fontWeight: 'bold', flex: 1 }}>{'Balance USD'}</MyText>
          </View>
          {(balances || []).map((balance, index) => {
            return (
              <View key={index} style={{ flexDirection: "row", justifyContent: 'space-evenly' }}>
                <MyText style={{ fontSize: 14, flex: 1 }}>{balance.coinTicker}</MyText>
                {/* <MyText style={{ fontSize: 14, flex: 1 }}>{balance.coin}</MyText> */}
                <MyText style={{ fontSize: 14, flex: 1 }}>{balance.balance}</MyText>
                <MyText style={{ fontSize: 14, flex: 1 }}>{balance.balanceUSD}</MyText>
              </View>
            )
          })}
        </View>


      </ScrollView>
    </View>
  )
}

