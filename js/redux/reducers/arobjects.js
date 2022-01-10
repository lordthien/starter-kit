/**
 * Copyright (c) 2017-present, Viro Media, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */
import * as LoadingConstants from '../LoadingStateConstants';
import * as EffectsConstants from '../EffectsConstants';

/**
 * Reducers for handling state or AR objects (Objects, Portals, Effects) in the AR Scene
 */
const uuidv1 = require('uuid/v1');

// Initial state of the app with empty models, portals and showing no emitters / post proccessing effect
const initialState = {
  modelItems: {},
  postProcessEffects: EffectsConstants.EFFECT_NONE,
};

// Creates a new model item with the given index from the data model in ModelItems.js
function newModelItem(indexToCreate) {
  return {
    uuid: uuidv1(),
    selected: false,
    loading: LoadingConstants.NONE,
    index: indexToCreate,
  };
}

// Add model at the given index to the AR Scene
function addModelItem(state = {}, action) {
  var model = newModelItem(action.index);
  state[model.uuid] = model;
  return state;
}

// Remove model with given UUID from the AR Scene
function removeModelItem(state = {}, action) {
  state[action.uuid] = null;
  return state;
}

// Change state of individual Flatlist items between NONE, LOADING, ERROR, LOADED
function modifyLoadState(state = {}, action) {
  if (state[action.uuid] != null || state[action.uuid] != undefined) {
    var model = state[action.uuid];
    var newModel = {...model};
    newModel.loading = action.loadState;
    state[action.uuid] = newModel;
  }
  return state;
}

function arobjects(state = initialState, action) {
  switch (action.type) {
    case 'ADD_MODEL':
      return {
        ...state,
        modelItems: {...addModelItem(state.modelItems, action)},
      };
    case 'REMOVE_MODEL':
      return {
        ...state,
        modelItems: {...removeModelItem(state.modelItems, action)},
      };
    case 'REMOVE_ALL':
      return {
        ...state,
        modelItems: {},
        postProcessEffects: EffectsConstants.EFFECT_NONE,
      };
    case 'CHANGE_MODEL_LOAD_STATE':
      return {
        ...state,
        modelItems: {...modifyLoadState(state.modelItems, action)},
      };
    default:
      return state;
  }
}

module.exports = arobjects;
