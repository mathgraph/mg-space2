define(['../../../utils/utils', 'mg-space2/utils/vec2'], function (utils, vec2) {

    return function (polar) {
        var self = this,
            obj;

        obj = {
            getEps: function () {
                var scale = polar.scale;
                return Math.sqrt(self.a * self.a + self.b * self.b) / self.a;
            },
            setEps: function (e) {
                var scale = polar.scale,
                    p = this.getP(),
                    a, b;
                a = p / (e * e - 1);
                b = p / Math.sqrt(e * e - 1);
                self.a = a / scale;
                self.b = b / scale;
            },
            getP: function () {
                var scale = polar.scale;
                return (self.b * self.b) / self.a * scale;
            },
            setP: function (p) {
                var scale = polar.scale,
                    e = this.getEps(),
                    a, b;
                a = p / (e * e - 1);
                b = p / Math.sqrt(e * e - 1);
                self.a = a / scale;
                self.b = b / scale;
            },
            get p() {
                return this.getP();
            },
            set p(v) {
                this.setP(v);
            },
            get eps() {
                return this.getEps();
            },
            set eps(e) {
                this.setEps(e);
            }
        };

        return obj;
    };
});
