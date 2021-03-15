$(function () {

    let color = { red: 0, green: 0, blue: 0 }
    let backgroundColor = { red: 255, green: 255, blue: 255 }

    $("input").checkboxradio({
        icon: false
    });

    function checkCheckbox() {
        return $('input:checked').attr('id') === 'radio-1' ? 'color' : "background-color"
    }

    function setSlider() {
        if (checkCheckbox() === 'color') {
            $("#red").slider("value", color.red);
            $("#green").slider("value", color.green);
            $("#blue").slider("value", color.blue);
        } else {
            $("#red").slider("value", backgroundColor.red);
            $("#green").slider("value", backgroundColor.green);
            $("#blue").slider("value", backgroundColor.blue);
        }
    }

    $("input").change(function (e) {
        setSlider()
    })

    function hexFromRGB(r, g, b) {
        var hex = [
            r.toString(16),
            g.toString(16),
            b.toString(16)
        ];
        $.each(hex, function (nr, val) {
            if (val.length === 1) {
                hex[nr] = "0" + val;
            }
        });
        return hex.join("").toUpperCase();
    }
    function refreshSwatch() {

        if (checkCheckbox() === 'color') {
            let hex = hexFromRGB(color.red, color.green, color.blue);
            $("#swatch").css(checkCheckbox(), "#" + hex);
        } else {
            let hex = hexFromRGB(backgroundColor.red, backgroundColor.green, backgroundColor.blue);
            $("#swatch").css(checkCheckbox(), "#" + hex);
        }
    }

    $("#red, #green, #blue").slider({
        orientation: "horizontal",
        range: "min",
        max: 255,
        value: 175,
        slide: refreshSwatch,
        change: refreshSwatch
    });

    setSlider()


    $("#red, #green, #blue").on("slidechange", function (event, ui) {

        if (checkCheckbox() === 'color') {
            color = { ...color, [$(this).attr('id')]: ui.value }
        } else {
            backgroundColor = { ...backgroundColor, [$(this).attr('id')]: ui.value }
        }
    });

});


