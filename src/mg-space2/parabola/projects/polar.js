define(['mg-space2/utils/utils', 'mg-space2/utils/vec2'], function (utils, vec2) {

    return function (polar) {
        var self = this,
            obj;

        obj = {
            getP: function () {
                var scale = polar.scale;
                return self.p / scale;
            },
            setP: function (p) {
                var scale = polar.scale;
                self.p = p / scale;
            },
            get p() {
                return this.getP();
            },
            set p(v) {
                this.setP(v);
            }
        };

        return obj
    };
});
