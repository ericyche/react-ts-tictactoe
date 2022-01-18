import * as React from 'react';
import { Value, BoardState, useGameState } from './GameState';
import './Game.css';

function Header() {
    return (
        <h1 className="header">Tic Tac Toe</h1>
    );
}

function Game() {
    const {
        gameState,
        current,
        xIsNext,
        jumpTo,
        winner,
        stepNumber,
        handleClick,
    } = useGameState();

    let status;
    let resultClassName = 'result';
    if (stepNumber == 9 && !winner) {
        status = 'Result: Tie';
        resultClassName += ' resultTie';
    } else if (winner) {
        status = 'Winner: ' + winner;
        if (winner =='X') {
            resultClassName += ' resultXWin';
        } else {
            resultClassName += ' resultOWin';
        }
    } else {
        status = "Next player: " + (xIsNext ? "X" : "O");
    }

    return (
        <div className="game">
            <Header />
            <Board board={current} onClick={handleClick} xIsNext={xIsNext} />
            <div className={resultClassName}><h2>{status}</h2></div>
            <Log history={gameState.history} board={current} winner={winner} jumpTo={jumpTo} />
        </div>
    );
}

type BoardProps = {
    board: BoardState,
    onClick: (square: number) => void,
    xIsNext: Boolean,
}

function Board({board, onClick, xIsNext}: BoardProps) {

    const getSquareProps = (square: number): SquareProps => {
        return {
            value: board[square],
            xIsNext: xIsNext,
            onClick: () => onClick(square),
        };
    }

    return (
        <div>
            <div className="board-row">
                <Square {...getSquareProps(0)} />
                <Square {...getSquareProps(1)} />
                <Square {...getSquareProps(2)} />
            </div>
            <div className="board-row">
                <Square {...getSquareProps(3)} />
                <Square {...getSquareProps(4)} />
                <Square {...getSquareProps(5)} />
            </div>
            <div className="board-row">
                <Square {...getSquareProps(6)} />
                <Square {...getSquareProps(7)} />
                <Square {...getSquareProps(8)} />
            </div>
        </div>
    );
}

type LogProps = {
    history: BoardState[],
    board: BoardState,
    winner: Value,
    jumpTo: (step: number) => void,
}

function Log({history, board, winner, jumpTo}: LogProps) {
    return (
        <div>
            {history.map((_, index) => {
                    let className = 'pastSteps';
                    if (winner) {
                        if (winner == 'X') {
                            className += ' pastStepsX'
                        } else {
                            className += ' pastStepsO'
                        }
                    } else if (index > 0) {
                        className += index % 2 == 0 ? " pastStepsO" : " pastStepsX";
                    }
                return (
                    <div>
                        <button className={className} onClick={() => jumpTo(index)}>
                            Go to {index === 0 ? 'Start' : `Move #${index}`}
                        </button> <br></br>
                    </div>
                );
            })}
        </div>
    );
}

type SquareProps = {
    value: Value,
    xIsNext: Boolean,
    onClick: () => void,
}

function Square({value, xIsNext, onClick}: SquareProps) {
    let className = 'square';
    if (value === 'X') {
        className = 'square xChar';
    } else if (value === 'O') {
        className = 'square oChar';
    } else if (xIsNext) {
        className = 'square oTurn';
    } else {
        className = 'square xTurn';
    }

    return <button className={className} onClick={onClick}>{value}</button>
} 

export default Game;