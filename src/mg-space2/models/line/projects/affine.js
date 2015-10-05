define(['mg-space2/utils/vec2'], function (vec2) {
    /**
     * Line projection factory for affine axes
     * @this Line
     * @param {Axes.Affine} affine
     * @returns {Line.AffineProjection}
     */
    return function (affine) {
        var self = this,
            projP1 = self.point1.make_project(affine),
            projP2 = self.point2.make_project(affine);

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
            getPoint1: function () {
                return projP1;
            },
            setPoint1: function (p) {
                projP1.setX(p.x);
                projP1.setY(p.y);
                return this;
            },
            getPoint2: function () {
                return projP2;
            },
            setPoint2: function (p) {
                projP2.setX(p.x);
                projP2.setY(p.y);
                return this;
            },
            setCanonical: function (params) {
                var that = this,
                    A, B, C, vec;
                A = params.A;
                B = params.B;
                C = params.C;
                if (B) {
                    that.getPoint1().setX(0);
                    that.getPoint1().setY(-C / B);
                    that.getPoint2().setX(1);
                    that.getPoint2().setY(-(C + A) / B);
                } else {
                    if (A) {
                        that.getPoint1().setX(-C / A);
                        that.getPoint1().setY(0);
                        that.getPoint2().setX(-(C + B) / A);
                        that.getPoint2().setY(1);
                    } else {
                        throw new Error("This is not line")
                    }
                }
            },
            getCanonical: function () {
                var that = this,
                    A, B, C, point1, point2;
                point1 = that.getPoint1();
                point2 = that.getPoint2();

                B = point2.getX() - point1.getX();
                A = point1.getY() - point2.getY();
                C = -point1.getX() * A - point1.getY() * B;
                return {A: A, B: B, C: C}
            },
            setAngularCoefficient: function (params) {
                var that = this,
                    k, b, vec;
                k = params.k;
                b = params.b;
                that.getPoint1().setX(0);
                that.getPoint1().setY(b);
                that.getPoint2().setX(1);
                that.getPoint2().setY(k + b);
            },
            getAngularCoefficient: function () {
                var that = this,
                    k, b, point1, point2;
                point1 = that.getPoint1();
                point2 = that.getPoint2();


                k = (point2.getY() - point1.getY()) / (point2.getX() - point1.getX());
                b = point1.getY() - k * point1.getX();
                return {k: k, b: b}
            },
            //update: function () {
            //    var that = this;
            //
            //    that.getPoint1().update();
            //    that.getPoint2().update();
            //    that.setAngularCoefficient(that.angularCoefficient)
            //        .setCanonical(that.canonical);
            //
            //    return that;
            //},
            get point1() {
                return this.getPoint1();
            },
            set point1(v) {
                this.setPoint1(v);
            },
            get point2() {
                return this.getPoint2();
            },
            set point2(v) {
                this.setPoint2(v);
            },
            get canonical() {
                return this.getCanonical()
            },
            set canonical(v) {
                this.setCanonical(v)
            },
            get angularCoefficient() {
                return this.getAngularCoefficient()
            },
            set angularCoefficient(v) {
                this.setAngularCoefficient(v)
            }
        }
    }
});