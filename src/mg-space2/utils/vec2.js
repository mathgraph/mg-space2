/**
 * @typedef {Number[]} space2.Vector2
 */

/**
 * @typedef {Number[][]} space2.Matrix2x2
 */
define(function () {
    /**
     * Функции для работы с векторами на плоскости
     * @namespace space2/utils/vec2
     */
    return {
        /**
         * Возвращает длину радиус-вектора, заданного координатами x и y
         * @memberof space2/utils/vec2
         * @param {Number || Vector2} x
         * @param {Number} y
         * @returns {Number}
         */
        length: function (x, y) {
            if (typeof x === 'object') {
                return Math.sqrt(x[0] * x[0] + x[1] * x[1]);
            }
            return Math.sqrt(x * x + y * y);
        },
        /**
         * Возвращает угол наклона радиус-вектора в радианах, считая против часовой стрелки от оси Ox, заданного координатами x и y
         * @memberof space2/utils/vec2
         * @param {Number} x
         * @param {Number} y
         * @returns {Number}
         */
        angle: function (x, y) {
            return Math.atan2(y, x);
        },
        /**
         * Возвращает произведение двумерного вектора vec2 на квадратную матрицу 2x2 mat2
         * @memberof space2/utils/vec2
         * @param {Vector2} vec2 двумерный вектор
         * @param {Matrix2x2} mat2 матрица 2x2
         * @returns {Vector2}
         */
        product: function (vec2, mat2) {
            return [
                mat2[0][0] * vec2[0] + mat2[0][1] * vec2[1],
                mat2[1][0] * vec2[0] + mat2[1][1] * vec2[1]
            ];
        },
        subtraction: function (v1, v2) {
            return [
                v1[0] - v2[0],
                v1[1] - v2[1]
            ]
        },
        translate: function (v, delta) {
            return [
                [
                    v[0][0] + delta[0],
                    v[0][1] + delta[1]
                ],
                [
                    v[1][0] + delta[0],
                    v[1][1] + delta[1]
                ]
            ]
        },
        scalarProduct: function (vec1, vec2) {
            return vec1[0] * vec2[0] + vec1[1] * vec2[1];
        },
        isCollinear: function (vec1, vec2) {
            return Math.abs(this.scalarProduct(vec1, vec2) / (this.length(vec1) * this.length(vec2))) === 1
        },
        isZero: function (vec) {
            return vec[0] === 0 && vec[1] === 0
        }

    }
});