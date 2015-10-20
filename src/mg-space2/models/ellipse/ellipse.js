define(['./projects/polar', './projects/affine'],
    function (make_polar_project, make_affine_project) {

        var prototype = {};
        prototype.make_project = function (axes) {
            var ellipse = this,
                proj;

            ellipse.projects = ellipse.projects || [];

            switch (axes.type) {
                case 'affine':
                    proj = make_affine_project.bind(this)(axes);
                    break;
                case 'polar':
                    proj = make_polar_project.bind(this)(axes);
                    break;
            }
            ellipse.projects.push(proj);
            return proj || null;
        };

        prototype.update = function () {
            var ellipse = this;

            ellipse.projects.forEach(function (proj) {
                proj.update();
            });

            return ellipse;
        };

        prototype.getType = function () {
            return ellipse.getType(this);
        };

        /**
         * Curve2 factory
         * @method space2.make_ellipse
         * @returns {Curve2}
         */
        return function make_ellipse() {
            var ellipse = Object.create(prototype);
            ellipse.a = 1;
            ellipse.b = 1;
            return ellipse;
        };

    });