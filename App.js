import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';

const player1Turn = "Player 1 turn";
const player2Turn = "Player 2 turn";


export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <TicTacToe />
      </View>
    );
  }
}

class TicTacToe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: new Array(9).fill(' '),
      player1Turn: true,
      annouce: player1Turn
    }

     this.markBoard = this.markBoard.bind(this);
  }

  markBoard(index) {
    let validMove = this.state.board[index] == ' ';
    if(validMove) {
      this.setState(prevState => {
        let newBoard = prevState.board;
        newBoard[index] = prevState.player1Turn ? "X" : "O";
        let newAnnouce = prevState.player1Turn ? player1Turn : player2Turn;
        return {
          board: newBoard,
          annouce: newAnnouce,
          player1Turn: !prevState.player1Turn
        };
      })
    }
  }

  checkWinner() {
    //Check each case 1 at time
    //check row
    //check col
    //check diagonal
  }

  render() {
    return (
        <View>
          <Annoucement annouce={this.state.annouce}/>
          <View style={styles.board}>
            {this.state.board.map((square, index) => <Square check={square} key={index} pos={index} press={this.markBoard}/>)}
          </View>
        </View>
    );
  }
}

function Annoucement(props) {
    return (
    <View style={styles.annoucement}>
      <Text>{props.annouce}</Text>
    </View>
  );
}

function Square(props) {
    return (
      <TouchableHighlight style={styles.square} onPress={() => props.press(props.pos)}>
        <View style={styles.container}>
          <Text>{props.check}</Text>
        </View>
      </ TouchableHighlight>
    );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    alignItems:'center',
    justifyContent:'center'
  },

  board : {
    backgroundColor:'#ccc',
    height:300,
    width:300,
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'center'
  },

  square: {
    width: '33%',
    height: '33%',
    borderWidth: StyleSheet.hairlineWidth,
    borderStyle: 'solid',
    backgroundColor:'#0cc',
  },

  annoucement :{
    height: 50,
    backgroundColor:'#ccc',
  }
});
