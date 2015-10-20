define(['../../../utils/utils', 'mg-space2/utils/vec2'], function (utils, vec2) {

    return function (polar) {
        var self = this,
            obj;

        obj = {
            getEps: function () {
                var scale = polar.scale;
                return Math.sqrt(Math.abs(self.a * self.a - self.b * self.b)) / self.a;
            },
            setEps: function (e) {
                var scale = polar.scale,
                    p = this.getP(),
                    a, b;
                a = p / (1 - e * e);
                b = p / Math.sqrt(1 - e * e);
                self.a = self.a > self.b ? Math.max(a, b) : Math.min(a, b) / scale;
                self.b = self.a > self.b ? Math.min(a, b) : Math.max(a, b) / scale;
            },
            getP: function () {
                var scale = polar.scale;
                return (self.b * self.b) / self.a * scale;
            },
            setP: function (p) {
                var scale = polar.scale,
                    e = this.getEps(),
                    a, b;
                a = p / (1 - e * e);
                b = p / Math.sqrt(1 - e * e);
                self.a = self.a > self.b ? Math.max(a, b) : Math.min(a, b) / scale;
                self.b = self.a > self.b ? Math.min(a, b) : Math.max(a, b) / scale;
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
