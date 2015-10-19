/**
 * @namespace space2
 */

define(['mg-space2/models/axes/axes', 'mg-space2/models/point/point','mg-space2/models/line/line',
    'mg-space2/models/segment/segment', 'mg-space2/models/curve2/curve2',
    'mg-space2/models/parabola/parabola'], function () {
    var space2 = {};
    Array.prototype.forEach.call(arguments, function (item) {
        space2[item.name] = item;
    });
    return space2;
});