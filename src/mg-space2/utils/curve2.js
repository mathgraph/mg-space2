define(['mg-space2/utils/utils'], function (utils) {

    return {
        product: function (curve2, mat2) {
            var A, B, C, D, E, F, a, b, c, d;
            A = curve2.A;
            B = curve2.B;
            C = curve2.C;
            D = curve2.D;
            E = curve2.E;
            F = curve2.F;
            mat2 = utils.matrix2inverse(mat2);
            a = mat2[0][0];
            b = mat2[0][1];
            c = mat2[1][0];
            d = mat2[1][1];

            return {
                A: A * a * a + B * c * c + C * a * c,
                B: A * b * b + B * d * d + C * b * d,
                C: 2 * A * a * b + 2 * B * c * d + C * a * d + C * b * c,
                D: D * a + E * c,
                E: D * b + E * d,
                F: F
            };
        },

        getInvariants: function (curve2) {
            var A, B, C, D, E, F;
            A = curve2.A;
            B = curve2.B;
            C = curve2.C / 2;
            D = curve2.D / 2;
            E = curve2.E / 2;
            F = curve2.F;
            return {
                Delta: utils.det3([[A, C, D],[C, B, E],[D, E, F]]),
                D: utils.det2([[A, C],[C, B]]),
                I: A + B,
                B: utils.det2([[A, D],[D, F]]) + utils.det2([[B, E],[F, E]])
            }
        },
        getAngle: function (curve2) {
            var A, B, C;
            A = curve2.A;
            B = curve2.B;
            C = curve2.C / 2;
            if (A != B) {
                return Math.atan(2 * C / (A - B)) / 2
            } else {
                return 0
            }
        },
        getShift: function (curve2) {
            var A, B, C, D, E, F, x, y, invD;
            A = curve2.A;
            B = curve2.B;
            C = curve2.C / 2;
            D = curve2.D / 2;
            E = curve2.E / 2;
            F = curve2.F;
            invD = this.getInvariants(curve2).D;
            if (invD != 0) {
                x = (C * E - D * B) / invD;
                y = (C * D - A * E) / invD;
                return [x, y]
            } else {
                if (A == 0) {
                    x = (F - (E / (2 * B)) * (E / (2 * B)))  / D;
                    y = -E / (2 * B);
                   return [x, y]
                } else {
                    x = -D / (2 * A);
                    y = (F - (D / (2 * A)) * (D / (2 * A)))  / E;
                    return [x, y]
                }
            }
        },
        getType: function (curve2) {
            var inv = this.getInvariants(curve2);
            if (inv.Delta != 0) {
                if (inv.D > 0 && inv.Delta * inv.I < 0) {
                    return "Ellipse"
                } else {
                    if (inv.D > 0 && inv.Delta * inv.I > 0) {
                        return "Curve doesn't have any real points"
                    } else {
                        if (inv.D < 0) {
                            return "Hyperbolic"
                        } else {
                            if(inv.D == 0) {
                                return "Parabolic"
                            }
                        }
                    }
                }
            } else {
                if (inv.D > 0) {
                    return "Point"
                } else {
                    if (inv.D < 0) {
                        return "Two intersecting lines"
                    } else {
                        if (inv.B < 0) {
                            return "Two parallel lines"
                        } else {
                            if (inv.B == 0) {
                                return "Line"
                            } else {
                                return "Curve doesn't have any real points"
                            }
                        }
                    }
                }
            }

        },
        getEigenValue: function (curve2) {
            var inv;
            inv = this.getInvariants(curve2);
            return {
                lambda1: (inv.I + Math.sqrt(inv.I * inv.I - 4 * inv.D)) / 2,
                lambda2: (inv.I - Math.sqrt(inv.I * inv.I - 4 * inv.D)) / 2
            }

        },
        getCanonical: function (curve2) {
            var type, inv, eigen;
            type = this.getType(curve2);
            inv = this.getInvariants(curve2);
            eigen = this.getEigenValue(curve2);
            switch (type){
                case 'Ellipse':
                    return {
                       a2: -(inv.Delta / (eigen.lambda1 * eigen.lambda2 * eigen. lambda2)),
                       b2: -(inv.Delta / (eigen.lambda1 * eigen.lambda2 * eigen. lambda1))
                    };
                    break;
                case 'Hyperbolic':
                    return {
                        b2: -(inv.Delta / (eigen.lambda1 * eigen.lambda2 * eigen. lambda2)),
                        a2: -(inv.Delta / (eigen.lambda1 * eigen.lambda2 * eigen. lambda1))
                    };
                    break;
                case 'Parabolic':
                    return {
                        p: (1 / eigen.lambda1) * Math.sqrt(-inv.Delta / eigen.lambda1)
                    };
                    break;
                default:
                    return null;
                break;
            }
        },
        getEccentricity: function(curve2) {
            var type, canonical;
            type = this.getType(curve2);
            canonical = this.getCanonical(curve2);
            switch (type) {
                case 'Ellipse':
                    return Math.sqrt(1 - Math.min(canonical.a2, canonical.b2) / Math.max(canonical.a2, canonical.b2));
                    break;
                case 'Hyperbolic':
                    return Math.sqrt(canonical.a2 + canonical.b2) / Math.sqrt(canonical.a2);
                    break;
                case 'Parabolic':
                    return 1;
                    break;
                default:
                    return null;
                break;
            }
        },
        getFocalArgument: function(curve2) {
            var type, canonical;
            type = this.getType(curve2);
            canonical = this.getCanonical(curve2);

            switch (type) {
                case 'Ellipse':
                case 'Hyperbolic':
                    return Math.min(canonical.a2, canonical.b2) / Math.sqrt(Math.max(canonical.a2, canonical.b2));
                    break;
                case 'Parabolic':
                    return canonical.p;
                    break;
                default:
                    return null;
                break;
            }
        }

    }
});