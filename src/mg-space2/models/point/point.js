define(['./projects/polar', './projects/affine'], function (make_polar_project, make_affine_project) {

    /**
     * @class Point
     * @classdesc A point representation
     * @property {Number} x
     * @property {Number} y
     */
    var prototype = {};
    /**
     * Point projection factory
     * @method Point.make_project
     * @param axes
     * @returns {Point.PolarProjection | Point.AffineProjection | Null}
     */
    prototype.make_project = function (axes) {
        switch (axes.type) {
            case 'affine':
                return make_affine_project.bind(this)(axes);
            case 'polar':
                return make_polar_project.bind(this)(axes);
        }
        return null;
    };

    /**
     * Point factory
     * @method space2.make_point
     * @returns {Point}
     */
    return function make_point() {
        var point = Object.create(prototype);
        point.x = 0;
        point.y = 0;
        return point;
    };

});