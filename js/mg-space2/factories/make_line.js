(function (space2) {



    var prototype, make_polar_project, make_affine_project;
    prototype = {};


    prototype.make_project = function (axes) {
        switch (axes.type) {
            case 'affine':
                return make_affine_project.bind(this)(axes);
            case 'polar':
                return make_polar_project.bind(this)(axes);
        }
        return null;
    };


    make_polar_project = function (polar) {
        var self = this;

        return {
            get point1() {
                return {
                    get r() {
                        var x = self.point1.x - polar.center[0],
                            y = self.point1.y - polar.center[1];
                        return space2.utils.vec2.length(x, y) * polar.scale;
                    },
                    set r(v) {
                        v /= polar.scale;
                        self.point1.x = Math.cos(this.phi) * v + polar.center[0];
                        self.point1.y = Math.sin(this.phi) * v + polar.center[1];
                    },
                    get phi() {
                        var x = self.point1.x - polar.center[0],
                            y = self.point1.y - polar.center[1];
                        return space2.utils.vec2.angle(x, y);
                    },
                    set phi(v) {
                        var r = this.r / polar.scale;
                        self.point1.x = Math.cos(v) * r + polar.center[0];
                        self.point1.y = Math.sin(v) * r + polar.center[1];
                    }
                };
            },
            get point2() {
                return {
                    get r() {
                        var x = self.point2.x - polar.center[0],
                            y = self.point2.y - polar.center[1];
                        return space2.utils.vec2.length(x, y) * polar.scale;
                    },
                    set r(v) {
                        v /= polar.scale;
                        self.point2.x = Math.cos(this.phi) * v + polar.center[0];
                        self.point2.y = Math.sin(this.phi) * v + polar.center[1];
                    },
                    get phi() {
                        var x = self.point2.x - polar.center[0],
                            y = self.point2.y - polar.center[1];
                        return space2.utils.vec2.angle(x, y);
                    },
                    set phi(v) {
                        var r = this.r / polar.scale;
                        self.point2.x = Math.cos(v) * r + polar.center[0];
                        self.point2.y = Math.sin(v) * r + polar.center[1];
                    }
                };
            },
            set polar_canonical(params) {
                var rho, theta, r, phi;
                rho = params.rho;
                theta = params.theta;
                r = rho;
                phi = theta;
                self.point1.x = Math.cos(phi) * r + polar.center[0];
                self.point1.y = Math.sin(phi) * r + polar.center[1];
                r = 2 * rho;
                phi = Math.PI / 3 - theta;
                self.point2.x = Math.cos(phi) * r + polar.center[0];
                self.point2.y = Math.sin(phi) * r + polar.center[1];

            },
            get polar_canonical() {
                var rho, theta, point1 = {}, A, B, C;
                point1.r = space2.utils.vec2.length(self.point1.x - polar.center[0], self.point1.y - polar.center[1]);
                point1.phi = space2.utils.vec2.angle(self.point1.x - polar.center[0], self.point1.y - polar.center[1]);
                A = self.point2.y - self.point1.y;
                B = self.point1.x - self.point2.x;
                C = -self.point1.x * (self.point2.y - self.point1.y) + self.point1.y * (self.point2.x - self.point1.x);

                rho = (Math.abs(A * polar.center[0] + B * polar.center[1] + C) / Math.sqrt(A ^ 2 + B ^ 2)) * polar.scale;
                theta = point1.phi = Math.acos(rho / point1.phi);
                return {rho: rho, theta: theta}
            }

        }
    };


    make_affine_project = function (affine) {
        var self = this;



        return {
            get point1() {
                var vec;
                return {
                    get x() {

                        return space2.utils.vec2.product([self.point1.x, self.point1.y], affine.to_local)[0];
                    },
                    set x(v) {
                        vec = space2.utils.vec2.product([v, self.point1.y], affine.to_global);
                        self.point1.x = vec[0];
                        self.point1.y = vec[1]
                    },
                    get y() {
                        return space2.utils.vec2.product([self.point1.x, self.point1.y], affine.to_local)[1];
                    },
                    set y(v) {
                        vec = space2.utils.vec2.product([self.point1.x, v], affine.to_global);
                        self.point1.x = vec[0];
                        self.point1.y = vec[1]
                    }
                };
            },
            get point2() {
                var vec;
                return {
                    get x() {
                        return space2.utils.vec2.product([self.point2.x, self.point2.y], affine.to_local)[0];
                    },
                    set x(v) {
                        vec = space2.utils.vec2.product([v, self.point2.y], affine.to_global);
                        self.point2.x = vec[0];
                        self.point2.y = vec[1]
                    },
                    get y() {
                        return space2.utils.vec2.product([self.point2.x, self.point2.y], affine.to_local)[1];
                    },
                    set y(v) {
                        vec = space2.utils.vec2.product([self.point2.x, v], affine.to_global);
                        self.point2.x = vec[0];
                        self.point2.y = vec[1]
                    }
                };
            },
            set canonical(params) {
                var A, B, C, vec;
                A = params.A;
                B = params.B;
                C = params.C;
                if (B) {
                    vec = space2.utils.vec2.product([0, -C / B], affine.to_global);
                    self.point1.x = vec[0];
                    self.point1.y = vec[1];
                    vec = space2.utils.vec2.product([1, -(C + A) / B], affine.to_global);
                    self.point2.x = vec[0];
                    self.point2.y = vec[1];
                } else {
                    if (A) {
                        vec = space2.utils.vec2.product([-C / A, 0], affine.to_global);
                        self.point1.x = vec[0];
                        self.point1.y = vec[1];
                        vec = space2.utils.vec2.product([-(C + B) / A, 1], affine.to_global);
                        self.point2.x = vec[0];
                        self.point2.y = vec[1];
                    }else {
                        throw new Error("����� ������ �� ����������")
                    }
                }
            },
            get canonical() {
                var A, B, C, point1, point2;
                point1 = space2.utils.vec2.product([self.point1.x, self.point1.y], affine.to_local);
                point2 = space2.utils.vec2.product([self.point2.x, self.point2.y], affine.to_local);

                A = 1 / (point2[1] - point1[1]);
                B = 1 / (point1[0] - point2[0]);
                C = -point1[0] * (point2[0] - point1[0]) + point1[1] * (point2[1] - point1[1]);
                return {A: A, B: B, C: C}
            },
            set angular_coefficient(params) {
                var k, b, vec;
                k = params.k;
                b = params.b;
                vec = space2.utils.vec2.product([0, b], affine.to_global);
                self.point1.x = vec[0];
                self.point1.y = vec[1];
                vec = space2.utils.vec2.product([1, k + b], affine.to_global);
                self.point2.x = vec[0];
                self.point2.y = vec[1];


            },
            get angular_coefficient() {
                var k, b, point1, point2;
                point1 = space2.utils.vec2.product([self.point1.x, self.point1.y], affine.to_local);
                point2 = space2.utils.vec2.product([self.point2.x, self.point2.y], affine.to_local);

                k = (point2[1] - point1[1]) / (point2[0] - point1[0]);
                b = point1[1] - k * point1[0];
                return {k: k, b: b}
            }

        }
    };

    space2.make_line = function () {
        var line = Object.create(prototype);
        line.point1 = {};
        line.point2 = {};
        line.point1.x = 0;
        line.point1.y = 0;
        line.point2.x = 1;
        line.point2.y = 0;

        return line;
    };

})(space2);