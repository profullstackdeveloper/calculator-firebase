import axios from "axios"

const baseURL = process.env.REACT_APP_BASEAPIURL;

export const getUserInfo = async (bearerToken: string = "") => {
    try {
        const result = await axios.get(`${baseURL}/calculation/signin`, {
            headers: {
                'Authorization': `Bearer ${bearerToken}`,
            }
        });

        return result;
    } catch (err) {
        console.error(err);
    }
}

export const registerUser = async (email: string, firstName: string, lastName: string) => {
    try {
        await axios.post(`${baseURL}/calculation/signup`, {
            email: email,
            firstName,
            lastName
        });
    } catch (err) {
        console.error(err);
    }
}

export const getHistoryForUser = async (bearerToken: string = "") => {
    const result = await axios.get(`${baseURL}/calculation/history`, {
        headers: {
            'Authorization': `Bearer ${bearerToken}`,
        }
    });

    return result;
}

export const removeHistoryById = async (id: string, bearerToken: string) => {
    const result = await axios.delete(`${baseURL}/calculation/history/${id}`, {
        headers: {
            'Authorization': `Bearer ${bearerToken}`,
        }
    });

    return result;
}

export const addAPI = async (first: number, second: number, idToken: string) => {
    const result = await axios.post(`${baseURL}/calculation/add`, {
        first,
        second,
    }, {
        headers: {
            'Authorization': `Bearer ${idToken}`,
        }
    });

    return result;
}

export const divideAPI = async (first: number, second: number, idToken: string) => {
    const result = await axios.post(`${baseURL}/calculation/divide`, {
        first,
        second,
    }, {
        headers: {
            'Authorization': `Bearer ${idToken}`,
        }
    });

    return result;
}

export const multiplyAPI = async (first: number, second: number, idToken: string) => {
    const result = await axios.post(`${baseURL}/calculation/multiply`, {
        first,
        second,
    }, {
        headers: {
            'Authorization': `Bearer ${idToken}`,
        }
    });

    return result;
}

export const deductionAPI = async (first: number, second: number, idToken: string) => {
    const result = await axios.post(`${baseURL}/calculation/deduction`, {
        first,
        second,
    }, {
        headers: {
            'Authorization': `Bearer ${idToken}`,
        }
    });

    return result;
}

export const getCurrencyRateAPI = async (from: string) => {
    try {
        return await axios.get(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from.toLocaleLowerCase()}.json`);
    } catch (err) {
        console.error(err)
    }
}