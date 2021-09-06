import React from "react"
import { Position } from "../../../Models/Position"
import { Sudoku } from "../../../Models/Sudoku"
import './style.css'


interface UndoKeyProps {
    sudoku: React.MutableRefObject<Sudoku>
    board: number[][]
    setBoard: React.Dispatch<React.SetStateAction<number[][]>>
    selectedPosition: Position
}


export function UndoKey({ sudoku, board, setBoard, selectedPosition }: UndoKeyProps) {
    const { row, col } = selectedPosition
    const disabled = (row === -1 && col === -1 )|| (board[row][col] === -1)

    function handleClick() {
        if(disabled) return
        sudoku.current.resetPosition(row, col)
        setBoard(sudoku.current.getBoard())
    }

    return (
        <div onClick={handleClick} className={'Key' + ( disabled ? ' disabled' : '' )}>
            <div className="content">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z" />
                    <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z" />
                </svg>
            </div>
        </div>
    )
}