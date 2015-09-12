/**
 * @namespace space2
 */

define(['mg-space2/factories/make_axes', 'mg-space2/factories/make_point', 'mg-space2/factories/make_segment'], function () {
    var space2 = {};
    Array.prototype.forEach.call(arguments, function (item) {
        space2[item.name] = item;
    });
    return space2;
});