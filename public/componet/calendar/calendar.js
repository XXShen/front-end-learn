(function  (global, $, moment) {
	var festivalMap = global.festivalMap;
	function Calendar($el, param){
		$.extend(this, param);
		this.$el = $el;
		this.now = moment();
		this.init();
	}
	$.extend(Calendar, {
		defaultParam: {
			start: '2014/9',
			end: '2014/12',
			noPriceCantSel: false// 如果没有价格就不能选择 
		},
		template: {
			title: 
        		'<div class="calendar-item" data-year="{year}" data-month="{month}">'
            		+ '<h3 class="calendar-title">{year}年<span class="month">{month}月</span></h3>'
            ,
			head : 
					'<thead>'
					+ '<tr>'
                        + '<th class="sunday">周日</th>'
                        + '<th>周一</th>'
                        + '<th>周二</th>'
                        + '<th>周三</th>'
                        + '<th>周四</th>'
                        + '<th>周五</th>'
                        + '<th class="saturday">周六</th>'
                    + '</tr>'
                    + '</thead>',
            cell: '<td class="{className}" data-day="{day}">{dayName}<p class="price">{price}</p></td>'
		},
		CELL_TYPE_MAP: {
			'DISABLED': 0,
			'NORMAL': 1,
			'HOLIDAY': 2,//国假，周六，周日
			'EMPTY': 3,// 空格子
			'TODAY': 4
		}
	});
	$.extend(Calendar.prototype, {
		init: function () {
			this.render();
			this.registerEvent();
		},
		render: function () {
   			var html = ['<div class="calendar">'];
   			var monthArr = this.getMonthArr(this.start, this.end);
   			var self = this;
   			monthArr.forEach(function (each) {
   				html.push(self.renderMonth(each));
   			});
   			html.push('</div>');
			this.$el.html(html.join(''));
		},
		getMonthArr : function (start, end) {
			var monthArr = [];
			var startYear = start.split('/')[0];
			var startMonth = start.split('/')[1] - 1;
			var endYear = end.split('/')[0];
			var endMonth = end.split('/')[1] - 1;
			var momentStart = moment({
				y:startYear,
				M: startMonth,
				d: 1
			});
			var momentEnd = moment({
				y: endYear,
				M: endMonth,
				d: 1
			});
			while(!momentStart.isAfter(momentEnd)){
				monthArr.push({
					year: momentStart.year(),
					month: momentStart.month() + 1
				});
				momentStart.add('month', 1);
			}
			return monthArr;
		},
		registerEvent: function () {
			var self = this;
			this.$el.find('tbody td').click(function () {
				var $this = $(this);
				var $par = $this.closest('.calendar-item');
				if(!$this.hasClass('disabled')){
					if(typeof self.click === 'function'){
						self.click($par.data('year'), $par.data('month'), $this.data('day'));
					}
				}
			});
		},
		renderMonth: function (dateObj) {
			var year = dateObj.year;
			var month = dateObj.month;
			var CELL_TYPE_MAP = Calendar.CELL_TYPE_MAP;
			var title = Calendar.template.title;
			title = title.replace(/{year}/g, year);
			title = title.replace(/{month}/g, month);
			var html = [title, '<table>', Calendar.template.head];
			var curr = new moment({
				y: year,
				M: month - 1,
				d: 1
			});
			var now = this.now;
			var day;
			var dateName;
			var typeArr = [];
			var price;
			var data = this.data;
			var drawCellInfo = this.getDrawCellNumInfo(year, month);
			for(var i = 0; i < drawCellInfo.total; i++){
				if( i % 7 === 0){
					if(i !== 0){
						html.push('</tr>');
					}
					html.push('<tr>');
				}
				if(i < drawCellInfo.startEmptyNum || i >=  drawCellInfo.endEmptyIndex){
					html.push(this.makeCell(CELL_TYPE_MAP.EMPTY));
				} else {
					dateName = this.getFestivalName(curr);
					if(curr.isBefore(now, 'day')){
						typeArr.push(CELL_TYPE_MAP.DISABLED);
					}else if(curr.isSame(now, 'day')){
						typeArr.push(CELL_TYPE_MAP.TODAY);
						dateName = '今天';
					}
					if(this.isHoliday(curr)){
						typeArr.push(CELL_TYPE_MAP.HOLIDAY);
					}
					price = this.getPrice(curr, data);
					if(this.noPriceCantSel && !price){
						typeArr.push(CELL_TYPE_MAP.DISABLED);
					}
					html.push(this.makeCell(typeArr, curr.date(), dateName, price));
					curr.add('day', 1);
					typeArr = [];
				}
				
			}
			html.push('</table>');
			html.push('</div>');

			return html.join('');
		},
		hasPrice: function (day, data) {
			return this.getPrice(day, data);
		},
		getPrice: function (day, data) {
			if(!data){
				return false;
			}
			var dayStr = day.format('YYYY/M/D');
			var price = data[dayStr];
			if(!price){
				price = false;
			}
			return price;
		},
		getDrawCellNumInfo: function (year, month) {
			var curr = new moment({
				y: year,
				M: month - 1,
				d: 1
			});
			var nextMonth = curr.clone().add('month', 1);
			var currMonthLastDay = nextMonth.add('day', -1);
			var currMonthLastDayDay = currMonthLastDay.day();
			var monthLen = currMonthLastDay.date();
			var startEmptyNum = curr.day();
			var endEmptyNum = 6 - currMonthLastDayDay;
			var total = startEmptyNum + monthLen + endEmptyNum;
			if(total % 7 != 0){
				throw 'cal getDrawCellNum error!';
			}
			return {
				startEmptyNum: startEmptyNum,
				total : total,
				endEmptyIndex: startEmptyNum + monthLen
			};
		},
		// holiday  包括 festival + 周末
		isHoliday: function (day) {
			var isHoliday = false;
			day = moment(day);
			var dayday = day.day();// 星期
			if(dayday === 0 || dayday === 6){
				isHoliday = true;
			} else if(this.isFestival(day)){
				isHoliday = true;
			}
			return isHoliday;
		},
		isFestival: function (day) {
			return this.getFestivalName(day);
		},
		getFestivalName: function (day) {
			var dayFormat = day.format('YYYY-M-D');
			var name = festivalMap[dayFormat] ? festivalMap[dayFormat] : false;
			return name;
		},
		// 一个cell可能有多个类型
		makeCell: function  (typeArr, date, dateName, price) {
			var html;
			var CELL_TYPE_MAP = Calendar.CELL_TYPE_MAP;
			var className = [];
			var price = price ? price : '';
			if(typeArr === CELL_TYPE_MAP.EMPTY){
				html = '<td class="disabled"></td>';
			} else{
				if(typeArr.indexOf(CELL_TYPE_MAP.DISABLED) > -1){
					className.push('disabled');
				}
				if(typeArr.indexOf(CELL_TYPE_MAP.TODAY) > -1){
					className.push('today');
				}
				if(typeArr.indexOf(CELL_TYPE_MAP.HOLIDAY) > -1){
					className.push('festival');
				}
				className = className.join(' ');
				
				html = Calendar.template.cell;
				if(!dateName){
					dateName = date;
				}
				html = html.replace('{className}', className);
				html = html.replace('{day}', date);
				html = html.replace('{dayName}', dateName);
				html = html.replace('{price}', price);
			}
			return html;
		}

	});
	$.fn.calendar = function(option) {
        var calendar = new Calendar(this, option);
        return calendar;
    };
})(this, jQuery, moment);