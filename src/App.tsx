import React from 'react'
import './App.css'
import { Board } from './Components/Board'
import { Keyboard } from './Components/Keyboard'
import { Modal, ModalState } from './Components/Modal'
import { Hint } from './Models/Hint'
import { Position } from './Models/Position'
import { Sudoku } from './Models/Sudoku'


function App() {
	const [fill, setFill] = React.useState(0.5)
	const sudoku = React.useRef(new Sudoku(fill))
	const [board, setBoard] = React.useState(sudoku.current.getBoard())
	const [selectedPosition, setSelectedPosition] = React.useState<Position>({ row: -1, col: -1 })
	const [hint, setHint] = React.useState<Hint>([])
	const [modalState, setModalState] = React.useState<ModalState>({ title: '', message: '', modal: false })
	

	function solveSudoku() {
		if(sudoku.current.solveBoard()){
			setBoard(sudoku.current.getBoard())
		}
		else{
			setModalState({
				title: 'Erro',
				message: 'Não existe solução para o estado atual',
				modal: true	
			})
		}
	}

	function handleInputRange(event: React.SyntheticEvent<HTMLInputElement>) {
		const value = Number((event.nativeEvent.target as HTMLInputElement).value)
		setFill(value)
	}

	React.useEffect(() => {
		sudoku.current = new Sudoku(fill)
		setBoard(sudoku.current.getBoard())
	}, [fill])

	React.useEffect(() => {
		const { row, col } = selectedPosition
		if (row === -1 && col === -1) setHint([])
		else setHint(sudoku.current.getHint(row, col))
	}, [selectedPosition])

	React.useEffect(() => {
		if(sudoku.current.checkSudoku()){
			setModalState({ 
				title: 'Parabéns',
				message: `Parabéns você concluiu o sudoku com ${fill*100}% de preenchimento`,
				modal: true	
			})
		}
	}, [board, fill])


	return (
		<div>
			<div className="bg-top"></div>
			<div className="bg-bottom"></div>
			<Modal setModalState={setModalState} status={modalState} />
			<div className="App">
				<h1>Sudoku</h1>
				<h3>Preenchimento { fill*100 }% </h3>
				<div className="m-auto">
					<button onClick={solveSudoku}>Obter solução</button>
				</div>
				<div className="m-auto">
					<input value={fill} min="0" max="1" step="0.1" type="range" onChange={handleInputRange} />
				</div>
				<div className="m-auto">
					<Board
						board={board}
						blockedBoard={sudoku.current.logicalBoard.blocked}
						selectedPosition={selectedPosition}
						setSelectedPosition={setSelectedPosition}
					/>
				</div>
				<Keyboard board={board} selectedPosition={selectedPosition} sudoku={sudoku} setBoard={setBoard} hint={hint} />
			</div>
		</div>
	)
}

export default App
