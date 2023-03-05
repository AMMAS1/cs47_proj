import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import React, { useEffect, useState } from "react";

export default function MainP() {
    const sma = 5;
  const [data, setData] = useState({
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [
          Math.random() * 100,
          Math.random() * 100,
        ],
      },
      {
        data: [
          Math.random() * 100,
          Math.random() * 100,
        ],
      },
      {
        data: [
          Math.random() * 100,
          Math.random() * 100,
        ],
      },
    ],
  });
  const [text, setText] = useState("O");
  useEffect(() => {
    const interval = setInterval(() => {
      setData({
        ...data,
        datasets: [
          {
            data: [
              ...data.datasets[0].data.slice(
                data.datasets[0].data.length == 20 ? 1 : 0
              ),
              Math.random() * 100,
            ],
          },
          {
            color: (opacity = 1) => `rgba(255, 0, 255, ${opacity})`,
            data: Array(data.datasets[0].data.length).fill(
              data.datasets[0].data.reduce((a, b) => a + b) /
                data.datasets[0].data.length)
            ,
          },
          {
            color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`,
            data: Array(data.datasets[0].data.length).fill(
              data.datasets[0].data.slice(data.datasets[0].data.length - sma).reduce((a, b) => a + b) /
              sma)
            ,
          },
        ],
      });
      setText(data.datasets[0].data.slice(data.datasets[0].data.length - sma).reduce((a, b) => a + b) / sma < data.datasets[0].data.reduce((a, b) => a + b) / data.datasets[0].data.length ? "Buy" : "Sell"); 
    }, 1);
    return () => clearInterval(interval);
  }, [data]);

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
        <Text>{text}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
  });
  