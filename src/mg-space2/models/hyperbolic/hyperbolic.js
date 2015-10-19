define(['./projects/polar', './projects/affine'],
    function (make_polar_project, make_affine_project) {

        var prototype = {};
        prototype.make_project = function (axes) {
            var hyperbolic = this,
                proj;

            hyperbolic.projects = hyperbolic.projects || [];

            switch (axes.type) {
                case 'affine':
                    proj = make_affine_project.bind(this)(axes);
                    break;
                case 'polar':
                    proj = make_polar_project.bind(this)(axes);
                    break;
            }
            hyperbolic.projects.push(proj);
            return proj || null;
        };

        prototype.update = function () {
            var hyperbolic = this;

            hyperbolic.projects.forEach(function (proj) {
                proj.update();
            });

            return hyperbolic;
        };

        prototype.getType = function () {
            return hyperbolic.getType(this);
        };

        /**
         * Curve2 factory
         * @method space2.make_hyperbolic
         * @returns {Curve2}
         */
        return function make_hyperbolic() {
            var hyperbolic = Object.create(prototype);
            hyperbolic.a = 1;
            hyperbolic.b = 1;
            return hyperbolic;
        };

    });