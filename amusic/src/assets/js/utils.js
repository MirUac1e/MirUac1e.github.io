class Utils {
  getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i].trim();
      if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
  };
  // 将毫秒转化成 00:00
  calcMilliseconds(v) {
    let min = Math.floor(v / 1000 / 60)
    let sec = Math.floor(v / 1000 % 60)
    if (min < 10) {
      min = "0" + min
    }
    if (sec < 10) {
      sec = "0" + sec
    }

    return min + ":" + sec
  };
  // 把时间戳变成时间
  getLocalTime(nS) {
    return new Date(parseInt(nS)).toLocaleDateString().replace(/:\d{1,2}$/, ' ');
  };



  //传入初始歌词文本text
  formatLyric(text) {
    let lyric = []
    let arr = text.split("\n"); //原歌词文本已经换好行了方便很多，我们直接通过换行符“\n”进行切割
    let row = arr.length; //获取歌词行数
    for (let i = 0; i < row; i++) {
      let temp_row = arr[i]; //现在每一行格式大概就是这样"[00:04.302][02:10.00]hello world";
      let temp_arr = temp_row.split("]"); //我们可以通过“]”对时间和文本进行分离
      let text = temp_arr.pop(); //把歌词文本从数组中剔除出来，获取到歌词文本了！
      //再对剩下的歌词时间进行处理
      temp_arr.forEach(element => {
        let obj = {};
        let time_arr = element.substr(1, element.length - 1).split(":"); //先把多余的“[”去掉，再分离出分、秒
        let s = parseInt(time_arr[0]) * 60 + Math.ceil(time_arr[1]); //把时间转换成与currentTime相同的类型，方便待会实现滚动效果
        obj.time = s;
        obj.text = text;
        lyric.push(obj); //每一行歌词对象存到组件的lyric歌词属性里
      });
    }
    lyric.sort(this.sortRule); //由于不同时间的相同歌词我们给排到一起了，所以这里要以时间顺序重新排列一下
    //this.$store.commit("setLyric", this.lyric); //把歌词提交到store里，为了重新进入该组件时还能再次渲染
    return lyric
  };
  sortRule(a, b) { //设置一下排序规则
    return a.time - b.time;
  };
}

export const utils = new Utils();