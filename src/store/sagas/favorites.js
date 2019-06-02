import { call, put, select } from 'redux-saga/effects';
import api from '../../services/api';
import { ActionCreators as FavoriteActions } from '../ducks/favorites';

export function* addFavorite({ payload: { repository } }) {
  try {
    const { data } = yield call(api.get, `/repos/${repository}`);
    const duplicated = yield select(state => state.favorites.data.find(({ id }) => id === data.id));
    if (duplicated) {
      yield put(FavoriteActions.addFavoriteFailure('Repositório duplicado'));
    } else {
      const repositoryData = {
        id: data.id,
        name: data.full_name,
        description: data.description,
        url: data.html_url,
      };
      yield put(FavoriteActions.addFavoriteSuccess(repositoryData));
    }
  } catch (err) {
    yield put(FavoriteActions.addFavoriteFailure('Erro ao adicionar repositório'));
  }
}