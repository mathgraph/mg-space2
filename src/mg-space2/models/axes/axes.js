define(['mg-space2/utils/vec2'], function (vec2) {

    /**
     * @class Axes
     * @classdesc Coordinate systems for space2
     */
    var prototype, make_affine_axes, make_polar_axes;
    prototype = {};

    /**
     * Affine axes factory
     * @returns {Axes.Affine}
     */
    make_affine_axes = function () {
        /**
         * @typedef {Object} Axes.Affine
         * @property {String} type 'affine' Read-Only
         * @property {Vector2[]} basis basis of this axes in global coordinates
         * @property {Matrix2x2} to_local transformation matrix from global to local axes
         * @property {Matrix2x2} to_global transformation matrix from local to global axes
         */
        var $_basis = [[1, 0], [0, 1]];
        return {
            get type() {
                return 'affine';
            },
            get basis() {
                return $_basis
            },
            set basis(b) {
                if (!vec2.isCorrectBasis(b)) {
                    if (vec2.isCollinear(b[0], b[1])) {
                        console.warn('Collinear vectors in basis. Setting interrupted.');
                    } else if (vec2.isZero(b[0]) || vec2.isZero(b[1])) {
                        console.warn('Zero vector in basis. Setting interrupted.');
                    } else {
                        console.warn('Incorrect basis. Setting interrupted.');
                    }
                    return;
                }
                $_basis = b;
            },
            get to_local() {
                return [
                    this.basis[0],
                    this.basis[1]
                ]
            },
            get to_global() {
                var m = this.to_local,
                    a = m[0][0],
                    b = m[0][1],
                    c = m[1][0],
                    d = m[1][1],
                    k = 1 / (a * d - b * c);
                return [
                    [k * d, -k * b],
                    [-k * c, k * a]
                ]
            }
        };
    };

    /**
     * Polar axes factory
     * @returns {Axes.Polar}
     */
    make_polar_axes = function () {
        /**
         * @typedef {Object} Axes.Polar
         * @property {String} type 'polar' Read-Only
         * @property {Vector2[]} center center of polar axes in global coordinates
         * @property {Number} scale scale of polar axis
         * @todo inclination of polar axis
         */
        return {
            type: 'polar',
            center: [0, 0],
            scale: 1
        }
    };

    /**
     * Axes factory
     * @method space2.make_axes
     * @param {string} type type of axes, 'polar' or 'affine'
     * @throws Throws error with message 'Invalid axes type' when type is incorrect
     * @returns {Axes.Affine | Axes.Polar}
     */
    return function make_axes(type) {
        if (type === 'affine') {
            return make_affine_axes();
        }
        if (type === 'polar') {
            return make_polar_axes();
        }
        throw new Error('Invalid axes type: ' + type);
    };
});