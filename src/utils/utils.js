export function getQueryVal (key, url) {
  var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
  var s = (url && '?' + url.split('?')[1]) || location.search;
  var r = s.slice(1).match(reg);
  if (r != null) {
    return decodeURIComponent(r[2]);
  }
  return null;
}

export function decToHex (str) {
  var res=[];
  for(var i=0;i < str.length;i++)
    res[i]=("00"+str.charCodeAt(i).toString(16)).slice(-4);
  return "\\u"+res.join("\\u");
}

export function hexToDec (str) {
  str=str.replace(/\\/g,"%");
  return unescape(str);
}

export function uniqueArray(array) {
  var tmpArr = []
    , hash = {}
  ;
  for(var i = 0; i < array.length; i++){
    if (!hash[array[i].momentid.toString()]){
      hash[array[i].momentid.toString()] = true;
      tmpArr.push(array[i]);
    }
  }
  return tmpArr;
}

export function trimStr(str) {
  return str.replace(/(^\s*)|(\s*$)/g,"");
}

export function getGreatCircleDistance(lat1,lng1,lat2,lng2) {
  var EARTH_RADIUS = 6378137.0;    //单位M
  var PI = Math.PI;
  function getRad(d){
    return d*PI/180.0;
  }
  var radLat1 = getRad(lat1);
  var radLat2 = getRad(lat2);

  var a = radLat1 - radLat2;
  var b = getRad(lng1) - getRad(lng2);

  var s = 2*Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) + Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
  s = s*EARTH_RADIUS;
  s = Math.round(s*10000)/10000.0;

  if (s > 1000) {
    return (Math.floor(s/1000) + 'km')
  } else {
    return (Math.floor(s) + 'm');
  }
}

//获取滚动条当前的位置
export function getScrollTop () {
  var scrollTop = 0;
  if (document.documentElement && document.documentElement.scrollTop) {
    scrollTop = document.documentElement.scrollTop;
  }
  else if (document.body) {
    scrollTop = document.body.scrollTop;
  }
  return scrollTop;
}

//获取当前可视范围的高度
export function getClientHeight () {
  var clientHeight = 0;
  if (document.body.clientHeight && document.documentElement.clientHeight) {
    clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
  }
  else {
    clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
  }
  return clientHeight;
}

//获取文档完整的高度
export function getScrollHeight () {
  return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
}