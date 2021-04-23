$(document).ready(function() {
    let clickedAndRight = [0, 0];

    $(".answer").click(function () {
        let answer = Number($(this).val());
        let name_attr = $(this).attr("name");
        clickedAndRight[0]++;
    
        //Right or wrong answer
        if (answer === 1) {
            $(this).parent().addClass("bg-blue fw-bold");
            clickedAndRight[1]++;
        } else {
            let right = "[name=" + name_attr +"][value=1]";
            $(right).parent().addClass("bg-blue fw-bold");
        }
        // Set disabled
        let clicked = "[name=" + name_attr + "]";
        $(clicked).prop("disabled", true);
        // Explanation
        let visible = "#" + name_attr;
        $(visible).removeClass("unvisible");

        // Print result
        if (clickedAndRight[0] === 4) {
            let rightAnswers = clickedAndRight[1];
            $("#right_answers").html("Tuloksesi visassa on <span class='badge fs-6 bg-blue'>" + rightAnswers + "/4</span> oikein!");
        }
    });
});
