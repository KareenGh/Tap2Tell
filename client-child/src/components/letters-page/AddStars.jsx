import React from 'react';
import { View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { vw, vh } from 'react-native-expo-viewport-units';


function AddStars(props) {
  let arrStar = [];
  let num = 1;
  while (num <= 5) {
    if (num <= props.score) {
      num++; 
      arrStar.push({
        //filled
        icon: <FontAwesome name="star" size={vw(8)} color="#FFCE09" /> 
      });
    } else {
      arrStar.push({
        //not filled
        icon: <FontAwesome name="star" size={vw(8)} color="#00000029" /> 
      });
      num++;

    }
  }

  //add bottom to the array for round stars
  arrStar[0] = { ...arrStar[0], bottom: 45 }
  arrStar[1] = { ...arrStar[1], bottom: 30 }
  arrStar[2] = { ...arrStar[2], bottom: 25}
  arrStar[3] = { ...arrStar[3], bottom: 30 }
  arrStar[4] = { ...arrStar[4], bottom: 45 }


  return arrStar.map((star, indx) => { 
    return <View style={{bottom: `${star.bottom}%`}} key={indx}>{star.icon}</View>;
  })
}

export default AddStars