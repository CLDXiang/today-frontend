/* eslint-disable @typescript-eslint/no-explicit-any */

// 封装 localStorage 的方法，使之支持对象存取，并为 vuex 操作提供一些 API
export const localStorage = {
  setItem(keyName: string, keyValue: any) {
    return window.localStorage.setItem(keyName, JSON.stringify(keyValue));
  },
  getItem(keyName: string) {
    const value = window.localStorage.getItem(keyName);
    if (value === null) {
      return null;
    }
    return JSON.parse(value);
  },
  removeItem(keyName: string) {
    return window.localStorage.removeItem(keyName);
  },
  clear() {
    return window.localStorage.clear();
  },

  /** 取出 localStorage 中保存的所有 vuex state */
  getVuexStates() {
    return this.getItem('vuex') || {};
  },
  setVuexState(stateName: string, stateValue: any) {
    const states = this.getVuexStates();
    states[stateName] = stateValue;
    return this.setItem('vuex', states);
  },
  getVuexState(stateName: string) {
    const states = this.getVuexStates();
    return states[stateName];
  },
};

// 封装 sessionStorage 的方法，使之支持对象存取，并为 vuex 操作提供一些 API
export const sessionStorage = {
  setItem(keyName: string, keyValue: any) {
    return window.sessionStorage.setItem(keyName, JSON.stringify(keyValue));
  },
  getItem(keyName: string) {
    const value = window.sessionStorage.getItem(keyName);
    if (value === null) {
      return null;
    }
    return JSON.parse(value);
  },
  removeItem(keyName: string) {
    return window.sessionStorage.removeItem(keyName);
  },
  clear() {
    return window.sessionStorage.clear();
  },

  /** 取出 sessionStorage 中保存的所有 vuex state */
  getVuexStates() {
    return this.getItem('vuex') || {};
  },
  setVuexState(stateName: string, stateValue: any) {
    const states = this.getVuexStates();
    states[stateName] = stateValue;
    return this.setItem('vuex', states);
  },
  getVuexState(stateName: string) {
    const states = this.getVuexStates();
    return states[stateName];
  },
};
