import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  StatusBar,
  ImageBackground,
  Dimensions,
  TextInput,
  Alert
} from 'react-native';

const { width } = Dimensions.get('window');

export default class SecondInningScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      score2: 0,
      wickets: 0,
      wickets2: 0,
      currentScore: 0,
      balls: 0,
      over: 0,
      batter1: '',
      batter2: '',
      nextBatter: '',
      batter1runs: 0,
      batter2runs: 0,
      winMessage: '',
      wicketsLeft: 0,
      runsLeft: 0,
    };
  }

  componentDidMount() {
    const { route } = this.props;
    if (route && route.params) {
      const { score2, wickets2 } = route.params;
      this.setState({ score2: score2 || 0, wickets2: wickets2 || 0 });
    }
  }

  handleBallBowled = () => {
    this.setState(
      (prevState) => ({ balls: prevState.balls + 1 }),
      () => {
        if (this.state.balls >= 6) {
          this.setState((prevState) => ({
            over: prevState.over + 1,
            balls: 0,
          }), this.gameOver); // Ensure gameOver is checked after over increment
        } else {
          this.gameOver();
        }
      }
    );
  };

  winBy = () => {
    const runsLeft = this.state.score2 - this.state.score;
    const wicketsLeft = this.state.wickets2 - this.state.wickets;
    this.setState({ 
      runsLeft: runsLeft,
      wicketsLeft: wicketsLeft
    });
  };

  gameOver = () => {
    if (this.state.score > this.state.score2) {
      if (this.state.wickets2 > this.state.wickets) {
        Alert.alert("Chasing team wins", `by ${this.state.wickets2 - this.state.wickets} wickets`);
      } else {
        Alert.alert("Chasing team wins!");
      }
    } else if ((this.state.wickets === 10 || this.state.over === 20) && this.state.score < this.state.score2) {
      Alert.alert("Game Over", `Team batting first wins by ${this.state.score2 - this.state.score} runs`);
    }
  };

  handleWicket = (batter) => {
    this.setState((prevState) => {
      let newState = { wickets: prevState.wickets + 1, };
      if (batter === 'batter1') {
        newState.batter1 = '';
      } else if (batter === 'batter2') {
        newState.batter2 = '';
      }
      return newState;
    }, this.gameOver);
  };

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.droidSafeArea} />
        <ImageBackground
          source={{ uri: 'https://img.freepik.com/free-vector/purple-fluid-background_53876-99561.jpg' }}
          resizeMode="cover"
          style={StyleSheet.absoluteFillObject}
          imageStyle={styles.backgroundImageInner}
        />

        <View style={styles.displayTextTitle}>
          <Text style={styles.titleText}>SECOND INNING</Text>
        </View>

        <View>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => this.props.navigation.navigate('Home')}>
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.runScoreContainer}>
          {[0, 1, 2, 3, 4, 5, 6].map((score) => (
            <TouchableOpacity
              key={score}
              style={styles.runScore}
              onPress={() => {
                this.setState({
                  currentScore: score,
                  score: this.state.score + score,
                }, this.handleBallBowled);
              }}>
              <Text style={styles.scoreText1}>{score}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={styles.runScore1}
            onPress={() => {
              this.setState({
                currentScore: 1,
                score: this.state.score + 1,
              }, this.handleBallBowled);
            }}>
            <Text style={styles.scoreText1}>Leg Bye</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.runScore1}
            onPress={() => {
              this.setState({
                currentScore: 1,
                score: this.state.score + 1,
              }, this.handleBallBowled);
            }}>
            <Text style={styles.scoreText1}>Bye</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.runScore1}
            onPress={() => {
              this.setState({
                currentScore: 1,
                score: this.state.score + 1,
              }, this.handleBallBowled);
            }}>
            <Text style={styles.scoreText1}>Wide</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.wicketButtonContainer}>
          <TouchableOpacity
            style={styles.wicketButton}
            onPress={() => this.handleWicket('batter2')}>
            <Text style={styles.wicketButtonText}>Wicket Batter 2</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.wicketButtonContainer1}>
          <TouchableOpacity
            style={styles.wicketButton1}
            onPress={() => this.handleWicket('batter1')}>
            <Text style={styles.wicketButtonText1}>Wicket Batter 1</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.batterInputContainer}>
          <TextInput
            style={styles.batterInput}
            placeholder="Enter Batter 1 Name"
            placeholderTextColor="gray"
            value={this.state.batter1}
            onChangeText={(text) => this.setState({ batter1: text })}
          />
          <TextInput
            style={styles.batterInput}
            placeholder="Enter Batter 2 Name"
            placeholderTextColor="gray"
            value={this.state.batter2}
            onChangeText={(text) => this.setState({ batter2: text })}
          />
          <TextInput
            style={styles.batterInput}
            placeholder="Next Batter Name"
            placeholderTextColor="gray"
            value={this.state.nextBatter}
            onChangeText={(text) => this.setState({ nextBatter: text })}
          />
        </View>

        <View style={styles.currentScore}>
          <Text style={styles.currentScoreText}>
            Current Run Scored: {this.state.currentScore}
          </Text>
        </View>

        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>
            Score: {this.state.score}/{this.state.wickets}
          </Text>
        </View>

        <View style={styles.clearButtonContainer}>
          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => {
              this.setState({ score: 0});
            }}>
            <Text style={styles.clearButtonText}>Clear Runs</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.clearButtonContainerWik}>
          <TouchableOpacity
            style={styles.clearButtonWik}
            onPress={() => {
              this.setState({ wickets: 0 });
            }}>
            <Text style={styles.clearButtonTextWik}>Clear Wickets</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.clearButtonContainerRes}>
          <TouchableOpacity
            style={styles.clearButtonRes}
            onPress={() => {
              this.setState({
                score: 0, wickets: 0, currentScore: 0, balls: 0, over: 0, wickets2: 0, score2: 0,
                batter1: '',
                batter2: '',
                nextBatter: '',
              });
            }}>
            <Text style={styles.clearButtonTextRes}>Reset All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.currentScore1}>
          <Text style={styles.currentScoreText1}>
            Balls in current Over: {this.state.balls}
          </Text>
        </View>

        <View style={styles.currentScore2}>
          <Text style={styles.currentScoreText2}>
            Overs: {this.state.over}
          </Text>
        </View>

        <View style={styles.prevScoreContainer}>
          <Text style={styles.prevScore}>Previous Score: {this.state.score2} / {this.state.wickets2}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Platform.select({
      ios: {
        height: '100%',
      },
      android: {
        backgroundColor: '#B6D5EB',
      },
    }),
  },
  droidSafeArea: {
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  displayTextTitle: {
    flex: 0.15,
    position: 'absolute',
    borderRadius: 20,
    backgroundColor: '#87B0D0',
    left: '50%',
    transform: [{ translateX: -95 }],
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    height: 60,
    width: 200,
    left: 190
  },
  titleText: {
    fontSize: 25,
    fontFamily: 'Apple Chancery, cursive',
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    width: 50,
    height: 30,
    backgroundColor: '#634096',
  },
  backButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  runScoreContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    position: 'absolute',
    top: '20%',
    left: '4%',
  },
  runScore: {
    textAlign: 'center',
    width: 50,
    borderRadius: 20,
    backgroundColor: 'grey',
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  runScore1: {
    textAlign: 'center',
    width: 100,
    borderRadius: 20,
    backgroundColor: 'grey',
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  scoreText1: {
    fontSize: 20,
    color: 'white',
  },
  wicketButtonContainer: {
    position: 'absolute',
    top: '26.4%',
    left: '65%',
  },
  wicketButton: {
    backgroundColor: 'red',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: 120,
    height: 40,
    top: 90,
  },
  wicketButtonText: {
    color: 'white',
    fontSize: 12,
  },
  wicketButtonContainer1: {
    position: 'absolute',
    top: '-10%',
    left: '33%',
  },
  wicketButton1: {
    backgroundColor: 'red',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: 120,
    height: 40,
    top: 400,
  },
  wicketButtonText1: {
    color: 'white',
    fontSize: 12,
  },
  batterInputContainer: {
    position: 'absolute',
    top: '45%',
    left: '1%',
    right: '10%',
  },
  batterInput: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 8,
    marginVertical: 10,
    fontSize: 16,
    width: 200
  },
  currentScore: {
    position: 'absolute',
    bottom: 250,
    left: 1,
    width: 200,
    backgroundColor: '#00d4f0',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  currentScoreText: {
    fontSize: 18,
    color: 'white',
  },
  scoreContainer: {
    position: 'absolute',
    bottom: 100,
    left: 90,
    width: 220,
    borderRadius: 200,
    backgroundColor: '#6692ea',
  },
  scoreText: {
    fontSize: 30,
    textAlign: 'center',
  },
  clearButtonContainer: {
    position: 'absolute',
    bottom: 60,
    left: 20,
  },
  clearButton: {
    borderRadius: 7,
    width: 105,
    backgroundColor: 'red',
  },
  clearButtonText: {
    left: 5,
    color: 'white',
    fontSize: 18,
  },
  clearButtonContainerWik: {
    position: 'absolute',
    bottom: 60,
    left: 140,
  },
  clearButtonWik: {
    borderRadius: 7,
    width: 125,
    backgroundColor: 'red',
  },
  clearButtonTextWik: {
    left: 5,
    color: 'white',
    fontSize: 18,
  },
  clearButtonContainerRes: {
    position: 'absolute',
    bottom: 60,
    left: 280,
  },
  clearButtonRes: {
    borderRadius: 7,
    width: 100,
    backgroundColor: 'red',
  },
  clearButtonTextRes: {
    left: 10,
    color: 'white',
    fontSize: 18,
  },
  currentScore1: {
    position: 'absolute',
    bottom: 220,
    left: 1,
    width: 200,
    backgroundColor: '#00d4f0',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  currentScoreText1: {
    fontSize: 18,
    color: 'white',
  },
  currentScore2: {
    position: 'absolute',
    bottom: 190,
    left: 1,
    width: 200,
    backgroundColor: '#00d4f0',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  currentScoreText2: {
    fontSize: 18,
    color: 'white',
  },
  prevScoreContainer: {
    width: 250,
    backgroundColor: 'teal',
    borderRadius: 10,
    top: 630,
  },
  prevScore: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
  }
});
