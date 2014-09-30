var ctx = this;
$(document).ready(function() {
    // why tap not work...
    var $flightList = $('.flight-list');
    $flightList.on('click', '.show-detail-href', function() {
        var $this = $(this);
        var $parent = $(this).closest('.flight-item');
        var $more = $parent.find('.more');
        if ($this.hasClass('closed')) {
            $this.addClass('opened');
            $this.removeClass('closed');
            $more.show();
        } else {
            $this.addClass('closed');
            $this.removeClass('opened');
            $more.hide();
        }
    });


    var flightList = {
        init: function() {
            this.$el = $flightList;
            this.pageAt = 0;
            this.initUrlTemp();
            // 模版中的辅助函数
            Handlebars.registerHelper('getTimeInfo', function(time) {
                var withoutDayTime = time.split(' ')[1];
                var timeArr = withoutDayTime.split(':');
                return timeArr.slice(0, 2).join(':');
            });
            this.getMore();// todo 测试
            this.getMore();
            this.getMore();
            this.getMore();
        },
        getMore: function() {
            var self = this;
            $.ajax({
                url: this.urlTemp.replace('{pageAt}', ++this.pageAt)
            }).done(function(data) {
                self.renderMore(data);
            }).always(function() {
            	// debugger;
            })
        },
        renderMore: function(data) {
            var source = $('#list-template').html();
            var template = Handlebars.compile(source);
            this.$el.append(template(data));
        },
        initUrlTemp: function() {
            var urlTemp = ctx.URLS.flight.searchList;
            var $data = $('#query-data');
            urlTemp = urlTemp.replace('{offCityId}', $data.attr('data-orgCityID'));
            urlTemp = urlTemp.replace('{arrCityId}', $data.attr('data-avelCityID'));
            urlTemp = urlTemp.replace('{flyOffTime}', $data.attr('data-flyOffTime'));
            this.urlTemp = urlTemp;
        }
    };

    flightList.init();

    
});