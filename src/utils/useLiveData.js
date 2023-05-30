import { useEffect, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useCurrencySet } from "./useCurrencySet";
import { useDispatch, useSelector } from "react-redux";
import { MainActions } from "../redux/actions";

export const useLiveData = () => {
  const {currencySet, userCurrency} = useCurrencySet();
  const [productsIds, setProductsIds] = useState([]);
  const [liveData, setLiveData] = useState(null);
  const liveDataSet = useSelector((state) => state?.liveDataReducer?.liveData);
  const dispatch = useDispatch();

  const { readyState, sendJsonMessage, lastJsonMessage } = useWebSocket(
		"wss://ws-feed.exchange.coinbase.com"
	);

  useEffect(() => {
    if (currencySet && userCurrency && currencySet?.[userCurrency]) {
      setLiveData(currencySet[userCurrency]);
      dispatch(MainActions.setLiveCoinsData(currencySet[userCurrency]));

      const mappedCoins = [...currencySet[userCurrency]].map((coin) => (`${coin.base}-${coin.currency}`));
      setProductsIds(mappedCoins);
    };
  }, [currencySet, userCurrency]);
  
	useEffect(() => {
    if (readyState === ReadyState.OPEN) {
      sendJsonMessage({
        type: "subscribe",
        product_ids: productsIds,
        channels: ["ticker_batch"],
      });
		};

	}, [readyState, productsIds]);

  useEffect(() => {
		if (lastJsonMessage) {
			const { channels, ...payload } = lastJsonMessage;
			const product = payload.product_id;

      if (product) {
        if (liveDataSet?.length) {
          const list = liveDataSet?.map((coin) => {
            if (`${coin.base}-${coin.currency}` === product) {
              coin.latest = payload.price;
              coin.volume_24h = payload.volume_24h
            }
            return {...coin}
          });
          dispatch(MainActions.setLiveCoinsData(list));
          setLiveData(list);
        };
      }

      if (channels) {
        if(channels.length) {
          const [products] = channels?.map(
            (channel) => channel.product_ids
          );
          setProductsIds(products);
        } else {
          setProductsIds([]);
        };
      }
		}
	}, [lastJsonMessage]);

  return liveData;
}