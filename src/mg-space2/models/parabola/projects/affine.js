define(['../../../utils/utils', 'mg-space2/utils/vec2'], function (utils, vec2) {

    return function (affine) {
        var self = this,
            obj;

        obj = {
            getP: function () {
                var scaleX = vec2.length(affine.basis[0][0], affine.basis[0][1]),
                    scaleY = vec2.length(affine.basis[1][0], affine.basis[1][1]);
                return self.p * scaleY * scaleY / scaleX;
            },
            setP: function (p) {
                var scaleX = vec2.length(affine.basis[0][0], affine.basis[0][1]),
                    scaleY = vec2.length(affine.basis[1][0], affine.basis[1][1]);
                self.p = p * scaleY / scaleX / scaleX;
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
