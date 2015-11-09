define(['../../../utils/utils', 'mg-space2/utils/vec2'], function (utils, vec2) {

    return function (polar) {
        var self = this,
            obj;

        obj = {
            getEps: function () {
                var scale = polar.scale,
                    big = Math.max(self.a, self.b),
                    small = Math.min(self.a, self.b);
                return Math.sqrt(big * big - small * small) / big;
            },
            setEps: function (e) {
                var scale = polar.scale,
                    p = this.getP(),
                    big, small, a, b;
                big = p / (1 - e * e);
                small = p / Math.sqrt(1 - e * e);
                a = self.a;
                b = self.b;
                self.a = a >= b ? big : small / scale;
                self.b = a >= b ? small : big / scale;
            },
            getP: function () {
                var scale = polar.scale,
                    big = Math.max(self.a, self.b),
                    small = Math.min(self.a, self.b);
                return (small * small) / big * scale;
            },
            setP: function (p) {
                var scale = polar.scale,
                    e = this.getEps(),
                    big, small, a, b;
                big = p / (1 - e * e);
                small = p / Math.sqrt(1 - e * e);
                a = self.a;
                b = self.b;
                self.a = a >= b ? big : small / scale;
                self.b = a >= b ? small : big / scale;
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
