import { useEffect, useState } from 'react';
import axios from "axios";
import { getUsername } from '../helper/helper';

import { API_URL } from '../env';

axios.defaults.baseURL =  API_URL;

/**Custom hook */
export default function useFetch(query) {
    const [data, setData] = useState({ isLoading: false, apiData: undefined, status: null, serverError: null });

    useEffect(() => {
        const fetchData = async () => {
            try {
                setData(prev => ({ ...prev, isLoading: true }));

                let { username } = !query ? await getUsername() : '';

                const { data, status } = !query ? await axios.get(`/api/user/${username}`) : await axios.get(`/api/${query}`);

                if (status === 201) {
                    setData({ isLoading: false, apiData: data, status });
                } else {
                    setData({ isLoading: false, serverError: "Unexpected status code" });
                }
            } catch (error) {
                setData({ isLoading: false, serverError: error });
            }
        };
        fetchData();
    }, [query]);

    return data;
}
