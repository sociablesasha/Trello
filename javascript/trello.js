$('.lists').sortable({
    revert: true
});
$('.list').draggable({
    connectToSortable: '.lists',
    revert: 'invalid',
    scroll: false
});

$('.cards').sortable({
    revert: true,
});
$('.card').draggable({
    connectToSortable: '.cards',
    revert: 'invalid'
});

$('.list-add').disableSelection();

// Event Bubbling, Capture, Delegation
$(".trello").on("click", event => {
    var DOM = event.target;

    if ($(DOM).hasClass("add-list")) {
        addingList(DOM);
    } else if ($(DOM).hasClass("add-card")) {
        addingCard(DOM);
    } else if ($(DOM).hasClass("form-open")) {
        openingForm(DOM);
    } else if ($(DOM).hasClass("form-close")) {
        closingForm(DOM);
    }
});

function addingList(DOM) {
    var list = $('.list-clone').clone();
    list.switchClass('list-clone', 'list');
    list.find('.header').text(inputting($(DOM.parentElement).find('input')));

    var lists = $('.lists');
    lists.append(list);

    var form = $(DOM.parentElement.parentElement);
    form.switchClass('list-add-enable', 'list-add-disable');
}

function addingCard(DOM) {
    var card = $('.card-clone').clone();
    card.switchClass('card-clone', 'card');
    card.removeClass('clone');
    card.find(".title").text(inputting($(DOM.parentElement).find('input')));

    var cards = $(DOM.parentElement.parentElement.parentElement).find(".cards");
    cards.append(card);

    var form = $(DOM.parentElement.parentElement);
    form.switchClass('card-add-enable', 'card-add-disable');
}

function openingForm(DOM) {
    var form = $(DOM.parentElement);

    if (form.hasClass("footer")) {
        form.switchClass('card-add-disable', 'card-add-enable');
    } else {
        form.switchClass('list-add-disable', 'list-add-enable');
    }
}

function closingForm(DOM) {
    var form = $(DOM.parentElement.parentElement);

    if (form.hasClass("footer")) {
        form.switchClass('card-add-enable', 'card-add-disable');
    } else {
        form.switchClass('list-add-enable', 'list-add-disable');
    }
}

function inputting(dom) {
    var value = $(dom).val();
    $(dom).val('');

    return value;
}