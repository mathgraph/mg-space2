define(['mg-space2/utils/vec2'], function (vec2) {
    /**
     * Segment projection factory for polar axes
     * @this Segment
     * @param {Axes.Polar} polar
     * @returns {Segment.PolarProjection}
     */
    return function (polar) {
        var self = this,
            projP1 = self.point1.make_project(polar),
            projP2 = self.point2.make_project(polar);
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
            getPoint1: function () {
                return projP1;
            },
            setPoint1: function (p) {
                projP1.setPhi(p.phi);
                projP1.setR(p.r);
                return this;
            },
            getPoint2: function () {
                return projP2;
            },
            setPoint2: function (p) {
                projP2.setPhi(p.phi);
                projP2.setR(p.r);
                return this;
            },
            translate: function (v) {
                var that = this;
                that.getPoint1().setR(that.getPoint1().getR() + v.r);
                that.getPoint1().setPhi(that.getPoint1().getPhi() + v.phi);
                that.getPoint2().setR(that.getPoint2().getR() + v.r);
                that.getPoint2().setPhi(that.getPoint2().getPhi() + v.phi);

                return that;
            },
            //update: function () {
            //    var that = this;
            //
            //    that.getPoint1().update();
            //    that.getPoint2().update();
            //
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
            }
        }
    }
});