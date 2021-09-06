import React from 'react'
import { Position } from '../../Models/Position'
import { Row } from './Row'
import './style.css'


interface BoardProps {
    board: number[][],
    selectedPosition: Position,
    setSelectedPosition: React.Dispatch<React.SetStateAction<Position>>,
    blockedBoard: boolean[][]
}


export function Board({ board, blockedBoard, selectedPosition, setSelectedPosition }: BoardProps) {
    return (
        <div className="Board">
            {
                Array.from(Array(9).keys()).map((idxRow) => (
                    <Row
                        board={board}
                        blockedBoard={blockedBoard}
                        selectedPosition={selectedPosition}
                        setSelectedPosition={setSelectedPosition}
                        idxRow={idxRow}
                        key={idxRow}
                    />
                ))
            }
        </div>
    )
}