// 封装 localStorage 的方法，使之支持对象存取，并为 vuex 操作提供一些 API
export default {
  setItem(keyName: string, keyValue: any) {
    return localStorage.setItem(keyName, JSON.stringify(keyValue));
  },
  getItem(keyName: string) {
    const value = localStorage.getItem(keyName);
    if (value === null) {
      return null;
    }
    return JSON.parse(value);
  },
  removeItem(keyName: string) {
    return localStorage.removeItem(keyName);
  },
  clear() {
    return localStorage.clear();
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
