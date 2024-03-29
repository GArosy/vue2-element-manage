import Vue from 'vue';
import Vuex from 'vuex';
import Tab from './tab';
import User from './user';
import Mall from './mall';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        Tab,
        User,
        Mall
    }
})