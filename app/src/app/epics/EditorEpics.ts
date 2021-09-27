import { combineEpics, ofType } from 'redux-observable';
import { actions, MicroPadAction } from '../actions';
import { Dispatch } from 'redux';
import { EpicDeps, EpicStore } from './index';
import { from, Observable } from 'rxjs';
import { distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { noEmit } from '../util';

export const persistSpellCheck$ = (action$: Observable<MicroPadAction>, store: EpicStore, { getStorage }: EpicDeps) =>
	action$.pipe(
		ofType<MicroPadAction>(actions.toggleSpellCheck.type),
		map(() => store.getState().editor.shouldSpellCheck),
		distinctUntilChanged(),
		switchMap(shouldSpellCheck => from(
			getStorage()
				.settingsStorage
				.setItem('shouldSpellCheck', shouldSpellCheck)
				.catch(e => { console.error(e); })
		)),
		noEmit()
	);

export const persistWordWrap$ = (action$: Observable<MicroPadAction>, store: EpicStore, { getStorage }: EpicDeps) =>
	action$.pipe(
		ofType<MicroPadAction>(actions.toggleWordWrap.type),
		map(() => store.getState().editor.shouldWordWrap),
		distinctUntilChanged(),
		switchMap(shouldWordWrap => from(
			getStorage()
				.settingsStorage
				.setItem('shouldWordWrap', shouldWordWrap)
				.catch(e => { console.error(e); })
		)),
		noEmit()
	);

export const notifySpellCheckWeirdness$ = (action$: Observable<MicroPadAction>, store: EpicStore, { notificationService }: EpicDeps) =>
	action$.pipe(
		ofType<MicroPadAction>(actions.toggleSpellCheck.type),
		tap(() => notificationService.toast({
			html: `Updated spell check preferences.<br/>You may need to close and re-open the editor to see any effect.`,
			displayLength: 3000
		})),
		noEmit()
	);

export const editorEpics$ = combineEpics<MicroPadAction, Dispatch, EpicDeps>(
	persistSpellCheck$,
	persistWordWrap$,
	notifySpellCheckWeirdness$
);
