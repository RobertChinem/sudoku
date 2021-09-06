import React from 'react'
import { Position } from '../../../Models/Position'
import { Sudoku } from '../../../Models/Sudoku'
import './style.css'


interface KeyProps {
    sudoku: React.MutableRefObject<Sudoku>
    setBoard: React.Dispatch<React.SetStateAction<number[][]>>
    value: number,
    isHint: boolean
    selectedPosition: Position
}


export function Key({ sudoku, setBoard, value, isHint, selectedPosition }: KeyProps) {
    const { row, col } = selectedPosition
    
    function handleClick(){
        if(sudoku.current.setPosition(row, col, value)){
            setBoard(sudoku.current.getBoard())
        }
    }

    return (
        <div onClick={handleClick} className={'Key' + ( !isHint ? ' disabled' : '' )}>
            <div className="content">
                { value }
            </div>
        </div>
    )
}