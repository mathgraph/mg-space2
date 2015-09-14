/**
 * @namespace space2
 */

define(['mg-space2/models/axes/axes', 'mg-space2/models/point/point', 'mg-space2/models/segment/segment'], function () {
    var space2 = {};
    Array.prototype.forEach.call(arguments, function (item) {
        space2[item.name] = item;
    });
    return space2;
});