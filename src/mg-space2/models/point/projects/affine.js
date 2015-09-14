define(['mg-space2/utils/vec2'], function (vec2) {
    /**
     * Point projection factory for affine axes
     * @this Point
     * @param {Axes.Affine} affine
     * @returns {Point.AffineProjection}
     */
    return function (affine) {
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
});