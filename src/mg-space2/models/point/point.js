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
        var point = this,
            proj;

        point.projects = point.projects || [];

        switch (axes.type) {
            case 'affine':
                proj = make_affine_project.bind(this)(axes);
                break;
            case 'polar':
                proj = make_polar_project.bind(this)(axes);
                break;
        }
        point.projects.push(proj);
        return proj || null;
    };

    prototype.update = function () {
        var point = this;

        point.projects.forEach(function (proj) {
            proj.update();
        });

        return point;
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