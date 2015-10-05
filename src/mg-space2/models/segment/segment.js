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
        var segment = this,
            proj;

        segment.projects = segment.projects || [];

        switch (axes.type) {
            case 'affine':
                proj = make_affine_project.bind(this)(axes);
                break;
            case 'polar':
                proj = make_polar_project.bind(this)(axes);
                break;
        }
        segment.projects.push(proj);
        return proj || null;
    };

    prototype.update = function () {
        var segment = this;

        segment.projects.forEach(function (proj) {
            proj.update();
        });

        return segment;
    };

    /**
     * Segment factory
     * @method space2.make_segment
     * @returns {Segment}
     */
    return function make_segment() {
        var space2 = this,
            segment = Object.create(prototype);
        segment.point1 = space2.make_point();
        segment.point2 = space2.make_point();
        segment.point2.x = 1;
        return segment;
    };

});