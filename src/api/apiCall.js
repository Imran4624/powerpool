import axios from 'axios';
const baseUrl = "https://api.publicapis.org"

// const publicUrl = 'https://powerpool.io/api2/pool'
const publicUrl = 'https://powerpool.io/api/app/pool'
// const apiKey = '10ea3568005a434680fb5cecbff3a7d9'

export const GetPublicData = async () => {

  try {
    const res = await axios({
      method: 'get',
      url: publicUrl,
      headers: {
        'Content-Type': 'application/json'
      },
    });
    return res.data;
  } catch (error) {
    console.log("api error", error);
  }
};


export const GetPrivateDate = async (apiKey) => {

  // const url = `https://powerpool.io/api2/user?apiKey=${apiKey}`
  const url = `https://powerpool.io/api/app/info?apiKey=${apiKey}`
  try {
    const res = await axios({
      method: 'get',
      url: url,
      headers: {
        'Content-Type': 'application/json'
      },
    });
    // console.log(res?.data?.data)
    if (res.status === 200) {
      return { status: true, data: res?.data?.data }
    } else {
      return { status: false, data: null }
    }
    return res.data;
  } catch (error) {
    console.log("api error", error);
  }
};
export const GetWorkerData = async (apiKey,page) => {

  // const url = `https://powerpool.io/api2/user?apiKey=${apiKey}`
  const url = `https://powerpool.io/api/app/workers?apiKey=${apiKey}&page=${page}`
  try {
    const res = await axios({
      method: 'get',
      url: url,
      headers: {
        'Content-Type': 'application/json'
      },
    });
    // console.log(res?.data?.data)
    if (res.status === 200) {
      return { status: true, data: res?.data?.data }
    } else {
      return { status: false, data: null }
    }
    return res.data;
  } catch (error) {
    console.log("api error", error);
  }
};
export const GetEarningData = async (apiKey,page) => {

  // const url = `https://powerpool.io/api2/user?apiKey=${apiKey}`
  const url = `https://powerpool.io/api/app/earnings?apiKey=${apiKey}&page=${page}`
  try {
    const res = await axios({
      method: 'get',
      url: url,
      headers: {
        'Content-Type': 'application/json'
      },
    });
    // console.log(res?.data?.data)
    if (res.status === 200) {
      return { status: true, data: res?.data?.data }
    } else {
      return { status: false, data: null }
    }
    return res.data;
  } catch (error) {
    console.log("api error", error);
  }
};
export const GetPaymentsDate = async (apiKey,page) => {
  // console.log("pGE NUMBER : ",page);

  // const url = `https://powerpool.io/api2/user?apiKey=${apiKey}`
  const url = `https://powerpool.io/api/app/payments?apiKey=${apiKey}&page=${page}`
  try {
    const res = await axios({
      method: 'get',
      url: url,
      headers: {
        'Content-Type': 'application/json'
      },
    });
    // console.log(res?.data?.data)
    if (res.status === 200) {
      return { status: true, data: res?.data?.data }
    } else {
      return { status: false, data: null }
    }
    return res.data;
  } catch (error) {
    console.log("api error", error);
  }
};
export const GetToken = async (token,apiKey) => {
  const url = `https://powerpool.io/api/app/info`
  try {
    const res = await axios({
      method: 'get',
      url: url,
      params: {
        deviceID: token,
        apiKey: apiKey
      },
      headers: {
        'Content-Type': 'application/json'
      },
    });
    if (res.status === 200) {
      return { status: true, data: res?.data?.data }
    } else {
      return { status: false, data: null }
    }
    return res.data;
  } catch (error) {
    console.log("api error", error);
  }
};