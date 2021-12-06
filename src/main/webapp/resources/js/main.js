let y;
let r;
let x = -5;

let previousButton;
let graph = document.getElementById("graph-svg");
let svgns = "http://www.w3.org/2000/svg"

const GRAPH_WIDTH = 360;
const INDENT = 30;
$("button[name=\"input-form:submitData\"]").prop('disabled', true);
function isValidData() {
    if (r == null || y == null || x == null) return false;
    return !(isNaN(y) || y <= -3 || y>= 3 || x > 5 || x < -5 || r < 1 || r > 3);
}

function resetChanges() {
    $(".pointer").remove();
}

function textChanged() {
    y = $("input[name=\"input-form:yValue\"]").val();
    if (isNaN(y) || y <= -3 || y >= 3) {
        $('#messageY').text("Заполните поле допустимыми значениями");
        $("button[name=\"input-form:submitData\"]").prop('disabled', true);
    }
    else {
        $('#messageY').text("");
        if (isValidData()) $("button[name=\"input-form:submitData\"]").prop('disabled', false);
        $("input[name=\"input-form:true-y\"]").val(y);
    }
}
function buttonClick(value, button) {
    r = value;
    $("input[name=\"input-form:true-r\"]").val(r);
    if (previousButton != null) previousButton.style.backgroundColor = '#0B1826';
    button.style.backgroundColor = 'lightgreen';
    previousButton = button;
    if (isValidData()) $("button[name=\"input-form:submitData\"]").prop('disabled', false);
    let pointers = $(".pointer");
    let initX;
    let initY;
    let moveX;
    let moveY;
    let initR;
    let hit;
    for (let i = 0; i < pointers.length; i++) {
        initX = pointers[i].dataset.x;
        initY = pointers[i].dataset.y;
        initR = pointers[i].dataset.r;
        hit = pointers[i].dataset.hit;
        moveX = 180 + 150 * initX / Math.abs(r);
        moveY = 180 - 150 * initY / Math.abs(r);
        if (initR === r && hit === "true") {
            pointers[i].style.fill = "#A4CC84";
        } else pointers[i].style.fill = "#cca484";
        $(pointers[i]).animate({
            cx: moveX,
            cy: moveY
        }, {duration: 500, queue: false});
    }
}
function spinnerChange() {
    x = $("input[name=\"input-form:xValue_input\"]").val();
    $("input[name=\"input-form:true-x\"]").val(x);
    if (isValidData()) $("button[name=\"input-form:submitData\"]").prop('disabled', false);
}
$("#graph-svg").on("click", function (event) {
    $("input[name=\"input-form:true-r\"]").val(r);
    let messageR = $('#messageR');
    console.log("graph-click")
    if (r == null) {
        messageR.text("Заполните это поле для клика")
        return;
    }
    messageR.text("");
    x = (event.offsetX - GRAPH_WIDTH / 2) / (GRAPH_WIDTH / 2 - INDENT) * r;
    y = (GRAPH_WIDTH / 2 - event.offsetY) / (GRAPH_WIDTH / 2 - INDENT) * r;
    $('#submitData').prop('disabled', false);
    $("button[name=\"input-form:submitData\"]").click();
})

function drawResult(x, y, r) {
    let circle = document.createElementNS(svgns, 'circle');
    circle.setAttributeNS(null, 'cx', GRAPH_WIDTH / 2 + (GRAPH_WIDTH / 2 - INDENT) * x / Math.abs(r));
    circle.setAttributeNS(null, 'cy', GRAPH_WIDTH / 2 - (GRAPH_WIDTH / 2 - INDENT) * y / Math.abs(r));
    circle.setAttributeNS(null, 'r', 5);
    circle.setAttribute('data-x', x);
    circle.setAttribute('data-y', y);
    circle.classList.add("pointer");
    if (calculateHit(x, y, r))
        circle.style.fill = "#a4cc84";
    graph.appendChild(circle);
}

function calculateHit(x, y, r) {
    return calculateSectionOne(x, y, r) || calculateSectionTwo(x, y, r) || calculateSectionThree(x, y, r);
}

function calculateSectionOne(x, y, r) {
    return x >= 0 && y >= 0 && y <= (r - x) / 2;
}

function calculateSectionTwo(x, y, r) {
    return x <= 0 && y <= 0 && Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)) <= r / 2;
}

function calculateSectionThree(x, y, r) {
    return x >= 0 && y <= 0 && x <= r  && Math.abs(y) <= r;
}

function drawAllResults() {
    r = 1;
    let data = Array();
    $(".result-table tr").each(function (i, v) {
        data[i] = Array();
        $(this).children('td').each(function (ii, vv) {
            data[i][ii] = $(this).text();
        });
    })
    for (let i = 1; i < data.length; i++) {
        if (data[i][0])
            drawResult(data[i][0], data[i][1], r);
    }
    r = undefined;
}
$("button[name=\"input-form:submitData\"]").click(function (event) {
    if (!isValidData()) {
        event.preventDefault();
        return false;
    } else {
        drawResult(x, y, r);
        $("input[name=\"input-form:true-r\"]").val(r);
    }
});

drawAllResults();

