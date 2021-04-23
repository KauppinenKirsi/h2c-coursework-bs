$(document).ready(function() {
    /**
     * Calculate body mass index
     * @param {number} height   height in cm
     * @param {number} weight   weight in kg
     * @returns {number}    body mass index
     */
    function getBmi(height, weight) {
        let bmi = weight / (Math.pow(height / 100, 2.5)) * 1.3;
        return bmi.toFixed(1);
    }

    /**
    * 
    * @param {number} value     person's height in cm
    * @param {number} factor    18.5 >> lower bound, 24.9 >> upper bound
    * @returns {number}         Normal weight bound as integer
    */
    function getWeightLimit(value, factor) {
        let limit = (factor / 1.3) * Math.pow(value / 100, 2.5);
        limit = limit.toFixed(0);
        return limit;
    }

    /**
     * Check that all input data is written. Shows the error message.
     * @returns {Boolean} true >> ok, false >> not ok.
     */
    function validateInput() {
        let birth = Number($("#byear").val());
        let weight = Number($("#weight").val());
        let height = Number($("#height").val());

        let currentYear = new Date().getFullYear();
        let userAge = currentYear - birth;

        if (birth === 0 || weight === 0 || height === 0) {
            errorMissingInput();
            return false;
        } else if (userAge < 20 || userAge > 60) {
            errorAge();
            return false;
        } else {
            return true;
        }
    }

    // Calculate BMI
    $("#calc_bmi").click(function() {
        let validInputs = validateInput();
        if (!validInputs) {
            return;
        }

        let weight = $("#weight").val();
        let height = $("#height").val();

        let userBmi = getBmi(height, weight);

        // Calculate normal weight, if checked
        let checkbox = $("[name=normal_range]");
        if ($(checkbox).prop("checked")) {
            let lowerLimit = getWeightLimit(height, 18.5);
            let upperLimit = getWeightLimit(height, 24.9);
            $("#lower_weight").html(lowerLimit);
            $("#upper_weight").html(upperLimit);
        }

        $("#bmi").html(userBmi);

        if (userBmi < 17) {
            $("#sev_under").addClass("bg-warning");
        } else if (userBmi < 18.5) {
            $("#under").addClass("bg-warning");
        } else if (userBmi < 25) {
            $("#norm").addClass("bg-warning");
        } else if (userBmi < 30) {
            $("#over").addClass("bg-warning");
        } else if (userBmi < 35) {
            $("#mod_over").addClass("bg-warning");
        } else if (userBmi < 40) {
            $("#sev_over").addClass("bg-warning");
        } else {
            $("#very_sev_over").addClass("bg-warning");
        }
    });

    // Clear outputs
    $("[name=calc]").focusin(function() {
        $("#bmi").html("");
        $("#lower_weight").html("");
        $("#upper_weight").html("");
        $("#explanation").children().removeClass("bg-warning");
    });

    $("[name=normal_range]").click(function() {
        $("#bmi").html("");
        $("#lower_weight").html("");
        $("#upper_weight").html("");
        $("#explanation").children().removeClass("bg-warning");
    });

    //Calculate waist health risk
    $("#calc_waist").click(function() {
        let waist = $("#waist").val();
        
        if ($("#male").prop("checked")) {
            if (waist < 90) {
                $("#no_risk").addClass("bg-warning");
            } else if (waist <= 100) {
                $("#mild_risk").addClass("bg-warning");
            } else {
                $("#huge_risk").addClass("bg-warning");
            }
        } else {
            if (waist < 80) {
                $("#no_risk").addClass("bg-warning");
            } else if (waist <= 90) {
                $("#mild_risk").addClass("bg-warning");
            } else {
                $("#huge_risk").addClass("bg-warning");
            }
        }
    });

    // Clear outputs 
    $("#waist").focusin(function() {
        $(this).select();
        $("#waist_control").children().removeClass("bg-warning");
    });

    $("[name=gender]").click(function() {
        $("#waist").focus();
        $("#waist_control").children().removeClass("bg-warning");
    });

});

// Popover
var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
  return new bootstrap.Popover(popoverTriggerEl)
});

// Modal
function errorMissingInput() {
    document.getElementById("m_title").innerHTML = "Syöttötieto puuttuu";
    document.getElementById("m_body").innerHTML = "Ole hyvä, ja täytä kaikkien kenttien tiedot!";
    let errorMsg1 = new bootstrap.Modal(document.getElementById("error_message"), {backdrop: "static"});
    errorMsg1.show();
  }

  function errorAge() {
    document.getElementById("m_title").innerHTML = "Huomio ikä";
    document.getElementById("m_body").innerHTML = "Laskuri soveltuu painoindeksin laskemiseen 20-60 -vuotiaille henkilöille.";
    let errorMsg2 = new bootstrap.Modal(document.getElementById("error_message"), {backdrop: "static"});
    errorMsg2.show();
  }