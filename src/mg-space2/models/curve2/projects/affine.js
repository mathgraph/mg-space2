define(['mg-space2/utils/utils', 'mg-space2/utils/vec2', 'mg-space2/utils/curve2'], function (utils, vec2, curve2) {

    return function (affine) {
        var self = this,
            obj;

        obj = {
            getEquation: function () {
                return curve2.product(self, affine.to_local);
            },
            setEquation: function (v) {
                var cv;
                cv = curve2.product(v, affine.to_global);
                self.A = cv.A;
                self.B = cv.B;
                self.C = cv.C;
                self.D = cv.D;
                self.E = cv.E;
                self.F = cv.F;
            },
            getEquationAsString: function () {
                var cv, str;
                str = utils.monomialToString(cv.A, 'x^2') +
                       utils.monomialToString(cv.B, 'y^2') +
                       utils.monomialToString(cv.C, 'xy') +
                       utils.monomialToString(cv.D, 'x') +
                       utils.monomialToString(cv.E, 'y') +
                       utils.monomialToString(cv.F, '') + "=0";
                if (str[0] == '+') {
                    return str.slice(1)
                } else {
                    return str
                }
            }
        };

        return obj
    };
});
