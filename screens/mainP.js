import { StyleSheet, Touchable, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import {
  Text,
  TextInput as NTextInput,
  Button as NButton,
} from "react-native-paper";
import SelectableChips from "../Components/SelectableChips";
import { colors } from "../assets/Themes/colors";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function MainP() {
  const [selectedKey, setselectedKey] = useState("Live");

  const [stockPrice, setStockPrice] = useState(0);
  const [STOCK_SYMBOL, setSymbol] = useState("tsla");
  const [textbox, setTextbox] = useState("");
  const API_KEY = "sk_a13ad647a1f744e0a4c047fa9e1b61c9";

  const sma = 5;

  const [data, setData] = useState({
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [Math.random() * 100, Math.random() * 100],
      },
      {
        data: [Math.random() * 100, Math.random() * 100],
      },
      {
        data: [Math.random() * 100, Math.random() * 100],
      },
    ],
  });

  const liveUpdate = () => {
    fetch(
      `https://cloud.iexapis.com/stable/stock/${STOCK_SYMBOL}/chart/1d?token=${API_KEY}&chartLast=60`
    )
      .then((response) => response.json())
      .then((newdata) => {
        const newdatafiltered = jsonreader(newdata);
        setData({
          ...data,
          datasets: [
            {
              data: newdatafiltered,
            },
            {
              color: (opacity = 1) => `rgba(255, 0, 255, ${opacity})`,
              data: Array(newdatafiltered.length).fill(
                newdatafiltered.reduce((a, b) => a + b) / newdatafiltered.length
              ),
            },
            {
              color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`,
              data: Array(newdatafiltered.length).fill(
                newdatafiltered
                  .slice(newdatafiltered.length - sma)
                  .reduce((a, b) => a + b) / sma
              ),
            },
          ],
        });
      })
      .catch((error) => {
        console.error(error);
      });
    // fetch the stock price
    fetch(
      `https://cloud.iexapis.com/stable/stock/${STOCK_SYMBOL}/quote?token=${API_KEY}`
    )
      .then((response) => response.json())
      .then((newdata) => {
        setStockPrice(newdata.latestPrice);
      })
      .catch((error) => {
        console.error(error);
      });
    setText(
      data.datasets[0].data
        .slice(data.datasets[0].data.length - sma)
        .reduce((a, b) => a + b) /
        sma <
        data.datasets[0].data.reduce((a, b) => a + b) /
          data.datasets[0].data.length
        ? "Buy"
        : "Sell"
    );
  };
  const [text, setText] = useState("O");

  const [datatime, settime] = useState({
    "1d": null,
    "1w": null,
    "1m": null,
    "1y": null,
    ytd: null,
  });

  useEffect(() => {
    liveUpdate();
  }, [STOCK_SYMBOL, datatime]);
 
  const jsonreader = (data) => {
    // get the closing price of each day and put it in an array
    var close = [];
    for (var i = 0; i < data.length; i++) {
      // in null put the last element of the array
      if (data[i].close == null) {
        close.push(close[i - 1]);
      } else {
        close.push(data[i].close);
      }
    }
    return close;
  };

  const putdata = (newdata, timerange) => {
    settime({
      ...datatime,
      [timerange]: newdata,
    });
    setData({
      ...data,
      datasets: [
        {
          data: newdata,
        },
      ],
    });
  };

  const fetchdata = (timerange) => {
    if (datatime[timerange] != null) {
      putdata(datatime[timerange], timerange);
      return;
    }
    fetch(
      `https://cloud.iexapis.com/stable/stock/${STOCK_SYMBOL}/chart/${timerange}?token=${API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        putdata(jsonreader(data), timerange);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSelect = (key) => {
    setselectedKey(key);
    if (key != "Live") {
      fetchdata(key);
    } else {
      liveUpdate();
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (selectedKey === "Live") {
        console.log("fetching");
        liveUpdate();
      }
    }, 60000);
    return () => clearInterval(interval);
  }, [data, selectedKey]);

  return (
    <SafeAreaView>
      
      <View>
        <LineChart
          data={data}
          width={Dimensions.get("window").width} // from react-native
          height={220}
          yAxisLabel="$"
          yAxisSuffix="k"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "0",
              strokeWidth: "2",
              stroke: "#ffa726",
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
        <SelectableChips
          options={["Live", "1 Day", "1 Week", "1 Month", "1 Year", "YTD"]}
          keys={["Live", "1d", "1w", "1m", "1y", "ytd"]}
          icons={[
            "clock",
            "information",
            "information",
            "information",
            "information",
            "information",
          ]}
          selectedKey={selectedKey}
          onSelect={handleSelect}
        />
        <Text style={{ fontSize: 24 }}>
          {stockPrice
            ? `The current price of ${STOCK_SYMBOL} is $${stockPrice}`
            : "Loading..."}
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <TouchableOpacity
            onPress={() => console.log("Pressed")}
            rippleColor="rgba(0, 0, 0, .32)"
            style={{
              width: 100,
              height: 100,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 40,
              backgroundColor: text == "Buy" ? "green" : "red",
              margin: 10,
            }}
          >
            <Text style = {{ color: "white"}}>{text}</Text>
          </TouchableOpacity>
        </View>
       
      </View>
      <NTextInput
            mode="outlined"
            label="Trading Name"
            placeholder="e.x. tsla"
            stlye={{ width: "80%"}}
            onChangeText={(text) => setTextbox(text)}
            />
            <NButton
            mode="contained"
            onPress={() => 
            {
              setSymbol(textbox);
              // clear timerange
              settime({
                "1d": null,
                "1w": null,
                "1m": null,
                "1y": null,
                ytd: null,
              });
            }}
            style={{ width: "80%", margin: 10, backgroundColor: colors.greenishBuy }}
            >
            <Text style={{ color: "white" }}>Submit</Text>
            </NButton>
    </SafeAreaView>
  );
}
