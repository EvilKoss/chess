import React from 'react';
import style from './Present.module.css';
import none from './piece/none.png';
import whitePawn from './piece/whitePawn.png';
import whiteRook from './piece/whiteRook.png';
import whiteHorse from './piece/whiteHorse.png';
import whiteElephant from './piece/whiteElephant.png';
import whiteQueen from './piece/whiteQueen.png';
import whiteKing from './piece/whiteKing.png';
import blackPawn from './piece/blackPawn.png';
import blackRook from './piece/blackRook.png';
import blackHorse from './piece/blackHorse.png';
import blackElephant from './piece/blackElephant.png';
import blackQueen from './piece/blackQueen.png';
import blackKing from './piece/blackKing.png';
import white from './piece/white.png';
import black from './piece/black.png';
import yellow from './piece/yellow.jpg';
import red from './piece/red.jpg';
//------------------------------------------------------------------------------
const Present = (props) => {
	let str = [];
	let str2 = [];
	let str3 = [];
	let table = props.table;
	let board = props.board;
	let pawTQ = props.pawnToQueen;
	let whoMoves = props.whoMoves % 2 == 0 ? 'black' : 'white';
	let figures = [none,whitePawn,whiteRook,whiteHorse,whiteElephant,whiteQueen,whiteKing,
		blackPawn,blackRook,blackHorse,blackElephant,blackQueen,blackKing];
//------------------------------------------------------------------------------
	if(props.whiteKing.check && props.whiteKing.move == 0){
		if(table[7][4] == 0 && table[7][5] == 0 && table[7][5] == 0 && props.whiteKing.rightRook == 0){
			board[7][5] = 4;
		}
		if(table[7][1] == 0 && table[7][2] == 0 && props.whiteKing.lefRook == 0){
			board[7][1] = 4;
		}
	}


	if(props.blackKing.check && props.blackKing.move == 0){
		if(table[0][4] == 0 && table[0][5] == 0 && table[0][5] == 0 && props.blackKing.rightRook == 0){
			board[0][5] = 4;
		}
		if(table[0][1] == 0 && table[0][2] == 0 && props.blackKing.lefRook == 0){
			board[0][1] = 4;
		}
	}
//------------------------------------------------------------------------------
	if(pawTQ){
		if(whoMoves = props.whoMoves % 2 == 0){
			str3.push(
				<img onClick={() => props.queen(5)} className={style.chess} src={whiteQueen}/>,<br/>,
				<img onClick={() => props.queen(2)} className={style.chess} src={whiteRook}/>,<br/>,
				<img onClick={() => props.queen(4)} className={style.chess} src={whiteElephant}/>,<br/>,
				<img onClick={() => props.queen(3)} className={style.chess} src={whiteHorse}/>
			)
		}
		else if(whoMoves = props.whoMoves % 2 == 1){
			str3.push(
				<img onClick={() => props.queen(11)} className={style.chess} src={blackQueen}/>,<br/>,
				<img onClick={() => props.queen(8)} className={style.chess} src={blackRook}/>,<br/>,
				<img onClick={() => props.queen(10)} className={style.chess} src={blackElephant}/>,<br/>,
				<img onClick={() => props.queen(9)} className={style.chess} src={blackHorse}/>
			)
		}
	}
//------------------------------------------------------------------------------
	for(let i=0;i<board.length;i++){
		for(let j=0;j<board.length;j++){
			if(board[i][j] == 0){
				str.push(
					<img className={style.chess} src={white}/>
				)
			}
			if(board[i][j] == 1){
				str.push(
					<img className={style.chess} src={black}/>
				)
			}
			if(board[i][j] == 2){
				str.push(
					<img className={style.chess} src={yellow}/>
				)
			}
			if(board[i][j] == 3){
				str.push(
					<img className={style.chess} src={red}/>
				)
			}
			if(board[i][j] == 4){
				str.push(
					<img className={style.chess} src={yellow}/>
				)
			}
		}
		str.push(<br/>);
	}

//------------------------------------------------------------------------------
	for(let i=0;i<table.length;i++){
		for(let j=0;j<table.length;j++){
			if(table[i][j] == 0){
				if(board[i][j] == 3){
					str2.push(
						<img onClick={() => props.enPassant(i,j)} className={style.chess} src={none}/>
					)
				}
				else if(board[i][j] == 4){
					str2.push(
						<img onClick={() => props.king(i,j)} className={style.chess} src={none}/>
					)
				}
				else if(board[i][j] == 2){
					str2.push(
						<img onClick={() => props.move(i,j)} className={style.chess} src={none}/>
					)
				}
				else {
					str2.push(
						<img className={style.chess} src={none}/>
					)
				}
			}
//------------------------------------------------------------------------------
			let whiteOrBlack = 'white';
			for(let someFigureId = 1; someFigureId < 13; someFigureId++){
				if(someFigureId == 7)whiteOrBlack = 'black';
				let someFigureImg = figures[someFigureId];
				if(table[i][j] == someFigureId){
					if(board[i][j] == 3){
						str2.push(
							<img onClick={() => props.move(i,j)} className={style.chess} src={someFigureImg}/>
						)
					}
					else if(whoMoves == whiteOrBlack){
						str2.push(
							<img onClick={() => props.choise(i,j)} className={style.chess} src={someFigureImg}/>
						)
					}
					else{
						str2.push(
							<img className={style.chess} src={someFigureImg}/>
						)
					}
				}
			}
//------------------------------------------------------------------------------

		}
		str2.push(<br/>);
	}

	return (
		<div>
			<div className={style.pawn}>{str3}</div>
			<div className={style.table}>{str}</div>
			<div className={style.table}>{str2}</div>
		</div>
	)
}

export default Present;
