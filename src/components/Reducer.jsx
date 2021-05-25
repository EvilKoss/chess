const MOVE = 'MOVE';

const CHOISE = 'CHOISE';

const QUEEN = 'QUEEN';

const KING = 'KING';

const ENPASSANT = 'ENPASSANT';

let noneSquare = 0;
let whitePawn = 1;
let whiteRook = 2;
let whiteHorse = 3;
let whiteElephant = 4;
let whiteQueen = 5;
let whiteKing = 6;
let blackPawn = 7;
let blackRook = 8;
let blackHorse = 9;
let blackElephant = 10;
let blackQueen = 11;
let blackKing = 12;
let whiteSquare = 0;
let blackSquare = 1;
let yellowSquare = 2;
let redSquare = 3;

const initialState = {
	whoMoves:1,
	oldY:-1,
	oldX:-1,
	piece:-1,
	pawnToQueen:false,
	enPassant:{move:0,y:-1,x:-1},
	whiteKing:{kingCheck:false,check:false,lefRook:0,rightRook:0,move:0},
	blackKing:{kingCheck:false,check:false,lefRook:0,rightRook:0,move:0},
	board:[
		[0,1,0,1,0,1,0,1],
		[1,0,1,0,1,0,1,0],
		[0,1,0,1,0,1,0,1],
		[1,0,1,0,1,0,1,0],
		[0,1,0,1,0,1,0,1],
		[1,0,1,0,1,0,1,0],
		[0,1,0,1,0,1,0,1],
		[1,0,1,0,1,0,1,0]
	],
	boardOld:[
		[0,1,0,1,0,1,0,1],
		[1,0,1,0,1,0,1,0],
		[0,1,0,1,0,1,0,1],
		[1,0,1,0,1,0,1,0],
		[0,1,0,1,0,1,0,1],
		[1,0,1,0,1,0,1,0],
		[0,1,0,1,0,1,0,1],
		[1,0,1,0,1,0,1,0]
	],
	table:[
		[8,9,10,12,11,10,9,8],
		[7,7,7,7,7,7,7,7],
		[0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0],
		[1,1,1,1,1,1,1,1],
		[2,3,4,6,5,4,3,2]
	]
}


const Reducer = (state = initialState,action) => {
	let newTable = [...state.table];
	let newBoard = [...state.board];
	let newEnPassant = {...state.enPassant};
	let newPawnToQueen = false;

//------------------------------------------------------------------------------
	const emptyBoard = (y,x) => {
		return insideBoard(y,x) && newTable[y][x] == 0;
	}

	const insideBoard = (y,x) => {
		if(y < 8 && y > -1 && x < 8 && x > -1){
			return true;
		}
	}
//------------------------------------------------------------------------------
	const enemy = (y,x) => {
		if(insideBoard(y,x) && newTable[y][x] <= 12 && newTable[y][x] >= 7 && state.whoMoves % 2 == 1){return true;}
		else if(insideBoard(y,x) && newTable[y][x] > 0 && newTable[y][x] <= 6 && state.whoMoves % 2 == 0){return true;}
		else {return false;}

	}
//------------------------------------------------------------------------------
	switch(action.type){
		case ENPASSANT:
		{
			let newWhoMoves = state.whoMoves+1;
			let y = action.y;
			let x = action.x;
			let oldX = state.oldX;
			let yF = state.whoMoves % 2 == 0 ? 4 : 3;
			newTable[yF][x] = 0;
			newTable[yF][oldX] = 0;
			newTable[y][x] = state.whoMoves % 2 == 0 ? 7 : 1;
			newBoard = JSON.parse(JSON.stringify(state.boardOld));
			return {...state,board:newBoard,whoMoves:newWhoMoves,table:newTable};
		}
//------------------------------------------------------------------------------
		case MOVE:
		{
			let newWhiteKing = state.whiteKing;
			let newBlackKing = state.blackKing;

			let newWhoMoves = state.whoMoves+1;
			let piece = state.piece;
			let oldY = state.oldY;
			let oldX = state.oldX;
			let newY = action.y;
			let newX = action.x;
			newTable[oldY][oldX] = 0;
			let endY = state.whoMoves % 2 == 0 ? 7 : 0;
			if(piece == whiteKing){
				newWhiteKing.move ++;
			}
			if(piece == whiteRook){
				if(oldX == 0){
					newWhiteKing.lefRook ++;
				}
				else if(oldX == 7){
					newWhiteKing.rightRook ++;
				}
			}
			if(piece == blackRook){
				if(oldX == 0){
					newBlackKing.lefRook ++;
				}
				else if(oldX == 7){
					newBlackKing.rightRook ++;
				}
			}
			if(piece == blackKing){
				newBlackKing.move ++;
			}
			if(newY == endY && (piece == whitePawn || piece == blackPawn)){
				newPawnToQueen = true;
			}
			newTable[newY][newX] = piece;
			newBoard = JSON.parse(JSON.stringify(state.boardOld));
			return {...state,board:newBoard,table:newTable,whoMoves:newWhoMoves,
				pawnToQueen:newPawnToQueen,whiteKing:newWhiteKing,blackKing:newBlackKing};
		}
//------------------------------------------------------------------------------
		case QUEEN:
		{
			let y = state.whoMoves % 2 == 0 ? 0 : 7;
			let x = state.oldX;
			let piece = action.piece;
			newPawnToQueen = false;
			newTable[y][x] = piece;
			newBoard = JSON.parse(JSON.stringify(state.boardOld));
			return {...state,board:newBoard,table:newTable,pawnToQueen:newPawnToQueen};
		}

//------------------------------------------------------------------------------
		case KING:
		{
			let y = state.whoMoves % 2 == 0 ? 0 : 7;
			let king = state.whoMoves % 2 == 0 ? 12 : 6;
			let rook = state.whoMoves % 2 == 0 ? 8 : 2;
			let x = action.x;
			let newWhoMoves = state.whoMoves +1;
			let newWhiteKing = state.whiteKing;
			let newBlackKing = state.blackKing;
			if(state.whoMoves % 2 == 0){
				newBlackKing.check = false;
				newBlackKing.move ++;
			}
			else if(state.whoMoves % 2 == 1){
				newWhiteKing.check = false;
				newWhiteKing.move ++;
			}
			if(x == 5){
				newTable[y][x] = king;
				newTable[y][x-1] = rook;
				newTable[y][7] = 0;
				newTable[y][3] = 0;
			}
			else if(x == 1){
				newTable[y][x] = king;
				newTable[y][x+1] = rook;
				newTable[y][0] = 0;
				newTable[y][3] = 0;
			}
			newBoard = JSON.parse(JSON.stringify(state.boardOld));
			return {...state,board:newBoard,table:newTable,whoMoves:newWhoMoves,whiteKing:newWhiteKing};
		}

//------------------------------------------------------------------------------
		case CHOISE:
		{
			newBoard = JSON.parse(JSON.stringify(state.boardOld));
			let newPiece = -1;
			let newOldY = action.y;
			let newOldX = action.x;
//------------------------------------------------------------------------------
		const checkChoise = (y,x,bool) => {

			const checkSquare = (y1,x1) => {
				let oldY = y;
				let oldX = x;
				while(emptyBoard(oldY+y1,oldX+x1)){
					oldY += y1;
					oldX += x1;
					if(!bool){
						newBoard[oldY][oldX] = yellowSquare;
					}else{
						if(newTable[oldY][oldX] == whiteKing || newTable[oldY][oldX] == blackKing){
							alert('2');
						}
					}
				}
				if(enemy(oldY+y1,oldX+x1)){
					if(!bool){
						newBoard[oldY+y1][oldX+x1] = redSquare;
					}else{
						if(newTable[oldY+y1][oldX+x1] == whiteKing || newTable[oldY+y1][oldX+x1] == blackKing){
							let new1 = newTable[oldY][oldX];
							alert(new1);
						}
					}
				}
			}
//------------------------------------------------------------------------------
			if(newTable[y][x] == whitePawn || newTable[y][x] == blackPawn){
				let newY = y + (newTable[y][x] == 1 ? -1 : +1);
				let enPasY = newTable[y][x] == 1 ? 3 : 4;
				if(newEnPassant.move == state.whoMoves-1 && y == enPasY && !bool){
					if(newEnPassant.x == x+1 || newEnPassant.x == x-1){
						newBoard[newEnPassant.y][newEnPassant.x] = redSquare;
					}
				}
				if(enemy(newY,x-1)){
					if(!bool){
						newBoard[newY][x-1] = redSquare;
					}else{
						if(newTable[newY][x-1] == whiteKing || newTable[newY][x-1] == blackKing){
							alert('DADADA');
						}
					}
				}
				if(enemy(newY,x+1)){
					if(!bool){
						newBoard[newY][x+1] = redSquare;
					}else{
						if(newTable[newY][x+1] == whiteKing || newTable[newY][x+1] == blackKing){
							alert('net');
						}
					}
				}
				if(newTable[newY][x] == 0 && !bool){
					newBoard[newY][x] = yellowSquare;
					if(y == 6 && newTable[4][x] == 0 && newTable[y][x] == whitePawn){
						newBoard[4][x] = yellowSquare;
						newEnPassant.x = x;
						newEnPassant.y = 5;
						newEnPassant.move = state.whoMoves;
					}
					else if(y == 1 && newTable[3][x] == 0 && newTable[y][x] == blackPawn){
						newBoard[3][x] = yellowSquare;
						newEnPassant.x = x;
						newEnPassant.y = 2;
						newEnPassant.move = state.whoMoves;
					}
				}
				if(!bool){
					newPiece = newTable[y][x];
				}
			}
//------------------------------------------------------------------------------
			else if(newTable[y][x] == whiteRook || newTable[y][x] == blackRook){
				checkSquare(-1,0);
				checkSquare(+1,0);
				checkSquare(0,-1);
				checkSquare(0,+1);
				if(!bool){
					newPiece = newTable[y][x] ;
				}
			}

//------------------------------------------------------------------------------
			else if(newTable[y][x] == whiteHorse || newTable[y][x] == blackHorse){
				const checkKnight = (y1,x1) => {
					let yyy = y+y1;
					let xxx = x+x1;
					if(emptyBoard(yyy,xxx)){
						if(!bool){
							newBoard[yyy][xxx] = yellowSquare;
						}else{
							if(newTable[yyy][xxx] == whiteKing || newTable[yyy][xxx] == blackKing){
								alert('net');
							}
						}
					}
					else if(enemy(yyy,xxx)){
						if(!bool){
							newBoard[yyy][xxx] = redSquare;
						}else{
							if(newTable[yyy][xxx] == whiteKing || newTable[yyy][xxx] == blackKing){
								alert('net');
							}
						}
					}
				}

				checkKnight(-2,-1);
				checkKnight(-2,+1);
				checkKnight(+2,-1);
				checkKnight(+2,+1);
				checkKnight(-1,-2);
				checkKnight(+1,-2);
				checkKnight(-1,+2);
				checkKnight(+1,+2);
				if(!bool){
					newPiece = newTable[y][x];
				}
			}

//------------------------------------------------------------------------------
			else if(newTable[y][x] == whiteElephant || newTable[y][x] == blackElephant){
				checkSquare(-1,-1);
				checkSquare(+1,+1);
				checkSquare(-1,+1);
				checkSquare(+1,-1);
				if(!bool){
					newPiece = newTable[y][x];
				}

			}
//------------------------------------------------------------------------------
			else if(newTable[y][x] == whiteQueen || newTable[y][x] == blackQueen){
				for(let y1 = -1; y1 < 2; y1++) {
					for(let x1 = -1; x1 < 2; x1++) {
						if(!(x1 == 0 && y1 == 0)) {
							checkSquare(y1,x1);
						}
					}
				}
				if(!bool){
					newPiece = newTable[y][x];
				}

			}
//------------------------------------------------------------------------------
			else if(newTable[y][x] == whiteKing || newTable[y][x] == blackKing){
				if(newTable[y][x] == blackKing){
					if(state.blackKing.move == 0){
							state.blackKing.check = true;
					}
				}
				else if(newTable[y][x] == whiteKing){
					if(state.whiteKing.move == 0){
							state.whiteKing.check = true;
					}
				}
				const kingCheck = (y1,x1) => {
					if(enemy(y+y1,x+x1)){
						if(!bool){
							newBoard[y+y1][x+x1] = redSquare;
						}else{
							if(newTable[y+y1][x+x1] == whiteKing || newTable[y+y1][x+x1] == blackKing){
								alert('da');
							}
						}
					}
					else if(emptyBoard(y+y1,x+x1)){
						if(!bool){
							newBoard[y+y1][x+x1] = yellowSquare;
						}else{
							if(newTable[y+y1][x+x1] == whiteKing || newTable[y+y1][x+x1] == blackKing){
								alert('da');
							}
						}
					}
				}
				for(let y1 = -1; y1 < 2; y1++) {
					for(let x1 = -1; x1 < 2; x1++) {
						if(!(x1 == 0 && y1 == 0)) {
							kingCheck(y1,x1);
						}
					}
				}
				if(!bool){
					newPiece = newTable[y][x];
				}
			}
		}
//------------------------------------------------------------------------------
//TEST
	const checkCheckKing = () => {
		for(let i=0;i<newTable.length;i++){
			for(let j=0;j<newTable.length;j++){
				if(state.whoMoves % 2 == 1){
					if(newTable[i][j] > 0 && newTable[i][j] < 7){
						checkChoise(i,j,true);
					}
				}
				if(state.whoMoves % 2 == 0){
					if(newTable[i][j] > 6 && newTable[i][j] < 13){
						checkChoise(i,j,true);
					}
				}
			}
		}
	}
//------------------------------------------------------------------------------

			checkChoise(action.y,action.x,false);
			checkCheckKing();

			return {...state,board:newBoard,table:newTable,
				oldY:newOldY,oldX:newOldX,piece:newPiece,enPassant:newEnPassant};
		}

		default:
			return state;
	}
}

export const move = (y,x) => ({type:MOVE,y:y,x:x});

export const king = (y,x) => ({type:KING,y:y,x:x});

export const queen = (piece) => ({type:QUEEN,piece:piece});

export const choise = (y,x) => ({type:CHOISE,y:y,x:x});

export const enPassant = (y,x) => ({type:ENPASSANT,y:y,x:x});

export default Reducer;
