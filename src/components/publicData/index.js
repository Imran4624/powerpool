import { View, Text, Pressable, ActivityIndicator, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "./styles";
import { MyText, TopHeader } from "../../components";


import { GetPublicData, } from "../../api/apiCall";
import { MyTheme } from "../../utils";
import { ScrollView } from "react-native-gesture-handler";
import FontAwesome from "react-native-vector-icons/FontAwesome";




export const PublicData = ({ }) => {

  const [data, setData] = useState(null)
  const [prices, setPrices] = useState([])
  const [loading, setLoading] = useState(false)

  const getPublicData = async () => {
    setLoading(true)
    GetPublicData().then(res => {
      setData(res.algorithms)
      setPrices(res.prices)
      // console.log(res.algorithms)
      setLoading(false)
    }).catch(err => {
      setLoading(false)
    })
  }

  useEffect(() => {
    // console.log('useEffect')
    getPublicData()
    const interval = setInterval(() => {
      // console.log('public dataCalled')     
      getPublicData()
    }, 30000);

    return () => clearInterval(interval);

  }, [])


  return (
    <View style={{ flex: 1, padding: '4%' }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <MyText style={{ fontSize: 22, fontWeight: 'bold' }}>Pool Data</MyText>
        <Pressable style={styles.btnPress} onPress={getPublicData}>
          <FontAwesome name="refresh" size={30} color={MyTheme.primary} />
        </Pressable>
      </View>
      {loading && <View>
        <ActivityIndicator size={'large'} color={MyTheme.primary} />
      </View>}


      {data && <ScrollView style={{ flex: 1, }}>
        <View style={{ paddingTop: '4%' }}>
          
        <View style={{ marginTop: '2%' }}>
            <MyText style={{ fontSize: 18, fontWeight: 'bold' }}>PRICES</MyText>
            <View style={{ padding: '2%', borderWidth: 1, borderColor: 'lightgray' }}>
              {
                prices.map((price , index)=>{
                  return(
                    <View key={index}>
                      <PublicDataCard title={price.ticker} value={price.price +" "+ price.units} />
                    </View>
                  )
                })
              }
            </View>
          </View>
          {
            data.map((algo , index)=>{
              return(
                <View style={{ marginTop: '2%' }} key={index}>
                   <MyText style={{ fontSize: 18, fontWeight: 'bold' }}>{algo.algorithm}</MyText>
                   <View style={{ padding: '2%', borderWidth: 1, borderColor: 'lightgray' }}>
                    <PublicDataCard title={'Hash Rate'} value={(algo?.hashrate || 0).toFixed(2) + ' ' + algo?.speedUnits} />
                    <PublicDataCard title={'Average'} value={(algo?.BTCaveragePayRate || 0).toFixed(8) + '  BTC/' + algo?.payRateUnits + "/DAY"} />
                    <PublicDataCard title={'Current'} value={(algo?.BTCpayRate || 0).toFixed(8) + '  BTC/' + algo?.payRateUnits + "/DAY"} />
                    <PublicDataCard title={'Current Speed Port'} value={(algo?.BTCpayRateSpeedPort || 0).toFixed(8) + '  BTC/' + algo?.payRateUnits + "/DAY"} />
                    <PublicDataCard title={'Miners'} value={algo?.miners} />
                    <PublicDataCard title={'Blocks'} value={algo?.blocks} />
                    <PublicDataCard title={'Fee'} value={algo?.fee +' %'} />
                   </View>
                </View>
              )
            })
          }

         
          {/* <View style={{ marginTop: '2%' }}>
            <MyText style={{ fontSize: 18, fontWeight: 'bold' }}>PRICES</MyText>
            <View style={{ padding: '2%', borderWidth: 1, borderColor: 'lightgray' }}>
              <PublicDataCard title={'BTC'} value={data?.prices?.BTCUSDT + ' $'} />
              <PublicDataCard title={'DGB'} value={data?.prices?.DGBBTC + ' BTC'} />
              <PublicDataCard title={'DOGE'} value={data?.prices?.DOGEBTC + ' BTC'} />
              <PublicDataCard title={'ETC'} value={data?.prices?.ETHBTC + ' BTC'} />
              <PublicDataCard title={'LTC'} value={data?.prices?.LTCBTC + ' BTC'} />
            </View>
          </View>


          <View style={{ marginTop: '2%' }}>
            <MyText style={{ fontSize: 18, fontWeight: 'bold' }}>SCRYPT</MyText>
            <View style={{ padding: '2%', borderWidth: 1, borderColor: 'lightgray' }}>
              <PublicDataCard title={'Hash Rate'} value={(data?.scrypt?.hashrate || 0).toFixed(2) + ' ' + data?.scrypt?.speedUnits} />
              <PublicDataCard title={'Average'} value={(data?.scrypt?.BTCaveragePayRate || 0).toFixed(8) + '  BTC/' + data?.scrypt?.payRateUnits + "/DAY"} />
              <PublicDataCard title={'Current'} value={(data?.scrypt?.BTCpayRate || 0).toFixed(8) + '  BTC/' + data?.scrypt?.payRateUnits + "/DAY"} />
              <PublicDataCard title={'Current Speed Port'} value={(data?.scrypt?.BTCpayRateSpeedPort || 0).toFixed(8) + '  BTC/' + data?.scrypt?.payRateUnits + "/DAY"} />
              <PublicDataCard title={'Miners'} value={data?.scrypt?.miners} />
              <PublicDataCard title={'Blocks'} value={data?.scrypt?.blocks} />
              <PublicDataCard title={'Fee'} value={data?.scrypt?.fee +' %'} />
            </View>
          </View>

          <View style={{ marginTop: '2%' }}>
            <MyText style={{ fontSize: 18, fontWeight: 'bold' }}>SHA256</MyText>
            <View style={{ padding: '2%', borderWidth: 1, borderColor: 'lightgray' }}>
              <PublicDataCard title={'Hashrate'} value={(data?.sha256?.hashrate || 0).toFixed(2) + ' ' + data?.sha256?.speedUnits} />
              <PublicDataCard title={'Average'} value={(data?.sha256?.BTCaveragePayRate || 0).toFixed(8) + '   BTC/' + data?.sha256?.payRateUnits + "/DAY"} />
              <PublicDataCard title={'Current'} value={(data?.sha256?.BTCpayRate || 0).toFixed(8) + '   BTC/' + data?.sha256?.payRateUnits + "/DAY"} />
              <PublicDataCard title={'Current Speed Port'} value={(data?.sha256?.BTCpayRateSpeedPort || 0).toFixed(8) + '   BTC/' + data?.sha256?.payRateUnits + "/DAY"} />
              <PublicDataCard title={'Miners'} value={data?.sha256?.miners} />
              <PublicDataCard title={'Blocks'} value={data?.sha256?.blocks} />
              <PublicDataCard title={'Fee'} value={data?.sha256?.fee +' %'} />
            </View>
          </View>


          <View style={{ marginTop: '2%' }}>
            <MyText style={{ fontSize: 18, fontWeight: 'bold' }}>EAGLESONG </MyText>
            <View style={{ padding: '2%', borderWidth: 1, borderColor: 'lightgray' }}>
              <PublicDataCard title={'Hashrate'} value={(data?.eaglesong?.hashrate || 0).toFixed(2) + ' ' + data?.eaglesong?.speedUnits} />
              <PublicDataCard title={'Average'} value={(data?.eaglesong?.BTCaveragePayRate || 0).toFixed(8) + '   BTC/' + data?.eaglesong?.payRateUnits + "/DAY"} />
              <PublicDataCard title={'Current'} value={(data?.eaglesong?.BTCpayRate || 0).toFixed(8) + '   BTC/' + data?.eaglesong?.payRateUnits + "/DAY"} />
              <PublicDataCard title={'Current Speed Port'} value={(data?.eaglesong?.BTCpayRateSpeedPort || 0).toFixed(8) + '   BTC/' + data?.eaglesong?.payRateUnits + "/DAY"} />
              <PublicDataCard title={'Miners'} value={data?.eaglesong?.miners} />
              <PublicDataCard title={'Blocks'} value={data?.eaglesong?.blocks} />
              <PublicDataCard title={'Fee'} value={data?.eaglesong?.fee +' %'} />
            </View>
          </View> */}

        </View>
      </ScrollView>}
    </View>
  )
}


const PublicDataCard = ({ title, value }) => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <MyText style={{ fontSize: 14, fontWeight: 'bold' }}>{title + ":     "}</MyText>
      <MyText style={{ fontSize: 14, fontWeight: 'bold' }}>{value}</MyText>
    </View>
  )
}