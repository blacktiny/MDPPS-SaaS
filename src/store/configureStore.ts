import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import { composeWithDevTools } from 'redux-devtools-extension'
import storage from 'redux-persist/lib/storage'

import rootReducer from './reducer'
import { PersistConfig } from 'redux-persist'
import { RootState } from './types'

const persistConfig: PersistConfig<RootState> = {
  key: 'root',
  storage: storage,
  blacklist: ['options']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware()))

export const persistor = persistStore(store)

const configureStore = () => ({
  ...store
})

export default configureStore()
