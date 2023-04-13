import React from 'react';
import {UserContext} from '../contexts/UserContext';
import dummyData from './../../DummyData.json'

export function useGet(endpoint, initialValue = []) {
  const {token} = React.useContext(UserContext);
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
        setData(dummyData.products);
  }, [token, endpoint]);
  return data;
}
