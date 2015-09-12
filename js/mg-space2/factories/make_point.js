define(['mg-space2/utils/vec2'], function (vec2) {

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
     * Point projection factory for polar axes
     * @this Point
     * @param {Axes.Polar} polar
     * @returns {Point.PolarProjection}
     */
    var make_polar_project = function (polar) {
        var self = this;

        /**
         * Point projection to polar axes
         * @typedef {Object} Point.PolarProjection
         * @property {Number} r
         * @property {Number} phi
         */

        return {
            get r() {
                var x = self.x - polar.center[0],
                    y = self.y - polar.center[1];
                return vec2.length(x, y) * polar.scale;
            },
            set r(v) {
                v /= polar.scale;
                self.x = Math.cos(this.phi) * v + polar.center[0];
                self.y = Math.sin(this.phi) * v + polar.center[1];
            },
            get phi() {
                var x = self.x - polar.center[0],
                    y = self.y - polar.center[1];
                return vec2.angle(x, y);
            },
            set phi(v) {
                var r = this.r / polar.scale;
                self.x = Math.cos(v) * r + polar.center[0];
                self.y = Math.sin(v) * r + polar.center[1];
            }

        }
    };

    /**
     * Point projection factory for affine axes
     * @this Point
     * @param {Axes.Affine} affine
     * @returns {Point.AffineProjection}
     */
    var make_affine_project = function (affine) {
        var self = this;

        /**
         * Point projection to affine axes
         * @typedef {Object} Point.AffineProjection
         * @property {Number} x
         * @property {Number} y
         */

        return {
            get x() {
                var vec = vec2.product([self.x, self.y], affine.to_local);
                return vec[0];
            },
            set x(v) {
                var vec = vec2.product([v, this.y], affine.to_global);
                self.x = vec[0];
                self.y = vec[1]
            },
            get y() {
                var vec = vec2.product([self.x, self.y], affine.to_local);
                return vec[1];
            },
            set y(v) {
                var vec = vec2.product([this.x, v], affine.to_global);
                self.x = vec[0];
                self.y = vec[1];
            }
        }
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