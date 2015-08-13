/**
 * Различные вспомогательные функции
 * @namespace space2/utils
 */

/**
 * @typedef {Number[]} space2.Vector2
 */

/**
 * @typedef {Number[][]} space2.Matrix2x2
 */

(function (space2) {
    space2.utils = {
        /**
         * Функции для работы с векторами на плоскости
         * @namespace space2/utils/vec2
         */
        vec2: {
            /**
             * Возвращает длину радиус-вектора, заданного координатами x и y
             * @memberof space2/utils/vec2
             * @param {Number} x
             * @param {Number} y
             * @returns {Number}
             */
            length: function (x, y) {
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
            }

        }
    };
})(space2);