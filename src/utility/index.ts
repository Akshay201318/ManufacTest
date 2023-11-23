import { DataRecord, IGetClassWiseAnalytics } from "./types";

const getGammaValue = (data: DataRecord):number => {
  const ash: number = data["Ash"];
  const hue:number = data["Hue"];
  const magnesium:number = data["Magnesium"];
  return (ash * hue) / magnesium;
};

const getMean = (data: Array<number>):number => {
  if (data.length === 0) {
    return 0;
  }
  const sum = data.reduce((total, data) => total + Number(data), 0);
  const mean = sum / data.length;

  return parseFloat(mean.toFixed(3));
};

const getMedian = (data: Array<number>):number => {
  if (data.length === 0) {
    return 0;
  }

  const sortedNumbers = data.slice().sort((a, b) => a - b);
  const middleIndex = Math.floor(sortedNumbers.length / 2);

  if (sortedNumbers.length % 2 === 0) {
    // If the array length is even, average the two middle values
    const middleValues = sortedNumbers.slice(middleIndex - 1, middleIndex + 1);
    return (middleValues[0] + middleValues[1]) / 2;
  } else {
    // If the array length is odd, return the middle value
    return parseFloat(sortedNumbers[middleIndex].toFixed(3));
  }
};

const getMode = (data: Array<number>):number|string => {
  if (data.length === 0) {
    return 0; // Handle empty array case
  }

  // Create a frequency map to count occurrences of each number
  const frequencyMap: DataRecord = {};
  data.forEach((number) => {
    frequencyMap[number] = (frequencyMap[number] || 0) + 1;
  });

  let modes: Array<number> = [];
  let maxFrequency = 0;

  for (const number in frequencyMap) {
    if (frequencyMap.hasOwnProperty(number)) {
      const frequency = frequencyMap[number];

      if (frequency > maxFrequency) {
        // If a higher frequency is found, update the modes array
        modes = [Number(number)];
        maxFrequency = frequency;
      } else if (frequency === maxFrequency) {
        // If there are multiple modes with the same frequency, add to the modes array
        modes.push(Number(number));
      }
    }
  }

  if (modes.length === Object.keys(frequencyMap).length) {
    // If every number has the same frequency, there is no mode
    return "No mode";
  }

  return modes[0].toFixed(3);
};

export const getClassWiseAnalytics = ({ data = [], type }: IGetClassWiseAnalytics) => {
  const result: DataRecord = data.reduce((acc: DataRecord, curr: DataRecord) => {
    //If type is not Flavanoids then calculate the Gamma value
    const value =
      type === "Flavanoids" ? curr["Flavanoids"] : getGammaValue(curr);

    if (acc[curr.Alcohol]) {
      acc[curr.Alcohol].push(value);
    } else {
      acc[curr.Alcohol] = [value];
    }
    return acc;
  }, {});
  const finalData:Array<Array<number | string>> = [[], [], []];
  Object.keys(result).forEach((ele) => {
    finalData[0].push(getMean(result[ele]));
    finalData[1].push(getMedian(result[ele]));
    finalData[2].push(getMode(result[ele]));
  });
  return finalData;
};
