import React from 'react'
import { Position } from '../../../../Models/Position'
import './style.css'


interface CellProps {
	board: number[][],
	selectedPosition: Position,
	setSelectedPosition: React.Dispatch<React.SetStateAction<Position>>,
	blockedBoard: boolean[][]
	idxRow: number
	idxCol: number
}


export function Cell({ board, selectedPosition, setSelectedPosition, blockedBoard, idxRow, idxCol }: CellProps) {
	const { row, col } = selectedPosition
	const selected = row === idxRow && col === idxCol
	const blocked = blockedBoard[idxRow][idxCol]
	const content = board[idxRow][idxCol]
	const empty = content === -1

	function handleClick() {
		if(blocked) return
		setSelectedPosition((curr) => {
			if (curr.row === idxRow && curr.col === idxCol) return { row: -1, col: -1 }
			else return { row: idxRow, col: idxCol }
		})
	}

	return (
		<div className="Cell" onClick={handleClick}>
			<div 
				className={'Content' + (blocked ? ' bg-gray' : '') + (selected ? ' selected' : '') + ( empty ? ' empty': '') + (blocked ? ' blocked': '')}>
				{ content }
			</div>
		</div>
	)
}
