import React from 'react'
import './style.css'
import { Hint } from '../../Models/Hint'
import { Position } from '../../Models/Position'
import { Sudoku } from '../../Models/Sudoku'
import { Key } from './Key'
import { UndoKey } from './UndoKey'


interface KeyboardProps {
    selectedPosition: Position
    sudoku: React.MutableRefObject<Sudoku>
    board: number[][]
    setBoard: React.Dispatch<React.SetStateAction<number[][]>>
    hint: Hint
}


export function Keyboard({ selectedPosition, sudoku, setBoard, hint, board }: KeyboardProps) {
    const keys = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    return (
        <div className="Keyboard">
            <UndoKey board={board} sudoku={sudoku} setBoard={setBoard} selectedPosition={selectedPosition} />
            {
                keys.map((value, index) => <Key key={index} selectedPosition={selectedPosition} sudoku={sudoku} setBoard={setBoard} isHint={hint[value]} value={value} />)
            }
        </div>
    )
}
