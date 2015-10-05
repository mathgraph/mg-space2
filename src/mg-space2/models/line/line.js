define(['./projects/polar', './projects/affine'], function (make_polar_project, make_affine_project) {

    /**
     * @class Line
     * @classdesc A line representation
     * @property {object} point1
     * @property {Number} point1.x
     * @property {Number} point1.y
     * @property {object} point2
     * @property {Number} point2.x
     * @property {Number} point2.y

     */

    var prototype = {};

    /**
     * Line projection factory
     * @method Line.make_project
     * @param axes
     * @returns {Line.PolarProjection | Line.AffineProjection | Null}
     */

    prototype.make_project = function (axes) {
        var line = this,
            proj;

        line.projects = line.projects || [];

        switch (axes.type) {
            case 'affine':
                proj = make_affine_project.bind(this)(axes);
                break;
            case 'polar':
                proj = make_polar_project.bind(this)(axes);
                break;
        }
        line.projects.push(proj);
        return proj || null;
    };

    prototype.update = function () {
        var line = this;

        line.projects.forEach(function (proj) {
            proj.update();
        });

        return line;
    };

    /**
     * Line factory
     * @method space2.make_line
     * @returns {Line}
     */
    return function make_line() {
        var space2 = this,
            line = Object.create(prototype);
        line.point1 = space2.make_point();
        line.point2 = space2.make_point();
        line.point2.x = 1;
        return line;
    };

});