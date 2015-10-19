define(['./projects/polar', './projects/affine'],
    function (make_polar_project, make_affine_project) {

        var prototype = {};
        prototype.make_project = function (axes) {
            var parabola = this,
                proj;

            parabola.projects = parabola.projects || [];

            switch (axes.type) {
                case 'affine':
                    proj = make_affine_project.bind(this)(axes);
                    break;
                case 'polar':
                    proj = make_polar_project.bind(this)(axes);
                    break;
            }
            parabola.projects.push(proj);
            return proj || null;
        };

        prototype.update = function () {
            var parabola = this;

            parabola.projects.forEach(function (proj) {
                proj.update();
            });

            return parabola;
        };

        prototype.getType = function () {
            return parabola.getType(this);
        };

        /**
         * Curve2 factory
         * @method space2.make_parabola
         * @returns {Curve2}
         */
        return function make_parabola() {
            var parabola = Object.create(prototype);
            parabola.p = 1;
            return parabola;
        };

    });