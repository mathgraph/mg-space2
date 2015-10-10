define(['./projects/polar', './projects/affine'], function (make_polar_project, make_affine_project) {

    /**
     * @class Curve2
     * @classdesc A curve2 representation
     * @property {Number} x
     * @property {Number} y
     */
    var prototype = {};
    /**
     * Curve2 projection factory
     * @method Curve2.make_project
     * @param axes
     * @returns {Curve2.PolarProjection | Curve2.AffineProjection | Null}
     */
    prototype.make_project = function (axes) {
        var curve2 = this,
            proj;

        curve2.projects = curve2.projects || [];

        switch (axes.type) {
            case 'affine':
                proj = make_affine_project.bind(this)(axes);
                break;
            case 'polar':
                proj = make_polar_project.bind(this)(axes);
                break;
        }
        curve2.projects.push(proj);
        return proj || null;
    };

    prototype.update = function () {
        var curve2 = this;

        curve2.projects.forEach(function (proj) {
            proj.update();
        });

        return curve2;
    };

    /**
     * Curve2 factory
     * @method space2.make_curve2
     * @returns {Curve2}
     */
    return function make_curve2() {
        var curve2 = Object.create(prototype);
        curve2.A = 1;
        curve2.B = 1;
        curve2.C = 0;
        curve2.D = 0;
        curve2.E = 0;
        curve2.F = -1;
        return curve2;
    };

});