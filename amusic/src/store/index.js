import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
axios.defaults.baseURL = 'http://localhost:3000'
import {
  Toast
} from 'vant';
import { utils } from '../assets/js/utils'
Vue.use(Toast);
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {},
    // 播放图标
    iconState: {
      // 播放暂停   play 为真 在放歌 显示暂停图标
      //            play 为假 不在放歌 显示开始图标
      play: false,
      // 顺序
      order: [{
          v: true,
          name: '循环播放',
        },
        {
          v: false,
          name: '随机播放',
        },
        {
          v: false,
          name: '单曲循环',
        },
      ],
      index: 0
    },
    // 是不是在播放
    isPlaying: false,
    // 有没有显示page
    showPlayPage: {
      a: false
    },
    // 歌曲在歌单的第几位
    songIndex: '',
    // 歌曲的id
    songId: 0,
    // 如果是歌单 把整个歌单传过来
    songListData: [],
    // 歌曲url
    songUrlData: [],
    // 歌的长度
    allTime: {
      // 分钟
      min: 0,
      // 毫秒
      millisec: 0
    },
    // 已经播放的长度
    playTime: {
      // 分钟
      min: 0,
      // 毫秒
      millisec: 0
    },
    // 音量
    volume: 0,
    // 歌词
    lyric : []
  },
  mutations: {
    // 在小列表点击 更换歌曲
    littlePlayListChangeSong(state,v){
      state.songIndex = v
      state.songId = state.songListData[state.songIndex].id
        // 拿歌词
        axios({
          methods: "get",
          url: "/lyric",
          params: {
            id : state.songListData[state.songIndex].id
          },
        })
        .then((result) => {
          if(result.data.lrc){
            state.lyric = utils.formatLyric(result.data.lrc.lyric)
          }else{
            state.lyric= ['暂时没有歌词/轻音乐']
          }
        })
        .catch((err) => {
          console.log("err ==> ", err);
        });
        return
    },
    // 获取用户数据
    setUserInfo(state, info) {
      state.userInfo = info
    },
    // 播放暂停
    togglePlay(state, v) {
      state.iconState.play = v
    },
    // 仅开启页面
    onlyOpenPlayPage(state){
      state.showPlayPage.a = true
    },
    // 关掉/开启 播放页面
    togglePlayPage(state, v) {
      state.showPlayPage.a = v.v
      if (v.v) {
        // 如果是打开播放页面
        // 拿歌词
        axios({
          methods: "get",
          url: "/lyric",
          params: {
            id : v.id
          },
        })
        .then((result) => {
          if(result.data.lrc){
            state.lyric = utils.formatLyric(result.data.lrc.lyric)
          }else{
            state.lyric= ['暂时没有歌词/轻音乐']
          }
        })
        .catch((err) => {
          console.log("err ==> ", err);
        });
        if (v.id && v.songUrlData || v.songListData) {
          state.songId = v.id
          state.songUrlData = v.songUrlData
          state.songListData = v.songListData
          state.songIndex = v.index
        }
      }
    },
    // 下一首
    nextSong(state, v) {
      // 随机播放
      if (state.iconState.order[1].v == true) {
        state.songIndex = v
        state.songId = state.songListData[state.songIndex].id
        // 拿歌词
        axios({
          methods: "get",
          url: "/lyric",
          params: {
            id : state.songListData[state.songIndex].id
          },
        })
        .then((result) => {
          if(result.data.lrc){
            state.lyric = utils.formatLyric(result.data.lrc.lyric)
          }else{
            state.lyric= ['暂时没有歌词/轻音乐']
          }
        })
        .catch((err) => {
          console.log("err ==> ", err);
        });
        return
      }
      if (state.songIndex < state.songListData.length - 1) {
        state.songIndex++
        state.songId = state.songListData[state.songIndex].id
        // 拿歌词
        axios({
          methods: "get",
          url: "/lyric",
          params: {
            id : state.songListData[state.songIndex].id
          },
        })
        .then((result) => {
          if(result.data.lrc){
            state.lyric = utils.formatLyric(result.data.lrc.lyric)
          }else{
            state.lyric= ['暂时没有歌词/轻音乐']
          }
        })
        .catch((err) => {
          console.log("err ==> ", err);
        });
      } else {
        state.songIndex = 0
        state.songId = state.songListData[state.songIndex].id
        // 拿歌词
        axios({
          methods: "get",
          url: "/lyric",
          params: {
            id : state.songListData[state.songIndex].id
          },
        })
        .then((result) => {
          if(result.data.lrc){
            state.lyric = utils.formatLyric(result.data.lrc.lyric)
          }else{
            state.lyric= ['暂时没有歌词/轻音乐']
          }
        })
        .catch((err) => {
          console.log("err ==> ", err);
        });
      }
    },
    // 上一首
    preSong(state, v) {
      // 随机播放
      if (state.iconState.order[1].v == true) {
        state.songIndex = v
        state.songId = state.songListData[state.songIndex].id
        // 拿歌词
        axios({
          methods: "get",
          url: "/lyric",
          params: {
            id : state.songListData[state.songIndex].id
          },
        })
        .then((result) => {
          if(result.data.lrc){
            state.lyric = utils.formatLyric(result.data.lrc.lyric)
          }else{
            state.lyric= ['暂时没有歌词/轻音乐']
          }
        })
        .catch((err) => {
          console.log("err ==> ", err);
        });
        return
      }
      if (state.songIndex > 0) {
        state.songIndex--
        state.songId = state.songListData[state.songIndex].id
        // 拿歌词
        axios({
          methods: "get",
          url: "/lyric",
          params: {
            id : state.songListData[state.songIndex].id
          },
        })
        .then((result) => {
          if(result.data.lrc){
            state.lyric = utils.formatLyric(result.data.lrc.lyric)
          }else{
            state.lyric= ['暂时没有歌词/轻音乐']
          }
        })
        .catch((err) => {
          console.log("err ==> ", err);
        });
      } else {
        state.songIndex = state.songListData.length - 1
        state.songId = state.songListData[state.songIndex].id
        // 拿歌词
        axios({
          methods: "get",
          url: "/lyric",
          params: {
            id : state.songListData[state.songIndex].id
          },
        })
        .then((result) => {
          if(result.data.lrc){
            state.lyric = utils.formatLyric(result.data.lrc.lyric)
          }else{
            state.lyric= ['暂时没有歌词/轻音乐']
          }
        })
        .catch((err) => {
          console.log("err ==> ", err);
        });
      }
    },
    // 切换播放顺序
    toggleOrder(state) {
      if (state.iconState.index < 2) {
        state.iconState.index++
      } else {
        state.iconState.index = 0
      }
      state.iconState.order.map(item => {
        item.v = false
      })
      state.iconState.order[state.iconState.index].v = true
    },
    // 设定歌播了多久 设定歌的长度 设定音乐声量
    // 传对象 
    set(state, v) {
      state[v.name] = v.v
    },

  },
  actions: {},
  modules: {}
})