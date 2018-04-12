$(document).ready(main);

function main() {
// alert("Welcome to suveen.me")

    /*
    ==============================================================================
                                    Sticky Navbar
    ==============================================================================
     */
    $('#nav').affix({
        offset: {
            top: $('header').height()
        }
    });

    $("#nav").wrap("<div class='nav-placeholder'></div>");
    $(".nav-placeholder").height($("#nav").outerHeight(true));

    // var shiftWindow = function () {
    //     scrollBy(0, -52)
    // };
    //
    // if (location.hash) shiftWindow();
    //
    // window.addEventListener("hashchange", shiftWindow);

    $(".anchor").click(function (event) {
        event.preventDefault();
        $('html,body').animate({scrollTop: $(this.hash).offset().top - 52}, 2000);
    });

    /*$('.nav a').on('click', function () {
        $('.navbar-toggle').click();
    });*/

    /*
    ==============================================================================
                                Skills Progress Bar
    ==============================================================================
     */
    $(document).on('scroll', function () {
        // console.log($('html,body').scrollTop())
        // console.log(($('header').outerHeight() - 10))
        if ($('html,body').scrollTop() > ($('header').outerHeight() - 10)) {
            $('.progress .progress-bar').css("width",
                function () {
                    return $(this).attr("aria-valuenow") + "%";
                }
            )
        }
    });

    /*
    ==============================================================================
                                Contact me form
    ==============================================================================
     */

    $('#contact-form').submit(function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        $.post('/api/contact/', $(this).serialize(), function (data) {
            data = JSON.parse(data);
            if (data.message) {
                $("#modal-messageHeader").html(data.messageHeader);
                $("#modal-message").html(data.message);
                $("#myModal").modal("show");
                document.getElementById("contact-form").reset();
            }
        });
        return false;
    });

    $('#contact-form').formValidation({
        framework: 'bootstrap',
        icon: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh',
        },
        fields: {
            name: {
                validators: {
                    notEmpty: {
                        message: 'Name is required'
                    },
                }
            },
            email: {
                validators: {
                    notEmpty: {
                        message: 'Email is required'
                    },
                    emailAddress: {
                        message: 'The input is not a valid email address'
                    }
                }
            },
            subject: {
                validators: {
                    notEmpty: {
                        message: 'Subject helps me organize'
                    },
                }
            },
            message: {
                validators: {
                    notEmpty: {
                        message: 'Your message is valued and required'
                    },
                }
            },
        }
    })


    /*
  ==============================================================================
                              Ending tag for main()
  ==============================================================================
   */

}