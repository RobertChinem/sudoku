![badge](https://img.shields.io/badge/RobertChinem-Sudoku-blue)

# Sudoku
[Live Demo](https://robertchinem.github.io/sudoku/)

Sudoku is a logic-based, combinatorial-number placement puzzle. The objective is to fill a 9x9 grid with digits so that each column, each row, and each of the nine 3×3 subgrids that compose the grid (also called "boxes", "blocks", or "regions") contain all of the digits from 1 to 9. [wikipedia](https://en.wikipedia.org/wiki/Sudoku)

## Features
- Options for the fill of the board's initial state.
- Solver for all valid states.

## Competitive programming

Sudoku can be modeled as a constraint satisfaction problem and code a sudoku solver is a typical competitive programming question. 

One of the most popular ways to solve this kind of problem is to use the backtracking approach.

### Backtracking
Backtracking is a general algorithm for finding solutions to some computational problems, notably constraint satisfaction problems, that incrementally builds candidates to the solutions, and abandons a candidate ("backtracks") as soon as it determines that the candidate cannot possibly be completed to a valid solution. [wikipedia](https://en.wikipedia.org/wiki/https://en.wikipedia.org/wiki/Backtracking)

### Implementation
There are two main concepts that need to be clear:
1. Constraints for insertion of number: each column, each row, and each of the nine 3×3 subgrids that compose the grid (also called "boxes", "blocks", or "regions") contain all of the digits from 1 to 9
2. Backtracking concepts.

#### Basic code idea
[Click here to see my implementation](https://github.com/RobertChinem/sudoku/blob/main/src/Models/Sudoku.ts)

```typescript
const UNDEFINED = -1


function canInsert(row: number, col: number, num: number, board: number[][]): boolean{
    function canInsertRow(): boolean {
        for(let j=0; j < 9; j++){
            if(board[row][j] === num) return false
        }
        return true
    }

    function canInsertCol(): boolean {
        for(let i=0; i < 9; i++){
            if(board[i][col] === num) return false
        }
        return true
    }

    function canInsertSquare(): boolean {
        let [startRow, startCol] = [Math.floor(row/3), Math.floor(col/3)]
        for(let i=startRow; i < startRow+3; i++){
            for(let j=startCol; j < startCol+3; j++){
                if(board[i][j] === num) return false
            }
        }
        return true
    }

    return [canInsertRow, canInsertCol, canInsertSquare].every(fn => fn())
}


function sudokuSolver(i: number, j: number, board: number[][]): boolean{
    if(i >= 9) return true
    if(j >= 9) return sudokuSolver(i+1, 0)
    if(board[i][j] != UNDEFINED) return sudokuSolver(i, j+1)
    
    for(let x=1; x <= 9; x++){
        if(canInsert(i, j, x, board)){
            board[i][j] = x
            if(sudokuSolver(i, j+1, board)) return true
            board[i][j] = UNDEFINED
        }
    }

    return false
}
```

