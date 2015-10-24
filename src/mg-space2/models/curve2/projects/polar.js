define(['mg-space2/utils/utils', 'mg-space2/utils/vec2', 'mg-space2/utils/curve2', 'mg-space2/models/point/point'], function (utils, vec2, curve2, make_point) {

    return function (polar) {
        var self = this,
            obj, shift_point, shift_point_proj;
        shift_point = make_point();
        shift_point_proj = shift_point.make_project(polar);

        obj = {
            getEquation: function () {
                var t = curve2.getShift(self);
                shift_point.x = t[0];
                shift_point.y = t[1];
                return {
                    p: curve2.getFocalArgument(self),
                    e: curve2.getEccentricity(self),
                    alpha: curve2.getAngle(self),
                    shift: shift_point_proj
                };
            },
            // setEquation: function (curve2) {
            //     var a2, b2, e, p, s,
            //         A, B, C, D, E, F;
            //     e = curve2.e;
            //     p = curve2.p;
            //     C = 0;
            //     D = 0;
            //     E = 0;
            //     if (e == 1) {
            //         A = 0;
            //         B = 1;
            //         F = 0;
            //         D = -2 * p;
            //     } else {
            //         a2 = p * p / (e * e - 1) / (e * e - 1);
            //         b2 = Math.abs(p * p / (e * e - 1));
            //         if (e < 1) {
            //             B = a2;
            //         } else {
            //             B = -a2;
            //         }
            //         F = -a2 * b2;
            //         A = b2;
            //     }
            //     if (A != B){
            //         C = (Math.tan(2 * curve2.alpha) * (A - B)) / 2
            //     }

            //     shift_point_proj.setR(curve2.shift.r);
            //     shift_point_proj.setPhi(curve2.shift.phi);
            //     s = {};
            //     s.x = shift_point.x;
            //     s.y = shift_point.y;

            //     F = s.x * s.x * A + s.y * s.y * B + C * s.x * s.y + D * s.x + E * s.y + F;
            //     D = 2 * A * s.x + C * s.y + D;
            //     E = 2 * B * s.y + C * s.x + E;

            //     self.A = A;
            //     self.B = B;
            //     self.C = C;
            //     self.D = D;
            //     self.E = E;
            //     self.F = F;
            // },
            // getEquationAsString: function () {
            //     var cv, str;
            //     cv = this.getEquation();
            //     str = utils.monomialToString(cv.p, "/(1" + utils.monomialToString(-cv.e , "cos(phi" + utils.monomialToString(cv.alpha) + ")")+ ")") || "0";
            //     if (str[0] == '+') {
            //         return "r=" + str.slice(1)
            //     } else {
            //         return "r=" + str
            //     }
            // }
        };

        return obj;
    };
});