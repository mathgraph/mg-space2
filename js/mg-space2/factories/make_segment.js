define(['mg-space2/utils/vec2'], function (vec2) {

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
     * Segment projection factory for polar axes
     * @this Segment
     * @param {Axes.Polar} polar
     * @returns {Segment.PolarProjection}
     */
    function make_polar_project(polar) {
        var self = this;
        /**
         * Segment projection to polar axes
         * @typedef {Object} Segment.PolarProjection
         * @property {object} point1
         * @property {Number} point1.r
         * @property {Number} point1.phi
         * @property {object} point2
         * @property {Number} point2.r
         * @property {Number} point2.phi
         */
        return {
            get point1() {
                return {
                    get r() {
                        var x = self.point1.x - polar.center[0],
                            y = self.point1.y - polar.center[1];
                        return vec2.length(x, y) * polar.scale;
                    },
                    set r(v) {
                        v /= polar.scale;
                        self.point1.x = Math.cos(this.phi) * v + polar.center[0];
                        self.point1.y = Math.sin(this.phi) * v + polar.center[1];
                    },
                    get phi() {
                        var x = self.point1.x - polar.center[0],
                            y = self.point1.y - polar.center[1];
                        return vec2.angle(x, y);
                    },
                    set phi(v) {
                        var r = this.r / polar.scale;
                        self.point1.x = Math.cos(v) * r + polar.center[0];
                        self.point1.y = Math.sin(v) * r + polar.center[1];
                    }
                };
            },
            get point2() {
                return {
                    get r() {
                        var x = self.point2.x - polar.center[0],
                            y = self.point2.y - polar.center[1];
                        return vec2.length(x, y) * polar.scale;
                    },
                    set r(v) {
                        v /= polar.scale;
                        self.point2.x = Math.cos(this.phi) * v + polar.center[0];
                        self.point2.y = Math.sin(this.phi) * v + polar.center[1];
                    },
                    get phi() {
                        var x = self.point2.x - polar.center[0],
                            y = self.point2.y - polar.center[1];
                        return vec2.angle(x, y);
                    },
                    set phi(v) {
                        var r = this.r / polar.scale;
                        self.point2.x = Math.cos(v) * r + polar.center[0];
                        self.point2.y = Math.sin(v) * r + polar.center[1];
                    }
                };
            }

        }
    }

    /**
     * Segment projection factory for affine axes
     * @this Segment
     * @param {Axes.Affine} affine
     * @returns {Segment.AffineProjection}
     */
    function make_affine_project(affine) {
        var self = this;

        /**
         * Segment projection to affine axes
         * @typedef {Object} Segment.AffineProjection
         * @property {object} point1
         * @property {Number} point1.x
         * @property {Number} point1.y
         * @property {object} point2
         * @property {Number} point2.x
         * @property {Number} point2.y
         */

        return {
            get point1() {
                var vec;
                return {
                    get x() {
                        return vec2.product([self.point1.x, self.point1.y], affine.to_local)[0];
                    },
                    set x(v) {
                        vec = vec2.product([v, this.y], affine.to_global);
                        self.point1.x = vec[0];
                        self.point1.y = vec[1]
                    },
                    get y() {
                        return vec2.product([self.point1.x, self.point1.y], affine.to_local)[1];
                    },
                    set y(v) {
                        vec = vec2.product([this.x, v], affine.to_global);
                        self.point1.x = vec[0];
                        self.point1.y = vec[1]
                    }
                };
            },
            get point2() {
                var vec;
                return {
                    get x() {
                        return vec2.product([self.point2.x, self.point2.y], affine.to_local)[0];
                    },
                    set x(v) {
                        vec = vec2.product([v, this.y], affine.to_global);
                        self.point2.x = vec[0];
                        self.point2.y = vec[1]
                    },
                    get y() {
                        return vec2.product([self.point2.x, self.point2.y], affine.to_local)[1];
                    },
                    set y(v) {
                        vec = vec2.product([this.x, v], affine.to_global);
                        self.point2.x = vec[0];
                        self.point2.y = vec[1]
                    }
                };
            },
            set point2(value) {
                var vec = vec2.product([value.x, value.y], affine.to_global);
                self.point2.x = vec[0];
                self.point2.y = vec[1]
            },
            set point1(value) {
                var vec = vec2.product([value.x, value.y], affine.to_global);
                self.point1.x = vec[0];
                self.point1.y = vec[1]
            },
            get length() {
                var vec = vec2.subtraction([this.point1.x, this.point1.y], [this.point2.x, this.point2.y]);
                return vec2.length(vec[0], vec[1]);
            },
            get angle() {
                var vec = vec2.subtraction([this.point1.x, this.point1.y], [this.point2.x, this.point2.y]);
                return vec2.angle(vec[0], vec[1])
            },
            set translate(v) {
                var vec = vec2.product([this.point1.x + v.x, this.point1.y + v.y], affine.to_global);
                self.point1.x = vec[0];
                self.point1.y = vec[1];
                vec = vec2.product([this.point2.x + v.x, this.point2.y + v.y], affine.to_global);
                self.point2.x = vec[0];
                self.point2.y = vec[1]
            },
            set length(v) {
                var vec, length, delta;
                vec = vec2.subtraction([this.point1.x, this.point1.y], [this.point2.x, this.point2.y]);
                length = vec2.length(vec[0], vec[1]);
                vec[0] = vec[0] / length * v;
                vec[1] = vec[1] / length * v;

                delta = vec2.subtraction([(this.point1.x + this.point2.x) / 2, (this.point1.y + this.point2.y) / 2],
                    [vec[0] / 2, vec[1] / 2]);

                vec = vec2.translate([[0, 0], [vec[0], vec[1]]], delta);
                vec[0] = vec2.product(vec[0], affine.to_global);
                vec[1] = vec2.product(vec[1], affine.to_global);
                self.point1.x = vec[0][0];
                self.point1.y = vec[0][1];
                self.point2.x = vec[1][0];
                self.point2.y = vec[1][1];

            },
            set angle(v) {
                var vec, length, delta;
                vec = vec2.subtraction([this.point1.x, this.point1.y], [this.point2.x, this.point2.y]);
                length = vec2.length(vec[0], vec[1]);
                vec[0] = length * Math.cos(v);
                vec[1] = length * Math.sin(v);

                delta = vec2.subtraction([(this.point1.x + this.point2.x) / 2, (this.point1.y + this.point2.y) / 2],
                    [vec[0] / 2, vec[1] / 2]);

                vec = vec2.translate([[0, 0], [vec[0], vec[1]]], delta);
                vec[0] = vec2.product(vec[0], affine.to_global);
                vec[1] = vec2.product(vec[1], affine.to_global);
                self.point1.x = vec[0][0];
                self.point1.y = vec[0][1];
                self.point2.x = vec[1][0];
                self.point2.y = vec[1][1];
            }
        }
    }

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