define(['./projects/affine', './projects/polar'], function (make_affine_project, make_polar_project) {

    var prototype = {};

    prototype.make_project = function (axes) {
        switch (axes.type) {
            case 'affine':
                return make_affine_project.bind(this)(axes);
            case 'polar':
                return make_polar_project.bind(this)(axes);
        }
        return null;
    };

    return function make_line() {
        var line = Object.create(prototype);
        line.point1 = {};
        line.point2 = {};
        line.point1.x = 0;
        line.point1.y = 0;
        line.point2.x = 1;
        line.point2.y = 0;

        return line;
    };

});