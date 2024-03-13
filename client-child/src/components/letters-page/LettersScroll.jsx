//react
import React, { useEffect, useRef, useState } from 'react';
import { View, Image, ScrollView } from 'react-native';
import { vh } from 'react-native-expo-viewport-units';


//components
import CreateCircle from './CreateCircle';
import MaxStarsLetter from './MaxStarsLetter.jsx';
import { styles } from './LetterCircleStar.style';
import { LettersArr, MaximumScore } from '../../consts/consts.js'
import { useLetterImageStoreContext } from '../../stores/index.store';
import BubblesAnimation from './BubblesAnimation';

//mobx
import { observer } from 'mobx-react-lite';

function LettersScroll(props) {
  const letterStore = useLetterImageStoreContext();
  const [scrollHeight, setScrollHeight] = useState(null);
  const [scrollWidth, setScrollWidth] = useState(null);
  const scrollView = useRef();
  const [yDirection, setYDirection] = useState(null);
  // const [firstLetter, setFirstLetter] = useState('');
  const [bubbles, setBubbles] = useState(true)

  useEffect(() => {
    const scrollViewToEnd = async () => {
      if (scrollHeight != null && scrollHeight > vh(100) && scrollView && scrollView.current) {
        await scrollView.current.scrollToEnd({ animated: false })
        props.setScrollLoaded(true)
      }
    }
    scrollViewToEnd()
  }, [scrollHeight])

  useEffect(() => {
    if (yDirection) {
      setTimeout(() => {
        if (scrollView && scrollView.current) {
          scrollView.current.scrollTo(
            { y: (yDirection - vh(63)), animated: true },
          );
        }
      }, 5600);
    }
  }, [yDirection])

  const getHeightOfCircle = (height) => {
    setYDirection(height)
    return;
  }

  const newFiveStars = (height, left) => {
    if (scrollView && scrollView.current) {
      scrollView.current.scrollTo(
        { y: (height - vh(65)), animated: true },
      );
    }
    if (letterStore.newFiveStars) {
      return {
        show: true, gif: (
          <Image style={{ ...styles.animationGif }} source={require('../../../assets/gif/newGif.gif')} />
        ), left: left
      }
    } else {
      return { show: false, left: left }

    }
  }
  const letterArrMap = () => {
    let i = 21;
    if (letterStore.letterScoreArr !== null) {
      let content = [];
      for (let j = LettersArr.length - 1; j >= 0; j--) {
        let letterScore;
        for (let i = 0; i < letterStore.letterScoreArr.length; i++) {
          if (letterStore.letterScoreArr[i].letter === LettersArr[j]) {
            letterScore = Number(letterStore.letterScoreArr[i].score);
            break;
          }
        }
        i--
        if (letterScore >= MaximumScore) {
          content.push(<MaxStarsLetter
            navigation={props.navigation}
            key={LettersArr[j]}
            letter={LettersArr[j]}
            newFiveStars={letterStore.newFiveStars === LettersArr[j] ? newFiveStars : null}
          />)
        }
        else {
          content.push(<CreateCircle
            navigation={props.navigation}
            key={LettersArr[j]}
            score={letterScore}
            letter={LettersArr[j]}
            index={i + 1}
            minStars={props.firstLetter === LettersArr[j] ? true : false}
            getHeightOfCircle={props.firstLetter === LettersArr[j] ? getHeightOfCircle : null} />)
        }
      }
      if (content.length > 0) {
        return content;
      }
    }
  }

  return (
    <View style={styles.container} >
      <ScrollView
        ref={scrollView}
        onContentSizeChange={(contentWidth, contentHeight) => {
          if (bubbles) {
            setScrollHeight(contentHeight);
            setScrollWidth(contentWidth);
          }
        }}
        style={[styles.scroll, { opacity: props.scrollLoaded ? 1 : 0 }]}>
        <View style={[{ height: scrollHeight, width: scrollWidth }, styles.mainBackground]}>
          <Image style={[{ height: scrollHeight, width: scrollWidth }, styles.mainBackground]} source={require('../../../assets/images/MainBackground.png')} />
        </View>
        {letterArrMap()}
        <View style={{ marginTop: vh(30), zIndex: 20, bottom: 0 }}>
          <BubblesAnimation setBubbles={setBubbles} />
        </View>
      </ScrollView>
    </View>
  );
}


export default observer(LettersScroll) 