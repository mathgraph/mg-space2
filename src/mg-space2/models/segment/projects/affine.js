define(['mg-space2/utils/vec2'], function (vec2) {
    /**
     * Segment projection factory for affine axes
     * @this Segment
     * @param {Axes.Affine} affine
     * @returns {Segment.AffineProjection}
     */
    return function (affine) {
        var self = this,
            projP1 = self.point1.make_project(affine),
            projP2 = self.point2.make_project(affine);

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
            getLength: function () {
                var that = this,
                    vec = vec2.subtraction([that.getPoint1().x, that.getPoint1().y],
                        [that.getPoint2().x, that.getPoint2().y]);
                return vec2.length(vec[0], vec[1]);
            },
            setLength: function (v) {
                var that = this,
                    vec, length, delta;

                vec = vec2.subtraction([that.getPoint1().x, that.getPoint1().y],
                    [that.getPoint2().x, that.getPoint2().y]);
                length = vec2.length(vec[0], vec[1]);
                vec[0] = vec[0] / length * v;
                vec[1] = vec[1] / length * v;

                delta = vec2.subtraction([(that.getPoint1().getX() + that.getPoint2().getX()) / 2,
                        (that.getPoint1().getY() + that.getPoint2().getY()) / 2],
                    [vec[0] / 2, vec[1] / 2]);

                vec = vec2.translate([[0, 0], [vec[0], vec[1]]], delta);
                that.getPoint1().setX(vec[0][0]);
                that.getPoint1().setY(vec[0][1]);
                that.getPoint2().setX(vec[1][0]);
                that.getPoint2().setY(vec[1][1]);

                return that;
            },
            getAngle: function () {
                var that = this,
                    vec = vec2.subtraction([that.getPoint1().x, that.getPoint1().y],
                    [that.getPoint2().x, that.getPoint2().y]);
                return vec2.angle(vec[0], vec[1])
            },
            setAngle: function (v) {
                var that = this,
                    vec, length, delta;
                vec = vec2.subtraction([that.getPoint1().x, that.getPoint1().y],
                    [that.getPoint2().x, that.getPoint2().y]);
                length = vec2.length(vec[0], vec[1]);
                vec[0] = length * Math.cos(v);
                vec[1] = length * Math.sin(v);

                delta = vec2.subtraction([(that.getPoint1().getX() + that.getPoint2().getX()) / 2,
                        (that.getPoint1().getY() + that.getPoint2().getY()) / 2],
                    [vec[0] / 2, vec[1] / 2]);

                vec = vec2.translate([[0, 0], [vec[0], vec[1]]], delta);
                that.getPoint1().setX(vec[0][0]);
                that.getPoint1().setY(vec[0][1]);
                that.getPoint2().setX(vec[1][0]);
                that.getPoint2().setY(vec[1][1]);

                return that;
            },
            translate: function (v) {
                var that = this;
                that.getPoint1().setX(that.getPoint1().getX() + v.x);
                that.getPoint1().setY(that.getPoint1().getY() + v.y);
                that.getPoint2().setX(that.getPoint2().getX() + v.x);
                that.getPoint2().setY(that.getPoint2().getY() + v.y);

                return that;
            },
            //update: function () {
            //    var that = this;
            //
            //    that.getPoint1().update();
            //    that.getPoint2().update();
            //    that.setLength(that.length)
            //        .setAngle(that.angle);
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
            get angle() {
                return this.getAngle()
            },
            set angle(v) {
                this.setAngle(v)
            },
            get length() {
                return this.getLength()
            },
            set length(v) {
                this.setLength(v)
            }
        }
    }
});