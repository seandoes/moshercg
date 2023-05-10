$(function () {
  $("#contactForm input,#contactForm textarea").jqBootstrapValidation({
    preventSubmit: true,
    submitError: function ($form, event, errors) {
      // additional error messages or events
    },
    submitSuccess: function ($form, event) {
      event.preventDefault(); // prevent default submit behaviour
      // get values from FORM
      var url = "https://formspree.io/" + "f/myyllvzw";
      var name = $("input#name").val();
      var email = $("input#email").val();
      var phone = $("input#phone").val();
      var company = $("input#company").val();
      var firstName = name; // For Success/Failure Message
      // Check for white space in name for Success/Fail message
      if (firstName.indexOf(" ") >= 0) {
        firstName = name.split(" ").slice(0, -1).join(" ");
      }
      $this = $("#sendMessageButton");
      $this.prop("disabled", true); // Disable submit button until AJAX call is complete to prevent duplicate messages
      $.ajax({
        url: url,
        type: "POST",
        data: {
          name: name,
          phone: phone,
          email: email,
          company: company,
        },
        cache: false,

        success: function () {
          console.log("success");
          // Success message
          $("#success").html(
            "<div class='alert alert-success' style='display: flex; align-items: center'>"
          );
          $("#success > .alert-success").append(
            '<strong style="flex-grow: 1; text-align: left">Your info has been submitted.</strong>'
          );
          $("#success > .alert-success").append(
            '<a class="btn btn-primary text-uppercase" href="assets/docs/integration_pacesetter.pdf" target="_blank" download="Integration Pacesetter from MCG [2023]">Download the White Paper</a>'
          );
          $("#success > .alert-success").append(
            "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>"
          );
          $("#success > .alert-success").append("</div>");
          $("#success").append("</div>");
          // hide button
          $("#sendMessageButton").hide();
          //clear all fields
          $("#contactForm").trigger("reset");
        },

        error: function (error) {
          console.log("error");
          // TODO this is brittle, fix this
          if (error.status == 0) {
            // Success message
            $("#success").html(
              "<div class='alert alert-success' style='display: flex; align-items: center'>"
            );
            $("#success > .alert-success").append(
              '<strong style="flex-grow: 1; text-align: left">Your info has been submitted.</strong>'
            );
            $("#success > .alert-success").append(
              '<a class="btn btn-primary text-uppercase" href="assets/docs/integration_pacesetter.pdf" target="_blank" download="Integration Pacesetter from MCG [2023]">Download</a>'
            );
            $("#success > .alert-success").append(
              "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>"
            );
            $("#success > .alert-success").append("</div>");
            $("#success").append("</div>");
            // hide button
            $("#sendMessageButton").hide();
            //clear all fields
            $("#contactForm").trigger("reset");
            return;
          }
          // Fail message
          $("#success").html("<div class='alert alert-danger'>");
          $("#success > .alert-danger")
            .html(
              "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;"
            )
            .append("</button>");
          $("#success > .alert-danger").append(
            $("<strong>").text(
              "Sorry " +
                firstName +
                ", it seems that my mail server is not responding. Please try again later!"
            )
          );
          $("#success > .alert-danger").append("</div>");
          //clear all fields
          $("#contactForm").trigger("reset");
        },

        complete: function () {
          setTimeout(function () {
            $this.prop("disabled", false); // Re-enable submit button when AJAX call is complete
          }, 1000);
        },
      });
    },
    filter: function () {
      return $(this).is(":visible");
    },
  });

  $('a[data-toggle="tab"]').click(function (e) {
    e.preventDefault();
    $(this).tab("show");
  });
});

/*When clicking on Full hide fail/success boxes */
$("#name").focus(function () {
  $("#success").html("");
});
