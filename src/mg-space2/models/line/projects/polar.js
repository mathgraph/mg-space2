define(['mg-space2/utils/vec2'], function (vec2) {
    return function (polar) {
        var self = this;

        return {
            get point1() {
                return {
                    get r() {
                        var x = self.point1.x - polar.center[0],
                            y = self.point1.y - polar.center[1];
                        return vec2.length(x, y) * polar.scale;
                    },
                    set r(v) {
                        if (v < 0) {
                            throw new Error("r must be > 0")
                        } else {
                            v /= polar.scale;
                            self.point1.x = Math.cos(this.phi) * v + polar.center[0];
                            self.point1.y = Math.sin(this.phi) * v + polar.center[1];
                        }
                    },
                    get phi() {
                        var x = self.point1.x - polar.center[0],
                            y = self.point1.y - polar.center[1];
                        return vec2.angle(x, y);
                    },
                    set phi(v) {
                        var r;
                        if (v > Math.PI || v < -Math.PI) {
                            throw new Error("Phi must be in interval [-PI, PI]")
                        } else {
                            r = this.r / polar.scale;
                            self.point1.x = Math.cos(v) * r + polar.center[0];
                            self.point1.y = Math.sin(v) * r + polar.center[1];
                        }
                    }
                };
            },
            get point2() {
                return {
                    get r() {
                        var x = self.point2.x - polar.center[0],
                            y = self.point2.y - polar.center[1];
                        return vec2.length(x, y) * polar.scale;
                    },
                    set r(v) {
                        if (v < 0) {
                            throw new Error("r must be > 0")
                        } else {
                            v /= polar.scale;
                            self.point2.x = Math.cos(this.phi) * v + polar.center[0];
                            self.point2.y = Math.sin(this.phi) * v + polar.center[1];
                        }
                    },
                    get phi() {
                        var x = self.point2.x - polar.center[0],
                            y = self.point2.y - polar.center[1];
                        return vec2.angle(x, y);
                    },
                    set phi(v) {
                        var r;
                        if (v > Math.PI || v < -Math.PI) {
                            throw new Error("Phi must be in interval [-PI, PI]")
                        } else {
                            r = this.r / polar.scale;
                            self.point2.x = Math.cos(v) * r + polar.center[0];
                            self.point2.y = Math.sin(v) * r + polar.center[1];
                        }

                    }
                };
            },
            set point2(value) {
                if (value.phi > Math.PI || value.phi < -Math.PI) {
                    throw new Error("Phi must be in interval [-PI, PI]")
                } else {
                    if (value.r < 0) {
                        throw new Error("r must be > 0")
                    } else {
                        self.point2.x = Math.cos(value.phi) * value.r / polar.scale + polar.center[0];
                        self.point2.y = Math.sin(value.phi) * value.r / polar.scale + polar.center[1];
                    }
                }

            },
            set point1(value) {
                if (value.phi > Math.PI || value.phi < -Math.PI) {
                    throw new Error("Phi must be in interval [-PI, PI]")
                } else {
                    if (value.r < 0) {
                        throw new Error("r must be > 0")
                    } else {
                        self.point1.x = Math.cos(value.phi) * value.r / polar.scale + polar.center[0];
                        self.point1.y = Math.sin(value.phi) * value.r / polar.scale + polar.center[1];
                    }
                }
            },
            set polar_canonical(params) {
                var rho, theta, r, phi;
                rho = params.rho;
                theta = params.theta;
                r = rho;
                phi = theta;
                self.point1.x = Math.cos(phi) * r + polar.center[0];
                self.point1.y = Math.sin(phi) * r + polar.center[1];
                if (rho) {
                    r = 2 * rho;
                    phi = Math.PI / 3 - theta;
                }else {
                    phi = Math.PI / 2 - theta;
                    r = 1;
                }
                self.point2.x = Math.cos(phi) * r + polar.center[0];
                self.point2.y = Math.sin(phi) * r + polar.center[1];


            },
            get polar_canonical() {
                var rho, theta, point1 = {}, point2 = {}, A, B, C;
                point1.r = vec2.length(self.point1.x - polar.center[0], self.point1.y - polar.center[1]);
                point2.r = vec2.length(self.point2.x - polar.center[0], self.point2.y - polar.center[1]);
                point1.phi = vec2.angle(self.point1.x - polar.center[0], self.point1.y - polar.center[1]);
                point2.phi = vec2.angle(self.point2.x - polar.center[0], self.point2.y - polar.center[1]);
                A = self.point2.y - self.point1.y;
                B = self.point1.x - self.point2.x;
                C = -self.point1.x * A - self.point1.y * B;
                rho = (Math.abs(A * polar.center[0] + B * polar.center[1] + C) / Math.sqrt(A * A + B * B)) * polar.scale;
                if (rho) {
                    theta = point1.phi - Math.acos(rho / point1.phi);
                }else {
                    if (point1.r) {
                        theta = Math.PI / 2 - point1.phi;
                    }else {
                        theta = Math.PI / 2 - point2.phi;
                    }
                    if (theta > Math.PI / 2) {
                        theta -= Math.PI
                    }
                    if (theta < -Math.PI / 2) {
                        theta += Math.PI
                    }
                }
                return {rho: rho, theta: theta}
            }

        }
    };
});