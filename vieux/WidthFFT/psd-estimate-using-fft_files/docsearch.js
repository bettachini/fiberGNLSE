/* Copyright 2010-2012 The MathWorks, Inc. */

$(document).ready(function() {
    $.getScript('/help/search/plugin/jquery.tmpl.min.js', function() {
        $.template('pagesuggestion', '<div tabindex="-1" id="${type}:${shortName}:${pageId}" class="suggestion ${type}_suggestion" action="go(\'${path}\')"><span class="suggestiontext">{{each title}}{{html displaySuggestionText($index, $value)}}{{/each}} - <span class="suggestionsummary">{{each summary}}{{html displaySuggestionText($index, $value)}}{{/each}}</span></span><span class="suggestionprod">${product}</span></div>');
        $.template('wordsuggestion', '<div tabindex="-1" class="suggestion" action="search(\'${fullword}\')">{{each splitwordlist}}{{html displaySuggestionText($index, $value)}}{{/each}}</div>');
        $.template('morepages', '<div id="more${type}" tabindex="-1" class="suggestion suggestion-more" action="more(\'${q}\',\'${type}\')"><span class="suggestmore">${more} more</span></div>');
        $.template('morewords', '<div id="moreword" tabindex="-1" class="suggestion suggestion-more" action="more(\'${q}\',\'word\',\'wordarea\')"><span class="suggestmore">${more} more</span></div>');
    });
    var searchField = getSearchField();
    searchField.keyup(function(evt) {
        validateSearchForm($(this));
        // Show suggestions whenever the search text has changed or the user hits the down arrow.
        if (evt.keyCode == 40 || isSearchFieldChanged(searchField)) {
            searchField.data('last', searchField.val());
            findSuggestions(searchField);
        }
    });

    // Hide the suggestions for any click in the document, except clicks in the search field.  Later we will also
    // exempt clicks in the suggestion area itself.
    $(document).click(function() {
        hideTocPopup();
        hidePopups(false);
    });
    searchField.click(function(evt) {
        hideTocPopup();
        validateSearchForm($(this));
        evt.stopPropagation();
    });

    $("#submitsearch").prop('disabled', true);
});

function validateSearchForm(searchField) {
    var val = searchField.val();
    if (val.length === 0) {
        $("#submitsearch").prop('disabled', true);
    } else {
        $("#submitsearch").prop('disabled', false);
    }
}

function isSearchFieldChanged(searchField) {
    return searchField.data('last') != searchField.val();
}

function findSuggestions(searchField) {
    var searchText = searchField.val();
    if (searchText.match(/^(\w{2,}\s*)+$/) || searchText.match(/[^\w\s]+/)) {
        var params = {'q':searchText};
        var url = getSuggestionsUrl('suggest', params);
        $.get(url, function(data) {
            displaySuggestionHtml(searchField, data);
        });
    } else {
        hidePopups(false);
    }
}

function getSectionHeader(title) {
    var header = $('<div class="suggestionheader"></div>');
    header.append(title);
    return header;
}

function getSectionDiv(type) {
    return $('<div id="' + type + 'area" class="suggestionarea"></div>');
}

function displaySuggestionText(index, value) {
    if (value.length > 0) {
        if (index % 2 === 0) {
            return value;
        } else {
            return "<span class='suggestionhighlight'>" + value + "</span>";
        }
    }
}

function formatSuggestions(json) {
    var suggestionsElt = $('<div></div>');
    var display = false;

    for (var pageType in json.pages) {
        var pageGroup = json.pages[pageType];
        display = true;

        suggestionsElt.append(getSectionHeader(pageGroup.labelKey));
        var pagesDiv = getSectionDiv(pageGroup.type);

        $.tmpl('pagesuggestion', pageGroup.suggestions).appendTo(pagesDiv);
        pagesDiv.appendTo(suggestionsElt);

        // Handle the "n more" link here
        if (pageGroup['more'] && pageGroup['more'] > 0) {
            var morePagesElt = $.tmpl('morepages', pageGroup);
            morePagesElt.appendTo(pagesDiv);
        }
    }

    var wordGroup = json.words;
    if (wordGroup && wordGroup.wordlist.length > 0) {
        display = true;

        suggestionsElt.append(getSectionHeader('Search Suggestions'));
        var wordsDiv = getSectionDiv('word');
        $.tmpl('wordsuggestion', wordGroup.wordlist).appendTo(wordsDiv);
        wordsDiv.appendTo(suggestionsElt);

        if (wordGroup['more'] && wordGroup['more'] > 0) {
            var moreWordsElt = $.tmpl('morewords', wordGroup);
            moreWordsElt.appendTo(wordsDiv);
        }
    }

    if (display) {
        return suggestionsElt;
    } else {
        return '';
    }
}

function displaySuggestionHtml(searchField, json) {
    if (!isSearchFieldChanged(searchField)) {
        var html = formatSuggestions(json);
        var suggestionsElt = getCleanSuggestionsElement();
        if (html.length > 0) {
            suggestionsElt.append(html);
            if (suggestionsElt.is(':hidden')) {
                showSuggestions();
            }
            suggestionsElt.attr('suggestfor', searchField.val());
        } else {
            hidePopups(false);
        }
    }                
}

function getCleanSuggestionsElement() {
    var suggestionsElt = $('#suggestions');
    suggestionsElt.data('selectionMode', 'keyboard');
    if (suggestionsElt.length == 0) {
        suggestionsElt = $('<div id="suggestions"></div>');
        $(getSearchForm()).after(suggestionsElt);
        addSuggestionHandlers(suggestionsElt);
    } else {
        suggestionsElt.empty();
    }

    var searchField = getSearchField();
    var availabePopupWidth = getPopupWidth(searchField);
    suggestionsElt.width(availabePopupWidth);
    return suggestionsElt;
}

function getPopupWidth(searchField) {
    var width = searchField.outerWidth();
    var parentDiv = searchField.closest('.textfield');
    if (parentDiv.length > 0) {
        width = parentDiv.outerWidth();
    }
    return width;
}

function addSuggestionHandlers(suggestionsElt) {
    suggestionsElt.keydown(function(evt) {
        suggestionsElt.data('selectionMode','keyboard');
        return handleKeyDown(evt);
    });
    suggestionsElt.keyup(function(evt) {
        suggestionsElt.data('selectionMode','keyboard');
        if (evt.keyCode == 13) {
            handleSelection();
        }
    });
    suggestionsElt.mousemove(function() {
        suggestionsElt.data('selectionMode','mouse');
    });
    suggestionsElt.mouseover(function(evt) {
        if (suggestionsElt.data('selectionMode') === 'mouse') {
            selectFromMouseEvent(evt);
        }
    });
    suggestionsElt.click(function(evt) {
        evt.stopPropagation();
        selectFromMouseEvent(evt);
        handleSelection();
    });
}

function selectFromMouseEvent(evt) {
    var newSelection = $(evt.target).closest('.suggestion');
    if (!newSelection.hasClass('selected-suggestion')) {
        var oldSelection = $('.selected-suggestion');
        oldSelection.removeClass('selected-suggestion');
        newSelection.addClass('selected-suggestion');
    }
}

function showSuggestions() {
    var suggestionsElt = $('#suggestions');
    suggestionsElt.slideDown('fast');
    getSearchField().unbind('keydown.searchfield-suggestions');
    getSearchField().bind('keydown.searchfield-suggestions', function(evt) {
        return handleKeyDown(evt);
    });
}

function hidePopups(focusSearchField) {
    $('#suggestions').remove();
    var sf = getSearchField();
    sf.unbind('keydown.searchfield-suggestions');
    if (focusSearchField) {
        sf.get(0).focus();
    }

    var allCats = $('#all-categories');
    if (allCats.is(':visible')) {
        allCats.hide();
    }
    var allProds = $('#all-products');
    if (allProds.is(':visible')) {
        allProds.hide();
    }
}

function handleKeyDown(evt) {
    var key = evt.keyCode? evt.keyCode : evt.charCode;
    if (key == 40) {
        // Down arrow
        selectNextSuggestion();
        return false;
    } else if (key == 38) {
        // Up arrow
        selectPrevSuggestion();
        return false;
    } else if (key == 27) {
        // Escape
        hidePopups(true);
        return false;
    } else {
        return true;
    }
}

function handleSelection() {
    var selected = $('.selected-suggestion');
    if (selected.length > 0) {
        var action = selected.attr('action');
        eval(action);
    }
}

function selectNextSuggestion() {
    var newselection = getNextSelection();
    if (newselection != null && newselection.length > 0) {
        var oldselection = $('.selected-suggestion');
        changeSelection(oldselection, newselection);
    }
}

function getNextSelection() {
    var selected = $('.selected-suggestion');
    var newselection = null;
    if (selected.length > 0) {
        newselection = selected.nextAll('.suggestion:first');
        if (newselection.length == 0) {
            // We're at the end of a section, jump to the next.
            var area = selected.closest('.suggestionarea').nextAll('.suggestionarea:first');
            return area.children('.suggestion:first');
        } else {
            return newselection;
        }
    } else {
        return $('.suggestion:first');
    }
}

function selectPrevSuggestion() {
    var newselection = getPreviousSelection();
    var oldselection = $('.selected-suggestion');
    if (newselection != null && newselection.length > 0) {
        changeSelection(oldselection, newselection);
    } else {
        oldselection.removeClass('selected-suggestion');
        getSearchField().get(0).focus();
    }
}

function getPreviousSelection() {
    var selected = $('.selected-suggestion');
    var newselection = null;
    if (selected.length > 0) {
        newselection = selected.prevAll('.suggestion:first');
        if (newselection.length == 0) {
            // We're at the beginning of a selection, jump to the previous.
            var area = selected.closest('.suggestionarea').prevAll('.suggestionarea:first');
            return area.children('.suggestion:last');
        } else {
            return newselection;
        }
    } else {
        return null;
    }
}

function changeSelection(oldselection, newselection) {
    oldselection.removeClass('selected-suggestion');
    newselection.addClass('selected-suggestion');
    getSearchField().get(0).blur();
    newselection.get(0).focus();
}

function getSearchForm() {
    return document.forms['docsearch_form'];
}

function getSearchField() {
    var searchField = $('#docsearch');
    if (searchField.length == 0) {
        searchField = $('#searchfield');
    }
    return searchField;
}

function go(page) {
    document.location = page;
}

function more(q, type) {
    var divId = type + 'area';
    var div = $('#' + divId);
    div.css('minHeight', div.outerHeight());
    div.css('maxHeight', div.outerHeight());

    var moreElt = $('#more' + type);
    moreElt.removeClass('suggestmore');
    moreElt.removeClass('suggestion');
    moreElt.removeClass('selected-suggestion');
    moreElt.html('<img src="/help/search/img/progress.gif" style="position:relative;top:2px;left:5px;" />');
    var params = {'q':q, 'type':type, 'start':5};
    var url = getSuggestionsUrl('suggestmore', params);
    $.get(url, function(data) {
        moreElt.remove();
        displayMoreSuggestions(divId, type, data);
    });
}

function displayMoreSuggestions(divId, type, json) {
    var template = type !== "word" ? "pagesuggestion" : "wordsuggestion";
    var html = $.tmpl(template, json.suggestions);
    html.eq(0).addClass('selected-suggestion');
    $('#' + divId).append(html);
    $('.selected-suggestion').get(0).focus();
}

function search(q) {
    var sf = getSearchField();
    sf.val(q);
    var form = getSearchForm();
    $(form).trigger('submit');
    form.submit();
    hidePopups(false);
}

function getSuggestionsUrl(action, params) {
    var formAction = $('#docsearch_form').attr('action');
    params.width = getPopupWidth(getSearchField());
    return formAction.replace(/\/search(\/|$)/, '/search/' + action + '/') + '?' + $.param(params);
}

function hideTocPopup() {
    var tocEl = $("div.toc_container_wrapper:first");
    setTimeout(function () {
        tocEl.data({tocHeight:tocEl.height()})
    }, 0);
    tocEl.hide();
}