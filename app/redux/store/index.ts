import AsyncStorage from '@react-native-async-storage/async-storage'
import { applyMiddleware, compose, legacy_createStore as createStore } from 'redux'
import { createLogger } from 'redux-logger'
import { persistStore, persistReducer, PersistorOptions } from 'redux-persist'
import createSagaMiddleware from 'redux-saga'
import rootReducer from '../reducers'
import sagas from '../sagas'

const persistConfig = {
    // Root
    key: 'root',
    timeout: 0,
    // Storage Method (React Native)
    storage: AsyncStorage,
    // Whitelist (Save Specific Reducers)
    whitelist: ['userReducer'],
    // Blacklist (Don't Save Specific Reducers)
    blacklist: []
}

const middleware = []
const sagaMiddleware = createSagaMiddleware()

middleware.push(sagaMiddleware)
if (__DEV__) {
    middleware.push(createLogger())
}
const enhancers = [applyMiddleware(...middleware)]
const persistedReducer = persistReducer(persistConfig, rootReducer)

// @ts-expect-error
const store = createStore(persistedReducer, undefined, compose(...enhancers))

// @ts-expect-error
const config: PersistorOptions = { enhancers }

const persistor = persistStore(store, config, async () => {
    // const stateData = store.getState()
})

sagaMiddleware.run(sagas)

export { store, persistor }
