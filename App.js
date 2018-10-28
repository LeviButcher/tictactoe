import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Button } from 'react-native';

const player1Turn = "Player 1 turn";
const player2Turn = "Player 2 turn";

export default class App extends React.Component {
  render() {
    return (
      <View style={[styles.container, styles.screen]}>
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
      annouce: player1Turn,
      freeze: false
    };
    this.markBoard = this.markBoard.bind(this);
    this.resetGame = this.resetGame.bind(this);
  }

  markBoard(index) {
    let validMove = this.state.board[index] == ' ';
    if(validMove) {
      this.setState(prevState => {
        let newBoard = prevState.board;
        newBoard[index] = prevState.player1Turn ? "X" : "O";
        return {
          board: newBoard,
          player1Turn: !prevState.player1Turn
        };
      });
    }
  }

  checkWinner() {
    let board = this.state.board;
    if(board.reduce((acc, curr) => {return acc + curr}).trim().length <= 2) return;

    const possibleValues = ["X","O"];
    let winnerValue;

    possibleValues.forEach(value => {
       if(checkRows(board, value)) winnerValue = value;
       if(checkCols(board, value)) winnerValue = value;
       if(checkDiag(board, value)) winnerValue = value;
    });

    if(winnerValue === possibleValues[0]) {
      this.setState({freeze: true});
      return possibleValues[0];
    }
    else if(winnerValue === possibleValues[1]) {
      this.setState({freeze: true});
      return possibleValues[1];
    }
    //Cat check
    else if(board.every(value => value == "X" || value == "O")) {
      this.setState({freeze: true});
      return "cat";
    }
  }

  setAnnoucement(winner) {
    let newAnnouce = "";
    if(winner == 'X') {
      newAnnouce = "Player 1 has won";
    }
    else if(winner == 'O') {
      newAnnouce = "Player 2 has won";
    }
    else if(winner == 'cat') {
      newAnnouce = "The game is a tie";
    }
    else {
      newAnnouce = this.state.player1Turn ? player1Turn : player2Turn;
    }

    this.setState({
      annouce: newAnnouce
    });
  }

  componentDidUpdate(prevProps, prevState) {
    //Necessary to make sure state has updated before checking winner
    if(prevState.player1Turn != this.state.player1Turn) {
      this.setAnnoucement(this.checkWinner());
    }
  }

  resetGame() {
    this.setState({
      board: new Array(9).fill(' '),
      player1Turn: true,
      annouce: player1Turn,
      freeze: false
    });
  }

  render() {
    return (
        <View>
          <Annoucement annouce={this.state.annouce}/>
          <View style={styles.board}>
            {this.state.board.map((square, index) => <Square check={square} key={index} pos={index} press={!this.state.freeze && this.markBoard}/>)}
          </View>
          <Button onPress={this.resetGame} title="Reset" color='#444'/>
        </View>
    );
  }
}

function checkRows(board, value) {
  for(let i = 0; i < board.length; i = i + 3){
    if(value === board[i] && value === board[i + 1] && value === board[i + 2]) {
      return true;
    }
  }
  return false;
}

function checkCols(board, value) {
  for(let i = 0; i < board.length / 3; i++) {
    if(value === board[i] && value === board[i + 3] && value === board[i + 6]) {
      return true;
    }
  }
  return false;
}

function checkDiag(board, value) {
  if(value === board[0] && value === board[4] && value === board[8]) {
    return true;
  }
  else if(value === board[2] && value === board[4] && value === board[6]) {
    return true;
  }
  return false;
}


function Annoucement(props) {
    return (
    <View style={styles.annoucement}>
      <Text style={styles.annoucementText}>{props.annouce}</Text>
    </View>
  );
}

function Square(props) {
    return (
      <TouchableHighlight style={styles.square} onPress={() => props.press && props.press(props.pos)}>
        <View style={styles.container}>
          <Text style={styles.mark}>{props.check}</Text>
        </View>
      </ TouchableHighlight>
    );
}

const styles = StyleSheet.create({
  screen: {
  },

  container: {
    display: 'flex',
    flex: 1,
    alignItems:'center',
    justifyContent:'center'
  },

  board : {
    backgroundColor:'#444',
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
    backgroundColor:'#444',
  },

  mark: {
    fontSize: 50,
    color: '#ccc'
  },

  annoucement :{
    height: 50,
    backgroundColor:'#222',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },

  annoucementText: {
    fontSize: 30,
    textAlign: 'center',
    color:'#fff'
  }
});
