(function(ctx) {
    // http://www.happyyo.com/
    var FLIGHT_TEST_URL_PREFIX = '/public/data/flight/';
    var isDebug = true; // 测试环境
    if (isDebug) {
        ctx.URLS = {
            flight: {
                searchList: FLIGHT_TEST_URL_PREFIX + 'flight-list.json?orgCityID={offCityId}&avelCityID={arrCityId}&PageIndex={pageAt}&PageSize=20&flyOffTime={flyOffTime}', 
                // cabinList: 'http://www.happyyo.com/json/flight/GetFlightCabinsInfo?FlightsID=24&FlightSupplierID=0&CabinType=1'
                calendar: FLIGHT_TEST_URL_PREFIX + 'calendar.json'
            }
        };
    } else {
        ctx.URLS = {
            flight: {
                searchList: '/json/flight/SearchFlight?orgCityID={offCityId}&avelCityID={arrCityId}&PageIndex={pageAt}&PageSize=20&flyOffTime={flyOffTime}', 
                // cabinList: '/json/flight/GetFlightCabinsInfo?FlightsID=24&FlightSupplierID=0&CabinType=1'
            }
        };
    }

})(this);