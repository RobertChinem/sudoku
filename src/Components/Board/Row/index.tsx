import React from 'react'
import { Position } from "../../../Models/Position"
import { Cell } from './Cell'
import './style.css'


interface RowProps {
	board: number[][],
	selectedPosition: Position,
	setSelectedPosition: React.Dispatch<React.SetStateAction<Position>>,
	blockedBoard: boolean[][]
	idxRow: number
}


export function Row({ board, selectedPosition, setSelectedPosition, blockedBoard, idxRow }: RowProps) {
	return (
		<div className="Row">
			{
				Array.from(Array(9).keys()).map((idxCol) => (
					<Cell
						board={board}
						selectedPosition={selectedPosition}
						setSelectedPosition={setSelectedPosition}
						blockedBoard={blockedBoard}
						idxRow={idxRow}
						idxCol={idxCol}
						key={idxCol}
					/>
				))
			}
		</div>
	)
}
