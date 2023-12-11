import axios from "axios"

export const getUserInfo = async (bearerToken: string = "") => {
    try {
        const result = await axios.get('http://127.0.0.1:5001/calculator-49ac2/us-central1/calculation/signin', {
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
        await axios.post('http://127.0.0.1:5001/calculator-49ac2/us-central1/calculation/signup', {
            email: email,
            firstName,
            lastName
        });
    } catch (err) {
        console.error(err);
    }
}

export const getHistoryForUser = async (bearerToken: string = "") => {
    const result = await axios.get('http://127.0.0.1:5001/calculator-49ac2/us-central1/calculation/history', {
        headers: {
            'Authorization': `Bearer ${bearerToken}`,
        }
    });

    return result;
}

export const removeHistoryById = async (id: string, bearerToken: string) => {
    const result = await axios.delete(`http://127.0.0.1:5001/calculator-49ac2/us-central1/calculation/history/${id}`, {
        headers: {
            'Authorization': `Bearer ${bearerToken}`,
        }
    });

    return result;
}

export const addAPI = async (first: number, second: number, idToken: string) => {
    const result = await axios.post('http://localhost:5001/calculator-49ac2/us-central1/calculation/add', {
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
    const result = await axios.post('http://localhost:5001/calculator-49ac2/us-central1/calculation/divide', {
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
    const result = await axios.post('http://localhost:5001/calculator-49ac2/us-central1/calculation/multiply', {
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
    const result = await axios.post('http://localhost:5001/calculator-49ac2/us-central1/calculation/deduction', {
        first,
        second,
    }, {
        headers: {
            'Authorization': `Bearer ${idToken}`,
        }
    });

    return result;
}