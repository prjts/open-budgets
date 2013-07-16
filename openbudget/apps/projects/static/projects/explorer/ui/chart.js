define([
    'uijet_dir/uijet',
    'project_widgets/TimelineChart',
    'project_widgets/Select',
    'controllers/TimelineChart'
], function (uijet) {

    uijet.Factory('ChartPeriodSelect', {
        type    : 'Select',
        config  : {
            wrapper_class   : 'chart_period_select',
            menu            : {
                mixins          : ['Templated'],
                template_name   : 'chart_period_select',
                wrapper_class   : 'chart_period_select_wrapper',
                signals         : {
                    pre_wake    : function () {
                        return false;
                    }
                },
                app_events      : {
                    'chart.fetched' : function (collection) {
                        this.setData({ periods : collection.periods() })
                            .render();
                    }
                }
            }
        }
    });

    return [{
        type    : 'Pane',
        config  : {
            element         : '#chart_section',
            mixins          : ['Transitioned', 'Layered'],
            dont_wake       : true,
            animation_type  : 'fade',
            app_events      : {
                'picker_done.clicked'       : 'wake',
                'add_legend_cancel.clicked' : function () {
                    var has_legend_items = uijet.Resource('LegendItems').length;
                    if ( has_legend_items ) {
                        this.wake();
                    }
                    else {
                        uijet.publish('welcome');
                    }
                },
                'chart_reset'               : 'wake+'
            }
        }
    }, {
        type    : 'Button',
        config  : {
            element : '#viz_new'
        }
    }, {
        type    : 'Button',
        config  : {
            element : '#viz_duplicate'
        }
    }, {
        type    : 'Button',
        config  : {
            element : '#viz_delete'
        }
    }, {
        type    : 'Button',
        config  : {
            element : '#viz_export'
        }
    }, {
        type    : 'Button',
        config  : {
            element : '#viz_publish'
        }
    }, {
        type    : 'Button',
        config  : {
            element         : '#viz_save',
            adapters        : ['Spin'],
            spinner_options : {
                lines   : 10,
                length  : 8,
                radius  : 6,
                width   : 4
            },
            signals         : {
                pre_click   : 'spin'
            },
            app_events      : {
                state_saved : 'spinOff'
            }
        }
    }, {
        type    : 'Pane',
        config  : {
            element     : '#chart_heading',
            mixins      : ['Templated'],
            resource    : 'ProjectStateView',
            signals     : {
                pre_wake    : function () {
                    return ! this.has_content;
                },
                post_render : function () {
                    uijet.start({
                        type    : 'ContentEditable',
                        config  : {
                            element     : '#chart_heading h1',
                            id          : this.id + '_title',
                            container   : this.id,
                            input       : {
                                name: 'title'
                            }
                        }
                    });
                    this.wakeContained();
                }
            }
        }
    }, {
        type    : 'TimelineChart',
        config  : {
            element     : '#chart',
            adapters    : ['TimelineChart'],
            resource    : 'TimeSeries',
            style       : {
                padding : 20
            },
            data_events : {
                reset   : function () {
                    uijet.publish('chart_reset', {
                        state_loaded: true
                    });
                }
            },
            app_events  : {
                'legends_list.delete'           : function () {
                    if ( this.awake ) {
                        this.render();
                    }
                },
                'chart_period_start.selected'   : function ($selected) {
                    this.timeContext($selected.text());
                },
                'chart_period_end.selected'     : function ($selected) {
                    this.timeContext(null, $selected.text());
                }
            }
        }
    }, {
        factory : 'ChartPeriodSelect',
        config  : {
            element     : '#chart_period_start',
            menu        : {
                signals : {
                    post_render : function () {
                        this.floatPosition('top: -' + this.$wrapper[0].offsetHeight + 'px;')
                            .select(':first-child')
                            .publish('rendered');
                    }
                }
            },
            app_events  : {
                'chart_period_start_menu.rendered'  : 'wake'
            }
        }
    }, {
        factory : 'ChartPeriodSelect',
        config  : {
            element     : '#chart_period_end',
            menu        : {
                signals : {
                    post_render : function () {
                        this.floatPosition('top: -' + this.$wrapper[0].offsetHeight + 'px;')
                            .select(':last-child')
                            .publish('rendered');
                    }
                }
            },
            app_events  : {
                'chart_period_end_menu.rendered': 'wake'
            }
        }
    }];

});
