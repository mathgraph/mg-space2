define(['./projects/polar', './projects/affine'], function (make_polar_project, make_affine_project) {

    /**
     * @class Segment
     * @classdesc A segment representation
     * @property {object} point1
     * @property {Number} point1.x
     * @property {Number} point1.y
     * @property {object} point2
     * @property {Number} point2.x
     * @property {Number} point2.y

     */

    var prototype = {};

    /**
     * Segment projection factory
     * @method Segment.make_project
     * @param axes
     * @returns {Segment.PolarProjection | Segment.AffineProjection | Null}
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
     * Segment factory
     * @method space2.make_segment
     * @returns {Segment}
     */
    return function make_segment() {
        var segment = Object.create(prototype);
        segment.point1 = {};
        segment.point2 = {};
        segment.point1.x = 0;
        segment.point1.y = 0;
        segment.point2.x = 0;
        segment.point2.y = 0;

        return segment;
    };

});