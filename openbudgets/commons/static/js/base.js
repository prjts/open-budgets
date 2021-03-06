;(function (root, factory) {
    if ( typeof define === 'function' && define.amd ) {
        define(['jquery'], function ($) {
            return factory($);
        });
    }
    else {
        factory(root.jQuery);
    }
}(this, function ($) {

    //******************/
    //****  FORMS   ****/
    //******************/
    (function () {

        var $forms = $('form.modal'),
            valid_class = 'valid',
            invalid_class = 'invalid',
            help_class = 'help',
            changeHandler = function () {
                var valid = true,
                    $this = $(this);
                $this.next().hide();
                if ( this.type in validation_map ) {
                    valid = validation_map[this.type].test(this.value);
                }
                if ( valid ) {
                    $this.addClass(valid_class);
                    $this.removeClass(invalid_class);
                }
                else {
                    $this.addClass(invalid_class);
                    $this.removeClass(valid_class);
                }
                $this.closest('form').trigger(valid ? 'validate' : 'invalid');
            },
            editHandler = function (e) {
                var $this = $(this);
                $this.removeClass(valid_class + ' ' + invalid_class)
                    .next()
                        .show();
            },
            validateHandler = function () {
                var valid = false,
                    $form = $(this).find('input').each(function () {
                                if ( this.type in validation_map ) {
                                    if ( ! validation_map[this.type].test($(this).val()) ) {
                                        valid = false;
                                        // break
                                        return false;
                                    }
                                }
                                valid = true;
                            }).end();
                $form.trigger(valid ? 'valid' : 'invalid');
            },
            validHandler = function () {
                $(this).find('.mock-button').addClass('hide')
                    .end().find('input[type=submit]').removeClass('hide');
            },
            invalidHandler = function () {
                $(this).find('input[type=submit]').addClass('hide')
                    .end().find('.mock-button').removeClass('hide');
            },
            validation_map = {};

        $forms.on({
                validate: validateHandler,
                valid   : validHandler,
                invalid : invalidHandler
            })
            .each(function (i, form) {
                $(form).find('input')
                    .on('change', changeHandler)
                    .on('focus', editHandler)
                    .each(function (i, input) {
                        var $input = $(input),
                            pattern = $input.attr('pattern'),
                            type = input.type;
                        if ( pattern && ! (type in validation_map) ) {
                            validation_map[type] = RegExp(pattern);
                        }
                    });
            });

        $forms.submit(function(event) {
            var $form = $(this),
                action = $form.find(':submit'),
                mock_button = $form.find('.mock-button'),
                notices = $form.find('.notices');

            event.preventDefault();

            action.val('Wait').attr('disabled', 'disabled');

            $.ajax({
                type: $form.attr("method"),
                url: $form.attr("action"),
                data: $form.serialize(),
                dataType: "json"
            })

            .done(function(response) {
                notices.html(response.data);
                action.removeAttr('disabled');

                // close the modal
                $('[id^="overlay"]').hide();
                // update to show user
                // LOLz
                location.reload(true);
            })

            .fail(function(jqXHR, textStatus) {
                notices.html(jqXHR.responseText);
                action.val('Cancel').removeAttr('disabled').addClass('hide');
                mock_button.removeClass('hide');
            });
        });

    }());


    //******************/
    //**** OVERLAYS ****/
    //******************/
    (function () {

        $('#overlay, .mock-button, [id^="overlay"] .close').click(function (event) {
            $('[id^="overlay"]').hide();
        });

        $('.login-link').click(function (event) {
            event.preventDefault();
            var $form = $('form');
            $form.removeAttr('id');
            $('#overlay-login form').attr('id', 'active-form');
            $('#overlay').show();
            $('#overlay-login').show();
            $('#overlay-contact').hide();
            $('#overlay-register').hide();
            $('#overlay-password-reset').hide();
            $('#overlay-password-change').hide();

            // if the browser prefilled the data or kept it in backward/forward navigation
            // trigger change on every non-empty input
            $form.find('.field input').each(function () {
                var $input = $(this);
                if ( $input.val() ) {
                    $input.trigger('change');
                }
            });
        });

        $('.register-link').click(function (event) {
            event.preventDefault();
            $('form').removeAttr('id');
            $('#overlay-register form').attr('id', 'active-form');
            $('#overlay').show();
            $('#overlay-register').show();
            $('#overlay-contact').hide();
            $('#overlay-login').hide();
            $('#overlay-password-reset').hide();
            $('#overlay-password-change').hide();
        });

        $('.password-reset-link').click(function (event) {
            event.preventDefault();
            $('form').removeAttr('id');
            $('#overlay-password-reset form').attr('id', 'active-form');
            $('#overlay').show();
            $('#overlay-password-reset').show();
            $('#overlay-contact').hide();
            $('#overlay-register').hide();
            $('#overlay-login').hide();
            $('#overlay-password-change').hide();
        });

        $('.password-change-link').click(function (event) {
            event.preventDefault();
            $('form').removeAttr('id');
            $('#overlay-password-change form').attr('id', 'active-form');
            $('#overlay').show();
            $('#overlay-password-change').show();
            $('#overlay-contact').hide();
            $('#overlay-register').hide();
            $('#overlay-login').hide();
            $('#overlay-password-show').hide();
        });

        $('.contact-link').click(function (event) {
            event.preventDefault();
            $('form').removeAttr('id');
            $('#overlay-contact form').attr('id', 'active-form');
            $('#overlay').show();
            $('#overlay-contact').show();
            $('#overlay-password-change').hide();
            $('#overlay-register').hide();
            $('#overlay-login').hide();
            $('#overlay-password-show').hide();
            $('#panel-nav').hide();
        });

    }());

    // NAV PANEL UX
    (function () {

        var $nav_panel = $('#panel-nav'),
            slide_class = 'slide-in',
            showNavPanel = function () {
                $nav_panel.addClass(slide_class);
            },
            hideNavPanel = function () {
                $nav_panel.removeClass(slide_class);
            },
            right_edge_x,
            setBodyWidth = function () {
                right_edge_x = document.body.clientWidth;
            };

        setBodyWidth();
        $(window).resize(setBodyWidth);

        if (window.location.pathname === '/') {

            showNavPanel();

        } else {

            $('#nav-anchor').mouseenter(function (e) {
                e.preventDefault();
                showNavPanel();
            });

            $nav_panel.mouseleave(hideNavPanel);

            $('#panel-nav-close').click(hideNavPanel);

            $('#panel-action').mousemove(function (e) {
                if ( right_edge_x - e.pageX <= 5 )
                    showNavPanel();
             });

        }


    }());

    // PROJECT GALLERY UX
    (function () {

        $('.project')
            .mouseenter(function (event) {
                $('.projects-public, .projects-developers').children().addClass('reduce');
                $(this).removeClass('reduce').find('.detail').show();
            })
            .mouseleave(function (event) {
                $('.projects-public, .projects-developers').children().removeClass('reduce');
                $(this).find('.detail').hide();
            });

    }());

}));
