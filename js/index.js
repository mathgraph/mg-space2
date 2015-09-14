require.config({
    baseUrl: './js',
    packages: [
        {
            name: 'mg-space2',
            location: './mg-space2',
            main: 'space2/space2'
        }
    ]
});

require(['mg-space2'], function (space2) {

    var canvas1 = document.getElementById('canvas1');
    var canvas2 = document.getElementById('canvas2');
    var canvas3 = document.getElementById('canvas3');
    var canvas4 = document.getElementById('canvas4');
    paper.setup(canvas1);
    paper.setup(canvas2);
    paper.setup(canvas3);
    paper.setup(canvas4);

    var space = space2;

    var my_point = space.make_point();
    my_point.x = 100;
    my_point.y = 100;

    var my_segment = space.make_segment();
    my_segment.point1.x = 10;
    my_segment.point1.y = 10;
    my_segment.point2.x = 50;
    my_segment.point2.y = 50;
    var systems = [];

    systems[0] = space.make_axes('affine');
    systems[0].basis = [[1, 0], [0, 1]];
    paper.projects[0].activate();
    var ox0 = new paper.Path.Line({
        from: [-300, 0],
        to: [300, 0],
        strokeWidth: 1,
        strokeColor: 'black'
    });
    var oy0 = new paper.Path.Line({
        from: [0, -300],
        to: [0, 300],
        strokeWidth: 1,
        strokeColor: 'black'
    });
    new paper.Path.RegularPolygon({
        sides: 3,
        radius: 10,
        fillColor: 'black'
    }).rotate(90).position = [300, 0];
    new paper.PointText({
        point: [270, 0],
        content: 'x',
        fillColor: 'red',
        fontSize: 30
    });
    new paper.Path.RegularPolygon({
        sides: 3,
        radius: 10,
        fillColor: 'black'
    }).rotate(180).position = [0, 200];
    new paper.PointText({
        point: [10, 180],
        content: 'y',
        fillColor: 'red',
        fontSize: 30
    });

    systems[1] = space.make_axes('affine');
    systems[1].basis = [[1, 0], [0, -1]];
    paper.projects[1].activate();
    var ox1 = new paper.Path.Line({
        from: [-300, 0],
        to: [300, 0],
        strokeWidth: 1,
        strokeColor: 'black'
    });
    var oy1 = new paper.Path.Line({
        from: [0, 300],
        to: [0, -300],
        strokeWidth: 1,
        strokeColor: 'black'
    });
    new paper.Path.RegularPolygon({
        sides: 3,
        radius: 10,
        fillColor: 'black'
    }).rotate(90).position = [300, 0];
    new paper.PointText({
        point: [270, 0],
        content: 'x',
        fillColor: 'red',
        fontSize: 30
    });
    new paper.Path.RegularPolygon({
        sides: 3,
        radius: 10,
        fillColor: 'black'
    }).rotate(0).position = [0, -200];
    new paper.PointText({
        point: [10, -180],
        content: 'y',
        fillColor: 'red',
        fontSize: 30
    });

    systems[2] = space.make_axes('affine');
    systems[2].basis = [[0, 1], [1, 0]];
    paper.projects[2].activate();
    var ox2 = new paper.Path.Line({
        from: [0, -300],
        to: [0, 300],
        strokeWidth: 1,
        strokeColor: 'black'
    });
    var oy2 = new paper.Path.Line({
        from: [-300, 0],
        to: [300, 0],
        strokeWidth: 1,
        strokeColor: 'black'
    });
    new paper.Path.RegularPolygon({
        sides: 3,
        radius: 10,
        fillColor: 'black'
    }).rotate(180).position = [0, 200];
    new paper.PointText({
        point: [10, 180],
        content: 'x',
        fillColor: 'red',
        fontSize: 30
    });
    new paper.Path.RegularPolygon({
        sides: 3,
        radius: 10,
        fillColor: 'black'
    }).rotate(90).position = [300, 0];
    new paper.PointText({
        point: [270, 0],
        content: 'y',
        fillColor: 'red',
        fontSize: 30
    });

    systems[3] = space.make_axes('polar');
    paper.projects[3].activate();
    var or = new paper.Path.Line({
        from: [0, 0],
        to: [300, 0],
        strokeWidth: 1,
        strokeColor: 'black'
    });
    for (i = 0; i < 10; i++) {
        new paper.Path.Circle({
            center: [0, 0],
            radius: i * 30,
            strokeColor: 'black',
            strokeWidth: 1
        });
    }

    projections = [];
    segment_projections = [];
    for (var i = 0; i < 4; i++) {
        projections.push(my_point.make_project(systems[i]));
        segment_projections.push(my_segment.make_project(systems[i]));
    }

    var renders = [];
    var segment_renders = [];

    projections.forEach(function (p, index) {
        paper.projects[index].activate();
        var s = paper.view.viewSize;
        new paper.PointText({
            point: [-s.width / 2, -s.height / 2 + 40],
            content: index,
            fillColor: 'green',
            fontSize: 50
        });
        paper.view.center = [0, 0];
        var point = [my_point.x, my_point.y];
//            switch (index) {
//                case 0:
//                    point = [p.x, -p.y];
//                    break;
//                case 1:
//                    point = [p.x, p.y];
//                    break;
//                case 2:
//                    point = [p.y, -p.x];
//                    break;
//                case 3:
//                    point = [p.r * Math.cos(-p.phi), p.r * Math.sin(-p.phi)]
//                    break;
//            }
        renders.push(new paper.Path.Circle({
            center: point,
            radius: 10,
            fillColor: 'red'
        }));
        paper.view.draw();
    });

    segment_projections.forEach(function (p, index) {
        paper.projects[index].activate();

        paper.view.center = [0, 0];
        var point1 = [my_segment.point1.x, my_segment.point1.y];
        var point2 = [my_segment.point2.x, my_segment.point2.y];

        segment_renders.push(new paper.Path.Line({
            from: point1,
            to: point2,
            strokeColor: 'green'
        }));
        paper.view.draw();
    });

//        var update = function (value) {
//            renders.forEach(function (r, index) {
//                var p = projections[index];
//                var point = [my_point.x, my_point.y];
////                switch (index) {
////                    case 0:
////                        point = [p.x, -p.y];
////                        break;
////                    case 1:
////                        point = [p.x, p.y];
////                        break;
////                    case 2:
////                        point = [p.y, -p.x];
////                        break;
////                    case 3:
////                        point = [p.r * Math.cos(-p.phi), p.r * Math.sin(-p.phi)]
////                        break;
////                }
//                r.position = point;
//                paper.projects[index].view.draw();
//            });
//
//        };

    var update = function (value) {

        segment_renders.forEach(function (r, index) {
            var p = segment_projections[index];
            var p1 = [my_segment.point1.x, my_segment.point1.y];
            var p2 = [my_segment.point2.x, my_segment.point2.y];
//                r.position = [(p2[0] + p1[0]) / 2, (p2[1] + p1[1]) / 2];

            r.firstSegment.point.x = p1[0];
            r.firstSegment.point.y = p1[1];
            r.lastSegment.point.x = p2[0];
            r.lastSegment.point.y = p2[1];

            paper.projects[index].view.draw();
        });
    };

    var gui = new dat.GUI();

//        var global = gui.addFolder('Global');
//        var x_controller = global.add(my_point, 'x', -300, 300).listen();
//        var y_controller = global.add(my_point, 'y', -300, 300).listen();
//        x_controller.onChange(update);
//        y_controller.onChange(update);
//        global.open();
//
//        projections.forEach(function (proj, index) {
//            var t = systems[index].type;
//            var f = gui.addFolder(index);
//            if (t == 'affine') {
//                var x_controller = f.add(proj, 'x', -300, 300).listen();
//                var y_controller = f.add(proj, 'y', -300, 300).listen();
//                x_controller.onChange(update);
//                y_controller.onChange(update);
//            } else {
//                var r_controller = f.add(proj, 'r', 0, 300).listen();
//                var phi_controller = f.add(proj, 'phi', -Math.PI, Math.PI).listen();
//                r_controller.onChange(update);
//                phi_controller.onChange(update);
//            }
//            f.open();
//        })

    var global = gui.addFolder('Global');
    //var point1_x_controller = global.add(my_segment.point1, 'x', -300, 300).listen();
    //var point1__y_controller = global.add(my_segment.point1, 'y', -300, 300).listen();
    //var point2_x_controller = global.add(my_segment.point2, 'x', -300, 300).listen();
    //var point2__y_controller = global.add(my_segment.point2, 'y', -300, 300).listen();
    //point1_x_controller.onChange(update);
    //point1__y_controller.onChange(update);
    //point2_x_controller.onChange(update);
    //point2__y_controller.onChange(update);
    //var point1_x_controller = global.add(my_segment, 'angle', -300, 300).listen();
    //var point1_y_controller = global.add(my_point, 'length', -300, 300).listen();
    //point1_x_controller.onChange(update);
    //point1_y_controller.onChange(update);
    global.open();


    segment_projections.forEach(function (proj, index) {
        var t = systems[index].type;
        var f = gui.addFolder(index);
        if (t == 'affine') {
            //var point1_x_controller = f.add(proj.point1, 'x', -300, 300).listen();
            //var point1_y_controller = f.add(proj.point1, 'y', -300, 300).listen();
            //var point2_x_controller = f.add(proj.point2, 'x', -300, 300).listen();
            //var point2_y_controller = f.add(proj.point2, 'y', -300, 300).listen();
            //point1_x_controller.onChange(update);
            //point1_y_controller.onChange(update);
            //point2_x_controller.onChange(update);
            //point2_y_controller.onChange(update);
            var point1_x_controller = f.add(proj, 'angle', -300, 300).listen();
            var point1_y_controller = f.add(proj, 'length', -300, 300).listen();
            point1_x_controller.onChange(update);
            point1_y_controller.onChange(update);
        } else {
            var point1_r_controller = f.add(proj.point1, 'r', 0, 300).listen();
            var point1_phi_controller = f.add(proj.point1, 'phi', -Math.PI, Math.PI).listen();
            var point2_r_controller = f.add(proj.point2, 'r', 0, 300).listen();
            var point2_phi_controller = f.add(proj.point2, 'phi', -Math.PI, Math.PI).listen();
            point1_r_controller.onChange(update);
            point1_phi_controller.onChange(update);
            point2_r_controller.onChange(update);
            point2_phi_controller.onChange(update);
        }
        f.open();
    });
});