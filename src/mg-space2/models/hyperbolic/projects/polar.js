define(['../../../utils/utils', 'mg-space2/utils/vec2'], function (utils, vec2) {

    return function (polar) {
        var self = this,
            obj;

        obj = {
            getEps: function () {
                var scale = polar.scale;
                return (self.a * self.a + self.b * self.b) / self.a * 2 * scale;
            },
            setEps: function (e) {
                var scale = polar.scale,
                    p = this.getP() * self.a / scale;
                self.a = e / 2 / scale - p;
                self.b = Math.sqrt(Math.abs(self.a * p));
            },
            getP: function () {
                var scale = polar.scale;
                return (self.b * self.b) / self.a * scale;
            },
            setP: function (p) {
                var scale = polar.scale,
                    e = this.getEps() * self.a / 2 / scale;
                self.a = e - p * self.a / scale;
                self.b = Math.sqrt(Math.abs(self.a * p * self.a / scale));
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

        return obj
    };
});
