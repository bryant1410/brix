KISSY.add("brix/gallery/toc/index", function(S, Brick) {

    function ToC() {
        ToC.superclass.constructor.apply(this, arguments);
    }

    ToC.ATTRS = {
        level: {
            value: 3
        },
        emptyLabel: {
            value: '（空）'
        },
        collapsedClass: {
            value: 'collapsed'
        },
        offsetTop: {
            value: 0
        }
    };

    ToC.EVENTS = {
        '': {
            mouseenter: function(e) {
                var container = this.get('container'),
                    collapsedClass=  this.get('collapsedClass');

                container.removeClass(collapsedClass);
            },
            mouseleave: function(e) {
                var container = this.get('container'),
                    collapsedClass=  this.get('collapsedClass');

                container.addClass(collapsedClass);
            }
        },
        '.j-entry': {
            click: function(e) {
                var targetId = S.Node(e.currentTarget).attr('href'),
                    target = S.one(targetId),
                    body = S.one('body'),
                    top,
                    timer,
                    step;

                e.preventDefault();
                if (!target) {
                    return;
                }
                top = target.offset().top - this.get('offsetTop');
                step = (top - body.scrollTop()) / 10;
                timer = setInterval(function() {
                    var stepTop = body.scrollTop() + step,
                        scrollTopBefore = body.scrollTop();

                    body.scrollTop( stepTop );
                    if (Math.abs(stepTop - top) < 50 ||
                            body.scrollTop() === scrollTopBefore) {
                        body.scrollTop(top);
                        clearInterval(timer);
                        target = body = timer = null;
                    }
                }, 20);
            }
        }
    };

    ToC.METHODS = {
        parse: function() {
            var essay = S.one(this.get('essay')),
                level = this.get('level'),
                hs = [], i,
                tree = [],
                hPrev,
                hPrevs = [],
                hIndex = 0,
                emptyLabel = this.get('emptyLabel');

            function getParentH(hCurrent) {
                var levelPrev = hPrev ? hPrev.level : 0,
                    levelCurrent = hCurrent.level,
                    h;

                if (levelCurrent - levelPrev >= 1) {
                    while (levelCurrent - levelPrev > 1) {
                        levelPrev += 1
                        h = hPrevs[levelPrev] = {
                            tag: 'h' + levelPrev,
                            text: emptyLabel,
                            children: [],
                            level: levelPrev,
                            id: getHID
                        };
                        hPrev.children.push(h);
                        hPrev = h;
                    }
                    return hPrev;
                }
                else {
                    return hPrevs[levelCurrent - 1];
                }
            }

            function getH(h) {
                var tag = h[0].tagName.toLowerCase();

                return {
                    tag: tag,
                    id: getHID(h),
                    level: parseInt(tag.substr(1), 10),
                    text: h.text() || emptyLabel,
                    children: []
                };
            }

            function getHID(h) {
                var id = h && h.attr('id');

                if (!id) {
                    id = 'h' + (hIndex++);
                    if (h) {
                        h.attr('id', id);
                    }
                }

                return id;
            }

            for (i = 0; i < level; i++) {
                hs[i] = 'h' + (i + 1);
            }
            essay.all(hs.join(',')).each(function(h) {
                var hData = getH(h),
                    parent;

                if (hData.tag === 'h1') {
                    tree.push(hData);
                }
                else {
                    parent = getParentH(hData);
                    parent.children.push(hData);
                }
                hPrev = hData;
                hPrevs[hData.level] = hData;
            });

            return tree;
        }
    };

    S.extend(ToC, Brick, {
        initialize: function() {
        }
    });

    S.augment(ToC, ToC.METHODS);

    return ToC;
}, {
    requires: ['brix/core/brick', 'sizzle']
});