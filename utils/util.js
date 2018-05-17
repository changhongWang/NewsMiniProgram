const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

let formatDate = function(date) {
  if(date != '' && date != undefined){
    let d = new Date(date);
    let hour = d.getHours();
    let min = d.getMinutes();
    hour = hour < 10 ? '0' + hour : hour;
    min = min < 10 ? '0' + min : min;

    return `${hour}:${min}`;
  }else{
    wx.showModal({
      title: 'System Error',
      content: '系统内部错误',
    })
    return false;
  }
  
}

module.exports = {
  formatTime: formatTime,
  formatDate: formatDate
}
