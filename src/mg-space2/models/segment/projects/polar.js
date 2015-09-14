define(['mg-space2/utils/vec2'], function (vec2) {
    /**
     * Segment projection factory for polar axes
     * @this Segment
     * @param {Axes.Polar} polar
     * @returns {Segment.PolarProjection}
     */
    return function (polar) {
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
});