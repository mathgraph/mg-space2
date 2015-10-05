define(['mg-space2/utils/vec2'], function (vec2) {
    /**
     * Point projection factory for polar axes
     * @this Point
     * @param {Axes.Polar} polar
     * @returns {Point.PolarProjection}
     */
    return function (polar) {
        var self = this,
            obj;

        /**
         * Point projection to polar axes
         * @typedef {Object} Point.PolarProjection
         * @property {Number} r
         * @property {Number} phi
         */

        obj =  {
            getR: function () {
                var x = self.x - polar.center[0],
                    y = self.y - polar.center[1];
                return vec2.length(x, y) * polar.scale;
            },
            setR: function (v) {
                var that = this;
                v /= polar.scale;
                self.x = Math.cos(that.getPhi()) * v + polar.center[0];
                self.y = Math.sin(that.getPhi()) * v + polar.center[1];
            },
            getPhi: function () {
                var x = self.x - polar.center[0],
                    y = self.y - polar.center[1];
                return vec2.angle(x, y) + 0.0;
            },
            setPhi: function (v) {
                var that = this,
                    r = that.getR() / polar.scale;
                self.x = Math.cos(v) * r + polar.center[0];
                self.y = Math.sin(v) * r + polar.center[1];
            },
            update: function () {
                this.setR(this.r);
                this.setPhi(this.phi);
                return this;
            },
            get r() {
                return this.getR();
            },
            set r(v) {
                this.setR(v);
            },
            get phi() {
                return this.getPhi();
            },
            set phi(v) {
                this.setPhi(v);
            }
        };
        //obj.r = obj.getR();
        //obj.phi = obj.getPhi();
        return obj
    };
});