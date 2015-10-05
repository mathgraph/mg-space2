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
            getX: function () {
                var vec = vec2.product([self.x, self.y], affine.to_local);
                return vec[0];
            },
            setX: function (v) {
                var that = this,
                    vec = vec2.product([v, that.getY()], affine.to_global);
                self.x = vec[0];
                self.y = vec[1]
            },
            getY: function () {
                var vec = vec2.product([self.x, self.y], affine.to_local);
                return vec[1];
            },
            setY: function (v) {
                var that = this,
                    vec = vec2.product([that.getX(), v], affine.to_global);
                self.x = vec[0];
                self.y = vec[1];
            },
            update: function () {
                this.setX(this.x);
                this.setY(this.y);
                return this;
            },
            x: this.getX(),
            y: this.getY()
        }
    };
});