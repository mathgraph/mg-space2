define(['mg-space2/utils/vec2'], function (vec2) {
    /**
     * Line projection factory for affine axes
     * @this Line
     * @param {Axes.Affine} affine
     * @returns {Line.AffineProjection}
     */
    return function (affine) {
        var self = this;

        /**
         * Line projection to affine axes
         * @typedef {Object} Line.AffineProjection
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
            set translate(v) {
                var vec = vec2.product([this.point1.x + v.x, this.point1.y + v.y], affine.to_global);
                self.point1.x = vec[0];
                self.point1.y = vec[1];
                vec = vec2.product([this.point2.x + v.x, this.point2.y + v.y], affine.to_global);
                self.point2.x = vec[0];
                self.point2.y = vec[1]
            },            set canonical(params) {
                var A, B, C, vec;
                A = params.A;
                B = params.B;
                C = params.C;
                if (B) {
                    vec = vec2.product([0, -C / B], affine.to_global);
                    self.point1.x = vec[0];
                    self.point1.y = vec[1];
                    vec = vec2.product([1, -(C + A) / B], affine.to_global);
                    self.point2.x = vec[0];
                    self.point2.y = vec[1];
                } else {
                    if (A) {
                        vec = vec2.product([-C / A, 0], affine.to_global);
                        self.point1.x = vec[0];
                        self.point1.y = vec[1];
                        vec = vec2.product([-(C + B) / A, 1], affine.to_global);
                        self.point2.x = vec[0];
                        self.point2.y = vec[1];
                    } else {
                        throw new Error("????? ?????? ?? ??????????")
                    }
                }
            },
            get canonical() {
                var A, B, C, point1, point2;
                point1 = vec2.product([self.point1.x, self.point1.y], affine.to_local);
                point2 = vec2.product([self.point2.x, self.point2.y], affine.to_local);

                A = 1 / (point2[1] - point1[1]);
                B = 1 / (point1[0] - point2[0]);
                C = -point1[0] * (point2[0] - point1[0]) + point1[1] * (point2[1] - point1[1]);
                return {A: A, B: B, C: C}
            },
            set angular_coefficient(params) {
                var k, b, vec;
                k = params.k;
                b = params.b;
                vec = vec2.product([0, b], affine.to_global);
                self.point1.x = vec[0];
                self.point1.y = vec[1];
                vec = vec2.product([1, k + b], affine.to_global);
                self.point2.x = vec[0];
                self.point2.y = vec[1];


            },
            get angular_coefficient() {
                var k, b, point1, point2;
                point1 = vec2.product([self.point1.x, self.point1.y], affine.to_local);
                point2 = vec2.product([self.point2.x, self.point2.y], affine.to_local);

                k = (point2[1] - point1[1]) / (point2[0] - point1[0]);
                b = point1[1] - k * point1[0];
                return {k: k, b: b}
            }
        }
    }
});