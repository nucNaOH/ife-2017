var TodoMVC;
(function () {
    TodoMVC = {};
    // model
    TodoMVC.model = function () {
        var M = {};
        M.data = {
            tasks: [
                createRandomTask(),
                createRandomTask(),
                createRandomTask(),
                createRandomTask(),
                createRandomTask(),
            ]
        };
        return {
            getData: function (m) {
                return M.data[m];
            },
            setData: function (m, d) {
                M.data[m] = d;
                return this;
            }
        }
    } ();
    // view
    TodoMVC.view = function () {
        var M = TodoMVC.model;
        var V = {
            tpl: {
                todoItem: function () {
                    return [
                        '<div class="content-item" data-id="{id}" data-datetime="{datetime}">',
                            '<div class="content-icon">',
                                '<i class="{progress} {priority}"></i>',
                            '</div>',
                            '<div class="content-paragraph">{content}</div>',
                            '<div class="content-operation content-operation-left">',
                                '<div class="content-button">编辑</div>',
                                '<div class="content-button">删除</div>',
                            '</div>',
                            '<div class="content-operation content-operation-right">',
                                '<div class="content-button">已完成</div>',
                                '<div class="content-button">待办</div>',
                                '<div class="content-button">进行中</div>',
                            '</div>',
                        '</div>'
                    ].join('');
                } (),
                todoIcon: {
                    progress: {
                        todo: 'icon-triangle',
                        doing: 'icon-double',
                        done: 'icon-rectangle'
                    },
                    priority: {
                        high: 'bd-left-red',
                        middle: 'bd-left-yellow',
                        low: 'bd-left-green'
                    }
                }
            },
            showTodoList: function () {
                var container = document.querySelector('.content-list');
                var data = M.getData('tasks');
                var tpl = V.tpl;
                if (!data || !data.length) {
                    return
                }
                var taskListTpl = '';
                for (var i = 0; i < data.length; i++) {
                    var task = data[i], taskTpl = tpl.todoItem;
                    for (var prop in task) {
                        var replace = task[prop];
                        if (prop === 'priority' || prop === 'progress') {
                            replace = tpl.todoIcon[prop][task[prop]]
                        }
                        taskTpl = taskTpl.replace('{' + prop + '}', replace);
                    }
                    taskListTpl += taskTpl;
                }
                container.innerHTML = taskListTpl;
                V.addEvent();
            },
            addEvent: function () {
                var items = document.querySelectorAll('.content-item');
                items.forEach(function (item, idx) {
                    V.touchEvent.addTo(item);
                })
            },
            touchEvent: {
                data: {
                    startX: 0,
                    startY: 0,
                    startTranslateX: 0,
                    startTranslateY: 0
                },
                touchstart: function (e) {
                    e.preventDefault();
                    console.log('touch start', e);

                    // 获取接触屏幕时的X和Y
                    V.touchEvent.data.startX = e.changedTouches[0].pageX;
                    V.touchEvent.data.startY = e.changedTouches[0].pageY;

                    // 获取接触屏幕时operation的translate值
                    var operationLeft = e.target.querySelector('.content-operation-left');
                    operationLeft.style.display = 'block';
                    var operationRight = e.target.querySelector('.content-operation-right');
                    operationRight.style.display = 'block';

                    // var style = getComputedStyle(operation);
                    // var transform = style.transform;
                    // // transform: matrix(1, 0, 0, 1, -128, 0);
                    // var match = transform.match(/matrix\(1, 0, 0, 1, (-?[\d.]*), (-?[\d.]*)/);
                    // if (match) {
                    //     V.touchEvent.data.startTranslateX = parseInt(match[1]);
                    //     V.touchEvent.data.startTranslateY = parseInt(match[2]);
                    // }
                    e.target.addEventListener('touchmove', V.touchEvent.touchmove);
                    e.target.addEventListener('touchend', V.touchEvent.touchend);
                },
                touchmove: function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('touch move');
                    // 获取滑动屏幕时的X,Y
                    var endX = e.changedTouches[0].pageX;
                    var endY = e.changedTouches[0].pageY;
                    //获取滑动距离
                    var distanceX = endX - V.touchEvent.data.startX;
                    var distanceY = endY - V.touchEvent.data.startY;
                    if (distanceX >= 0) {
                        var operation = e.target.querySelector('.content-operation-left');
                        // operation.style.display = 'block';
                        var width = parseInt(getComputedStyle(operation).width);
                        distanceX = distanceX < width ? distanceX : width;
                        operation.style.transform = 'translateX(' + (distanceX - width) + 'px)';
                    } else {
                        var operation = e.target.querySelector('.content-operation-right');
                        // operation.style.display = 'block';
                        var width = parseInt(getComputedStyle(operation).width);
                        console.log(distanceX, width);
                        distanceX = -distanceX < width ? -distanceX : width;
                        operation.style.transform = 'translateX(' + (width - distanceX) + 'px)';
                    }
                    // console.log(distanceX, distanceY);
                },
                touchend: function (e) {
                    e.preventDefault();
                    console.log('touch end', e);
                    // 获取滑动屏幕时的X,Y
                    var endX = e.changedTouches[0].pageX;
                    var endY = e.changedTouches[0].pageY;
                    //获取滑动距离
                    var distanceX = endX - V.touchEvent.data.startX;
                    var distanceY = endY - V.touchEvent.data.startY;
                    //滑动方向
                    if (Math.abs(distanceX) > Math.abs(distanceY) && distanceX > 50) {
                        console.log('往右滑动');
                    } else if (Math.abs(distanceX) > Math.abs(distanceY) && distanceX < -50) {
                        console.log('往左滑动');
                    } else if (Math.abs(distanceX) < Math.abs(distanceY) && distanceY < -50) {
                        console.log('往上滑动');
                    } else if (Math.abs(distanceX) < Math.abs(distanceY) && distanceY > 50) {
                        console.log('往下滑动');
                    }
                    // 
                    var operationLeft = e.target.querySelector('.content-operation-left');
                    // operationLeft.style.display = 'none';
                    var operationRight = e.target.querySelector('.content-operation-right');
                    // operationRight.style.display = 'none';

                    e.target.removeEventListener('touchmove', V.touchEvent.touchmove);
                    e.target.removeEventListener('touchend', V.touchEvent.touchend);
                },
                addTo: function (dom) {
                    dom.addEventListener('touchstart', V.touchEvent.touchstart);
                }
            }
        };
        return function (v) {
            V[v]();
        }
    } ();
    // controller
    TodoMVC.controller = function () {
        var M = TodoMVC.model;
        var V = TodoMVC.view;
        var C = {
            showTodoList: function () {
                V('showTodoList');
            }
        }
        C.showTodoList();
    } ();
})();