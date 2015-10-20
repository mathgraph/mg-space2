define(['../../../utils/utils', 'mg-space2/utils/vec2'], function (utils, vec2) {

    return function (affine) {
        var self = this,
            obj;

        obj = {
            getA: function () {
                var scaleX = vec2.length(affine.basis[0][0], affine.basis[0][1]);
                return self.a * scaleX;
            },
            setA: function (a) {
                var scaleX = vec2.length(affine.basis[0][0], affine.basis[0][1]);
                self.a = a * scaleX;
            },
            get a() {
                return this.getA();
            },
            set a(v) {
                this.setA(v);
            },
            getB: function () {
                var scaleY = vec2.length(affine.basis[1][0], affine.basis[1][1]);
                return self.b * scaleY;
            },
            setB: function (b) {
                var scaleY = vec2.length(affine.basis[1][0], affine.basis[1][1]);
                self.b = b * scaleY;
            },
            get b() {
                return this.getB();
            },
            set b(v) {
                this.setB(v);
            },
            getEccentricity: function () {
                return Math.sqrt(Math.abs(this.a * this.a - this.b * this.b)) / this.a;
            },
            get eccentricity() {
                return this.getEccentricity();
            },
            getP: function () {
                return (this.b * this.b) / this.a;
            },
            get p() {
                return this.getP();
            }
        };

        return obj
    };
});
