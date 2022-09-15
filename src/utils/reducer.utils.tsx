export type ReduxAction<T, S = void> = { type: T; payload: S };

export const createAction = <T, P = {}>(type: T & string, payload?: P) => ({
  type,
  payload,
});
