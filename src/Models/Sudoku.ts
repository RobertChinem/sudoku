type LogicalBoard = {
    rows: boolean[][]
    cols: boolean[][]
    squares: boolean[][],
    blocked: boolean[][]
}

export class Sudoku {
    private UNDEFINED = -1
    private N = 9
    private board: number[][] = []
    public logicalBoard: LogicalBoard = {
        rows: [],
        cols: [],
        squares: [],
        blocked: []
    }

    constructor(private fill: number) {
        this.initBoard()
    }

    private initBoard(): void {
        this.board = this.buildMatrix(this.N, this.N, this.UNDEFINED)
        this.logicalBoard.rows = this.buildMatrix(this.N, this.N + 1, false)
        this.logicalBoard.cols = this.buildMatrix(this.N, this.N + 1, false)
        this.logicalBoard.squares = this.buildMatrix(this.N, this.N + 1, false)
        this.logicalBoard.blocked = this.buildMatrix(this.N, this.N + 1, false)
        this.fillBoard()
    }

    public solveBoard(): boolean {
        const solve = (i: number, j: number): boolean => {
            if (i >= this.N) return true
            if (j >= this.N) return solve(i + 1, 0)
            if (this.board[i][j] !== this.UNDEFINED) return solve(i, j + 1)

            for (let x of this.shuffle(Array.from({ length: this.N }, (_, i) => i + 1))) {
                if (this.setPosition(i, j, x)) {
                    if (solve(i, j + 1)) return true
                    else this.resetPosition(i, j)
                }
            }
            return false
        }
        return solve(0, 0)
    }

    private fillBoard(): void {
        this.solveBoard()
        let numOfCells = Math.ceil(this.N * this.N * (1 - this.fill))
        let positions = Array.from(Array(this.N * this.N).keys())

        for (let i = 0; i < this.N; i++) positions = this.shuffle(positions)

        for (let i = 0; i < numOfCells; i++) {
            const row = Math.floor(positions[i] / this.N)
            const col = positions[i] % this.N
            const value = this.board[row][col]
            const idSquare = this.getIdSquare(row, col)

            this.board[row][col] = this.UNDEFINED
            this.logicalBoard.rows[row][value] = false
            this.logicalBoard.cols[col][value] = false
            this.logicalBoard.squares[idSquare][value] = false
        }

        for (let i = 0; i < this.N; i++) {
            for (let j = 0; j < this.N; j++) {
                if (this.board[i][j] !== this.UNDEFINED) {
                    this.logicalBoard.blocked[i][j] = true;
                }
            }
        }
    }

    public getBoard(): number[][] {
        return JSON.parse(JSON.stringify(this.board))
    }

    public setPosition(row: number, col: number, value: number): boolean {
        const idSquare = this.getIdSquare(row, col)

        if (this.board[row][col] !== this.UNDEFINED) return false
        if (this.logicalBoard.rows[row][value]) return false
        if (this.logicalBoard.cols[col][value]) return false
        if (this.logicalBoard.squares[idSquare][value]) return false
        if (this.logicalBoard.blocked[row][col]) return false

        this.board[row][col] = value
        this.logicalBoard.rows[row][value] = true
        this.logicalBoard.cols[col][value] = true
        this.logicalBoard.squares[idSquare][value] = true

        return true
    }

    public resetPosition(row: number, col: number) {
        const idSquare = this.getIdSquare(row, col)

        if (this.logicalBoard.blocked[row][col]) return
        if (this.board[row][col] === this.UNDEFINED) return

        const value = this.board[row][col]
        this.board[row][col] = this.UNDEFINED
        this.logicalBoard.rows[row][value] = false
        this.logicalBoard.cols[col][value] = false
        this.logicalBoard.squares[idSquare][value] = false
    }

    public checkSudoku(): boolean {
        const rows = this.buildMatrix(this.N, this.N + 1, false)
        const cols = this.buildMatrix(this.N, this.N + 1, false)
        const squares = this.buildMatrix(this.N, this.N + 1, false)

        for (let i = 0; i < this.N; i++) {
            for (let j = 0; j < this.N; j++) {
                const value = this.board[i][j]
                const idSquare = this.getIdSquare(i, j)

                if (this.board[i][j] === this.UNDEFINED) return false
                if (rows[i][value]) return false
                if (cols[j][value]) return false
                if (squares[idSquare][value]) return false

                rows[i][value] = true
                cols[j][value] = true
                squares[idSquare][value] = true
            }
        }

        return true
    }

    public getHint(row: number, col: number): boolean[] {
        const nums: boolean[] = [false]
        const idSquare = this.getIdSquare(row, col)

        for (let x = 1; x <= this.N; x++) {
            nums.push(false)
            if (this.logicalBoard.blocked[row][col]) continue
            if (this.logicalBoard.cols[col][x]) continue
            if (this.logicalBoard.rows[row][x]) continue
            if (this.logicalBoard.squares[idSquare][x]) continue
            nums[x] = true
        }

        return nums
    }

    private getIdSquare(row: number, col: number): number {
        return Math.floor(col / 3) + Math.floor(row / 3) * 3
    }

    private shuffle(array: number[]): number[] {
        let currentIndex = array.length
        while (currentIndex !== 0) {
            const randomIndex = Math.floor(Math.random() * currentIndex)
            currentIndex--
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
        }
        return array
    }

    private buildMatrix<T>(n: number, m: number, value: T): T[][] {
        const matrix: T[][] = []
        for (let i = 0; i < n; i++) {
            matrix.push(Array(m).fill(value))
        }
        return matrix
    }
}