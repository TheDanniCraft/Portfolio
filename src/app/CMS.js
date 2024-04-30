import PocketBase from 'pocketbase';
import { useEffect, useState } from 'react';

const base = 'https://cms.thedannicraft.de';
const pb = new PocketBase(base);
pb.autoCancellation(false);

function useCMSData(collectionName) {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const fetchedData = await pb.collection(collectionName).getFullList();
            setData(fetchedData);
        };

        fetchData();
    }, [collectionName]);
    return data;
}

export { pb, base, useCMSData }