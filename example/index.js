require.config({
    baseUrl: '../src',
    packages: [
        {
            name: 'mg-space2',
            location: './mg-space2',
            main: 'space2/space2'
        }
    ]
});


require(['mg-space2'], function (space2) {
    var space, systems, my_point, i, projections, renders,
        gui, global, x_controller, y_controller, update;


    space = space2;
    systems = make_axes(space);
    //test_segment(systems, space2);
    test_curve2(systems, space2);

});


function make_axes(space) {
    var canvas1, canvas2, canvas3, canvas4, systems, i, s,
        ox0, ox1, ox2,
        oy0, oy1, oy2, or;

    canvas1 = document.getElementById('canvas1');
    canvas2 = document.getElementById('canvas2');
    canvas3 = document.getElementById('canvas3');
    canvas4 = document.getElementById('canvas4');
    paper.setup(canvas1);
    paper.setup(canvas2);
    paper.setup(canvas3);
    paper.setup(canvas4);
    systems = [];

    systems[0] = space.make_axes('affine');
    systems[0].basis = [[1, 0], [0, 0]];
    paper.projects[0].activate();
    s = paper.view.viewSize;
    new paper.PointText({
        point: [-s.width / 2, -s.height / 2 + 40],
        content: 0,
        fillColor: 'green',
        fontSize: 50
    });
    paper.view.center = new paper.Point(0, 0);
    paper.view.draw();
    ox0 = new paper.Path.Line({
        from: [-300, 0],
        to: [300, 0],
        strokeWidth: 1,
        strokeColor: 'black'
    });
    oy0 = new paper.Path.Line({
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
    s = paper.view.viewSize;
    new paper.PointText({
        point: [-s.width / 2, -s.height / 2 + 40],
        content: 1,
        fillColor: 'green',
        fontSize: 50
    });
    paper.view.center = new paper.Point(0, 0);
    paper.view.draw();
    ox1 = new paper.Path.Line({
        from: [-300, 0],
        to: [300, 0],
        strokeWidth: 1,
        strokeColor: 'black'
    });
    oy1 = new paper.Path.Line({
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
    s = paper.view.viewSize;
    new paper.PointText({
        point: [-s.width / 2, -s.height / 2 + 40],
        content: 2,
        fillColor: 'green',
        fontSize: 50
    });
    paper.view.center = new paper.Point(0, 0);
    paper.view.draw();
    ox2 = new paper.Path.Line({
        from: [0, -300],
        to: [0, 300],
        strokeWidth: 1,
        strokeColor: 'black'
    });
    oy2 = new paper.Path.Line({
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
    s = paper.view.viewSize;
    new paper.PointText({
        point: [-s.width / 2, -s.height / 2 + 40],
        content: 3,
        fillColor: 'green',
        fontSize: 50
    });
    paper.view.center = new paper.Point(0, 0);
    paper.view.draw();
    or = new paper.Path.Line({
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
    return systems;
}

function draw_point(point) {
    return new paper.Path.Circle({
        center: point,
        radius: 10,
        fillColor: 'red'
    })
}

function draw_segment(to, from) {
    return new paper.Path.Line({
        from: from,
        to: to,
        strokeColor: 'green'
    })
}

function test_point(systems, space) {
    var my_point, i, projections, renders,
        gui, global, x_controller, y_controller, update;
    my_point = space.make_point();
    my_point.x = 100;
    my_point.y = 100;

    projections = [];
    for (i = 0; i < 4; i++) {
        projections.push(my_point.make_project(systems[i]));
    }
    renders = [];

    projections.forEach(function (p, index) {
        var point;
        paper.projects[index].activate();
        point = [my_point.x, my_point.y];
        renders.push(draw_point(point));
        paper.view.draw();
    });

    update = function (value) {
        var p, point;
        renders.forEach(function (r, index) {
            p = projections[index];
            point = [my_point.x, my_point.y];
            r.position = point;
            console.log(index, renders.length - 1);
            index === renders.length - 1 && (r.position.y = -r.position.y);
            paper.projects[index].view.draw();
        });

    };


    gui = new dat.GUI();

    global = gui.addFolder('Global');
    x_controller = global.add(my_point, 'x', -300, 300).listen();
    y_controller = global.add(my_point, 'y', -300, 300).listen();
    x_controller.onChange(update);
    y_controller.onChange(update);
    global.open();

    projections.forEach(function (proj, index) {
        var t, f, x_controller, y_controller, r_controller, phi_controller;

        t = systems[index].type;
        f = gui.addFolder(index);
        if (t == 'affine') {
            x_controller = f.add(proj, 'x', -300, 300).listen();
            y_controller = f.add(proj, 'y', -300, 300).listen();
            x_controller.onChange(update);
            y_controller.onChange(update);
        } else {
            r_controller = f.add(proj, 'r', 0, 300).listen();
            phi_controller = f.add(proj, 'phi', -Math.PI, Math.PI).listen();
            r_controller.onChange(update);
            phi_controller.onChange(update);
        }
        f.open();
    })
}

function test_segment(systems, space) {
    var my_segment, i, projections, renders,
        gui, global, x_controller, y_controller, update;
    my_segment = space.make_segment();
    my_segment.point1.x = 10;
    my_segment.point2.x = 100;
    my_segment.point1.y = 10;
    my_segment.point2.y = 100;
    projections = [];
    for (i = 0; i < 4; i++) {
        projections.push(my_segment.make_project(systems[i]));
    }
    renders = [];

    projections.forEach(function (p, index) {
        var to, from;
        paper.projects[index].activate();
        to = [my_segment.point1.x, my_segment.point1.y];
        from = [my_segment.point2.x, my_segment.point2.y];

        renders.push(draw_segment(to, from));
        paper.view.draw();
    });

    update = function (value) {
        var p, point;
        renders.forEach(function (r, index) {
            p = projections[index];
            r.firstSegment.point.x = my_segment.point1.x;
            r.firstSegment.point.y = my_segment.point1.y;
            r.lastSegment.point.x = my_segment.point2.x;
            r.lastSegment.point.y = my_segment.point2.y;
            index === renders.length - 1 && (r.firstSegment.point.y = -r.firstSegment.point.y);
            index === renders.length - 1 && (r.lastSegment.point.y = -r.lastSegment.point.y);
            paper.projects[index].view.draw();
        });

    };


    gui = new dat.GUI();

    global = gui.addFolder('Global');
    x_controller = global.add(my_segment.point1, 'x', -300, 300).listen();
    y_controller = global.add(my_segment.point1, 'y', -300, 300).listen();
    x_controller.onChange(update);
    y_controller.onChange(update);
    global.open();

    projections.forEach(function (proj, index) {
        var t, f, x_controller, y_controller, r_controller, phi_controller;

        t = systems[index].type;
        f = gui.addFolder(index);
        if (t == 'affine') {
            x_controller = f.add(proj.point1, 'x', -300, 300).listen();
            y_controller = f.add(proj.point1, 'y', -300, 300).listen();
            x_controller.onChange(update);
            y_controller.onChange(update);
        } else {
            r_controller = f.add(proj.point1, 'r', 0, 300).listen();
            phi_controller = f.add(proj.point1, 'phi', -Math.PI, Math.PI).step(0.1).listen();
            r_controller.onChange(update);
            phi_controller.onChange(update);
        }
        f.open();
    })
}

function test_curve2(systems, space2) {
    var my_curve, proj;
    my_curve = space2.make_curve2();

    proj = my_curve.make_project(systems[0]);
    console.log(proj.getEquation());
    proj.setEquation({
        A: 1,
        B: 0,
        C: 0,
        D: 0,
        E: 0,
        F: 0
    });
    console.log(proj.getEquation());
    console.log(proj.getEquationAsString());
    //console.log(proj.getEccentricity())
    //console.log(proj.getFocalDistance())
}