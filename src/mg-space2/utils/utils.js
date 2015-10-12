/**
 * Различные вспомогательные функции
 * @namespace space2/utils
 */

define(function () {
    return {
        det3: function (mat3) {
            var m = mat3;
            return m[0][0] * m[1][1] * m[2][2] + m[0][1] * m[1][2] * m[2][0] + m[0][2] * m[1][0] * m[2][1] -
                  (m[0][2] * m[1][1] * m[2][0] + m[0][1] * m[1][0] * m[2][2] + m[0][0] * m[1][2] * m[2][1])
        },
        det2: function (mat) {
            return mat[0][0] * mat[1][1] - mat[0][1] * mat[1][0];
        },
        monomialToString: function(number, string) {
            if (number > 0) {
                if (number == 1 && string !="") {
                    number = ""
                }
                return "+" + number + string
            }
            if (number < 0) {
                if (number == -1 && string !="") {
                    number = "-"
                }
                return "" + number + string
            }
            if (number == 0) {
                return ""
            }
        },
        matrix2inverse: function(mat2) {
            var a, b, c, d, k;
            a = mat2[0][0];
            b = mat2[0][1];
            c = mat2[1][0];
            d = mat2[1][1];
            k = 1 / (a * d - b * c);
            return [
                [k * d, -k * b],
                [-k * c, k * a]
            ]
        }
    }
});