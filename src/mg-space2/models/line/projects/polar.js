define(['mg-space2/utils/vec2'], function (vec2) {
    return function (polar) {
        var self = this,
            projP1 = self.point1.make_project(polar),
            projP2 = self.point2.make_project(polar);

        return {
            getPoint1: function () {
                return projP1;
            },
            setPoint1: function (p) {
                projP1.setPhi(p.phi);
                projP1.setR(p.r);
                return this;
            },
            getPoint2: function () {
                return projP2;
            },
            setPoint2: function (p) {
                projP2.setPhi(p.phi);
                projP2.setR(p.r);
                return this;
            },
            setPolarCanonical: function (params) {
                var that = this,
                    rho, theta, r, phi;
                rho = params.rho;
                theta = params.theta;
                r = rho;
                phi = theta;
                that.getPoint1().setPhi(phi);
                that.getPoint1().setR(r);
                if (rho) {
                    r = 2 * rho;
                    phi = Math.PI / 3 - theta;
                }else {
                    phi = Math.PI / 2 - theta;
                    r = 1;
                }
                that.getPoint2().setPhi(phi);
                that.getPoint2().setR(r);


            },
            getPolarCanonical: function () {
                var that = this,
                    rho, theta, point1 = {}, point2 = {}, A, B, C;
                point1 = that.getPoint1();
                point2 = that.getPoint2();
                A = self.point2.y - self.point1.y;
                B = self.point1.x - self.point2.x;
                C = -self.point1.x * A - self.point1.y * B;
                rho = (Math.abs(A * polar.center[0] + B * polar.center[1] + C) / Math.sqrt(A * A + B * B)) * polar.scale;
                if (rho) {
                    theta = point1.getPhi() - Math.acos(rho / point1.getPhi());
                }else {
                    if (point1.r) {
                        theta = Math.PI / 2 - point1.getPhi();
                    }else {
                        theta = Math.PI / 2 - point2.getPhi();
                    }
                    if (theta > Math.PI / 2) {
                        theta -= Math.PI
                    }
                    if (theta < -Math.PI / 2) {
                        theta += Math.PI
                    }
                }
                return {rho: rho, theta: theta}
            },
            translate: function (v) {
                var that = this;
                that.getPoint1().setR(that.getPoint1().getR() + v.r);
                that.getPoint1().setPhi(that.getPoint1().getPhi() + v.phi);
                that.getPoint2().setR(that.getPoint2().getR() + v.r);
                that.getPoint2().setPhi(that.getPoint2().getPhi() + v.phi);

                return that;
            },
            //update: function () {
            //    var that = this;
            //
            //    that.getPoint1().update();
            //    that.getPoint2().update();
            //    that.setPolarCanonical(that.polarCanonical);
            //
            //    return that;
            //},
            get point1() {
                return this.getPoint1();
            },
            set point1(v) {
                this.setPoint1(v);
            },
            get point2() {
                return this.getPoint2();
            },
            set point2(v) {
                this.setPoint2(v);
            },
            get polarCanonical() {
                return this.getCanonical()
            },
            set polarCanonical(v) {
                this.setCanonical(v)
            }

        }
    };
});