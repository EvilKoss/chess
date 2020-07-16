import Present from './Present';
import {connect} from 'react-redux';
import Reducer from './Reducer';
import {move,enPassant,choise,queen,king} from './Reducer';

const mapStateToProps = (state) => {
	return {
		white: state.ale.whiteTab,
		black: state.ale.blackTab,
		table: state.ale.table,
		board: state.ale.board,
		whoMoves: state.ale.whoMoves,
		pawnToQueen: state.ale.pawnToQueen,
		blackKing: state.ale.blackKing,
		whiteKing: state.ale.whiteKing
	}
}

const mapDispatchToProps = {
	move,enPassant,choise,queen,king
}

const Container = connect(mapStateToProps,mapDispatchToProps)(Present);

export default Container;
