# 日历
## 使用
```
$('#test-calendar2').calendar({
    start: '2014/8',// 开始的年月
    end: '2014/12',//结束的年月
    data: {// 可选 在日历的某天显示价格
        '2014/11/15': '¥100',
        '2014/10/27': '¥100',
        '2014/10/2': '¥300'
    },
    noPriceCantSel: true, //可选 默认是false 如果没有价格就不能选择
    click: function  (year, month,day) {// 点某天的回调
    	location.href = '...';
        console.log(year, month, day);
    }

});
```

## demo
见 本文件夹下的[index.html](./index.html)