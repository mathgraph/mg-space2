define(['mg-space2/utils/vec2'], function (vec2) {
    /**
     * Point projection factory for polar axes
     * @this Point
     * @param {Axes.Polar} polar
     * @returns {Point.PolarProjection}
     */
    return function (polar) {
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
});