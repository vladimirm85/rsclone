import React from 'react';
import { connect } from 'react-redux';
import { AppStateType } from '../store/store';
import { GameInterface } from '../components/canvas/interfaces';
import { gameActions } from '../store/action-creators/game-ac';

const mapStateToPropsForUnmount = (state: AppStateType) => ({
  gameObj: state.gameData.gameObj,
  isGameStarted: state.gameData.isGameStarted,
});

type MapPropsType = {
  gameObj: GameInterface | null;
  isGameStarted: boolean;
};

type DispatchPropsType = {
  setGameObj: (gameObj: GameInterface | null) => void;
  startGame: (isGameStarted: boolean) => void;
};

type PropsType = MapPropsType & DispatchPropsType;

function unmountCanvas<WCP>(WrappedComponent: React.ComponentType<WCP>) {
  const clearComponent: React.FC<PropsType> = (props) => {
    const {
      gameObj,
      isGameStarted,
      setGameObj,
      startGame,
      ...restProps
    } = props;

    if (gameObj) {
      gameObj.stop();
      setGameObj(null);
    }
    if (isGameStarted) {
      startGame(false);
    }

    // eslint-disable-next-line react/jsx-props-no-spreading
    return <WrappedComponent {...(restProps as WCP)} />;
  };

  return connect(mapStateToPropsForUnmount, { ...gameActions })(clearComponent);
}

export default unmountCanvas;
